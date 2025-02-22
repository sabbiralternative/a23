import { handleNavigateEventPage } from "../../../../utils/handleNavigateEventPage";
import { useNavigate } from "react-router-dom";

const CardTwo = ({ liveSports, keys, sportsType }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        handleNavigateEventPage(liveSports, keys, navigate);
      }}
      style={{ cursor: "pointer" }}
      className="bt12577 bt12497"
      data-editor-id="scoreBoardCard"
    >
      {sportsType == 1 && (
        <div className="bt12580 bt12579">
          <div className="bt12581">
            <div className="bt6522" data-editor-id="scoreBoardCategory">
              <div className="bt252 bt257 bt243">
                <span className="bt253">
                  {liveSports[keys]?.eventTypeId == 1 && (
                    <svg
                      className="bt254"
                      data-cy="sport-soccer"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        fill: "currentcolor",
                        color: "inherit",
                        width: "auto",
                        height: "13px",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.04 21.3793C12.368 22.0323 13.8288 22.393 15.3425 22.4261L17.8734 19.5272C17.9026 17.8165 17.5076 16.1267 16.7246 14.6139L11.7195 13.4485C10.675 14.4949 9.86495 15.7551 9.35078 17.1439L11.04 21.3793ZM10.7764 22.204L9.08458 23.6141C10.9111 25.274 13.3374 26.2857 16 26.2857C16.511 26.2857 17.0133 26.2485 17.5043 26.1765L15.3359 23.2833C13.7356 23.25 12.1884 22.8783 10.7764 22.204ZM5.7343 16.6469H8.62297C9.20019 15.1755 10.086 13.8441 11.2164 12.7406V9.62205C10.2129 9.37945 9.1786 9.29054 8.14698 9.35692C6.6294 11.1491 5.71429 13.4677 5.71429 16C5.71429 16.2173 5.72102 16.433 5.7343 16.6469ZM22.9116 19.3483C23.8049 18.4384 24.5225 17.3714 25.0254 16.2017L23.6597 11.542C22.5016 10.9523 21.2395 10.587 19.9272 10.4698L17.6048 14.4567C18.3 15.8824 18.6825 17.4437 18.7275 19.033L22.9116 19.3483ZM23.4088 20.0636V23.1348C25.0358 21.4457 26.0906 19.2017 26.2613 16.7145L25.7741 16.6293C25.2096 17.9111 24.4065 19.0765 23.4088 20.0636ZM23.9985 9.53268C22.4866 7.66509 20.3338 6.33759 17.8747 5.88473C17.5281 6.28981 17.2149 6.71981 16.9371 7.17124L19.7454 9.596C21.1338 9.68779 22.4749 10.0354 23.7142 10.6149L23.9985 9.53268ZM16.0845 6.92604C16.3235 6.51838 16.5885 6.12608 16.8785 5.75128C16.5889 5.72678 16.2959 5.71429 16 5.71429C13.2876 5.71429 10.8204 6.76421 8.98261 8.47983C9.78915 8.49238 10.5923 8.59246 11.3784 8.77945C11.4114 8.75319 11.4487 8.73155 11.4894 8.71569L16.0845 6.92604ZM16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28Z"
                      ></path>
                    </svg>
                  )}
                </span>
                <span style={{ fontSize: "10px" }} className="bt255 bt258">
                  {liveSports[keys]?.seriesName}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="bt12590 bt12591"
        data-editor-id="scoreBoardContent"
        style={{ position: "relative", paddingBottom: "3px" }}
      >
        <div className="bt12592">
          {/* team 1 */}
          <div className="bt12593">
            <div className="bt12600">
              <div className="bt12602">
                <div
                  className="bt6474"
                  style={{ width: "40px", height: "40px" }}
                >
                  <img
                    data-savepage-src="https://static.sptpub.com/competitors/images/normal/medium/17.png"
                    src={liveSports?.[keys]?.image1}
                    alt=""
                    style={{ height: "30px" }}
                    className="bt6475"
                  />
                </div>
              </div>
              <div style={{ fontSize: "10px" }} className="bt12603">
                {liveSports?.[keys]?.player1}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  data-editor-id="tableOutcomePlate"
                  className="bt6588  "
                  style={{ width: "45px", paddingLeft: "0px" }}
                >
                  <div className={`bt6592 bt12699 odds_back  `}>
                    <span
                      className={`mdc-button__label  `}
                      style={{ verticalAlign: "middle", width: "100%" }}
                    >
                      <h4 style={{ fontSize: "10px" }}>
                        
                        {
                          liveSports?.[keys]?.[0]?.ex?.availableToBack?.[0]
                            ?.price
                        }
                      </h4>
                      <p style={{ fontSize: "10px" }} className="odds_volume">
                        {liveSports?.[keys]?.[0]?.ex?.availableToBack?.[0]?.size
                          ?.split(".")?.[0]
                          ?.slice(0, 4)}
                      </p>
                    </span>
                  </div>
                </div>
                <div
                  data-editor-id="tableOutcomePlate"
                  className="bt6588  "
                  style={{ width: "45px" }}
                >
                  <div className={`bt6592 bt12699 odds_lay  `}>
                    <span
                      className={`mdc-button__label  `}
                      style={{ verticalAlign: "middle", width: "100%" }}
                    >
                      <h4 style={{ fontSize: "10px" }}>
                       
                        {
                          liveSports?.[keys]?.[0]?.ex?.availableToLay?.[0]
                            ?.price
                        }
                      </h4>
                      <p style={{ fontSize: "10px" }} className="odds_volume">
                        {liveSports?.[keys]?.[0]?.ex?.availableToLay?.[0]?.size
                          ?.split(".")?.[0]
                          ?.slice(0, 4)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bt12593">
              <div className="bt12613">
                <svg
                  className="bt12614"
                  data-cy="ic-live-simple"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#FF4E4E"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    fill: "rgb(255, 78, 78)",
                    color: "rgb(255, 78, 78)",
                    width: "auto",
                    height: "16px",
                  }}
                >
                  <path d="M12.9628 3.20912C12.6766 2.93029 12.2125 2.93029 11.9263 3.20912C11.6401 3.48794 11.6401 3.94001 11.9263 4.21883C12.436 4.71538 12.8404 5.30487 13.1163 5.95365C13.3921 6.60242 13.5341 7.29777 13.5341 8C13.5341 8.70223 13.3921 9.39758 13.1163 10.0464C12.8404 10.6951 12.436 11.2846 11.9263 11.7812C11.6401 12.06 11.6401 12.5121 11.9263 12.7909C12.2125 13.0697 12.6766 13.0697 12.9628 12.7909C13.6087 12.1617 14.121 11.4148 14.4706 10.5928C14.8201 9.77079 15 8.88975 15 8C15 7.11025 14.8201 6.22921 14.4706 5.40719C14.121 4.58517 13.6087 3.83827 12.9628 3.20912Z"></path>
                  <path d="M10.0422 5.11529C10.3284 4.83647 10.7925 4.83647 11.0787 5.11529C11.4708 5.49724 11.7818 5.95068 11.994 6.44972C12.2062 6.94876 12.3155 7.48363 12.3155 8.02379C12.3155 8.56395 12.2062 9.09881 11.994 9.59786C11.7818 10.0969 11.4708 10.5503 11.0787 10.9323C10.7925 11.2111 10.3284 11.2111 10.0422 10.9323C9.75595 10.6535 9.75595 10.2014 10.0422 9.92257C10.2982 9.67322 10.5012 9.37719 10.6397 9.0514C10.7783 8.72561 10.8496 8.37642 10.8496 8.02379C10.8496 7.67115 10.7783 7.32197 10.6397 6.99617C10.5012 6.67038 10.2982 6.37436 10.0422 6.12501C9.75595 5.84618 9.75595 5.39412 10.0422 5.11529Z"></path>
                  <path d="M8.05198 9.51147C8.90891 9.51147 9.60359 8.83477 9.60359 8.00002C9.60359 7.16526 8.90891 6.48856 8.05198 6.48856C7.19504 6.48856 6.50036 7.16526 6.50036 8.00002C6.50036 8.83477 7.19504 9.51147 8.05198 9.51147Z"></path>
                  <path d="M6.05604 5.11529C5.76981 4.83647 5.30574 4.83647 5.0195 5.11529C4.62741 5.49724 4.31638 5.95068 4.10418 6.44972C3.89198 6.94876 3.78276 7.48363 3.78276 8.02379C3.78276 8.56395 3.89198 9.09881 4.10418 9.59786C4.31638 10.0969 4.62741 10.5503 5.0195 10.9323C5.30574 11.2111 5.76981 11.2111 6.05604 10.9323C6.34228 10.6535 6.34228 10.2014 6.05604 9.92257C5.80007 9.67322 5.59702 9.37719 5.45848 9.0514C5.31995 8.72561 5.24865 8.37642 5.24865 8.02379C5.24865 7.67115 5.31995 7.32197 5.45848 6.99617C5.59702 6.67038 5.80007 6.37436 6.05604 6.12501C6.34228 5.84618 6.34228 5.39412 6.05604 5.11529Z"></path>
                  <path d="M3.03717 3.20912C3.3234 2.93029 3.78748 2.93029 4.07371 3.20912C4.35994 3.48794 4.35994 3.94001 4.07371 4.21883C3.56397 4.71538 3.15962 5.30487 2.88375 5.95365C2.60788 6.60242 2.46589 7.29777 2.46589 8C2.46589 8.70223 2.60788 9.39758 2.88375 10.0464C3.15962 10.6951 3.56397 11.2846 4.07371 11.7812C4.35994 12.06 4.35994 12.5121 4.07371 12.7909C3.78748 13.0697 3.3234 13.0697 3.03717 12.7909C2.39131 12.1617 1.87898 11.4148 1.52944 10.5928C1.1799 9.77078 1 8.88975 1 8C1 7.11025 1.1799 6.22921 1.52944 5.40719C1.87898 4.58517 2.39131 3.83827 3.03717 3.20912Z"></path>
                </svg>
                <div
                  style={{ fontSize: "10px" }}
                  className="bt6541 bt12616"
                  data-editor-id="eventCardStatusLabel"
                >
                  {liveSports?.[keys]?.timeStatus}
                </div>
              </div>
              <div className="bt12617 bt12594">
                {liveSports?.[keys]?.team1Score && (
                  <div
                    style={{ fontSize: "10px" }}
                    className="bt12618 bt12619"
                    data-editor-id="scoreBoardScore"
                  >
                    {liveSports?.[keys]?.team1Score}
                  </div>
                )}

                {liveSports?.[keys]?.team1Score && (
                  <div className="bt12620" style={{ fontSize: "10px" }}>
                    :
                  </div>
                )}

                {liveSports?.[keys]?.team2Score && (
                  <div
                    style={{ fontSize: "10px" }}
                    className="bt12618 bt12619"
                    data-editor-id="scoreBoardScore"
                  >
                    {liveSports?.[keys]?.team2Score}
                  </div>
                )}
              </div>
            </div> */}
          {/* team 2 */}
          <div className="bt12593">
            <div className="bt12600 bt12601">
              <div className="bt12602">
                <div
                  className="bt6474"
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    data-savepage-src="https://static.sptpub.com/competitors/images/normal/medium/72.png"
                    src={liveSports?.[keys]?.image2}
                    alt=""
                    style={{ height: "30px" }}
                    className="bt6475"
                  />
                </div>
              </div>
              <div style={{ fontSize: "10px" }} className="bt12603">
                {liveSports?.[keys]?.player2}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  data-editor-id="tableOutcomePlate"
                  className="bt6588  "
                  style={{ width: "45px" }}
                >
                  <div className={`bt6592 bt12699 odds_back  `}>
                    <span
                      className={`mdc-button__label  `}
                      style={{ verticalAlign: "middle", width: "100%" }}
                    >
                      <h4 style={{ fontSize: "10px" }}>
                  
                        {
                          liveSports?.[keys]?.[1]?.ex?.availableToBack?.[0]
                            ?.price
                        }
                      </h4>
                      <p style={{ fontSize: "10px" }} className="odds_volume">
                        {liveSports?.[keys]?.[1]?.ex?.availableToBack?.[0]?.size
                          ?.split(".")?.[0]
                          ?.slice(0, 4)}
                      </p>
                    </span>
                  </div>
                </div>
                <div
                  data-editor-id="tableOutcomePlate"
                  className="bt6588  "
                  style={{ width: "45px", paddingRight: "0px" }}
                >
                  <div className={`bt6592 bt12699 odds_lay  `}>
                    <span
                      className={`mdc-button__label  `}
                      style={{ verticalAlign: "middle", width: "100%" }}
                    >
                      <h4 style={{ fontSize: "10px" }}>
                     
                        {
                          liveSports?.[keys]?.[1]?.ex?.availableToLay?.[0]
                            ?.price
                        }
                      </h4>
                      <p style={{ fontSize: "10px" }} className="odds_volume">
                        {liveSports?.[keys]?.[1]?.ex?.availableToLay?.[0]?.size
                          ?.split(".")?.[0]
                          ?.slice(0, 4)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Score */}
        <div className="bt12593" style={{ position: "absolute" }}>
          <div className="bt12613">
            {liveSports?.[keys]?.inPlay == 1 && (
              <svg
                className="bt12614"
                data-cy="ic-live-simple"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#FF4E4E"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  fill: "rgb(255, 78, 78)",
                  color: "rgb(255, 78, 78)",
                  width: "auto",
                  height: "16px",
                }}
              >
                <path d="M12.9628 3.20912C12.6766 2.93029 12.2125 2.93029 11.9263 3.20912C11.6401 3.48794 11.6401 3.94001 11.9263 4.21883C12.436 4.71538 12.8404 5.30487 13.1163 5.95365C13.3921 6.60242 13.5341 7.29777 13.5341 8C13.5341 8.70223 13.3921 9.39758 13.1163 10.0464C12.8404 10.6951 12.436 11.2846 11.9263 11.7812C11.6401 12.06 11.6401 12.5121 11.9263 12.7909C12.2125 13.0697 12.6766 13.0697 12.9628 12.7909C13.6087 12.1617 14.121 11.4148 14.4706 10.5928C14.8201 9.77079 15 8.88975 15 8C15 7.11025 14.8201 6.22921 14.4706 5.40719C14.121 4.58517 13.6087 3.83827 12.9628 3.20912Z"></path>
                <path d="M10.0422 5.11529C10.3284 4.83647 10.7925 4.83647 11.0787 5.11529C11.4708 5.49724 11.7818 5.95068 11.994 6.44972C12.2062 6.94876 12.3155 7.48363 12.3155 8.02379C12.3155 8.56395 12.2062 9.09881 11.994 9.59786C11.7818 10.0969 11.4708 10.5503 11.0787 10.9323C10.7925 11.2111 10.3284 11.2111 10.0422 10.9323C9.75595 10.6535 9.75595 10.2014 10.0422 9.92257C10.2982 9.67322 10.5012 9.37719 10.6397 9.0514C10.7783 8.72561 10.8496 8.37642 10.8496 8.02379C10.8496 7.67115 10.7783 7.32197 10.6397 6.99617C10.5012 6.67038 10.2982 6.37436 10.0422 6.12501C9.75595 5.84618 9.75595 5.39412 10.0422 5.11529Z"></path>
                <path d="M8.05198 9.51147C8.90891 9.51147 9.60359 8.83477 9.60359 8.00002C9.60359 7.16526 8.90891 6.48856 8.05198 6.48856C7.19504 6.48856 6.50036 7.16526 6.50036 8.00002C6.50036 8.83477 7.19504 9.51147 8.05198 9.51147Z"></path>
                <path d="M6.05604 5.11529C5.76981 4.83647 5.30574 4.83647 5.0195 5.11529C4.62741 5.49724 4.31638 5.95068 4.10418 6.44972C3.89198 6.94876 3.78276 7.48363 3.78276 8.02379C3.78276 8.56395 3.89198 9.09881 4.10418 9.59786C4.31638 10.0969 4.62741 10.5503 5.0195 10.9323C5.30574 11.2111 5.76981 11.2111 6.05604 10.9323C6.34228 10.6535 6.34228 10.2014 6.05604 9.92257C5.80007 9.67322 5.59702 9.37719 5.45848 9.0514C5.31995 8.72561 5.24865 8.37642 5.24865 8.02379C5.24865 7.67115 5.31995 7.32197 5.45848 6.99617C5.59702 6.67038 5.80007 6.37436 6.05604 6.12501C6.34228 5.84618 6.34228 5.39412 6.05604 5.11529Z"></path>
                <path d="M3.03717 3.20912C3.3234 2.93029 3.78748 2.93029 4.07371 3.20912C4.35994 3.48794 4.35994 3.94001 4.07371 4.21883C3.56397 4.71538 3.15962 5.30487 2.88375 5.95365C2.60788 6.60242 2.46589 7.29777 2.46589 8C2.46589 8.70223 2.60788 9.39758 2.88375 10.0464C3.15962 10.6951 3.56397 11.2846 4.07371 11.7812C4.35994 12.06 4.35994 12.5121 4.07371 12.7909C3.78748 13.0697 3.3234 13.0697 3.03717 12.7909C2.39131 12.1617 1.87898 11.4148 1.52944 10.5928C1.1799 9.77078 1 8.88975 1 8C1 7.11025 1.1799 6.22921 1.52944 5.40719C1.87898 4.58517 2.39131 3.83827 3.03717 3.20912Z"></path>
              </svg>
            )}

            <div
              style={{ fontSize: "10px" }}
              className="bt6541 bt12616"
              data-editor-id="eventCardStatusLabel"
            >
              {liveSports?.[keys]?.timeStatus}
            </div>
          </div>
          <div className="bt12617 bt12594" style={{ marginTop: "5px" }}>
            {liveSports?.[keys]?.score?.total_1 && (
              <div
                style={{ fontSize: "10px" }}
                className="bt12618 bt12619"
                data-editor-id="scoreBoardScore"
              >
                {liveSports?.[keys]?.score?.total_1}
              </div>
            )}

            {liveSports?.[keys]?.score?.total_1 && (
              <div className="bt12620" style={{ fontSize: "10px" }}>
                :
              </div>
            )}

            {liveSports?.[keys]?.score?.total_2 && (
              <div
                style={{ fontSize: "10px" }}
                className="bt12618 bt12619"
                data-editor-id="scoreBoardScore"
              >
                {liveSports?.[keys]?.score?.total_2}
              </div>
            )}
          </div>
        </div>
        {/* Draw */}
        {liveSports?.[keys]?.[2] && (
          <div
            className="bt12593"
            style={{ position: "absolute", bottom: "5px" }}
          >
            <div className="bt12600 bt12601" style={{ alignItems: "center" }}>
              <div style={{ fontSize: "10px" }} className="bt12603">
                Draw
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  data-editor-id="tableOutcomePlate"
                  className="bt6588  "
                  style={{ width: "45px" }}
                >
                  <div className={`bt6592 bt12699 odds_back  `}>
                    <span
                      className={`mdc-button__label  `}
                      style={{ verticalAlign: "middle", width: "100%" }}
                    >
                      <h4 style={{ fontSize: "10px" }}>
                        
                        {
                          liveSports?.[keys]?.[2]?.ex?.availableToBack?.[0]
                            ?.price
                        }
                      </h4>
                      <p style={{ fontSize: "10px" }} className="odds_volume">
                        {liveSports?.[keys]?.[2]?.ex?.availableToBack?.[0]?.size
                          ?.split(".")?.[0]
                          ?.slice(0, 4)}
                      </p>
                    </span>
                  </div>
                </div>
                <div
                  data-editor-id="tableOutcomePlate"
                  className="bt6588  "
                  style={{ width: "45px", paddingRight: "0px" }}
                >
                  <div className={`bt6592 bt12699 odds_lay  `}>
                    <span
                      className={`mdc-button__label  `}
                      style={{ verticalAlign: "middle", width: "100%" }}
                    >
                      <h4 style={{ fontSize: "10px" }}>
                        
                        {
                          liveSports?.[keys]?.[2]?.ex?.availableToLay?.[0]
                            ?.price
                        }
                      </h4>
                      <p style={{ fontSize: "10px" }} className="odds_volume">
                        {liveSports?.[keys]?.[2]?.ex?.availableToLay?.[0]?.size
                          ?.split(".")?.[0]
                          ?.slice(0, 4)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTwo;
