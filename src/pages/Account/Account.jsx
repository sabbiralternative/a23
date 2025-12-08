import { useNavigate } from "react-router-dom";
import { handleLogOut } from "../../utils/handleLogOut";
import useContextState from "../../hooks/useContextState";
import useBalance from "../../hooks/useBalance";
import depositProfileIcon from "../../../src/assets/img/depositProfileIcon.svg";
import withdrawIcon from "../../../src/assets/img/withdrawIcon.svg";
import profileCardWallet from "../../../src/assets/img/profile-card-wallet.webp";
import profileWallet from "../../../src/assets/img/profile-wallet.svg";
import profileLiveBets from "../../../src/assets/img/profile-live-bets.svg";
// import profileCurrency from "../../../src/assets/img/profile-currency.svg";
import profileBettingProfitLoss from "../../../src/assets/img/profile-betting-profit-loss.webp";
// import profileAccountStatement from "../../../src/assets/img/profile-account-statement.png";
import profileSettings from "../../../src/assets/img/profile-settings.svg";

// import useBonusBalance from "../../hooks/useBonusBalance";
// import handleRandomToken from "../../utils/handleRandomToken";
// import axios from "axios";

// import toast from "react-hot-toast";
import useGetSocialLink from "../../hooks/useGetSocialLink";
import { images } from "../../assets";
import { useState } from "react";
import Referral from "../../components/modal/Referral";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";

