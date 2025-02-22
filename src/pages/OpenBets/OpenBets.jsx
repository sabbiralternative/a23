import useCurrentBets from "../../hooks/useCurrentBets";

const OpenBets = () => {
  const { myBets } = useCurrentBets();
  return (
    <>
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
                  <h3>Odds</h3>
                  <h3>Stake</h3>
                </div>
              </div>
              {myBets?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`allbet-datalist ${
                      item?.betType === "Back" ? "forback " : "forlay "
                    }`}
                  >
                    <div className="allbet-gameinfo">
                      <div className="allbet-content">
                        <h3> {item?.nation}</h3>
                        <p> {item?.placeDate} </p>
                      </div>
                    </div>
                    <div className="allbet-odds-stake-wrap">
                      <h3> </h3>
                      <h3></h3>
                      <h3> {item?.userRate}</h3>
                      <h3> {item?.amount}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-menu-box">
          <div className="card-blank">
            <span>
              You {"don't"} have any {"bet's"} matched
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenBets;
