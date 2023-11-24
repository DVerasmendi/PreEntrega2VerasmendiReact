import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import 'bootstrap/dist/css/bootstrap.min.css';


const firebaseConfig = {
  apiKey: "AIzaSyDS__4zWrntAif_yR-JeKVh_Ip0lT7VoQY",
  authDomain: "totem-41639.firebaseapp.com",
  databaseURL: "https://totem-41639-default-rtdb.firebaseio.com",
  projectId: "totem-41639",
  storageBucket: "totem-41639.appspot.com",
  messagingSenderId: "956440842397",
  appId: "1:956440842397:web:912627201eeccbf4728474",
  measurementId: "G-J3XTBR2Y1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
