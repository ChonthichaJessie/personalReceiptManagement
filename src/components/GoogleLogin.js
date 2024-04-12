import React from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";

const GoogleLogin = () => {
    const handleGoogleLogin = async () => {
        try {
            await auth.signInWithPopup(new GoogleAuthProvider());
            // Login successful
        } catch (error) {
            // Handle login error
        }
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default GoogleLogin;