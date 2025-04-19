import { useNavigate } from "react-router-dom";
import usePassbook from "../../hooks/usePassbook";
import useContextState from "../../hooks/useContextState";
import moment from "moment";

const BettingProfitLoss = () => {
  const { passbook } = usePassbook();
  const navigate = useNavigate();
  const { token } = useContextState();
  const handleNavigateSinglePassbook = (item) => {
    if (item?.plDetails) {
      navigate(`/betting-profit-loss/${item?.marketId}`);
    }
  };

  const getUniqueDate = Array.from(
    new Set(passbook?.map((item) => item?.settledTime))
  );
  return (
    <div className="mat-accordion bet-history-accordion ">
      <div
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
        className="deposit-report-head "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 20 20"
          fill="none"
          className=""
        >
          <path
            d="M13.1213 17.0761L6.25 10.2047L13.1213 3.33337L14.0833 4.31254L8.19115 10.2047L14.0833 16.0969L13.1213 17.0761Z"
            fill="#228435"
            className=""
          ></path>
        </svg>
        <span className="deposit-withdraw-head-title  ng-star-inserted">
          Back
        </span>
      </div>
      {token && getUniqueDate?.length > 0 ? (
        <div>
          {getUniqueDate?.map((date) => {
            const filterByDate = passbook?.filter(
              (item) => item?.settledTime === date
            );
            const totalPnl = filterByDate?.reduce((acc, curr) => {
              return acc + curr.memberWin;
            }, 0);
            return (
              <div key={date}>
                <div
                  className="mat-expansion-panel   mat-expanded mat-expansion-panel-spacing"
                  style={{
                    marginBottom: "3px",
                    color: "black",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 10px",
                    backgroundColor: "var(--color1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "140%",
                    }}
                  >
                    {moment(date).format("Do-MMM-YYYY")}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "140%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>Total PL</span>
                    <span style={{ marginTop: "-2px", marginLeft: "4px" }}>
                      :
                    </span>
                    <span
                      style={{
                        marginLeft: "4px",
                        textShadow: "1px 1px #000000",
                        color:
                          totalPnl > 0
                            ? "#48BB78"
                            : totalPnl < 0
                            ? "#F56565"
                            : "#FFFFFF",
                      }}
                    >
                      {totalPnl}
                    </span>
                  </div>
                </div>

                {passbook?.map((item, i) => {
                  return (
                    <div
                      onClick={() => handleNavigateSinglePassbook(item)}
                      key={i}
                      style={{
                        marginBottom: "3px",
                      }}
                      className="mat-expansion-panel   mat-expanded mat-expansion-panel-spacing"
                    >
                      <div className="mat-expansion-panel-header mat-focus-indicator   mat-expansion-toggle-indicator-after  mat-expanded">
                        <span className="mat-content  mat-content-hide-toggle">
                          <div className="mat-expansion-panel-header-title ">
                            <h3>{item?.narration}</h3>
                            <h3>Balance: {item?.balance}</h3>
                          </div>
                          <div className="mat-expansion-panel-header-description ">
                            <span> PL:</span>{" "}
                            <span
                              className={`${
                                item?.memberWin > 0 ? "Won" : "Lost"
                              }`}
                            >
                              {item?.memberWin}
                            </span>
                          </div>
                        </span>
                      </div>
                      <div
                        role="region"
                        className="mat-expansion-panel-content  ng-trigger ng-trigger-bodyExpansion"
                        id="cdk-accordion-child-8"
                        aria-labelledby="mat-expansion-panel-header-8"
                      ></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-data ng-star-inserted">
          <p>Please login to view your passbook entries</p>
        </div>
      )}
    </div>
  );
};

export default BettingProfitLoss;
