const axios = require("axios");

const ocrVeryfiConfig = {
  clientID: process.env.REACT_APP_VERYFI_CLIENT_ID,
  apiKey: process.env.REACT_APP_VERYFI_API_KEY,
};

console.log(ocrVeryfiConfig);

const {onRequest} = require("firebase-functions/v2/https");

exports.performOcr = onRequest(async (request, response) => {
  try {
    const imageURL = request.body.imageURL;

    const data = {
      file_url: imageURL,
    };

    if (!imageURL) {
      throw new Error("Image URL is missing in the request body");
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.veryfi.com/api/v8/partner/documents",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "CLIENT-ID": "vrfWxnyNHLND0bWymAZBlTbWp6gzlfoPEdddlaj",
        // eslint-disable-next-line max-len
        "AUTHORIZATION": "apikey chonthicha.pc:f3da01f277e17bc6bec576c280d1452f",
        // Fix CORs issue for local host 3000
        "Accss-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      data: data,
    };

    const veryfiResponse = await axios(config);
    response.send(veryfiResponse.data ?? {});
  } catch (error) {
    console.error("Error in performOcr function:", error);
    console.log(error);
    response.send({
      error: "Error in OCR Veryfi API call-indirect OCR Key" + error.message,
    });
  }
});
