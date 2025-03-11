import { useEffect, useState } from "react";
import { detectPriceChanges } from "../../../utils/detectPriceChanges";

import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { isHorseGreyhoundRunnerSuspended } from "../../../utils/isRunnerSuspended";
import { handleHorsePlaceBet } from "../../../utils/handleHorsePlaceBet";

const HorseGreyhound = ({
  data,
  exposer,
  setOpenBetSlip,
  setPlaceBetValues,
}) => {
  const [timeDiff, setTimeDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
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

  useEffect(() => {
    if (!data?.[0]?.openDate) return;

    const targetDateStr = data[0].openDate;
    const [date, time] = targetDateStr.split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute, second] = time.split(":");

    const targetDate = new Date(year, month - 1, day, hour, minute, second);

    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const diffInMs = targetDate - currentDate;

        if (diffInMs <= 0) {
          clearInterval(interval);
          setTimeDiff({ day: 0, hour: 0, minute: 0, second: 0 });
          return;
        }

        const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hour = Math.floor(
          (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minute = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((diffInMs % (1000 * 60)) / 1000);

        setTimeDiff({ day, hour, minute, second });
      }, 1000);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <>
      <div className="horse-banner">
        <img
          style={{ width: "100%" }}
          src="https://g1ver.sprintstaticdata.com/v42/static/front/img/10.png"
          className="img-fluid"
        />
        <div className="horse-banner-detail">
          <div className="text-success">OPEN</div>
          {timeDiff?.day ||
          timeDiff?.hour ||
          timeDiff?.minute ||
          timeDiff?.second ? (
            <div className="horse-timer">
              <span style={{ display: "flex", gap: "5px" }}>
                {timeDiff?.day > 0 && (
                  <span>
                    {timeDiff?.day} <small>Day</small>
                  </span>
                )}
                {timeDiff?.hour > 0 && (
                  <span>
                    {timeDiff?.hour} <small>Hour</small>
                  </span>
                )}
                {timeDiff?.minute > 0 && (
                  <span>
                    {timeDiff?.minute} <small>Minutes</small>
                  </span>
                )}
                {timeDiff?.hour === 0 && timeDiff?.minute < 60 && (
                  <span>
                    {timeDiff?.second} <small>Seconds</small>
                  </span>
                )}
              </span>
              <span>Remaining</span>
            </div>
          ) : null}

          <div className="time-detail">
            <p>{data?.[0]?.eventName}</p>
            <h5>
              <span>{data?.[0]?.openDate}</span>
              <span>| {data?.[0]?.raceType}</span>
            </h5>
          </div>
        </div>
      </div>
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
              {games?.runners?.map((runner, idx) => {
                return (
                  <div
                    key={runner?.id}
                    className=""
                    style={{
                      height: "60px",
                      overflow: "visible",
                      transition: "height 0.25s ease 0s",
                    }}
                  >
                    <div style={{ overflow: "visible", height: "100%" }}>
                      <div className="bt12683" style={{ height: "100%" }}>
                        <div
                          data-editor-id="tableOutcomePlate"
                          className="bt6588  "
                          style={{ flex: "1" }}
                        >
                          <div
                            className="bt6592 bt12699"
                            style={{ height: "100%" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                maskImage: "none",
                              }}
                              className={`bt6596 bt12703`}
                              data-editor-id="tableOutcomePlateName"
                            >
                              <input
                                className="sm-d-none"
                                type="checkbox"
                                name="checkbox-runner-0"
                                id="checkbox-runner-0"
                              />
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <div className="sm-d-none">
                                  {idx + 1}
                                  <br />({idx + 1})
                                </div>
                              </div>
                              <div>
                                <img src={runner?.image_id} />
                              </div>

                              <div>
                                <span
                                  className="bt6598"
                                  style={{ margin: "4px 0" }}
                                >
                                  {runner?.horse_name}
                                </span>
                                <div
                                  className="jockey-detail sm-d-none d-md-flex"
                                  style={{ display: "flex" }}
                                >
                                  {runner?.jocky && (
                                    <span className="jockey-detail-box">
                                      <b>Jockey:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.jocky}
                                      </span>
                                    </span>
                                  )}
                                  {runner?.trainer && (
                                    <span className="jockey-detail-box">
                                      <b>Trainer:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.trainer}
                                      </span>
                                    </span>
                                  )}
                                  {runner?.age && (
                                    <span className="jockey-detail-box">
                                      <b>Age:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.age}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            handleHorsePlaceBet(
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
                            style={{ height: "100%" }}
                            className={`bt6592 bt12699 odds_back ${
                              changedPrices[`back-${runner?.id}-${i}`]
                                ? "blink"
                                : ""
                            } ${isHorseGreyhoundRunnerSuspended(games)} `}
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
                                ) && runner?.back?.[0]?.price}
                              </h4>
                              <p className="odds_volume">
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.back?.[0]?.size}
                              </p>
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            handleHorsePlaceBet(
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
                            style={{ height: "100%" }}
                            className={`bt6592 bt12699 odds_lay ${
                              changedPrices[`lay-${runner.id}-${i}`]
                                ? "blink"
                                : ""
                            } ${isHorseGreyhoundRunnerSuspended(games)}`}
                          >
                            <span className={`mdc-button__label `}>
                              <h4>
                                {" "}
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.lay?.[0]?.price}
                              </h4>
                              <p className="odds_volume">
                                {" "}
                                {!isHorseGreyhoundRunnerSuspended(
                                  games,
                                  runner
                                ) && runner?.lay?.[0]?.price}
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
