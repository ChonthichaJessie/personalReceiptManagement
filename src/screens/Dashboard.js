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
              <Welcome>Welcome, {name}</Welcome>
              <Btn onClick={logOut}>Logout</Btn>
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
  font-size: 50px;
  padding-top: 50px;
  padding-bottom: 50px;
  color: white;
`;
const Btn = styled.button`
  padding: 16px;
  font-size: 24px;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;
// Path: src/screens/Reset.js
