import React, { useState } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, logInWithGoogle, createNewEmailAndPassword } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  return (
    <Wrapper>
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
        <LoginBtn onClick={() => signInWithEmailAndPassword(email, password)}>
          Login
        </LoginBtn>
        <LoginGoogle onClick={logInWithGoogle}>Login with Google</LoginGoogle>
        <LoginBtn 
        onClick={() => {
          createNewEmailAndPassword(email, password);
        }}
        >Sing Up</LoginBtn>
        
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
