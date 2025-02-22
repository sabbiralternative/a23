import { useEffect, useState } from "react";
import { detectPriceChanges } from "../../../utils/detectPriceChanges";
import { handlePlaceBet } from "../../../utils/handlePlaceBet";
import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { isHorseGreyhoundRunnerSuspended } from "../../../utils/isRunnerSuspended";

const HorseGreyhound = ({
  data,
  exposer,
  setOpenBetSlip,
  setPlaceBetValues,
}) => {
  const { token } = useContextState();
  const navigate = useNavigate();
  let pnlBySelection;
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const [previousData, setPreviousData] = useState(data);
  const [changedPrices, setChangedPrices] = useState({});

  useEffect(() => {
    detectPriceChanges(data, previousData, setPreviousData, setChangedPrices);
  }, [data, previousData]);

  return (
    <>
      {data &&
        data?.map((games, i) => {
          return (
            <div key={i} className="bt12687">
              {/* <div className="bt12695">
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
                </div>
              </div> */}
              {games?.runners?.map((runner) => {
                return (
                  <div
                    key={runner?.selectionId}
                    className=""
                    style={{
                      height: "auto",
                      overflow: "visible",
                      transition: "height 0.25s ease 0s",
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
                              changedPrices[`back-${runner?.selectionId}-${i}`]
                                ? "blink"
                                : ""
                            } ${isHorseGreyhoundRunnerSuspended(
                              games,
                              runner
                            )} `}
                          >
                            <span
                              className={`mdc-button__label  `}
                              style={{ verticalAlign: "middle", width: "100%" }}
                            >
                              <h4>
                                {" "}
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.ex?.availableToBack?.[0]?.price}
                              </h4>
                              <p className="odds_volume">
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.ex?.availableToBack?.[0]?.size}
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
                            } ${isHorseGreyhoundRunnerSuspended(
                              games,
                              runner
                            )}`}
                          >
                            <span className={`mdc-button__label `}>
                              <h4>
                                {" "}
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.ex?.availableToLay?.[0]?.price}
                              </h4>
                              <p className="odds_volume">
                                {" "}
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.ex?.availableToLay?.[0]?.size}
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

export default HorseGreyhound;
