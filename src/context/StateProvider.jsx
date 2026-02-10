import { createContext, useEffect, useState } from "react";
import { Settings } from "../api";
export const StateContext = createContext(null);
import { getSetApis } from "../api/config";
import notice from "../../notice.json";
const StateProvider = ({ children }) => {
  const baseUrl = notice?.result?.settings?.baseUrl;
  /* Global state this states we are using in full project */

  const [logo, setLogo] = useState("");
  const [navTabs, setNavTabs] = useState("live");
  const [token, setToken] = useState("");
  const [getToken, setGetToken] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [sportsType, setSportsType] = useState(0);
  const [placeBetValues, setPlaceBetValues] = useState({});
  const [openBetSlip, setOpenBetSlip] = useState(false);
  const [addBank, setAddBank] = useState(false);
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [wallet, setWallet] = useState("main");
  const [showWarning, setShowWarning] = useState(false);
  const [predictOdds, setPredictOdds] = useState([]);
  const [closePopupForForever, setClosePopUpForForever] = useState(false);

  useEffect(() => {
    if (!noticeLoaded) {
      const fetchAPI = () => {
        getSetApis(setNoticeLoaded, baseUrl);
      };
      fetchAPI();
    }
  }, [noticeLoaded, baseUrl]);

  /* Get token from locale storage */
  useEffect(() => {
    if (noticeLoaded) {
      const wallet = localStorage.getItem("wallet");
      const getToken = localStorage.getItem("token");
      const getBonusToken = localStorage.getItem("bonusToken");
      if (wallet && getBonusToken) {
        setToken(getBonusToken);
        setWallet("bonus");
      } else {
        setToken(getToken);
        setWallet("main");
      }

      if (token && (getToken === token || getBonusToken === token)) {
        /* handle loading for save crash website` */
        setTokenLoading(false);
      }
    }
  }, [token, getToken, noticeLoaded]);

  useEffect(() => {
    if (noticeLoaded) {
      /* Site title */
      if (Settings.appOnly && !closePopupForForever) {
        document.title = window.location.hostname;
      } else {
        document.title = Settings.siteTitle;
      }
    }
  }, [noticeLoaded, closePopupForForever]);

  if (!noticeLoaded) {
    return;
  }

  const stateInfo = {
    token,
    setToken,
    tokenLoading,
    setTokenLoading,
    logo,
    setLogo,
    navTabs,
    setNavTabs,
    sportsType,
    setSportsType,
    getToken,
    setGetToken,
    placeBetValues,
    setPlaceBetValues,
    openBetSlip,
    setOpenBetSlip,
    addBank,
    setAddBank,
    wallet,
    setWallet,
    showWarning,
    setShowWarning,
    predictOdds,
    setPredictOdds,
    closePopupForForever,
    setClosePopUpForForever,
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
