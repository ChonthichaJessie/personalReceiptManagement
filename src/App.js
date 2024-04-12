import React, { useMemo, useState } from "react";
//import axios from "axios";
import { useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "./utils/firebase";
import receiptData from "./ReceiptData.json";
import { algoliaConfig } from "./utils/algolia";
import styled from "styled-components";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

//Algolia Key - - Need to rebuild search bar
import algoliasearch from "algoliasearch/lite";
import AlgoliaSearchLists from "./components/AlgoliaSearchLists";
import ImagePicker from "./components/ImagePicker";
import OcrDisplay from "./components/OcrDisplay";
import ImagesDisplay from "./components/ImagesDisplay";
import EmailPasswordLogin from "./components/EmailPasswordLogin";
import GoogleLogin from "./components/GoogleLogin";
import Login from "./components/Login";

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME } = algoliaConfig;

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  // const [url, setUrl] = useState(null);
  const [receipt, setReceipt] = useState(receiptData);
  // Algolia

  // const ocrFetching = async () => {
  //   try {
  //     let data = JSON.stringify({
  //       file_url:
  //         "https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f",
  //     });

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
  //       Hide all of the keys and tokens
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
  //     setJsonData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [localImages, setLocalImages] = useState([]);
  const [fireImageURLs, setFireImageURLs] = useState("");

  // useEffect(() => {
  //   //call ocr from here
  //   //ocrFetching();
  // }, 
  // [localImages]);

  const receiptDateJoinID =
    JSON.stringify(receipt.date) + JSON.stringify(receipt.id) + Math.random();
  const receiptNumber = receiptDateJoinID.replace(/[^a-zA-Z0-9]/g, "");

  const addImagesToFirestore = async () => {
    try {
      localImages.forEach(async (image, index) => {
        const imageRef = storageRef(
          storage,
          `receipts/${receiptNumber}/image${index}`
        );
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        setFireImageURLs(url);
        console.log("Image uploaded to storage", url);
      });
    } catch (error) {
      console.error("Error adding image to Firestore:", error);
    }
  };
  const addItemToFirestore = async () => {
    try {
      const receiptWithImageURLs = { ...receipt, imageURLs: fireImageURLs };
      console.log(receiptWithImageURLs);
      const docRef = await setDoc(doc(db, "users", receiptNumber), receiptWithImageURLs);
      console.log("Submitted to Firestore");
    } catch (error) {
      console.error("Error adding item to Firestore:", error);
    }
  };

  const uploadReceiptHandler = async () => {
    await addImagesToFirestore();
    await addItemToFirestore();
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
    //       Hide all of the keys and tokens
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
  }, []);

  return (
    <div>
      <div>
        <h1>User Authentication</h1>
        <Login />
      </div>
      <h1>Receipt Management</h1>
      <ImagePicker onPickImages={setLocalImages} />
      <Display>
        <ImagesDisplay
          imageURLs={localImages.map((image) => URL.createObjectURL(image))}
        />
        <OcrDisplay data={JSON.stringify(receipt, null, 1)} />
      </Display>
      <button onClick={uploadReceiptHandler}>Upload receipt</button>
      <AlgoliaSearchLists
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
      />
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

const Display = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
`;
