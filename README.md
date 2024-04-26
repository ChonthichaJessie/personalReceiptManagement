# 🧾🤖 Receiptify Application

Reciptify offers services for storing users' receipt information. Users can upload receipt images, and the application converts them to JSON data and stores them in the Firebase database. Then, users can search for any information in the uploaded receipts and view the receipt's data, including its photo.

## 🐱‍💻 Technology Using
Firestore database, Firebase storage, Firebase Authentication, Verify Lens API (OCR Technology), Algoria API for substring searching

## 🐱‍👓 Architecture brifly description
Reciptify begins the process by requesting the user to log in from <Login/> on Dashboard screen. Then it retrieves the user's name and email address from Firebase authentication (Google authentication and EmailPassword authentication), and passes both data to other components such as uploading photos to FirebaseStorage, uploading json receipt data to FiredatabaseDatabase, and setting up an AlgoliaSearching (substring searching API) fliter index for this user's email only.

After logging in, customers need to pick a receipt image from their devices, which can then be converted to text. The transformed text data will be displayed beside the chosen image. The process begins with uploading a photo to FirebaseStorage, followed by retrieving an imageURL from Firestore and passing it to the VeryFi OCR API for conversion to JSON data. Next, it retrieves OCR json data and adds three additional fields, including user email, imageURL, and receipt id, for use in Algolia searches. Then users can save all of data to FirebaseDatabase.

Algolia search has been linked to the FirebaseDatabase extension. Then we can utilize built-in functions like "Hits" to display search indexes retrieved from Firebase. However, because all users are in the same database, Algolia will display information about other users as well. So, we only need to add filter index data from this logged-in user. That is why I include a user email field in each receipt json before uploading it to FirebaseDatabase. Use this field to filter the Algolia index.

## 🐱‍👓 Author's message
VeryFi OCR API offers free hitting API 50 times per month. Thus, try not to use that function excessively and be considerate to let others enjoy it as well.
There is still lots of room for improvement. I'm currently working on this app.

## 🧁 Live demo: https://personal-receipt-management.vercel.app/

## 🧁 Developer: Jessie Chonthicha

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


