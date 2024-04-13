import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db, logOut } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { logInWithGoogle, setOnUserLoggedInDisplayCallback } from "../utils/firebase";
import UploadReceipts from "./UploadReceipt";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  
  // const fetchUserName = async () => {
  //   try {
  //     //const q = query(collection(db, user.email), where("uid", "==", user?.uid));
  //     const q = query(collection(db, user.email));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

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
    // Set up a callback function to update the user's name when logged in with Google
    setOnUserLoggedInDisplayCallback((name) => {
      setName(name);
    });
  }, []);

  return (
    <Wrapper>
      <DashboardContainer>
      {name ? (
          <>
            <Welcome>Welcome, {name}</Welcome>
            <Btn onClick={logOut}>Logout</Btn>
            <UploadReceipts/>
          </>
        ) : (
          <Btn onClick={logInWithGoogle}>Log in with Google</Btn>
        )}
      </DashboardContainer>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  height: 100vh;
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
