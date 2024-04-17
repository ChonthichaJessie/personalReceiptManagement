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
    await logInWithGoogle();
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
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-image: url("/background/Background.png");
`;

const Welcome = styled.text`
  font-size: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
  color: white;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border-radius: 24px;
  width: 400px;
  padding: 30px;
`;

const LoginTextBox = styled.input`
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 24px;
  color: gray;
  margin-bottom: 16px;
  border-radius: 8px;
  margin-top: 16px;
  border-color: transparent;
`;

const LoginBtn = styled.button`
  padding: 16px;
  font-size: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  color: white;
  background-image: url("/background/Background.png");
`;

const LoginGoogle = styled.button`
  padding: 16px;
  font-size: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  color: white;
  background-image: url("/background/Background.png");
`;

const LoginLink = styled.div`
  margin-top: 16px;
  font-size: 16px;
`;
