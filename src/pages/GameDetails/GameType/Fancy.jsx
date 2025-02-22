import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { detectPriceChanges } from "../../../utils/detectPriceChanges";
import useContextState from "../../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import Ladder from "../../../components/modal/Ladder";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const Fancy = ({ normal, setOpenBetSlip, setPlaceBetValues, exposer }) => {
  const [previousData, setPreviousData] = useState(normal);
  const [changedPrices, setChangedPrices] = useState({});
  const [toggleAccordion, setToggleAccordion] = useState(false);
  const { token } = useContextState();
  const [ladderData, setLadderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    detectPriceChanges(normal, previousData, setPreviousData, setChangedPrices);
  }, [normal, previousData]);

  const handlePlaceBet = (item, runner, betType) => {
    if (token) {
      if (item?.status === "OPEN") {
        setOpenBetSlip(true);
        setPlaceBetValues({});
        setPlaceBetValues({
          price:
            betType === "back" ? runner?.back[0].line : runner?.lay[0].line,
          side: betType === "back" ? 0 : 1,
          selectionId: runner?.id,
          btype: item?.btype,
          eventTypeId: item?.eventTypeId,
          betDelay: item?.betDelay,
          marketId: item?.id,
          lay: betType === "lay",
          back: betType === "back",
          selectedBetName: runner?.name,
          name: item.runners.map((runner) => runner.name),
          runnerId: item.runners.map((runner) => runner.id),
          isWeak: item?.isWeak,
          maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
          isBettable: item?.isBettable,
          maxLiabilityPerBet: item?.maxLiabilityPerBet,
          eventId: item?.eventId,
          cashout: false,
        });
      }
    } else {
      navigate("/login");
    }
  };
  /* exposure */
  let pnlBySelection;
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const isRunnerSuspended = (games) => {
    if (games?.status !== "OPEN") {
      return "odds_suspended";
    }
  };

  const handleLadder = async (marketId) => {
    const { data } = await AxiosSecure.post(`${API.ladder}/${marketId}`);
    if (data.success) {
      setLadderData(data.result);
    }
  };

  return (
    <>
      {ladderData?.length > 0 && (
        <Ladder ladderData={ladderData} setLadderData={setLadderData} />
      )}
      <div className="bt12687">
        <div className="bt12695">
          <div className="bt12689" data-editor-id="marketTitle">
            {normal[0]?.btype == "FANCY" ? "FANCY" : normal[0]?.name}
            <div
              onClick={() => setToggleAccordion((prev) => !prev)}
              className="bt6471 bt12696 bt12690"
              style={{ width: "16px", height: "16px" }}
            >
              {toggleAccordion ? (
                <IoMdArrowDropdown size={20} />
              ) : (
                <IoMdArrowDropup size={20} />
              )}
            </div>
            <span style={{ fontSize: "9px", color: "#959595" }}>
              Max: {normal?.[0]?.maxLiabilityPerBet}
            </span>
          </div>
        </div>

        {normal?.map((games, i) => {
          const pnl =
            pnlBySelection?.filter((pnl) => pnl?.MarketId === games?.id) || [];
          return (
            <div
              key={i}
              className=""
              style={{
                height: "auto",
                overflow: "visible",
                transition: "height 0.25s ease 0s",
                display: `${toggleAccordion ? "none" : ""}`,
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
                      {/* <div
                    className="bt6596 bt12703"
                    data-editor-id="tableOutcomePlateName"
                  >
                    <span className="bt6598">{games?.name}</span>
                  </div> */}
                      {pnl?.length > 0 ? (
                        pnl.map(({ pnl, MarketId }, i) => {
                          return (
                            <div
                              onClick={() => handleLadder(MarketId)}
                              key={i}
                              className={`bt6596 bt12703 exposure`}
                              data-editor-id="tableOutcomePlateName"
                            >
                              <span
                                className="bt6598"
                                style={{ margin: "4px 0", color: "#808080" }}
                              >
                                {games?.name}
                              </span>

                              <span
                                className={`bt6598 ${
                                  pnl > 0 ? "exposure_green" : "exposure_red"
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
                          <span className="bt6598" style={{ margin: "4px 0" }}>
                            {games?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      handlePlaceBet(games, games?.runners[0], "lay")
                    }
                    data-editor-id="tableOutcomePlate"
                    className="bt6588  "
                    style={{ flexBasis: "20%" }}
                  >
                    <div
                      className={`bt6592 bt12699 ${
                        changedPrices[`back-${games?.runners?.[0]?.id}-${i}`]
                          ? "blink"
                          : ""
                      } ${isRunnerSuspended(games)}`}
                      style={{
                        backgroundColor: "#fdc9d4",
                        minHeight: "40px",
                        margin: "auto ",
                        paddingTop: "5px",
                      }}
                    >
                      <span
                        className={`mdc-button__label `}
                        style={{ verticalAlign: "middle", width: "100%" }}
                      >
                        <h4>
                          {!isRunnerSuspended(games) &&
                            games?.runners?.[0]?.lay?.[0]?.line}
                        </h4>
                        <p className="odds_volume">
                          {!isRunnerSuspended(games) &&
                            games?.runners?.[0]?.lay?.[0]?.price}
                        </p>
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      handlePlaceBet(games, games?.runners[0], "back")
                    }
                    data-editor-id="tableOutcomePlate"
                    className="bt6588  "
                    style={{ flexBasis: "20%" }}
                  >
                    <div
                      className={`bt6592 bt12699 ${
                        changedPrices[`lay-${games?.runners?.[0].id}-${i}`]
                          ? "blink"
                          : ""
                      } ${isRunnerSuspended(games)}`}
                      style={{
                        backgroundColor: "#a0d8fb",
                        minHeight: "40px",
                        margin: "auto ",
                        paddingTop: "5px",
                      }}
                    >
                      <span className={`mdc-button__label `}>
                        <h4>
                          {!isRunnerSuspended(games) &&
                            games?.runners?.[0]?.back?.[0]?.line}
                        </h4>
                        <p className="odds_volume">
                          {!isRunnerSuspended(games) &&
                            games?.runners?.[0]?.back[0]?.price}
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
    </>
  );
};

export default Fancy;
