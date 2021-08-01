import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Token, Pet } from "./utilities/types";
import './styles/index.scss';
import Header from "./components/Header/Header";
import TinderCard from "./components/TinderCard/TinderCard";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

interface StorageToken extends Token {
  expiration_time: number;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<StorageToken|null>(null);
  const [pets,  setPets] = useState<Pet[]>([]);
  const LOCAL_STORAGE_TOKEN_KEY = "PET_TINDER_TOKEN";
  const PROXY_SERVER = "https://thingproxy.freeboard.io/fetch";

  // TODO: set error messages

  const getPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${PROXY_SERVER}/https://api.petfinder.com/v2/animals`);
      setPets(response.data.animals);
    } catch (err) {
      // TODO: Set error
      console.log(err);
    }
    setLoading(false);
  };

  const getToken = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_API_KEY,
        client_secret: process.env.REACT_APP_SECRET_KEY
      });
      setToken(formatToken(response.data));
    } catch (err) {
      // TODO: Set error
      console.log(err);
    }
    setLoading(false);
  }

  const formatToken = (token: Token): StorageToken => {
    return {
      ...token,
      expiration_time: Date.now() + (token.expires_in * 1000)
    }
  }

  const isTokenExpired = (token: StorageToken): boolean => {;
    if (Date.now() > token.expiration_time) return true;
    else return false;
  }

  useEffect(() => { 
    // Check if token is in localstorage
    const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (savedToken) {
      // Check if token expired, if so get new one
      const parsedToken = JSON.parse(savedToken);
      if (isTokenExpired(parsedToken)) {
        getToken();
      } else {
        setToken(parsedToken);
      }
    } else {
      getToken();
    }
  }, []);

  useEffect(() => {
    if (token === null) return;
    const storageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!storageToken) {
      // Set new token in localstorage
      const newToken: StorageToken = formatToken(token);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(newToken));
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
    // Get pets if needed
    if (pets.length === 0) {
      getPets();
    }
  }, [token]);

  console.log(pets);

  return (
    <div className="container">
      <Header />
      <div className="container__main">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {pets.length > 0 && (
              <TinderCard animal={pets[0]} key={pets[0].id} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
