import React, { useState } from "react";
import { auth } from "../utils/firebase";

const EmailPasswordLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
      try {
          await auth.signInWithEmailAndPassword(email, password);
          // Login successful
      } catch (error) {
          // Handle login error
      }
  };

  return (
      <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
      </div>
  );
};

export default EmailPasswordLogin;