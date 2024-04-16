import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithGoogle,
  logInWithEmailAndPassword,
  resumeUser,
} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const handleGoogleLogin = async () => {
    await logInWithGoogle()
  };

  useEffect(() => {
    resumeUser();
  }, []);

  return (
    <Wrapper>
      <Welcome>Welcome to Receiptify</Welcome>
      <LoginContainer>
        
        <LoginTextBox
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <LoginTextBox
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <LoginBtn onClick={() => logInWithEmailAndPassword(email, password)}>
          Login
        </LoginBtn>
        <LoginGoogle onClick={handleGoogleLogin}>Login with Google</LoginGoogle>
        <LoginLink>
          <Link to="/reset">Forgot Password?</Link>
        </LoginLink>
        <LoginLink>
          Don't have an account? <Link to="/Register">Register</Link> now.
        </LoginLink>
      </LoginContainer>
    </Wrapper>
  );
};
export default Login;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.h1`
  margin-bottom: 20px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
`;

const LoginTextBox = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`;

const LoginBtn = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`;

const LoginGoogle = styled.button`
  background-color: #4285f4;
`;

const LoginLink = styled.div`
  margin-top: 7px;
`;

const NoAccount = styled.div`
  margin-top: 7px;
`;
