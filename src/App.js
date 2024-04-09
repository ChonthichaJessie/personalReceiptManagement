import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  //collection,
  //addDoc,
  setDoc,
  doc,
  //connectFirestoreEmulator,
} from "firebase/firestore";
import receiptData from "./ReceiptData.json";
import { algoliaConfig } from "./utils/algolia";

//Algolia Key - - Need to rebuild search bar
import algoliasearch from "algoliasearch/lite";
import AlgoliaSearchLists from "./components/algoliaSearchLists";
import UploadImage from "./components/uploadImages";

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME } = algoliaConfig;

//Firebase Key - - Need to hide the keys
const firebaseConfig = {
  apiKey: "AIzaSyD3RtJUUsBuocFfrXst0QJpbGfG2LTAz2Y",
  authDomain: "receiptmanagement-1d51d.firebaseapp.com",
  projectId: "receiptmanagement-1d51d",
  storageBucket: "receiptmanagement-1d51d.appspot.com",
  messagingSenderId: "852913556492",
  appId: "1:852913556492:web:6b65c58bfec0992ac47229",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  // const [url, setUrl] = useState(null);
  const [receipt, setReceipt] = useState(receiptData);
  // Algolia
  const [searchClient, setSearchClient] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const handleImageUpload = (images) => {
    setUploadedImages(images);
  };

  const ocrFetching = async () => {
    try {
      let data = JSON.stringify({
        file_url:
          "https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "CLIENT-ID": "vrfWxnyNHLND0bWymAZBlTbWp6gzlfoPEdddlaj",
          AUTHORIZATION:
            "apikey chonthicha.pc:f3da01f277e17bc6bec576c280d1452f",
        },
        data: data,
      };

      const response = await axios(config);
      setJsonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToFirestore = async () => {
    const receiptDateJoinID =
      JSON.stringify(receipt.date) + JSON.stringify(receipt.id) + Math.random();
    const receiptNumber = receiptDateJoinID.replace(/[^a-zA-Z0-9]/g, "");

    try {
      const docRef = await setDoc(doc(db, "users", receiptNumber), receiptData);
      console.log("Submitted to Firestore");
    } catch (error) {
      console.error("Error adding item to Firestore:", error);
    }
  };

  const uploadReceiptHandler = () => {
    ocrFetching();
    addItemToFirestore();
    console.log("Upload receipt");
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     let data = JSON.stringify({
    //       file_url: "https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f",
    //     });

    //     let config = {
    //       method: "post",
    //       maxBodyLength: Infinity,
    //       url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "CLIENT-ID": "vrfWxnyNHLND0bWymAZBlTbWp6gzlfoPEdddlaj",
    //         AUTHORIZATION:
    //           "apikey chonthicha.pc:f3da01f277e17bc6bec576c280d1452f",
    //       },
    //       data: data,
    //     };

    //     const response = await axios(config);
    //     //console.log(JSON.stringify(response.data));
    //     setJsonData(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    //  fetchData();

    setReceipt(receipt);
    setSearchClient(algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY));
  }, []);

  return (
    <div>
      <h1>Receipt Management</h1>
      <UploadImage onImageUpload={handleImageUpload} />
      <pre>{JSON.stringify(receipt, null, 1)}</pre>
      <button onClick={addItemToFirestore}>Upload receipt</button>
      {searchClient && (
        <AlgoliaSearchLists
          searchClient={searchClient}
          indexName={ALGOLIA_INDEX_NAME}
        />
      )}
      {/* {jsonData && (
        <div>
          <pre>{JSON.stringify(jsonData, null, 1)}</pre>
        </div>
      )} */}

      {/* use testReceiptjson from local json file */}
    </div>
  );
};

export default App;
