import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Wrapper>
      <ResetContainer>
        <ResetTextBox
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <ResetBtn onClick={() => sendPasswordResetEmail(email)}>
          Send password reset email
        </ResetBtn>
        <NoAccount>
          Don't have an account? <Link to="/register">Register</Link> now.
        </NoAccount>
      </ResetContainer>
    </Wrapper>
  );
};
export default Reset;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border-radius: 24px;
  width: 400px;
  padding: 30px;
`;

const ResetTextBox = styled.input`
font-family: "Times New Roman", Times, serif;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 24px;
  color: gray;
  margin-bottom: 16px;
  border: none;
`;

const ResetBtn = styled.button`
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
const NoAccount = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
`;
