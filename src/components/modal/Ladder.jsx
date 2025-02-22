import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";

const Ladder = ({ ladderData, setLadderData }) => {
  const ladderRef = useRef();
  useCloseModalClickOutside(ladderRef, () => {
    setLadderData([]);
  });
  return (
    <div className="Modal-Background ng-tns-c159-13 ng-star-inserted">
      <div
        className="depositpop ng-tns-c159-13"
        style={{ gap: "0" }}
        ref={ladderRef}
      >
        <div className="depositbreak ng-tns-c159-13" style={{ height: "25px" }}>
          <p className="ng-tns-c159-13" style={{ fontSize: "11px" }}>
            Ladder
          </p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setLadderData([])}
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

        <div className="mat-expansion-panel-content ng-trigger ng-trigger-bodyExpansion">
          <div
            className="mat-expansion-panel-body"
            
          >
            <div className="allbet-datawrap" style={{paddingRight:'10px'}}>
              <div className="allbet-header">
                <div className="allbet-title">
                  <h3>Score</h3>
                </div>
                <div className="allbet-headcol">
                  <h3></h3>
                  <h3></h3>
                  <h3></h3>
                  <h3 style={{textAlign:'end'}}>Win/Loss</h3>
                </div>
              </div>
              {ladderData?.map((item, i) => {
                return (
                  <div key={i} className={`allbet-datalist`}>
                    <div className="allbet-gameinfo">
                      <div className="allbet-content">
                        <h3>
                          {" "}
                          {item?.start}-{item?.end}
                        </h3>
                      </div>
                    </div>
                    <div className="allbet-odds-stake-wrap">
                      <h3> </h3>
                      <h3></h3>
                      <h3></h3>
                      <h3 
                      
                      style={{textAlign:'end'}}
                        className={`${
                          item?.exposure > 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {" "}
                        {item?.exposure}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ladder;
