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
        <div className="layout">
            <Sidebar />
            <div className="settings">
                <h1>Settings</h1>
                <div className="settings-container">
                    <h2>Change Password</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePassword(newPassword);
                    }}>
                        <input
                            className="newPassword-input"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button type="submit">Update Password</button>
                    </form>

                    <div className="delete">
                        <h2>Delete Account</h2>
                        <button className="deleteAccount-button" onClick={handleDeleteAccount}>Delete My Account</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Settings;