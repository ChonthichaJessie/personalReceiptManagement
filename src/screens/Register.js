import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, logInWithGoogle,registerWithEmailAndPassword } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter your name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Wrapper>
      <RegisterContainer>
      <RegisterTextBox
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <RegisterTextBox
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <RegisterTextBox
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <RegisterBtn
          onClick={() => registerWithEmailAndPassword(email, password)}
        >
          Register
        </RegisterBtn>
        <RegisterGoogle onClick={logInWithGoogle}>
          Register with Google
        </RegisterGoogle>
        <LoginLink>
          Already have an account? <Link to="/">Login</Link> now.
        </LoginLink>
      </RegisterContainer>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border-radius: 24px;
  width: 400px;
  padding: 30px;
`;

const RegisterTextBox = styled.input`
  font-family: "Times New Roman", Times, serif;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 24px;
  color: gray;
  margin-bottom: 16px;
  border: none;
`;

const RegisterBtn = styled.button`
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

const RegisterGoogle = styled.button`
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
