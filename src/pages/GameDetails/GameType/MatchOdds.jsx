import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { detectPriceChanges } from "../../../utils/detectPriceChanges";
import { handleToggle } from "../../../utils/handleToggle";
import { handlePlaceBet } from "../../../utils/handlePlaceBet";
import useContextState from "../../../hooks/useContextState";
import { useNavigate, useParams } from "react-router-dom";
import {
  isGameSuspended,
  isRunnerSuspended,
} from "../../../utils/isRunnerSuspended";
import { Settings } from "../../../api";
import { handleCashOutPlaceBet } from "../../../utils/handleCashOutPlaceBet";

const MatchOdds = ({
  match_odds,
  setOpenBetSlip,
  setPlaceBetValues,
  exposer,
}) => {
  const { token } = useContextState();
  const navigate = useNavigate();
  let pnlBySelection;
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const [previousData, setPreviousData] = useState(match_odds);
  const [changedPrices, setChangedPrices] = useState({});
  const [toggleAccordion, setToggleAccordion] = useState(false);
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);

  useEffect(() => {
    detectPriceChanges(
      match_odds,
      previousData,
      setPreviousData,
      setChangedPrices
    );
  }, [match_odds, previousData]);

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
    };
  };

  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }

  useEffect(() => {
    let results = [];
    if (
      match_odds?.length > 0 &&
      exposer?.pnlBySelection &&
      Object.keys(exposer?.pnlBySelection)?.length > 0
    ) {
      match_odds.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match_odds, eventId, exposer]);

  return (
    <>
      {match_odds &&
        match_odds?.map((games, i) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === games?.id && profit?.isOnePositiveExposure
          );

          return (
            <div key={i} className="bt12687">
              <div className="bt12695">
                <div
                  className="bt12689"
                  data-editor-id="marketTitle"
                  style={{ justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{games?.name}</span>
                    <div
                      onClick={() =>
                        handleToggle(i, toggleAccordion, setToggleAccordion)
                      }
                      className="bt6471 bt12696 bt12690"
                      style={{ width: "20px", height: "20px" }}
                    >
                      {toggleAccordion[i] ? (
                        <IoMdArrowDropdown size={20} />
                      ) : (
                        <IoMdArrowDropup size={20} />
                      )}
                    </div>
                    <span style={{ fontSize: "9px", color: "#959595" }}>
                      {" "}
                      Max: {games?.maxLiabilityPerBet}
                    </span>
                  </div>
                  {Settings.betFairCashOut && games?.runners?.length !== 3 && (
                    <button
                      disabled={!teamProfitForGame || isGameSuspended(games)}
                      onClick={() =>
                        handleCashOutPlaceBet(
                          games,
                          "lay",
                          setOpenBetSlip,
                          setPlaceBetValues,
                          pnlBySelection,
                          token,
                          navigate,
                          teamProfitForGame
                        )
                      }
                      type="button"
                      className="btn_box "
                      style={{
                        width: "100px",
                        backgroundColor: "#c9c9c9",
                        display: "flex",
                        alignItems: "center",
                        cursor: `${
                          !teamProfitForGame ? "not-allowed" : "pointer"
                        }`,
                        opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                      }}
                    >
                      <span style={{ fontSize: "10px", color: "black" }}>
                        Cashout
                      </span>
                      {teamProfitForGame?.profit > 0 &&
                        !isGameSuspended(games) && (
                          <span style={{ color: "black", fontSize: "10px" }}>
                            :
                          </span>
                        )}

                      {teamProfitForGame?.profit > 0 &&
                        !isGameSuspended(games) && (
                          <span
                            style={{
                              color: `${
                                teamProfitForGame?.profit > 0 ? "green" : "red"
                              }`,
                              fontSize: "10px",
                            }}
                          >
                            {teamProfitForGame?.profit?.toFixed(2)}
                          </span>
                        )}
                    </button>
                  )}
                </div>
              </div>
              {games?.runners?.map((runner) => {
                const pnl =
                  pnlBySelection?.filter(
                    (pnl) => pnl?.RunnerId === runner?.id
                  ) || [];

                return (
                  <div
                    key={runner?.id}
                    className=""
                    style={{
                      height: "auto",
                      overflow: "visible",
                      transition: "height 0.25s ease 0s",
                      display: `${toggleAccordion[i] ? "none" : ""}`,
                    }}
                  >
                    <div style={{ overflow: "visible" }}>
                      <div className="bt12683">
                        <div
                          data-editor-id="tableOutcomePlate"
                          className="bt6588  "
                          style={{ flex: "1" }}
                        >
                          <div
                            className="bt6592 bt12699"
                            style={{ minHeight: "40px" }}
                          >
                            {pnl?.length > 0 ? (
                              pnl.map(({ pnl }, i) => {
                                return (
                                  <div
                                    key={i}
                                    className={`bt6596 bt12703 exposure`}
                                    data-editor-id="tableOutcomePlateName"
                                  >
                                    <span
                                      className="bt6598"
                                      style={{ margin: "4px 0" }}
                                    >
                                      {runner?.name}
                                    </span>

                                    <span
                                      // onClick={() => handleLader(MarketId)}

                                      className={`bt6598 ${
                                        pnl > 0
                                          ? "exposure_green"
                                          : "exposure_red"
                                      }`}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      {pnl || ""}
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              <div
                                className={`bt6596 bt12703`}
                                data-editor-id="tableOutcomePlateName"
                              >
                                <span
                                  className="bt6598"
                                  style={{ margin: "4px 0" }}
                                >
                                  {runner?.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            handlePlaceBet(
                              games,
                              runner,
                              "back",
                              setOpenBetSlip,
                              setPlaceBetValues,
                              pnlBySelection,
                              token,
                              navigate
                            )
                          }
                          data-editor-id="tableOutcomePlate"
                          className="bt6588  "
                          style={{ flexBasis: "20%" }}
                        >
                          <div
                            className={`bt6592 bt12699 odds_back ${
                              changedPrices[`back-${runner?.id}-${i}`]
                                ? "blink"
                                : ""
                            } ${isRunnerSuspended(games, runner)} `}
                          >
                            <span
                              className={`mdc-button__label  `}
                              style={{ verticalAlign: "middle", width: "100%" }}
                            >
                              <h4>
                                {" "}
                                {!isRunnerSuspended(games, runner) &&
                                  runner?.back[0]?.price}
                              </h4>
                              <p className="odds_volume">
                                {!isRunnerSuspended(games, runner) &&
                                  runner?.back[0]?.size}
                              </p>
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            handlePlaceBet(
                              games,
                              runner,
                              "lay",
                              setOpenBetSlip,
                              setPlaceBetValues,
                              pnlBySelection,
                              token,
                              navigate
                            )
                          }
                          data-editor-id="tableOutcomePlate"
                          className={`bt6588 `}
                          style={{ flexBasis: "20%" }}
                        >
                          <div
                            className={`bt6592 bt12699 odds_lay ${
                              changedPrices[`lay-${runner.id}-${i}`]
                                ? "blink"
                                : ""
                            } ${isRunnerSuspended(games, runner)}`}
                          >
                            <span className={`mdc-button__label `}>
                              <h4>
                                {" "}
                                {!isRunnerSuspended(games, runner) &&
                                  runner?.lay[0]?.price}
                              </h4>
                              <p className="odds_volume">
                                {" "}
                                {!isRunnerSuspended(games, runner) &&
                                  runner?.lay[0]?.size}
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default MatchOdds;
