import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { auth, db, logOut } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {
  logInWithGoogle,
  setOnUserLoggedInDisplayCallback,
  setOnUserLoggedInEmailCallback,
} from "../utils/firebase";
import UploadReceipts from "./UploadReceipt";
import Login from "./Login";
import ReceiptsStorage from "./ReceiptsStorage";


const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
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
            <Welcome>
              Welcome, {name}, {userEmail}
            </Welcome>
            <Btn onClick={logOut}>Logout</Btn>
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
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
`;

const Welcome = styled.h1`
  margin-bottom: 20px;
`;
const Btn = styled.button`
  padding: 10px;
  font-size: 18px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;
// Path: src/screens/Reset.js
