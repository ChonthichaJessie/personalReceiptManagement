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

  const handleEmailLogin = async () => { 
    await logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    resumeUser();
  }, []);

  return (
    <Wrapper>
      <WelcomeWrapper>
      <img src="/background/Cat_Paw_Small_05.png" alt="cat paw" height="60px" />
      <Welcome>Welcome to Receiptify</Welcome>
      <img src="/background/Cat_Paw_Small_05.png" alt="cat paw" height="60px" />
      </WelcomeWrapper>
      
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
        <LoginBtn onClick={handleEmailLogin}>
          Login with Email
        </LoginBtn>
        <LoginGoogle onClick={handleGoogleLogin}>Login with Google</LoginGoogle>
        <LoginLink>
          <Link to="/reset">Forgot Password?</Link>
        </LoginLink>
        <LoginLink>
          Don't have an account? <Link to="/Register">Register</Link> now.
        </LoginLink>
      </LoginContainer>
      <CatsDecorationBottom>
        <img src="/background/Cat_Face_04.png" alt="cat paw" height="240px" />
        <img src="/background/Cat_Face_01.png" alt="cat paw" height="240px" />
        <img src="/background/Cat_Face_05.png" alt="cat paw" height="240px" />
        <img src="/background/Cat_Face_02.png" alt="cat paw" height="240px" />
      </CatsDecorationBottom>
    </Wrapper>
  );
};
export default Login;

const CatsDecorationBottom = styled.div`
padding-top: 48px;
display: flex;
flex-direction: row;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
`;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 48px;
  padding-bottom: 48px;
`;

const Welcome = styled.text`
  font-size: 48px;
  color: white;
  padding-left: 16px;
  padding-right: 16px;
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
font-family: "Times New Roman", Times, serif;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 24px;
  color: gray;
  margin-bottom: 16px;
  border: none;
`;

const LoginBtn = styled.button`
font-family: "Times New Roman", Times, serif;
  padding: 16px;
  font-size: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  color: white;
  background-image: url("/background/Background.png");
  cursor: pointer;
`;

const LoginGoogle = styled.button`
  font-family: "Times New Roman", Times, serif;
  padding: 16px;
  font-size: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: none;
  color: white;
  background-image: url("/background/Background.png");
  cursor: pointer;
`;

const LoginLink = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
`;
