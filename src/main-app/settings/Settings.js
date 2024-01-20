import React, { useState } from "react";
import './settings.css';
import { getAuth, updatePassword, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";

function Settings() {
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    
    const handleChangePassword = (newPassword) => {
        const auth = getAuth();
        const user = auth.currentUser;
      
        updatePassword(user, newPassword).then(() => {
          toast.success("Password updated successfully");
          navigate('/login');
        }).catch(() => {
          toast.error("Error updating password");
        });
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            const auth = getAuth();
            const user = auth.currentUser;
          
            deleteUser(user).then(() => {
                toast.success("Account deleted successfully");
                navigate('/home');
            }).catch((error) => {
                toast.error("Error deleting account: " + error.message);
            });
        }
    };

    
    return (
        <div className="settings">
            <Sidebar />
            <div className="settings-container">
                <div>
                    <h2>Change Password</h2>
                    <form onSubmit={handleChangePassword}>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button type="submit">Update Password</button>
                    </form>
                </div>

                <div className="settings-card">
                    <h2>Delete Account</h2>
                    <button onClick={handleDeleteAccount}>Delete My Account</button>
                </div>

            </div>
        </div>
    )
}

export default Settings;