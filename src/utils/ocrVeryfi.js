import axios from "axios";

const ocrVeryfiConfig = {
  clientID: process.env.REACT_APP_VERYFI_CLIENT_ID,
  apiKey: process.env.REACT_APP_VERYFI_API_KEY,
};

console.log(ocrVeryfiConfig)
export const performOcr = async (imageUrl) => {
  try {
    const data = JSON.stringify({
      // file_url:
      //   "https://downloads.intercomcdn.com/i/o/531448844/04b5b529d5578dd603b48dee/cpg-receipt-grocery.jpg?expires=1711134631&signature=77a56224c6640186616ff6cb66a496393d3e76ea30b4f3e86525200ba4cf240f",
      file_url: imageUrl,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
      //Hide all of the keys and tokens
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "CLIENT-ID": ocrVeryfiConfig.clientID,
        AUTHORIZATION: ocrVeryfiConfig.apiKey,
      },
      data: data,
    };

    const response = await axios(config);
    return response.data ?? {}
  } catch (error) {
    console.log(error);
    return {}
  }
};
