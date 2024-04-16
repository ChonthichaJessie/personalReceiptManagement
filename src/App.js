import React, { useMemo, useState } from "react";
//import axios from "axios";
import { useEffect } from "react";
// import { setDoc, doc } from "firebase/firestore";
// import { db, storage } from "./utils/firebase";
import receiptData from "./ReceiptData.json";
import { algoliaConfig } from "./utils/algolia";
import styled from "styled-components";
// import {
//   getDownloadURL,
//   ref as storageRef,
//   uploadBytes,
// } from "firebase/storage";

//Algolia Key - - Need to rebuild search bar
import algoliasearch from "algoliasearch/lite"
import Home from "./screens/Home";

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME } = algoliaConfig;

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  // const [url, setUrl] = useState(null);
  const [receipt, setReceipt] = useState(receiptData);
  // Algolia

  const [localImages, setLocalImages] = useState([]);
  const [fireImageURLs, setFireImageURLs] = useState("");

  useEffect(() => {
    setReceipt(receipt);
  }, []);

  return (
    <div>
      <div>
        <Home />
      </div>

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
