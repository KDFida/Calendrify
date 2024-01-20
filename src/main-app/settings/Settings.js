import React, { useState } from "react";
import './settings.css';
import { getAuth, updatePassword } from "firebase/auth";
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
            </div>
    </div>
    )
}

export default Settings;