import { Link, useLocation, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import useBalance from "../../../hooks/useBalance";
import AppPopup from "./AppPopup";
import { useEffect, useState } from "react";
import { Settings } from "../../../api/index.js";
// import { AndroidView } from "react-device-detect";
import AEDRules from "../../modal/AEDRules";
import useBonusBalance from "../../../hooks/useBonusBalance";
import { images } from "../../../assets";
import useLanguage from "../../../hooks/useLanguage.jsx";
import Language from "../../modal/Language.jsx";
import { languageValue } from "../../../utils/language.js";
import { LanguageKey } from "../../../constant/constant.js";
import Notification from "./Notification.jsx";

const Header = () => {
  const { language, valueByLanguage } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const { setSportsType, token, logo, sportsType, wallet } = useContextState();
  const storedWallet = localStorage.getItem("wallet");
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [filteredNotification, setFilteredNotification] = useState([]);
  const { balanceData } = useBalance();
  const { bonusBalanceData } = useBonusBalance();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [casinoInfo, setCasinoInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      localStorage.setItem("closePopupForForever", true);
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if (!expiryTime || currentTime > expiryTime) {
          localStorage.removeItem("installPromptExpiryTime");

          setIsModalOpen(true);
        }
      }
    }
  }, [location?.state?.pathname, location.pathname, isModalOpen, windowWidth]);

  /* handle navigate aviator */
  const navigateAviatorCasinoVideo = () => {
    if (token) {
      if (Settings.casinoCurrency !== "AED") {
        navigate(`/casino/aviator/201206`);
      } else {
        setShowModal(true);
        setCasinoInfo({
          provider_name: "aviator",
          game_id: "201206",
          base: "casino",
        });
      }
    } else {
      navigate("/login");
    }
  };

  const defineHeight = () => {
    if (
      location.pathname.includes("/casino") ||
      location.pathname.includes("/funbar")
    ) {
      if (showNotification && filteredNotification?.length > 0) {
        return "5rem";
      } else {
        return "3rem";
      }
    }
    if (showNotification && filteredNotification?.length > 0) {
      return "130px";
    } else {
      return "110px";
    }
  };

  return (
    <>
      {Settings?.apkLink && isModalOpen && windowWidth < 550 && (
        <AppPopup setIsModalOpen={setIsModalOpen} />
      )}
      {showModal && (
        <AEDRules setShowModal={setShowModal} casinoInfo={casinoInfo} />
      )}

      <div
        style={{
          height: defineHeight(),
        }}
        className={`mia0b51 mobile-header ${
          !location.pathname.includes("/casino") ? "show" : ""
        }`}
      >
        <Notification
          filteredNotification={filteredNotification}
          setFilteredNotification={setFilteredNotification}
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />

        <div className="nologin-header-wrap headerBG">
          <Link onClick={() => setSportsType(0)} to="/">
            <img
              alt="logo"
              style={{
                height: `${Settings.logoHeight}px`,
                width: `${Settings.logoWidth}px`,
                objectFit: "contain",
              }}
              className="header-logo"
              src={logo}
            />
          </Link>

          <div className="mobile-nologin-header-wrap">
            <div className="mobile-nologin-enter">
              {token ? (
                <>
                  <div
                    className="headerText"
                    style={{
                      marginRight: "20px",
                      fontSize: "11px",
                      textAlign: "right",
                      fontWeight: "500",
                    }}
                  >
                    {!storedWallet && wallet === "main" ? "Bal:" : "Bonus:"}{" "}
                    {!storedWallet && wallet === "main"
                      ? balanceData?.availBalance
                      : bonusBalanceData?.availBalance}
                    <br />
                    Exp:{" "}
                    {!storedWallet && wallet === "main"
                      ? balanceData?.deductedExposure
                      : bonusBalanceData?.deductedExposure}
                  </div>

                  <button
                    onClick={() => {
                      navigate("/deposit");
                    }}
                    className="ui-button button-normal s-conic"
                  >
                    <div className="button-inner">
                      {languageValue(valueByLanguage, LanguageKey.DEPOSIT)}
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="ui-button button-normal signin"
                  >
                    <div className="button-inner">
                      {" "}
                      {languageValue(valueByLanguage, LanguageKey.LOGIN)}
                    </div>
                  </button>
                  {Settings.register && (
                    <button
                      onClick={() => navigate("/register")}
                      className="ui-button button-normal s-conic"
                    >
                      <div className="button-inner">
                        {" "}
                        {languageValue(valueByLanguage, LanguageKey.REGISTER)}
                      </div>
                    </button>
                  )}
                </>
              )}
              <div style={{ position: "relative" }}>
                {Settings.language && (
                  <button
                    onClick={() => setShowLanguage((prev) => !prev)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "end",
                      background: "transparent",
                      border: "none",
                      marginTop: "14px",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                        src="/src/assets/img/globe.gif"
                        alt=""
                      />
                      <p
                        style={{
                          margin: "0px",
                          fontSize: "10px",
                          color: "white",
                          textTransform: "capitalize",
                        }}
                      >
                        {language || "EN"}
                      </p>
                    </div>
                  </button>
                )}
                {showLanguage && <Language setShowLanguage={setShowLanguage} />}
              </div>
            </div>
            {/* <div className="l1eoxxw5">
            <div className="lan-header-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#666666"
                className="bi bi-translate"
                viewBox="0 0 16 16"
              >
                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
              </svg>
            </div>
          </div> */}
          </div>
        </div>

        {!location.pathname.includes("/casino") &&
          !location.pathname.includes("/funbar") && (
            <div className="mszcttz">
              <div className="mobile-top-navigate-list">
                <button
                  onClick={() => {
                    setSportsType(0);
                    navigate("/");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/" && sportsType === 0 ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3106_7338)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.4729 0.532773L16.4187 5.48475C16.944 5.92189 17.2474 6.5699 17.2474 7.25326V15.6986C17.2474 16.9695 16.2169 18 14.9459 18H11.9999V13.09C11.9999 12.5377 11.5522 12.09 10.9999 12.09H6.99988C6.44759 12.09 5.99988 12.5377 5.99988 13.09V18H3.05426C1.78332 18 0.752808 16.9695 0.752808 15.6986V7.25326C0.752808 6.5699 1.05624 5.92189 1.58146 5.48475L7.5273 0.532773C8.38038 -0.177591 9.61982 -0.177591 10.4729 0.532773Z"
                        fill="black"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_3106_7338">
                        <rect width="18" height="18" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.HOME)}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSportsType(4);
                    navigate("/");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/" && sportsType == 4 ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="19"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    //   style="enable-background: new 0 0 24 24"
                  >
                    <path
                      fill="#E8B71A"
                      d="M20.2,23c-0.2,0-0.3-0.1-0.4-0.2c-0.1-0.1-0.2-0.2-0.2-0.4s0.1-0.3,0.2-0.4l0.7-0.7l-0.7-0.7l-4.5-4.5
                                         c-0.4-0.4-0.9-0.5-1.5-0.5c-0.7,0-1.4,0.2-2.1,0.3c-0.4,0.1-0.9,0.2-1.1,0.2c-0.1,0-0.2,0-0.3,0L1.1,6.9l5.8-5.8l9.2,9.2
                                         c0,0.1-0.1,0.3-0.1,0.5c-0.4,1.6-0.9,3.5,0.2,4.6l5.2,5.2l0.7-0.7c0.1-0.1,0.3-0.2,0.4-0.2s0.3,0.1,0.4,0.2
                                         c0.1,0.1,0.2,0.2,0.2,0.4s-0.1,0.3-0.2,0.4l-2.2,2.2C20.5,22.9,20.4,23,20.2,23z"
                    />
                    <path
                      d="M6.9,2.5l8.1,8.1c-0.3,1.2-0.7,2.8-0.3,4.1c-0.3-0.1-0.5-0.1-0.8-0.1c-0.8,0-1.6,0.2-2.3,0.4c-0.2,0.1-0.6,0.1-0.8,0.2
                                         L2.5,6.9L6.9,2.5 M6.9,0C6.7,0,6.5,0.1,6.3,0.2L0.2,6.3c-0.3,0.3-0.3,0.8,0,1.1l9.7,9.7c0.2,0,0.4,0,0.6,0
                                         c0.7,0,2.2-0.6,3.2-0.6c0.3,0,0.6,0.1,0.8,0.2l4.5,4.5l0,0c-0.6,0.6-0.6,1.6,0,2.2c0.3,0.3,0.7,0.5,1.1,0.5s0.8-0.2,1.1-0.5
                                         l2.2-2.2c0.6-0.6,0.6-1.6,0-2.2c-0.3-0.3-0.7-0.5-1.1-0.5c-0.4,0-0.8,0.2-1.1,0.5l0,0l-4.5-4.5c-0.9-0.9,0.1-3.4,0.4-4.6
                                         L7.4,0.2C7.3,0.1,7.1,0,6.9,0L6.9,0z"
                    />
                    <circle fill="#E5421C" cx="6.5" cy="17.5" r="5.5" />
                    <path
                      d="M6.5,13C9,13,11,15,11,17.5S9,22,6.5,22S2,20,2,17.5S4,13,6.5,13 M6.5,11C2.9,11,0,13.9,0,17.5S2.9,24,6.5,24
                                 s6.5-2.9,6.5-6.5S10.1,11,6.5,11L6.5,11z"
                    />
                    <path
                      fill="#E5421C"
                      d="M11.7,15.5c-1.2,1.6-3.1,2.6-5.2,2.6c-2.2,0-4.2-1.1-5.3-2.8"
                    />
                    <path d="M6.5,19.1c-2.5,0-4.8-1.2-6.2-3.2L2,14.7c1,1.5,2.7,2.4,4.5,2.4c1.7,0,3.3-0.8,4.4-2.2l1.6,1.2C11.1,18,8.9,19.1,6.5,19.1z" />
                  </svg>
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.CRICKET)}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSportsType(1);
                    navigate("/");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/" && sportsType == 1 ? "active" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#FFF"
                      d="M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#2A2D30"
                      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm7.1 15.6l1.2 2c-1 1.5-2.5 2.7-4.2 3.5l-.8-1.4h-4.9l-1.1 1.9c-2.4-.7-4.4-2.3-5.7-4.3L5 14.8l-2.5-4.3h-.4c.3-1.7.9-3.2 2-4.6h2.4l1.9-3.2C9.5 2.3 10.7 2 12 2c.9 0 1.7.1 2.5.3l2.1 3.6H20c1.2 1.5 1.9 3.4 2 5.4h-.4l-2.5 4.3zm-9.6-8L7 11.9l2.5 4.3h4.9l2.5-4.3-2.5-4.3H9.5z"
                    />
                  </svg>
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.FOOTBALL)}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSportsType(2);
                    navigate("/");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/" && sportsType == 2 ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#BDE24B"
                      d="M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#2A2D30"
                      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM2 12c0-2.8 1.1-5.3 3-7.1C6.8 6.7 8 9.2 8 12s-1.2 5.3-3 7.1c-1.9-1.8-3-4.3-3-7.1zm4.6 8.4C8.7 18.2 10 15.3 10 12c0-3.3-1.3-6.2-3.4-8.4C8.1 2.6 10 2 12 2s3.9.6 5.4 1.6C15.3 5.8 14 8.7 14 12c0 3.3 1.3 6.2 3.4 8.4-1.5 1-3.4 1.6-5.4 1.6s-3.9-.6-5.4-1.6zM19 19.1c-1.9-1.8-3-4.3-3-7.1s1.2-5.3 3-7.1c1.8 1.8 3 4.3 3 7.1s-1.1 5.3-3 7.1z"
                    />
                  </svg>
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.TENNIS)}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setSportsType(5);
                    navigate("/");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/" && sportsType == 5 ? "active" : ""
                  }`}
                >
                  <img
                    style={{
                      height: "18px",
                      width: "18px",
                    }}
                    src={images.kabaddi}
                    alt=""
                  />
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.KABADDI)}
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigate("/horse-racing");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/horse-racing" ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5784 10.3261L17.0501 9.55133C17.0501 9.55133 15.6414 5.16856 14.3867 3.89579C14.3867 3.89579 13.9464 1.70441 14.3867 0.68619C14.3867 0.68619 13.6162 1.12889 13.3741 1.56053C13.3741 1.56053 13.4732 0.243487 13.7153 0C13.7153 0 11.5141 0.608717 11.1949 2.29099C11.1949 2.29099 6.68247 2.54554 4.23914 4.54878C2.58824 5.89902 1.46563 7.16073 0.629169 9.47385C-0.0642086 11.3885 -0.691551 14.2993 1.74078 17.3761C4.98755 21.4711 11.338 21.9913 11.338 21.9913C11.338 21.9913 12.4826 18.7042 10.9198 16.6788C9.76415 15.1737 8.28935 11.3553 10.5896 9.72841C9.87421 8.53311 9.83019 7.205 10.1053 5.36778C9.91823 7.92439 11.1949 9.81695 11.1949 9.81695C11.7012 10.4589 12.9889 11.8977 14.5958 12.0858C14.5958 12.0858 14.8379 14.576 17.3583 13.2036C18.0076 12.8384 18.2608 11.3111 17.5784 10.3261Z"
                      fill="#864D44"
                    ></path>
                  </svg>
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.HORSE)}
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigate("/greyhound-racing");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/greyhound-racing" ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.44232 8.90395C5.88416 8.90395 5.70714 16.1059 6.2631 20C6.2631 20 4.03942 19.4435 2.37117 18.3309C0.702907 17.2183 0.147685 15.5494 0.147685 15.5494C-0.741855 11.0991 2.77077 6.49335 4.43866 4.45361L6.31223 6.32907C5.08824 4.93769 3.77795 1.77694 4.99462 0.559553C6.32893 -0.775551 8.88636 0.559553 9.04291 1.64232C10.5542 1.11585 12.5557 1.89466 13.89 2.78473C15.5579 3.89731 16.6698 3.89731 20.0056 5.0099C17.2258 8.90395 13.89 8.90395 9.44232 8.90395Z"
                      fill="#305765"
                    ></path>
                  </svg>
                  <span>
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.GREYHOUND)}
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigate(token ? "/funbar" : "/login");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/funbar" ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.50463 0.261719C9.89282 0.261719 10.2072 0.567117 10.2072 0.944516C10.2072 1.25351 9.99601 1.51391 9.70682 1.59851C10.2918 2.87471 11.0982 4.0363 12.1236 5.0827C12.2331 5.19451 12.3474 5.31006 12.4652 5.42914C14.3629 7.34768 17.1667 10.1823 15.7301 13.0861C14.8673 14.8303 13.1045 15.4818 11.0676 14.8423C10.6548 14.7127 10.083 14.3689 9.35163 13.8097H8.64905C7.91767 14.3683 7.34528 14.7127 6.93249 14.8423C4.89554 15.4812 3.13278 14.8303 2.27 13.0861C0.833147 10.1812 3.63767 7.3466 5.5358 5.4281C5.65325 5.30939 5.76723 5.19419 5.87652 5.0827C6.90009 4.0387 7.70467 2.87951 8.29086 1.60571C7.98546 1.53071 7.76107 1.26311 7.76107 0.944516C7.76107 0.567717 8.07546 0.261719 8.46365 0.261719C8.52785 0.261719 8.58965 0.270119 8.64905 0.285719L8.64845 4.0177L8.64905 4.0171V8.25668C8.23926 8.39708 7.94586 8.77688 7.94586 9.22268C7.94586 9.78848 8.41745 10.2469 9.00004 10.2469C9.58262 10.2469 10.0536 9.78848 10.0536 9.22268C10.0536 8.77688 9.76022 8.39708 9.35043 8.25668L9.34983 4.0171L9.35103 4.0177L9.34983 0.278519C9.39963 0.267719 9.45123 0.261719 9.50403 0.261719H9.50463ZM8.96735 18.2619H5.20371C5.12091 18.2619 5.05371 18.1947 5.05371 18.1119C5.05371 18.0639 5.07651 18.0189 5.11551 17.9907C5.6993 17.5647 6.28668 17.0169 6.87767 16.3479C7.60245 15.5271 8.19283 14.6811 8.64882 13.8105H8.93555H8.99981H9.28654C9.74253 14.6811 10.3329 15.5271 11.0577 16.3479C11.6481 17.0169 12.2355 17.5647 12.8193 17.9907C12.8583 18.0189 12.8811 18.0639 12.8811 18.1119C12.8811 18.1947 12.8145 18.2619 12.7311 18.2619H8.96795L8.96768 18.2254L8.96741 18.2619"
                      fill="#65C316"
                    ></path>
                  </svg>
                  <span> Funbar</span>
                </button>
                {Settings.mac88 && Settings.casinoCurrency === "INR" && (
                  <button
                    onClick={() => {
                      navigate("/mac88");
                    }}
                    className={`mb-top-navigate-item ${
                      location.pathname == "/mac88" ? "active" : ""
                    }`}
                  >
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.50463 0.261719C9.89282 0.261719 10.2072 0.567117 10.2072 0.944516C10.2072 1.25351 9.99601 1.51391 9.70682 1.59851C10.2918 2.87471 11.0982 4.0363 12.1236 5.0827C12.2331 5.19451 12.3474 5.31006 12.4652 5.42914C14.3629 7.34768 17.1667 10.1823 15.7301 13.0861C14.8673 14.8303 13.1045 15.4818 11.0676 14.8423C10.6548 14.7127 10.083 14.3689 9.35163 13.8097H8.64905C7.91767 14.3683 7.34528 14.7127 6.93249 14.8423C4.89554 15.4812 3.13278 14.8303 2.27 13.0861C0.833147 10.1812 3.63767 7.3466 5.5358 5.4281C5.65325 5.30939 5.76723 5.19419 5.87652 5.0827C6.90009 4.0387 7.70467 2.87951 8.29086 1.60571C7.98546 1.53071 7.76107 1.26311 7.76107 0.944516C7.76107 0.567717 8.07546 0.261719 8.46365 0.261719C8.52785 0.261719 8.58965 0.270119 8.64905 0.285719L8.64845 4.0177L8.64905 4.0171V8.25668C8.23926 8.39708 7.94586 8.77688 7.94586 9.22268C7.94586 9.78848 8.41745 10.2469 9.00004 10.2469C9.58262 10.2469 10.0536 9.78848 10.0536 9.22268C10.0536 8.77688 9.76022 8.39708 9.35043 8.25668L9.34983 4.0171L9.35103 4.0177L9.34983 0.278519C9.39963 0.267719 9.45123 0.261719 9.50403 0.261719H9.50463ZM8.96735 18.2619H5.20371C5.12091 18.2619 5.05371 18.1947 5.05371 18.1119C5.05371 18.0639 5.07651 18.0189 5.11551 17.9907C5.6993 17.5647 6.28668 17.0169 6.87767 16.3479C7.60245 15.5271 8.19283 14.6811 8.64882 13.8105H8.93555H8.99981H9.28654C9.74253 14.6811 10.3329 15.5271 11.0577 16.3479C11.6481 17.0169 12.2355 17.5647 12.8193 17.9907C12.8583 18.0189 12.8811 18.0639 12.8811 18.1119C12.8811 18.1947 12.8145 18.2619 12.7311 18.2619H8.96795L8.96768 18.2254L8.96741 18.2619"
                        fill="#65C316"
                      ></path>
                    </svg>
                    <span>
                      {" "}
                      {languageValue(valueByLanguage, LanguageKey.MAC88)}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    navigate("/royal-casino");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/royal-casino" ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.50463 0.261719C9.89282 0.261719 10.2072 0.567117 10.2072 0.944516C10.2072 1.25351 9.99601 1.51391 9.70682 1.59851C10.2918 2.87471 11.0982 4.0363 12.1236 5.0827C12.2331 5.19451 12.3474 5.31006 12.4652 5.42914C14.3629 7.34768 17.1667 10.1823 15.7301 13.0861C14.8673 14.8303 13.1045 15.4818 11.0676 14.8423C10.6548 14.7127 10.083 14.3689 9.35163 13.8097H8.64905C7.91767 14.3683 7.34528 14.7127 6.93249 14.8423C4.89554 15.4812 3.13278 14.8303 2.27 13.0861C0.833147 10.1812 3.63767 7.3466 5.5358 5.4281C5.65325 5.30939 5.76723 5.19419 5.87652 5.0827C6.90009 4.0387 7.70467 2.87951 8.29086 1.60571C7.98546 1.53071 7.76107 1.26311 7.76107 0.944516C7.76107 0.567717 8.07546 0.261719 8.46365 0.261719C8.52785 0.261719 8.58965 0.270119 8.64905 0.285719L8.64845 4.0177L8.64905 4.0171V8.25668C8.23926 8.39708 7.94586 8.77688 7.94586 9.22268C7.94586 9.78848 8.41745 10.2469 9.00004 10.2469C9.58262 10.2469 10.0536 9.78848 10.0536 9.22268C10.0536 8.77688 9.76022 8.39708 9.35043 8.25668L9.34983 4.0171L9.35103 4.0177L9.34983 0.278519C9.39963 0.267719 9.45123 0.261719 9.50403 0.261719H9.50463ZM8.96735 18.2619H5.20371C5.12091 18.2619 5.05371 18.1947 5.05371 18.1119C5.05371 18.0639 5.07651 18.0189 5.11551 17.9907C5.6993 17.5647 6.28668 17.0169 6.87767 16.3479C7.60245 15.5271 8.19283 14.6811 8.64882 13.8105H8.93555H8.99981H9.28654C9.74253 14.6811 10.3329 15.5271 11.0577 16.3479C11.6481 17.0169 12.2355 17.5647 12.8193 17.9907C12.8583 18.0189 12.8811 18.0639 12.8811 18.1119C12.8811 18.1947 12.8145 18.2619 12.7311 18.2619H8.96795L8.96768 18.2254L8.96741 18.2619"
                      fill="#65C316"
                    ></path>
                  </svg>
                  <span>Royal Casino</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/int-casino");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/int-casino" ? "active" : ""
                  }`}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7856 7.9553C21.1852 9.26748 19.4841 13.305 19.4841 13.305V8.66186C19.4841 8.66186 19.9844 7.55155 20.0845 7.24874C20.2846 6.64311 20.0845 5.93655 19.4841 5.63374V3.615C19.4841 3.615 19.9844 3.81687 20.1845 3.91781C21.6855 4.62437 22.386 6.44124 21.7856 7.9553ZM14.5809 3.81687C14.5809 3.81687 14.8811 3.81687 14.9812 3.81687C15.6816 3.81687 16.1819 4.32156 16.1819 5.02812C16.1819 5.73468 16.1819 7.75342 16.1819 7.75342L17.9831 11.9928C17.9831 11.9928 17.9831 6.74405 17.9831 5.02812C17.9831 3.31218 16.6823 2 14.9812 2C14.681 2 13.7804 2 13.7804 2L14.5809 3.81687ZM10.078 4.52343C8.67706 5.12906 5.87524 6.3403 4.47433 6.84499C3.87394 7.1478 3.57374 7.85436 3.87394 8.45998C5.07472 11.2862 7.37621 16.8378 8.57699 19.5631C8.87719 20.1687 9.57764 20.4715 10.178 20.1687C11.5789 19.5631 14.2807 18.3518 15.6816 17.8472C16.282 17.5443 16.5822 16.8378 16.282 16.2322C15.0812 13.4059 12.7797 7.85436 11.5789 5.12906C11.3788 4.52343 10.6784 4.22062 10.078 4.52343ZM13.28 4.42249C14.4808 7.24874 16.7823 12.8003 17.9831 15.5256C18.5835 17.0397 17.883 18.8565 16.3821 19.4621C14.9812 20.0678 12.2794 21.279 10.8785 21.7837C9.37751 22.3893 7.57634 21.6828 6.97595 20.1687C5.77517 17.3425 3.47368 11.7909 2.2729 9.06561C1.57244 7.65249 2.2729 5.83562 3.77387 5.22999C5.17478 4.62437 7.9766 3.41312 9.37751 2.8075C10.8785 2.20187 12.5796 2.90844 13.28 4.42249ZM12.3795 11.3872L8.67706 9.06561L7.77647 13.4059L11.3788 15.6265L12.3795 11.3872Z"
                      fill="orange"
                    ></path>
                  </svg>
                  <span>Int Casino</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/indian-casino");
                  }}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/indian-casino" ? "active" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.50463 0.261719C9.89282 0.261719 10.2072 0.567117 10.2072 0.944516C10.2072 1.25351 9.99601 1.51391 9.70682 1.59851C10.2918 2.87471 11.0982 4.0363 12.1236 5.0827C12.2331 5.19451 12.3474 5.31006 12.4652 5.42914C14.3629 7.34768 17.1667 10.1823 15.7301 13.0861C14.8673 14.8303 13.1045 15.4818 11.0676 14.8423C10.6548 14.7127 10.083 14.3689 9.35163 13.8097H8.64905C7.91767 14.3683 7.34528 14.7127 6.93249 14.8423C4.89554 15.4812 3.13278 14.8303 2.27 13.0861C0.833147 10.1812 3.63767 7.3466 5.5358 5.4281C5.65325 5.30939 5.76723 5.19419 5.87652 5.0827C6.90009 4.0387 7.70467 2.87951 8.29086 1.60571C7.98546 1.53071 7.76107 1.26311 7.76107 0.944516C7.76107 0.567717 8.07546 0.261719 8.46365 0.261719C8.52785 0.261719 8.58965 0.270119 8.64905 0.285719L8.64845 4.0177L8.64905 4.0171V8.25668C8.23926 8.39708 7.94586 8.77688 7.94586 9.22268C7.94586 9.78848 8.41745 10.2469 9.00004 10.2469C9.58262 10.2469 10.0536 9.78848 10.0536 9.22268C10.0536 8.77688 9.76022 8.39708 9.35043 8.25668L9.34983 4.0171L9.35103 4.0177L9.34983 0.278519C9.39963 0.267719 9.45123 0.261719 9.50403 0.261719H9.50463ZM8.96735 18.2619H5.20371C5.12091 18.2619 5.05371 18.1947 5.05371 18.1119C5.05371 18.0639 5.07651 18.0189 5.11551 17.9907C5.6993 17.5647 6.28668 17.0169 6.87767 16.3479C7.60245 15.5271 8.19283 14.6811 8.64882 13.8105H8.93555H8.99981H9.28654C9.74253 14.6811 10.3329 15.5271 11.0577 16.3479C11.6481 17.0169 12.2355 17.5647 12.8193 17.9907C12.8583 18.0189 12.8811 18.0639 12.8811 18.1119C12.8811 18.1947 12.8145 18.2619 12.7311 18.2619H8.96795L8.96768 18.2254L8.96741 18.2619"
                      fill="#65C316"
                    ></path>
                  </svg>
                  <span>Indian Casino</span>
                </button>

                <button
                  onClick={navigateAviatorCasinoVideo}
                  className="mb-top-navigate-item"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.1 14.3C7.1 13.3 8.7 13.3 9.7 14.3C10.7 15.3 10.7 16.9 9.7 17.9C8.3 19.3 5.4 18.6 5.4 18.6C5.4 18.6 4.6 15.8 6.1 14.3ZM15.4 23L17.2 21.2C18.3 20.1 19 18.5 19 16.9V11.6L13 17.6L15.4 23ZM6.4 10.9L1 8.6L2.8 6.8C4 5.6 5.5 5 7.2 5H12.5L6.4 10.9ZM23 2.3L22.4 4.8C22.1 5.9 21.6 6.9 20.8 7.6L19 9.3L12.4 15.9L12.1 15.1C11.5 13.7 10.3 12.5 8.9 11.9L8.1 11.6L14.7 5L16.4 3.3C17.2 2.5 18.2 2 19.2 1.7L21.7 1H22C22.6 1 23 1.4 23 2C23 2.1 23 2.2 23 2.3Z"
                      fill="#e50539"
                    ></path>
                  </svg>
                  <span>Aviator</span>
                </button>
                <button
                  onClick={() => navigate("/slots")}
                  className={`mb-top-navigate-item ${
                    location.pathname == "/slots" ? "active" : ""
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 315 327"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#f7f7f7ff"></g>
                    <g id="#a95944ff">
                      <path
                        fill="#a95944"
                        opacity="1.00"
                        d=" M 218.96 44.10 C 230.81 42.29 242.81 43.22 254.74 43.01 C 247.90 50.10 240.36 56.56 234.31 64.37 C 221.64 80.36 214.58 100.53 214.09 120.90 C 213.89 135.23 214.05 149.57 214.00 163.91 C 211.43 163.70 208.86 163.57 206.29 163.51 C 203.86 163.50 201.44 163.61 199.03 163.87 C 199.05 150.57 199.03 137.28 199.04 123.98 C 198.84 101.11 205.75 78.12 219.01 59.43 C 192.42 63.61 167.56 77.68 150.39 98.42 C 134.99 116.71 125.68 139.99 124.19 163.86 C 121.71 163.60 119.21 163.49 116.72 163.46 C 114.22 163.48 111.72 163.62 109.24 163.87 C 110.22 145.43 115.32 127.22 124.00 110.92 C 129.90 99.79 137.49 89.57 146.34 80.62 C 165.74 60.99 191.68 48.07 218.96 44.10 Z"
                      ></path>
                    </g>
                    <g id="#90e36aff">
                      <path
                        fill="#90e36a"
                        opacity="1.00"
                        d=" M 50.40 73.32 C 63.52 63.67 79.61 57.43 96.07 58.05 C 114.97 58.64 132.80 67.77 146.34 80.62 C 137.49 89.57 129.90 99.79 124.00 110.92 C 112.83 116.23 100.29 118.95 87.91 117.70 C 74.33 116.42 61.44 110.73 50.48 102.74 C 44.44 98.48 39.37 93.06 34.02 87.99 C 39.36 82.97 44.38 77.56 50.40 73.32 Z"
                      ></path>
                    </g>
                    <g id="#ff4949ff">
                      <path
                        fill="#ff4949"
                        opacity="1.00"
                        d=" M 58.82 196.00 C 69.49 178.27 88.65 166.01 109.24 163.87 C 111.72 163.62 114.22 163.48 116.72 163.46 C 116.47 208.65 116.56 253.85 116.69 299.04 C 102.51 299.00 88.39 294.42 76.98 285.98 C 63.30 276.00 53.52 260.78 50.30 244.13 C 47.00 227.77 50.07 210.22 58.82 196.00 M 71.71 223.16 C 76.47 223.55 81.29 223.62 86.05 223.09 C 86.97 218.73 87.89 214.18 90.63 210.54 C 94.72 204.55 101.85 201.26 108.97 200.84 C 109.04 195.89 109.04 190.93 108.94 185.98 C 89.16 185.46 70.95 203.30 71.71 223.16 Z"
                      ></path>
                      <path
                        fill="#ff4949"
                        opacity="1.00"
                        d=" M 206.29 163.51 C 208.86 163.57 211.43 163.70 214.00 163.91 C 230.65 165.57 246.41 174.01 257.37 186.61 C 268.04 198.75 274.18 214.85 274.02 231.04 C 274.16 247.20 268.04 263.25 257.50 275.46 C 244.90 290.24 225.69 299.34 206.20 299.01 C 206.34 295.66 206.44 292.32 206.42 288.98 C 206.30 247.16 206.56 205.33 206.29 163.51 Z"
                      ></path>
                      <path
                        fill="#ff4949"
                        opacity="1.00"
                        d=" M 161.81 223.24 C 160.71 203.36 179.20 185.47 198.92 186.00 C 199.06 190.95 199.04 195.90 198.91 200.85 C 192.25 201.21 185.66 204.15 181.44 209.42 C 178.19 213.28 177.00 218.33 176.01 223.16 C 171.29 223.56 166.54 223.50 161.81 223.24 Z"
                      ></path>
                    </g>
                    <g id="#ff193dff">
                      <path
                        fill="#ff193d"
                        opacity="1.00"
                        d=" M 116.72 163.46 C 119.21 163.49 121.71 163.60 124.19 163.86 C 138.00 165.40 151.19 171.43 161.55 180.66 C 147.68 193.09 139.12 211.36 139.03 230.04 C 138.60 249.42 147.19 268.62 161.53 281.59 C 149.40 292.64 133.14 299.12 116.69 299.04 C 116.56 253.85 116.47 208.65 116.72 163.46 Z"
                      ></path>
                      <path
                        fill="#ff193d"
                        opacity="1.00"
                        d=" M 71.71 223.16 C 70.95 203.30 89.16 185.46 108.94 185.98 C 109.04 190.93 109.04 195.89 108.97 200.84 C 101.85 201.26 94.72 204.55 90.63 210.54 C 87.89 214.18 86.97 218.73 86.05 223.09 C 81.29 223.62 76.47 223.55 71.71 223.16 Z"
                      ></path>
                    </g>
                    <g id="#ff6c6cff">
                      <path
                        fill="#ff6c6c"
                        opacity="1.00"
                        d=" M 161.55 180.66 C 171.96 171.41 185.20 165.46 199.03 163.87 C 201.44 163.61 203.86 163.50 206.29 163.51 C 206.56 205.33 206.30 247.16 206.42 288.98 C 206.44 292.32 206.34 295.66 206.20 299.01 C 189.82 298.98 173.67 292.54 161.53 281.59 C 147.19 268.62 138.60 249.42 139.03 230.04 C 139.12 211.36 147.68 193.09 161.55 180.66 M 161.81 223.24 C 166.54 223.50 171.29 223.56 176.01 223.16 C 177.00 218.33 178.19 213.28 181.44 209.42 C 185.66 204.15 192.25 201.21 198.91 200.85 C 199.04 195.90 199.06 190.95 198.92 186.00 C 179.20 185.47 160.71 203.36 161.81 223.24 Z"
                      ></path>
                    </g>
                  </svg>
                  <span>Slots</span>
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Header;
