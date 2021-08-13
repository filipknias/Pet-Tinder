import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Token, Pet, Colors, Placement } from "./utilities/types";
import './styles/index.scss';
import Header from "./components/Header/Header";
import TinderCard from "./components/TinderCard/TinderCard";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";
import RoundedButton from "./components/RoundedButton/RoundedButton";
import Tooltip from "./components/Tooltip/Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faTimesCircle, faRedo, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

interface StorageToken extends Token {
  expiration_time: number;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<StorageToken|null>(null);
  const [pets,  setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<boolean>(false);
  const LOCAL_STORAGE_TOKEN_KEY = "PET_TINDER_TOKEN";
  const PROXY_SERVER = "https://thingproxy.freeboard.io/fetch";

  // TODO: think about adding some pets background to make app look not to empty

  const getPets = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await axios.get(`${PROXY_SERVER}/https://api.petfinder.com/v2/animals`);
      setPets(response.data.animals);
    } catch (err) {
      // TODO: Set error
      setError(true);
      console.log(err.code);
    }
    setLoading(false);
  };

  const getToken = async () => {
    setError(false);
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
      // Set new token in localstorage if there is no one
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
            {error ? (
              <ErrorScreen />
            ) : (
              <>
                {pets.length > 0 && (
                  <TinderCard animal={pets[0]} key={pets[0].id} />
                )}
              </>
            )}
          </>
        )}
        <div className="container__main__buttons">
          <Tooltip text="Reload" placement={Placement.top}>
            <RoundedButton color={Colors.yellow} iconFontSize="2.8rem" padding="1rem">
              <FontAwesomeIcon icon={faRedo} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Reject" placement={Placement.top}>
            <RoundedButton color={Colors.red} iconFontSize="2.8rem" padding="1rem">
              <FontAwesomeIcon icon={faTimesCircle} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Like" placement={Placement.top}>
            <RoundedButton color={Colors.green} iconFontSize="2.8rem" padding="1rem">
              <FontAwesomeIcon icon={faHeart} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Filter" placement={Placement.top}>
            <RoundedButton color={Colors.purple} iconFontSize="2.8rem" padding="1rem">
              <FontAwesomeIcon icon={faSortAmountUp} />
            </RoundedButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default App;
