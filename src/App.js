import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [url, setUrl] = useState(null);

  const testReceiptUrl = () => {
    setUrl(
      "https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f"
    );

    return url
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = JSON.stringify({
          file_url: testReceiptUrl(),
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
        //console.log(JSON.stringify(response.data));
        setJsonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Receipt Data</h1>
      <img src={url} alt="Receipt" />
      {jsonData && (
        <div>
          <pre>{JSON.stringify(jsonData, null, 1)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
