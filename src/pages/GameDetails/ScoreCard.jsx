const ScoreCard = ({ score2 }) => {
  return (
    <div
      style={{ marginTop: "2px", padding: "5px 12px" }}
      id="score-board"
      className="score-board  show mb-md-3"
    >
      <div className="sc_cw-main-container">
        <div className="sc_cw-header">
          <div
            className="sc_cw-team-info-desktop"
            style={{ width: "100%!important", fontWeight: 200 }}
          >
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                gridTemplateRows: "auto auto",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontWeight: 500, fontSize: "16px" }}>
                  {score2?.team_name}
                </span>
                <span style={{ fontWeight: 500, fontSize: "16px" }}>
                  {score2?.team_runs}
                </span>
                <span style={{ fontWeight: 100, fontSize: "12px" }}>
                  {score2?.team_overs}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%!important",
                  textAlign: "center",
                  gridColumn: 2,
                  gridRow: "1/span 2",
                }}
              >
                <span
                  style={{
                    width: "100%",
                    fontWeight: 500,
                    fontSize: "12px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    textTransform: "capitalize!important",
                  }}
                >
                  {score2?.status}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%!important",
                  textAlign: "right",
                  gridColumn: 3,
                  gridRow: "1/span 2",
                }}
              >
                <span
                  style={{
                    width: "100%",
                    fontWeight: 500,
                    fontSize: "10px",
                    textTransform: "capitalize!important",
                  }}
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>
                  <span style={{ fontWeight: 500, fontSize: "10px" }}>
                    {score2?.crr && (
                      <>
                        CRR:
                        <span style={{ fontWeight: 100 }}>{score2?.crr}</span>
                      </>
                    )}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 500, fontSize: "10px" }}>
                    {score2?.rrr && (
                      <>
                        RRR:
                        <span style={{ fontWeight: 100 }}>{score2?.rrr}</span>
                      </>
                    )}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 500, fontSize: "10px" }}>
                    {score2?.status2 && (
                      <>
                        RRR:
                        <span style={{ fontWeight: 100 }}>
                          {score2?.status2}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sc_cw-overs-info"
          style={{
            width: "100%!important",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          <div
            className
            style={{
              marginLeft: "5px!important",
              marginRight: "5px!important",
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              overflowX: "auto",
              fontSize: "12px",
            }}
          >
            <div className="sc_cw-over">
              <span
                style={{
                  border: score2?.recent_overs?.[0]?.title
                    ? ".25px solid #000000"
                    : "none",
                  borderRadius: "2px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                {score2?.recent_overs?.[0]?.title}
              </span>
              {score2?.recent_overs?.[0]?.balls?.map((ball, i) => (
                <div key={i} className="sc_cw-ball">
                  {ball}
                </div>
              ))}
            </div>
            <div className="sc_cw-over">
              <span
                style={{
                  border: score2?.recent_overs?.[1]?.title
                    ? ".25px solid #000000"
                    : "none",
                  borderRadius: "2px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                {score2?.recent_overs?.[1]?.title}
              </span>
              {score2?.recent_overs?.[1]?.balls?.map((ball, i) => (
                <div key={i} className="sc_cw-ball">
                  {ball}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="sc_cw-other-info"
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflowX: "auto",
            fontSize: "12px",
          }}
        >
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <span style={{ fontWeight: 600 }}>PSHIP R:</span>{" "}
            {score2?.partnership_runs}
          </div>
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <span style={{ fontWeight: 600 }}>PSHIP B:</span>{" "}
            {score2?.partnership_balls}
          </div>
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <span style={{ fontWeight: 600 }}>LAST WICKET:</span>{" "}
            {score2?.last_wicket}
          </div>
        </div>
        <div style={{ overflowX: "auto", width: "100%" }}>
          <div
            className="sc_cw-table-container"
            style={{
              minWidth: "100%",
              width: "max-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className=" sc_cw-table-row sc_cw-desktop-row"
              style={{
                backgroundColor: "#cbcbcb",
                color: "#000000",
                paddingTop: "2px",
                paddingBottom: "2px",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  minWidth: "95px!important",
                  whiteSpace: "nowrap",
                  textAlign: "left!important",
                }}
              >
                Batsmen{" "}
              </div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>R</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>B</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>4s</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>6s</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>SR</div>
            </div>
            {score2?.batsmen?.map((batMen, i) => (
              <div
                key={i}
                className="sc_cw-table-row sc_cw-desktop-row"
                style={{ paddingTop: "2px", paddingBottom: "2px" }}
              >
                <div
                  style={{
                    minWidth: "95px!important",
                    whiteSpace: "nowrap",
                    textAlign: "left!important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  {batMen?.strike == 1 && (
                    <svg
                      style={{ height: "100%" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      id="Layer_2"
                      data-name="Layer 2"
                      viewBox="0 0 475 474.99"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              ".cls-1{fill:#003a61}.cls-2{fill:#00a9e4}.cls-3{fill:#00eacf}.cls-4{fill:#fed853}",
                          }}
                        />
                      </defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <path
                            className="cls-1"
                            d="M364.1,191.58l-80.68-80.68c-3.78-3.78-9.9-3.78-13.68,0L15.21,365.43c-20.27,20.27-20.28,53.15,0,73.43l20.93,20.93c20.27,20.27,53.15,20.27,73.43,0l254.54-254.54c3.78-3.78,3.78-9.9,0-13.68ZM98.25,448.48c-14,14-36.79,14.01-50.8,0l-20.93-20.93c-14.01-14.01-14-36.8,0-50.8l250.06-250.06,71.73,71.73-250.06,250.06Z"
                          />
                          <path
                            className="cls-4"
                            d="M348.31,198.41l-250.06,250.06c-14,14-36.79,14.01-50.8,0l-20.93-20.93c-14.01-14.01-14-36.8,0-50.8l250.06-250.06,71.73,71.73Z"
                          />
                          <path
                            className="cls-1"
                            d="M435.67,0l-143.68,143.68-70.9,107.91c-.93,1.41.74,3.09,2.15,2.16l108.08-70.75L475,39.33,435.67,0Z"
                          />
                          <g>
                            <rect
                              className="cls-3"
                              x="424.52"
                              y="26.77"
                              width="30.13"
                              height="19.91"
                              transform="translate(154.72 -300.08) rotate(45)"
                            />
                            <rect
                              className="cls-2"
                              x="399.25"
                              y="52.05"
                              width="30.13"
                              height="19.91"
                              transform="translate(165.19 -274.8) rotate(45)"
                            />
                            <rect
                              className="cls-3"
                              x="373.97"
                              y="77.32"
                              width="30.13"
                              height="19.91"
                              transform="translate(175.66 -249.53) rotate(45)"
                            />
                            <rect
                              className="cls-2"
                              x="348.7"
                              y="102.6"
                              width="30.13"
                              height="19.91"
                              transform="translate(186.13 -224.25) rotate(45)"
                            />
                            <rect
                              className="cls-3"
                              x="323.42"
                              y="127.87"
                              width="30.13"
                              height="19.91"
                              transform="translate(196.6 -198.98) rotate(45)"
                            />
                          </g>
                          <polygon
                            className="cls-2"
                            points="323.61 173.71 258.69 216.21 301.28 151.38 323.61 173.71"
                          />
                        </g>
                      </g>
                    </svg>
                  )}
                  {batMen?.name}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.runs}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.balls}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.four}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.six}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.sr}
                </div>
              </div>
            ))}
          </div>

          <div
            className="sc_cw-table-container"
            style={{
              minWidth: "100%",
              width: "max-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="sc_cw-table-row sc_cw-desktop-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "2px",
                paddingBottom: "2px",
                backgroundColor: "#cbcbcb",
                color: " #000000",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  display: "flex!important",
                  alignItems: "center!important",
                  justifyContent: "left!important",
                  minWidth: "95px!important",
                  whiteSpace: "nowrap",
                  textAlign: "left!important",
                  height: "100%",
                }}
              >
                <span style={{ marginLeft: "5px" }}>Bowler</span>
              </div>
              <div style={{ minWidth: "40px!important" }}>O</div>
              <div style={{ minWidth: "40px!important" }}>M</div>
              <div style={{ minWidth: "40px!important" }}>R</div>
              <div style={{ minWidth: "40px!important" }}>W</div>
              <div style={{ minWidth: "40px!important" }}>Eco</div>
            </div>

            <div
              className="sc_cw-table-row sc_cw-desktop-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            >
              <div
                style={{
                  display: "flex!important",
                  alignItems: "center!important",
                  justifyContent: "left!important",
                  minWidth: "95px!important",
                  whiteSpace: "nowrap",
                  textAlign: "left!important",
                  height: "100%",
                }}
              >
                <span style={{ marginLeft: "5px" }}>
                  {score2?.bowler?.name}
                </span>
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.overs}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.maidens}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.runs}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.wickets}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.eco}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
