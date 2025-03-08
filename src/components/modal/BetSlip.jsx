import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import handleRandomToken from "../../utils/handleRandomToken";
import handleEncryptData from "../../utils/handleEncryptData";
import { API, Settings } from "../../api";
import useContextState from "../../hooks/useContextState";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import useBalance from "../../hooks/useBalance";
import useLanguage from "../../hooks/useLanguage";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const BetSlip = ({
  setOpenBetSlip,
  placeBetValues,
  refetchExposure,
  refetchCurrentBets,
}) => {
  const { eventTypeId } = useParams();
  const { language } = useLanguage();
  const { token, setPredictOdds, predictOdds } = useContextState();
  /* Close modal click outside */
  const betSlipRef = useRef();
  useCloseModalClickOutside(betSlipRef, () => {
    closeBetSlip();
  });

  const closeBetSlip = () => {
    setOpenBetSlip(false);
    setPredictOdds([]);
  };
  /* Button values from locale storage */
  const buttonGameValue = JSON.parse(localStorage.getItem("buttonValue"));
  const [totalSize, setTotalSize] = useState("");
  const [loader, setLoader] = useState(false);
  const [betDelay, setBetDelay] = useState("");
  const { refetchBalance } = useBalance();
  const [stakeErr, setStakeErr] = useState("");
  const [price, setPrice] = useState(null);

  /* Set price */
  useEffect(() => {
    setPrice(placeBetValues?.price);
    setTotalSize(placeBetValues?.totalSize?.toFixed(2));
  }, [placeBetValues]);

  console.log(placeBetValues);

  let payload = {};
  if (price) {
    if (Settings.language) {
      payload.language = language;
    }
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: totalSize,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: false,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: totalSize,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */
  const handleOrderBets = () => {
    if (totalSize < 100) {
      return setStakeErr("Min bet amount is 100");
    }
    /* random token */
    const generatedToken = handleRandomToken();
    /* encrypt post data */
    const encryptedData = handleEncryptData([
      {
        ...payload,
        token: generatedToken,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: Settings.betDelay,
      },
    ]);
    let delay = 0;
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 3 &&
      placeBetValues?.name?.length === 2
    ) {
      setBetDelay(9);
      delay = 9000;
    }
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 7 &&
      placeBetValues?.name?.length === 3
    ) {
      setBetDelay(9);
      delay = 9000;
    } else {
      setBetDelay(placeBetValues?.betDelay);
      delay = Settings.betDelay ? placeBetValues?.betDelay * 1000 : 0;
    }

    setLoader(true);
    setTimeout(() => {
      fetch(API.order, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(encryptedData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            refetchExposure();
            refetchBalance();
            refetchCurrentBets();
            setLoader(false);
            closeBetSlip();
            toast.success(data?.result?.result?.placed?.[0]?.message);
          } else {
            toast.error(
              data?.error?.status?.[0]?.description || data?.error?.errorMessage
            );
            setLoader(false);
            closeBetSlip();
            refetchExposure();
            refetchBalance();
            refetchCurrentBets();
          }
        });
    }, delay);
  };

  /* Increase price bets */
  const handleIncreasePrice = () => {
    if (price == 1000 || placeBetValues?.isWeak === true) {
      return;
    } else if (price > 1.0 && price < 2) {
      setPrice((parseFloat(price) + 0.01).toFixed(2));
    } else if (price > 1.99 && price < 3) {
      setPrice((parseFloat(price) + 0.02).toFixed(2));
    } else if (price > 2.99 && price < 4) {
      setPrice((parseFloat(price) + 0.05).toFixed(2));
    } else if (price > 3.99 && price < 6) {
      setPrice((parseFloat(price) + 0.1).toFixed(1));
    } else if (price > 5.99 && price < 10) {
      setPrice((parseFloat(price) + 0.2).toFixed(1));
    } else if (price > 9.99 && price < 20) {
      setPrice((parseFloat(price) + 0.5).toFixed(1));
    } else {
      setPrice(parseFloat(price) + 1);
    }
  };

  /* Decrease price bets */
  const handleDecreasePrice = () => {
    if (price < 1.02 || placeBetValues?.isWeak === true) {
      return;
    } else if (price < 2) {
      setPrice((parseFloat(price) - 0.01).toFixed(2));
    } else if (price > 1.99 && price < 3) {
      setPrice((parseFloat(price) - 0.02).toFixed(2));
    } else if (price > 2.99 && price < 4) {
      setPrice((parseFloat(price) - 0.05).toFixed(2));
    } else if (price > 3.99 && price < 6) {
      setPrice((parseFloat(price) - 0.1).toFixed(1));
    } else if (price > 5.99 && price < 10) {
      setPrice((parseFloat(price) - 0.2).toFixed(1));
    } else if (price > 9.99 && price < 20) {
      setPrice((parseFloat(price) - 0.5).toFixed(1));
    } else {
      setPrice(parseFloat(price) - 1);
    }
  };

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * totalSize - totalSize;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * totalSize - totalSize;
        }

        const currentExposure = placeBetValues?.exposure?.map((exp) => {
          return {
            updatedExposure: totalSize
              ? exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * totalSize)
              : null,

            id: exp?.id,
            isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            name: exp?.name,
            exposure: exp?.exposure,
          };
        });

        setPredictOdds(currentExposure);
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * totalSize - totalSize);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * totalSize - totalSize);
        }

        const currentExposure = placeBetValues?.exposure?.map((exp) => {
          return {
            updatedExposure: totalSize
              ? exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * totalSize)
              : null,
            id: exp?.id,
            isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            name: exp?.name,
            exposure: exp?.exposure,
          };
        });
        setPredictOdds(currentExposure);
      }
    }
  }, [price, totalSize, placeBetValues, setPredictOdds]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    return hasDecimal ? value.toFixed(2) : value;
  };

  useEffect(() => {
    if (betDelay > 0) {
      setTimeout(() => {
        setBetDelay((prev) => prev - 1);
      }, 1000);
    } else {
      setBetDelay(null);
    }
  }, [setBetDelay, betDelay]);
  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={{ justifyContent: "center", alignItems: "flex-end" }}
      >
        <div
          id="cdk-overlay-1"
          className="cdk-overlay-pane betslip-dialog"
          style={{
            width: "calc(100% - 30px)",
            maxWidth: "400px",
            position: "static",
            marginBottom: "10px",
          }}
          ref={betSlipRef}
        >
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
          <div
            className="mat-mdc-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
            id="mat-mdc-dialog-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div className="ng-star-inserted">
                  <div
                    className={`betslip-modal ${
                      placeBetValues?.back ? "forback" : "forlay"
                    }`}
                  >
                    <div className="modal-header">
                      <h2> Place Bet | {placeBetValues?.marketName}</h2>
                      <div
                        className="action-btns"
                        style={{ top: "-5px", right: "-5px" }}
                      >
                        <button
                          onClick={closeBetSlip}
                          className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          type="button"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                          <span
                            style={{ marginLeft: "4px" }}
                            role="img"
                            className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                            aria-hidden="true"
                            data-mat-icon-type="font"
                          >
                            <RxCross2 size={20} />
                          </span>
                          <span className="mdc-button__label"></span>
                          <span className="mat-mdc-focus-indicator"></span>
                          <span className="mat-mdc-button-touch-target"></span>
                        </button>
                      </div>
                    </div>
                    <div className="modal-body">
                      <div
                        className={`betvalue-wrap ${
                          placeBetValues?.back ? "forback" : "forlay"
                        }`}
                      >
                        {loader && (
                          <div id="loader-section">
                            <div id="load-inner">
                              <span style={{ position: "relative" }}>
                                <FaSpinner size={25} />
                                <span
                                  style={{
                                    position: "absolute",
                                    right: "9px",
                                    top: "4px",
                                  }}
                                >
                                  {betDelay > 0 && betDelay}
                                </span>
                              </span>
                              <span style={{ fontWeight: "500" }}>
                                Your bet is being processed...
                              </span>
                              <span
                                style={{ fontWeight: "500" }}
                                className="font-semibold"
                              >
                                Please Wait...
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="betslip-toprow">
                          <h2>
                            {" "}
                            {placeBetValues?.selectedBetName ||
                              placeBetValues?.placeName}
                          </h2>
                        </div>
                        <div className="bet-action-grid">
                          <div
                            className="bet-action-item"
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <input
                              onChange={(e) => setPrice(e.target.value)}
                              readOnly={placeBetValues?.isWeak}
                              type="number"
                              defaultValue={price}
                              className="rate-inp"
                            />
                            {!placeBetValues?.isWeak && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "3px",
                                  right: "5px",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <svg
                                  onClick={handleIncreasePrice}
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 24 24"
                                  height="15"
                                  width="15"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ cursor: "pointer" }}
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                                </svg>
                                <svg
                                  onClick={handleDecreasePrice}
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 24 24"
                                  height="15"
                                  width="15"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ cursor: "pointer" }}
                                >
                                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="bet-action-item">
                            <input
                              onChange={(e) => setTotalSize(e.target.value)}
                              type="number"
                              name="betStake"
                              value={
                                totalSize ||
                                placeBetValues?.totalSize?.toFixed(2)
                              }
                              className="ng-untouched ng-pristine ng-valid"
                            />
                          </div>
                          <div className="bet-action-item">
                            <button
                              onClick={handleOrderBets}
                              className="slip-btn notranslate mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                            >
                              <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                              <span className="mdc-button__label">Submit</span>
                            </button>
                          </div>
                        </div>
                        <div className="error-wrap">
                          <p className="spacer"></p>
                          <p className="error-msg ng-star-inserted">
                            {" "}
                            {stakeErr}
                          </p>
                        </div>
                        <div className="amt-chip-grid">
                          {buttonGameValue?.slice(0, 8).map(({ value }, i) => {
                            return (
                              <button
                                key={i}
                                onClick={() => setTotalSize(value)}
                                className="chip-grid-item mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                              >
                                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                                <span className="mdc-button__label">
                                  {" "}
                                  {value}
                                </span>
                                <span className="mat-mdc-focus-indicator"></span>
                              </button>
                            );
                          })}
                        </div>
                        {placeBetValues?.btype === "MATCH_ODDS" ||
                        placeBetValues?.btype === "BOOKMAKER" ||
                        placeBetValues?.btype === "BOOKMAKER2" ? (
                          <div className="pred-pl-wrap">
                            {predictOdds?.map((predictOdd, i) => {
                              return (
                                <p
                                  key={i}
                                  className="pred-pl-row ng-star-inserted"
                                >
                                  <strong> {predictOdd?.name}</strong>
                                  <span
                                    className={`${
                                      placeBetValues?.exposure &&
                                      placeBetValues?.exposure > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                    style={{
                                      fontSize: "10px",
                                      textAlign: "right",
                                    }}
                                  >
                                    {predictOdd?.exposure !== 0 &&
                                      predictOdd?.exposure}
                                  </span>
                                  <span
                                    className={`${
                                      predictOdd?.updatedExposure &&
                                      predictOdd?.updatedExposure > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                    style={{
                                      fontSize: "10px",
                                      textAlign: "right",
                                    }}
                                  >
                                    {predictOdd?.updatedExposure}
                                  </span>
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {placeBetValues?.btype === "FANCY" ||
                        placeBetValues?.btype === "SPORTSBOOK" ? (
                          <div className="range-text-row">
                            <h2
                              style={{
                                textTransform: "none",
                                fontSize: "10px",
                              }}
                            >
                              Max:
                              {placeBetValues?.maxLiabilityPerBet}
                            </h2>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
