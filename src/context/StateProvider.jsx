import { createContext, useEffect, useState } from "react";
import { API, Settings } from "../api";
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

  useEffect(() => {
    getSetApis(setNoticeLoaded, baseUrl);
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
      /* Get site logo */
      const logo = `${API.assets}/${Settings.siteUrl}/logo.${Settings.logoFormat}`;
      setLogo(logo);
      /* Theme css */
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      if (Settings.build === "production") {
        link.href = `${API.assets}/${Settings.siteUrl}/theme.css`;
        document.head.appendChild(link);
      } else {
        link.href = `/src/assets/css/theme.css
        `;
        document.head.appendChild(link);
      }

      /* Dynamically append  favicon  */
      const FavIconLink = document.createElement("link");
      FavIconLink.rel = "icon";
      FavIconLink.type = "image/png";
      FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
      document.head.appendChild(FavIconLink);
      /* Site title */
      document.title = Settings.siteTitle;
    }
  }, [noticeLoaded]);

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
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
