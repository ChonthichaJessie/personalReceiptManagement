import React, { useState } from "react";
import {
  saveReceiptToFirestore,
  uploadImageToFirestore,
} from "../utils/firebase";
import styled from "styled-components";
import ImagePicker from "../components/ImagePicker";
import OcrDisplay from "../components/OcrDisplay";
import ImageDisplay from "../components/ImageDisplay";
import { performOcr } from "../utils/ocrVeryfi";

const UploadReceipts = ({ userEmail }) => {
  const [receipt, setReceipt] = useState({});
  const [localImage, setLocalImage] = useState("");
  const [fireImageURL, setFireImageURL] = useState(null);
  const [receiptNo, setReceiptNo] = useState([]);

  // const receiptDateJoinID =
  //   JSON.stringify(receipt.date) + JSON.stringify(receipt.id) + Math.random();

  const storeAndConvertReceipt = async () => {
    const { receiptNumber, imageURL } = await uploadImageToFirestore(localImage);
    setReceiptNo(receiptNumber);
    setFireImageURL(imageURL);
    console.log("Image uploaded to storage", imageURL);
    if (imageURL) {
      setReceipt(await performOcr(imageURL));
    }
  };

  return (
    <div>
      <h1>Upload new receipt</h1>
      <ImagePicker onPickImage={setLocalImage} />
      <Display>
        {!!localImage && (
          <ImageDisplay imageURL={URL.createObjectURL(localImage)} />
        )}
        <OcrDisplay data={JSON.stringify(receipt, null, 1)} />
      </Display>
      <button onClick={storeAndConvertReceipt}>Convert receipt to text</button>
      <button
        onClick={() =>
          saveReceiptToFirestore(receiptNo, receipt, fireImageURL, userEmail)
        }
      >
        Upload receipt
      </button>
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
