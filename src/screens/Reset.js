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
  background-color: #dcdcdc;
  padding: 30px;
`;

const ResetTextBox = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`;

const ResetBtn = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`;
const NoAccount = styled.div`
  margin-top: 7px;
`;
