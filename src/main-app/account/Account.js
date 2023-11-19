import React, { useState, useEffect} from "react";
import './account.css';
import firebase from "../../firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth"; 
import Sidebar from "../../components/sidebar/Sidebar";
import { FaUserCircle } from "react-icons/fa";

function Account() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const authUnsubscribe = onAuthStateChanged(firebase.authentication, (currentUser) => {
            if (currentUser) {
                const fetchUserInfo = async () => {
                    const userDocRef = doc(firebase.database, "Users", currentUser.uid);
                    const userDocSnapshot = await getDoc(userDocRef);
        
                    if (userDocSnapshot.exists()) {
                        setUserInfo(userDocSnapshot.data());
                    }
                };
        
                fetchUserInfo();
            }
        });

        return () => {
            authUnsubscribe();
        }
    }, []);

    return (
        <div className="layout">
            <Sidebar />
            <div className="user-profile">
                <h1>User Profile</h1>
                <div className="user-profile-container">
                <div className="profile-pic">
                    <FaUserCircle 
                        size={108}
                        color="lightgrey"
                    />
                </div>
                <div><strong>Full name:</strong><span>{userInfo?.name}</span></div>
                <div><strong>Email Address:</strong><span>{userInfo?.email}</span></div>
                <div><strong>Account created on:</strong><span>{userInfo?.creationDate}</span></div>
                </div>
            </div>
        </div>
    )
}

export default Account;