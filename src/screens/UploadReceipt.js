import React, { useMemo, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import receiptData from "../ReceiptData.json";
import styled from "styled-components";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import ImagePicker from "../components/ImagePicker";
import OcrDisplay from "../components/OcrDisplay";
import ImagesDisplay from "../components/ImagesDisplay";
import { ocrVeryfiConfig } from "../utils/ocrVeryfi";

const UploadReceipts = ({ userEmail }) => {
  const [jsonData, setJsonData] = useState(null);
  const [receipt, setReceipt] = useState(receiptData);
  const [uid, setUid] = useState("");
  const [localImages, setLocalImages] = useState([]);
  const [fireImageURLs, setFireImageURLs] = useState(null);

  // const ocrFetching = async () => {
  //   const { clientID, apiKey } = ocrVeryfiConfig;
  //   console.log("fireImageURLs", fireImageURLs[0]);
  //   try {
  //     let data = JSON.stringify({
  //       file_url:"https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f",
  //     });

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
  //       //Hide all of the keys and tokens
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

  const fetchData = async () => {
    try {
      let data = JSON.stringify({
        // file_url:
        //   "https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f",
        file_url: fireImageURLs[0],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
        //Hide all of the keys and tokens
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
      //console.log(JSON.stringify(response.data));
      setJsonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const receiptDateJoinID =
    JSON.stringify(receipt.date) + JSON.stringify(receipt.id) + Math.random();
  const receiptNumber = receiptDateJoinID.replace(/[^a-zA-Z0-9]/g, "");

  const addImagesToFirestore = async () => {
    try {
      const imageURLs = await Promise.all(
        localImages.map(async (image, index) => {
          const imageRef = storageRef(
            storage,
            `receipts/${receiptNumber}/image${index}`
          );
          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);
          console.log("Image uploaded to storage", url);
          return url;
        })
      );
      setFireImageURLs(imageURLs);
      console.log("Images uploaded to storage", imageURLs);
    } catch (error) {
      console.error("Error adding images to Firestore:", error);
    }
  };
  const addItemToFirestore = async () => {
    try {
      //cannot add user email to receipt object
      const receiptWithImageURLs = {
        ...receipt,
        imageURLs: fireImageURLs,
        userEmail,
      };
      console.log(receiptWithImageURLs);
      const docRef = await setDoc(
        doc(db, "users", receiptNumber),
        receiptWithImageURLs
      );
      console.log("Submitted to Firestore");
    } catch (error) {
      console.error("Error adding item to Firestore:", error);
    }
  };

  const convertReceiptToText = async () => {
    await addImagesToFirestore();
    console.log("Images uploaded to storage", fireImageURLs);
    await fetchData();
    setReceipt(jsonData);
  };

  const uploadReceiptHandler = async () => {
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
      <h1>Upload new receipts</h1>
      <ImagePicker onPickImages={setLocalImages} />
      <Display>
        <ImagesDisplay
          imageURLs={localImages.map((image) => URL.createObjectURL(image))}
        />
        <OcrDisplay data={JSON.stringify(jsonData, null, 1)} />
      </Display>
      <button onClick={convertReceiptToText}>Convert receipt to text</button>
      <button onClick={uploadReceiptHandler}>Upload receipt</button>
      {/* {jsonData && (
        <div>
          <pre>{JSON.stringify(jsonData, null, 1)}</pre>
        </div>
      )} */}

      {/* use testReceiptjson from local json file */}
    </div>
  );
};

export default UploadReceipts;

const Display = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
`;
