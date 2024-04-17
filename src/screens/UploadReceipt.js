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
    const { receiptNumber, imageURL } = await uploadImageToFirestore(
      localImage
    );
    setReceiptNo(receiptNumber);
    setFireImageURL(imageURL);
    console.log("Image uploaded to storage", imageURL);
    if (imageURL) {
      setReceipt(await performOcr(imageURL));
    }
  };

  return (
    <div>
      <TopWrapper>
        <Top>
          <Header>Let's Upload A New Receipt</Header>
          <ImagePickerWrapper>
            <ImagePicker onPickImage={setLocalImage} />
          </ImagePickerWrapper>
        </Top>
      </TopWrapper>

      <Display>
        {!!localImage && (
          <ImageDisplay imageURL={URL.createObjectURL(localImage)} />
        )}
        <OcrDisplay data={JSON.stringify(receipt, null, 1)} />
      </Display>
      <BottomWrapper>
        <Bottom>
          <ButtonWrapper>
            <img
              src="/background/Cat_Paw_Small_01.png"
              alt="cat paw"
              height="50px"
            />
            <ConvertReceiptWrapper>
              <Btn onClick={storeAndConvertReceipt}>
                Convert receipt to text
              </Btn>
            </ConvertReceiptWrapper>
          </ButtonWrapper>
          <ButtonWrapper>
            <img
              src="/background/Cat_Paw_Small_07.png"
              alt="cat paw"
              height="50px"
            />
            <Btn
              onClick={() =>
                saveReceiptToFirestore(
                  receiptNo,
                  receipt,
                  fireImageURL,
                  userEmail
                )
              }
            >
              Save receipt
            </Btn>
          </ButtonWrapper>
        </Bottom>
      </BottomWrapper>
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

const Header = styled.text`
  font-size: 24px;
  color: white;
`;

const Top = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
`;

const ImagePickerWrapper = styled.div`
  cursor: pointer;
`;

const TopWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

const Bottom = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
`;

const BottomWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Btn = styled.button`
  font-family: "Times New Roman", Times, serif, Helvetica, sans-serif;
  height: 80px;
  padding: 8px;
  border: none;
  font-size: 24px;
  color: white;
  background-color: transparent;
  cursor: pointer;
`;

const ConvertReceiptWrapper = styled.div`
  width: 250px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
