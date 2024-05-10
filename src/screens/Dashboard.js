import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, logOut } from "../utils/firebase";
import {
  setOnUserLoggedInDisplayCallback,
  setOnUserLoggedInEmailCallback,
} from "../utils/firebase";
import UploadReceipts from "./UploadReceipt";
import Login from "./Login";
import ReceiptsStorage from "./ReceiptsStorage";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      navigate("/"); // Redirect to the login page if user is not logged in
    } else {
      //fetchUserName();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    setOnUserLoggedInDisplayCallback((name) => {
      setName(name);
    });
    setOnUserLoggedInEmailCallback((email) => {
      setUserEmail(email);
    });
  }, []);

  return (
    <Wrapper>
      <DashboardContainer>
        {name ? (
          <>
            <Top>
              <WelcomeWrapper>
                <WelcomeTextWrapper>
                <Welcome>Welcome</Welcome>
                <Welcome>{name}</Welcome>
                </WelcomeTextWrapper>
                
              </WelcomeWrapper>
              <LogoutWrapper>
              <img
                  src="/background/Cat_Paw_Small_05.png"
                  alt="cat paw"
                  height="50px"
                />
                <LogOut onClick={logOut}>Logout</LogOut>
                
              </LogoutWrapper>
            </Top>
            <UploadReceipts userEmail={userEmail} />
            <ReceiptsStorage userEmail={userEmail} />
          </>
        ) : (
          <Login />
        )}
      </DashboardContainer>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  width: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 30px;
  width: 100%;
  background-color: transparent;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Welcome = styled.text`
  font-size: 48px;
  color: white;
`;
const WelcomeTextWrapper = styled.div`
padding-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  `;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogOut = styled.label`
  font-size: 24px;
  padding-left: 8px;
  color: white;
  border: none;
  cursor: pointer;
  background-color: url("/background/Cat_Paw_02.png");;
`;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// Path: src/screens/Reset.js
