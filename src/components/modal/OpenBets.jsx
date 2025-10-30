import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { useNavigate } from "react-router-dom";
// import { handleCashOutSportsBook } from "../../utils/handleCashOutShortsBook";
// import useContextState from "../../hooks/useContextState";

const OpenBets = ({ setShowOpenBets, myBets, sportsBook }) => {
  /* close modal click outside */
  // const { setPlaceBetValues, setOpenBetSlip } = useContextState();
  const navigate = useNavigate();
  const openBetsRef = useRef();
  useCloseModalClickOutside(openBetsRef, () => {
    setShowOpenBets(false);
  });

  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials"
    );

  return (
    <div className="Modal-Background ng-tns-c159-13 ng-star-inserted">
      <div
        className="depositpop ng-tns-c159-13"
        style={{ gap: "0" }}
        ref={openBetsRef}
      >
        <div className="depositbreak ng-tns-c159-13" style={{ height: "25px" }}>
          <p className="ng-tns-c159-13" style={{ fontSize: "11px" }}>
            Open Bets
          </p>
          <div
            onClick={() => setShowOpenBets(false)}
            className="close-svg ng-tns-c159-13"
          >
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ng-tns-c159-13"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                fill="#111827"
                className="ng-tns-c159-13"
              ></path>
            </svg>
          </div>
        </div>

        {myBets?.length > 0 ? (
          <div className="mat-expansion-panel-content ng-trigger ng-trigger-bodyExpansion">
            <div
              className="mat-expansion-panel-body"
              style={{ padding: "0 10px" }}
            >
              <div className="allbet-datawrap">
                <div className="allbet-header">
                  <div className="allbet-title">
                    <h3>Selection</h3>
                  </div>
                  <div className="allbet-headcol">
                    <h3></h3>
                    <h3></h3>
                    <h3>Odd</h3>
                    <h3>Stake</h3>
                  </div>
                </div>
                {myBets?.map((item, i) => {
                  let column;
                  sports?.forEach((group) => {
                    group?.Items?.forEach((data) => {
                      if (item?.marketId == data?.Id) {
                        column = data?.Items?.find(
                          (col) => col?.Id === item?.selectionId
                        );
                      }
                    });
                  });

                  return (
                    <div
                      onClick={() => {
                        setShowOpenBets(false);
                        navigate(
                          `/game-details/${item?.eventTypeId}/${item?.eventId}`
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      key={i}
                      className={`allbet-datalist ${
                        item?.betType === "Back" ? "forback " : "forlay "
                      }`}
                    >
                      <div className="allbet-gameinfo">
                        <div className="allbet-content">
                          <h3>
                            {item?.marketName}: {item?.nation}
                          </h3>
                          <p> {item?.placeDate} </p>
                        </div>
                      </div>
                      <div className="allbet-odds-stake-wrap">
                        {item?.cashout && (
                          <button
                            // onClick={() =>
                            //   handleCashOutSportsBook(
                            //     item,
                            //     sportsBook,
                            //     setOpenBetSlip,
                            //     setPlaceBetValues
                            //   )
                            // }
                            style={{ fontSize: "12px" }}
                          >
                            Cashout
                          </button>
                        )}

                        {column && <h3>{column?.Price}</h3>}
                        <h3>{item?.userRate} </h3>
                        <h3> {item?.amount}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-menu-box" style={{ marginTop: "12px" }}>
            <div className="card-blank">
              <span> No open bets!!!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenBets;