const Account = () => {
  const { valueByLanguage } = useLanguage();
  const [showReferral, setShowReferral] = useState(false);
  const { socialLink } = useGetSocialLink();
  // token, setWallet,
  const { setGetToken, wallet } = useContextState();
  const navigate = useNavigate();
  /* get login name from locale storage */
  const loginName = localStorage.getItem("loginName");
  const memberId = localStorage.getItem("memberId");

  /* get balance data */
  const { balanceData } = useBalance();
  // const { bonusBalanceData, bonusRefetchBalance } = useBonusBalance();

  // const handleToggleBalance = (e) => {
  //   const checked = e.target.checked;
  //   if (checked) {
  //     localStorage.setItem("wallet", "bonus");
  //     setWallet("bonus");
  //     setGetToken((prev) => !prev);
  //   } else {
  //     localStorage.removeItem("wallet");
  //     setWallet("main");
  //     setGetToken((prev) => !prev);
  //   }
  // };

  // const handleBonusToMainWallet = async () => {
  //   const generatedToken = handleRandomToken();
  //   const encryptedData = handleRandomToken(generatedToken);
  //   const res = await axios.post(API.bonusClaim, encryptedData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const result = res?.data;

  //   if (result?.success) {
  //     refetchBalance();
  //     bonusRefetchBalance();
  //     toast.success(result?.result?.message);
  //   } else {
  //     toast.error(result?.result?.message);
  //   }
  // };

  const navigateWhatsApp = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      {showReferral && <Referral setShowReferral={setShowReferral} />}
      <div className="p-1 body-profile-page">
        <div className="profile-menu-box">
          <div className="card-profile-page">
            <div className="card-profile-page-upper-div">
              <div className="card-profile-page-upper-div-left">
                <span
                  className="card-profile-page-upper-div-left-balance"
                  style={{ color: "#000", fontSize: "14px", fontWeight: "500" }}
                >
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.USER_ID)} :{" "}
                  {memberId}
                </span>
                {/* <span
                  className="card-profile-page-upper-div-left-main-wallet"
                  style={{
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {" "}
                  <span> User ID : {memberId}</span>{" "}
                </span> */}
              </div>

              <div
                style={{ display: "flex", alignItems: "center" }}
                className="card-profile-page-upper-div-right"
              >
                <div className="top-user-name-logoutaction">
                  <div className="user-name-icon-profile">
                    <span className="user-icon-account-profile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8.00035 0C3.58234 0 0 3.58164 0 8C0 12.4184 3.58199 16 8.00035 16C12.4191 16 16.0007 12.4184 16.0007 8C16.0007 3.58164 12.4191 0 8.00035 0ZM8.00035 2.39209C9.46224 2.39209 10.6469 3.57707 10.6469 5.03826C10.6469 6.4998 9.46224 7.68443 8.00035 7.68443C6.53916 7.68443 5.35454 6.4998 5.35454 5.03826C5.35454 3.57707 6.53916 2.39209 8.00035 2.39209ZM7.99859 13.9084C6.54057 13.9084 5.20518 13.3774 4.17518 12.4985C3.92427 12.2845 3.77949 11.9707 3.77949 11.6414C3.77949 10.1595 4.97887 8.97342 6.46115 8.97342H9.54026C11.0229 8.97342 12.2177 10.1595 12.2177 11.6414C12.2177 11.971 12.0736 12.2841 11.8224 12.4981C10.7927 13.3774 9.45697 13.9084 7.99859 13.9084Z"
                          fill="url(#paint0_linear_47_4625)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_47_4625"
                            x1="-1.92458e-07"
                            y1="1.30909"
                            x2="17.6702"
                            y2="3.70926"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#36E2FA"></stop>
                            <stop offset="1" stopColor="#EBFFBF"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <span
                      className="user-name-text skeleton-text"
                      style={{ color: "#000" }}
                    >
                      {loginName}
                    </span>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src={profileCardWallet}
                  alt=""
                  style={{ width: "3.5rem", height: "3.01rem" }}
                />
              </div>
            </div>
            <div className="card-profile-image-lower-div">
              <div className="card-profile-image-lower-div-left">
                <span className="card-profile-image-lower-div-left-text">
                  <span className="text-left-profile" style={{ color: "#000" }}>
                    {languageValue(valueByLanguage, LanguageKey.BALANCE)}
                  </span>
                  <span className="info-profile-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_47_4592)">
                        <path
                          d="M7.4375 7.41467C7.4375 7.17306 7.24162 6.97717 7 6.97717C6.75838 6.97717 6.5625 7.17306 6.5625 7.41467V10.9147C6.5625 11.1563 6.75838 11.3522 7 11.3522C7.24162 11.3522 7.4375 11.1563 7.4375 10.9147V7.41467Z"
                          fill="#D1D5DB"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99984 1.72717C3.53655 1.72717 0.729004 4.53472 0.729004 7.99801C0.729004 11.4613 3.53655 14.2688 6.99984 14.2688C10.4631 14.2688 13.2707 11.4613 13.2707 7.99801C13.2707 4.53472 10.4631 1.72717 6.99984 1.72717ZM1.604 7.99801C1.604 5.01797 4.0198 2.60217 6.99984 2.60217C9.97985 2.60217 12.3957 5.01797 12.3957 7.99801C12.3957 10.978 9.97985 13.3938 6.99984 13.3938C4.0198 13.3938 1.604 10.978 1.604 7.99801Z"
                          fill="#D1D5DB"
                        ></path>
                        <path
                          d="M7.58317 5.66463C7.58317 5.9868 7.32201 6.24797 6.99984 6.24797C6.67766 6.24797 6.4165 5.9868 6.4165 5.66463C6.4165 5.34247 6.67766 5.0813 6.99984 5.0813C7.32201 5.0813 7.58317 5.34247 7.58317 5.66463Z"
                          fill="#D1D5DB"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_47_4592">
                          <rect
                            width="14"
                            height="14"
                            fill="white"
                            transform="translate(0 0.998047)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </span>
                <span
                  className="card-profile-image-lower-div-left-amount"
                  style={{ color: "#000" }}
                >
                  ₹ {balanceData?.availBalance}
                </span>
              </div>
              <div className="card-profile-image-lower-div-right">
                <span
                  className="card-profile-image-lower-div-left-text"
                  style={{ color: "#000" }}
                >
                  {languageValue(valueByLanguage, LanguageKey.EXPOSURE)}
                </span>
                <span
                  className="card-profile-image-lower-div-left-amount"
                  style={{ color: "#000" }}
                >
                  ₹ {balanceData?.deductedExposure}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="profile-menu-box">
          <div className="card-profile-page">
            <div className="card-profile-page-upper-div">
              <div className="card-profile-page-upper-div-left">
                <span
                  className="card-profile-page-upper-div-left-balance"
                  style={{ color: "#000", fontSize: "14px" }}
                >
                  {" "}
                  ₹{bonusBalanceData?.availBalance}{" "}
                </span>
                <span
                  className="card-profile-page-upper-div-left-main-wallet"
                  style={{
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {" "}
                  <span> Bonus Wallet </span>{" "}
                  <input
                    onChange={(e) => handleToggleBalance(e)}
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    checked={wallet === "bonus"}
                  />
                </span>
              </div>

              <div
                style={{ display: "flex", alignItems: "center" }}
                className="card-profile-page-upper-div-right"
              >
                <div
                  className="top-user-name-logoutaction"
                  style={{
                    padding: "0px",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <button
                    onClick={handleBonusToMainWallet}
                    disabled={
                      bonusBalanceData && bonusBalanceData?.claimBonus < 100
                        ? true
                        : false
                    }
                    style={{
                      opacity: `${
                        bonusBalanceData && bonusBalanceData?.claimBonus < 100
                          ? "0.5"
                          : "1"
                      }`,
                      cursor: `${
                        bonusBalanceData && bonusBalanceData?.claimBonus < 100
                          ? "not-allowed"
                          : "pointer"
                      }`,
                      gridTemplateColumns: "auto",
                      gridGap: "0px",
                    }}
                    className="button-container-profile-page"
                  >
                    <div className="button-container-profile-page-1 active">
                      <span className="button-container-profile-page-1-icon">
                        <img src={withdrawIcon} alt="Withdraw" />
                      </span>
                      <span className="button-container-profile-page-1-text">
                        Claim Bonus
                      </span>
                    </div>
                  </button>
                  <p style={{ fontSize: "11px" }}>
                    Minimum claimable bonus amount : 100
                  </p>
                </div>
              </div>
            </div>
            <div className="card-profile-image-lower-div">
              <div className="card-profile-image-lower-div-left">
                <span className="card-profile-image-lower-div-left-text">
                  <span className="text-left-profile" style={{ color: "#000" }}>
                    Claimable Bonus
                  </span>
                  <span className="info-profile-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_47_4592)">
                        <path
                          d="M7.4375 7.41467C7.4375 7.17306 7.24162 6.97717 7 6.97717C6.75838 6.97717 6.5625 7.17306 6.5625 7.41467V10.9147C6.5625 11.1563 6.75838 11.3522 7 11.3522C7.24162 11.3522 7.4375 11.1563 7.4375 10.9147V7.41467Z"
                          fill="#D1D5DB"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99984 1.72717C3.53655 1.72717 0.729004 4.53472 0.729004 7.99801C0.729004 11.4613 3.53655 14.2688 6.99984 14.2688C10.4631 14.2688 13.2707 11.4613 13.2707 7.99801C13.2707 4.53472 10.4631 1.72717 6.99984 1.72717ZM1.604 7.99801C1.604 5.01797 4.0198 2.60217 6.99984 2.60217C9.97985 2.60217 12.3957 5.01797 12.3957 7.99801C12.3957 10.978 9.97985 13.3938 6.99984 13.3938C4.0198 13.3938 1.604 10.978 1.604 7.99801Z"
                          fill="#D1D5DB"
                        ></path>
                        <path
                          d="M7.58317 5.66463C7.58317 5.9868 7.32201 6.24797 6.99984 6.24797C6.67766 6.24797 6.4165 5.9868 6.4165 5.66463C6.4165 5.34247 6.67766 5.0813 6.99984 5.0813C7.32201 5.0813 7.58317 5.34247 7.58317 5.66463Z"
                          fill="#D1D5DB"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_47_4592">
                          <rect
                            width="14"
                            height="14"
                            fill="white"
                            transform="translate(0 0.998047)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </span>
                <span
                  className="card-profile-image-lower-div-left-amount"
                  style={{ color: "#000" }}
                >
                  ₹ {bonusBalanceData?.claimBonus}
                </span>
              </div>
              <div className="card-profile-image-lower-div-right">
                <span
                  className="card-profile-image-lower-div-left-text"
                  style={{ color: "#000" }}
                >
                  Exposure
                </span>
                <span
                  className="card-profile-image-lower-div-left-amount"
                  style={{ color: "#000" }}
                >
                  ₹ {bonusBalanceData?.deductedExposure}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        {wallet === "main" && (
          <div className="profile-menu-box">
            <div className="button-container-profile-page">
              <div
                onClick={() => {
                  navigate("/withdraw");
                }}
                className="button-container-profile-page-1 active"
              >
                <span className="button-container-profile-page-1-icon">
                  <img src={withdrawIcon} alt="Withdraw" />
                </span>
                <span className="button-container-profile-page-1-text">
                  {languageValue(valueByLanguage, LanguageKey.WITHDRAW)}
                </span>
              </div>
              <div
                onClick={() => {
                  navigate("/deposit");
                }}
                className="button-container-profile-page-2 active"
              >
                <span className="button-container-profile-page-2-icon">
                  <img src={depositProfileIcon} alt="Deposit" />
                </span>
                <span className="button-container-profile-page-2-text">
                  {languageValue(valueByLanguage, LanguageKey.DEPOSIT)}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="profile-menu-box">
          <ul
            style={{ paddingLeft: "0px" }}
            className="profile-menu-container active"
          >
            {socialLink?.branchWhatsapplink && (
              <li
                onClick={() => navigateWhatsApp(socialLink?.branchWhatsapplink)}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        style={{ height: "20px", width: "20px" }}
                        src={images.whatsapp}
                        alt=""
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">
                      {languageValue(
                        valueByLanguage,
                        LanguageKey.DEPOSIT_SUPPORT
                      )}
                    </span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )}
            {wallet === "main" && (
              <li
                onClick={() => {
                  navigate("/deposit-report");
                }}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        loading="lazy"
                        alt=""
                        style={{ height: "24px" }}
                        src={profileWallet}
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">
                      Deposit Report
                    </span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )}
            {wallet === "main" && (
              <li
                onClick={() => {
                  navigate("/withdraw-report");
                }}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        loading="lazy"
                        alt=""
                        style={{ height: "24px" }}
                        src={profileWallet}
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">
                      Withdraw Report
                    </span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )}
            <li
              onClick={() => {
                navigate("/open-bets");
              }}
              className="profile-menu-items ng-star-inserted"
            >
              <div className="routingProfile">
                <div className="profile-menu-items-left">
                  <span className="profile-menu-icon">
                    <img
                      loading="lazy"
                      alt=""
                      style={{ height: "24px" }}
                      src={profileLiveBets}
                    />
                    <div className="skeleton-img ng-star-inserted">
                      <div className="moving-strip"></div>
                    </div>
                  </span>
                  <span className="profile-menu-left-text">Open Bets</span>
                </div>
                <div className="profile-menu-items-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                      fill="#617293"
                    ></path>
                  </svg>
                </div>
              </div>
            </li>
            {/* <li className="profile-menu-items ng-star-inserted">
            <div className="routingProfile">
              <div className="profile-menu-items-left">
                <span className="profile-menu-icon">
                  <img
                    loading="lazy"
                    alt=""
                    style={{ height: "24px" }}
                    src={profileCurrency}
                  />
                  <div className="skeleton-img ng-star-inserted">
                    <div className="moving-strip"></div>
                  </div>
                </span>
                <span className="profile-menu-left-text">Bonus</span>
              </div>
              <div className="profile-menu-items-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                    fill="#617293"
                  ></path>
                </svg>
              </div>
            </div>
          </li> */}
            <li
              onClick={() => {
                navigate("/betting-profit-loss");
              }}
              className="profile-menu-items ng-star-inserted"
            >
              <div className="routingProfile">
                <div className="profile-menu-items-left">
                  <span className="profile-menu-icon">
                    <img
                      loading="lazy"
                      alt=""
                      style={{ height: "24px" }}
                      src={profileBettingProfitLoss}
                    />
                    <div className="skeleton-img ng-star-inserted">
                      <div className="moving-strip"></div>
                    </div>
                  </span>
                  <span className="profile-menu-left-text">
                    Betting Profit Loss
                  </span>
                </div>
                <div className="profile-menu-items-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                      fill="#617293"
                    ></path>
                  </svg>
                </div>
              </div>
            </li>
            <li
              onClick={() => navigate("/my-bank-details")}
              className="profile-menu-items ng-star-inserted"
            >
              <div className="routingProfile">
                <div className="profile-menu-items-left">
                  <span className="profile-menu-icon">
                    <img
                      loading="lazy"
                      alt=""
                      style={{ height: "24px" }}
                      src={profileBettingProfitLoss}
                    />
                    <div className="skeleton-img ng-star-inserted">
                      <div className="moving-strip"></div>
                    </div>
                  </span>
                  <span className="profile-menu-left-text">
                    {languageValue(
                      valueByLanguage,
                      LanguageKey.MY_BANK_DETAILS
                    )}
                  </span>
                </div>
                <div className="profile-menu-items-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                      fill="#617293"
                    ></path>
                  </svg>
                </div>
              </div>
            </li>
            <li
              onClick={() => navigate("/bonus-statement")}
              className="profile-menu-items ng-star-inserted"
            >
              <div className="routingProfile">
                <div className="profile-menu-items-left">
                  <span className="profile-menu-icon">
                    <img
                      loading="lazy"
                      alt=""
                      style={{ height: "24px" }}
                      src={profileBettingProfitLoss}
                    />
                    <div className="skeleton-img ng-star-inserted">
                      <div className="moving-strip"></div>
                    </div>
                  </span>
                  <span className="profile-menu-left-text">
                    {languageValue(
                      valueByLanguage,
                      LanguageKey.BONUS_STATEMENT
                    )}
                  </span>
                </div>
                <div className="profile-menu-items-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                      fill="#617293"
                    ></path>
                  </svg>
                </div>
              </div>
            </li>
            {wallet === "main" && (
              <li
                onClick={() => {
                  navigate("/change-password");
                }}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        loading="lazy"
                        alt=""
                        style={{ height: "24px" }}
                        src={profileSettings}
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">
                      {languageValue(
                        valueByLanguage,
                        LanguageKey.CHANGE_PASSWORD
                      )}
                    </span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )}

            <li
              onClick={() => {
                navigate("/edit-stake");
              }}
              className="profile-menu-items ng-star-inserted"
            >
              <div className="routingProfile">
                <div className="profile-menu-items-left">
                  <span className="profile-menu-icon">
                    <img
                      loading="lazy"
                      alt=""
                      style={{ height: "24px" }}
                      src={profileSettings}
                    />
                    <div className="skeleton-img ng-star-inserted">
                      <div className="moving-strip"></div>
                    </div>
                  </span>
                  <span className="profile-menu-left-text">Edit Stake</span>
                </div>
                <div className="profile-menu-items-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                      fill="#617293"
                    ></path>
                  </svg>
                </div>
              </div>
            </li>
            {socialLink?.referral && (
              <li
                onClick={() => navigate("/affiliate")}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        loading="lazy"
                        alt=""
                        style={{ height: "24px" }}
                        src={profileBettingProfitLoss}
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">Affiliate</span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )}

            {/* {Settings.referral && (
              <li
                onClick={() => setShowReferral(true)}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        loading="lazy"
                        alt=""
                        style={{ height: "24px" }}
                        src={profileBettingProfitLoss}
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">Referral</span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )} */}

            {/* <li
              onClick={() => navigate("/referral-statement")}
              className="profile-menu-items ng-star-inserted"
            >
              <div className="routingProfile">
                <div className="profile-menu-items-left">
                  <span className="profile-menu-icon">
                    <img
                      loading="lazy"
                      alt=""
                      style={{ height: "24px" }}
                      src={profileBettingProfitLoss}
                    />
                    <div className="skeleton-img ng-star-inserted">
                      <div className="moving-strip"></div>
                    </div>
                  </span>
                  <span className="profile-menu-left-text">
                    Referral Statement
                  </span>
                </div>
                <div className="profile-menu-items-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                      fill="#617293"
                    ></path>
                  </svg>
                </div>
              </div>
            </li> */}

            {/* {socialLink?.whatsapplink && (
              <li
                onClick={() => navigateWhatsApp(socialLink?.whatsapplink)}
                className="profile-menu-items ng-star-inserted"
              >
                <div className="routingProfile">
                  <div className="profile-menu-items-left">
                    <span className="profile-menu-icon">
                      <img
                        style={{ height: "20px", width: "20px" }}
                        src={images.whatsapp}
                        alt=""
                      />
                      <div className="skeleton-img ng-star-inserted">
                        <div className="moving-strip"></div>
                      </div>
                    </span>
                    <span className="profile-menu-left-text">
                      {languageValue(valueByLanguage, LanguageKey.ALL_SUPPORT)}
                    </span>
                  </div>
                  <div className="profile-menu-items-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.87866 2.92393L13.75 9.79528L6.87865 16.6666L5.91667 15.6875L11.8088 9.79528L5.91667 3.9031L6.87866 2.92393Z"
                        fill="#617293"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
            )} */}
          </ul>
        </div>
        <div
          onClick={() => {
            handleLogOut();
            setGetToken((prev) => !prev);
            navigate("/");
          }}
          className="profile-menu-box"
        >
          <div className="download-btn-card">
            <div className="download-card"></div>
            <button className="logout-btn">
              <span style={{ color: "#000" }}>
                {languageValue(valueByLanguage, LanguageKey.LOGOUT)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
