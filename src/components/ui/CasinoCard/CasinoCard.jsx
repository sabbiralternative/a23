import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { Settings } from "../../../api";
import { useState } from "react";
import AEDRules from "../../modal/AEDRules";
import Warning from "../../modal/Warning";

const CasinoCard = ({ games, title }) => {
  const { token, wallet, setShowWarning, showWarning } = useContextState();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [casinoInfo, setCasinoInfo] = useState({});


  const navigateCasinoVideo = (casino) => {
    if (title !== "Indian") {
      if (token) {
        if (wallet === "main") {
          if (Settings.casinoCurrency !== "AED") {
            navigate(
              `/casino/${casino?.game_name.replace(/ /g, "")}/${
                casino?.game_id
              }`
            );
          } else {
            setShowModal(true);
            setCasinoInfo({
              provider_name: casino?.game_name.replace(/ /g, ""),
              game_id: casino?.game_id,
              base: "casino",
            });
          }
        } else {
          setShowWarning(true);
        }
      } else {
        navigate("/login");
      }
    }
    if (title === "Indian" || title === 'Royal') {
      if (wallet === "bonus") {
        setShowWarning(true);
      } else {
        navigate(
          token
            ? `/casino/${casino?.game_name.replace(/ /g, "")}/${
                casino?.game_id
              }`
            : navigate("/login")
        );
      }
    }
  };

  return (
    <>
      {showWarning && <Warning setShowModal={setShowWarning} />}
      {showModal && (
        <AEDRules setShowModal={setShowModal} casinoInfo={casinoInfo} />
      )}
      <div className="s15yntg2">
        <div className="title">{title} Casino Games</div>
        <div className="s1qvj928 game-list">
          <div className="game-list">
            {games?.map((casino, i) => {
              return (
                <div
                  onClick={() => navigateCasinoVideo(casino)}
                  key={i}
                  className="s1raq561"
                >
                  <a className="game-img-wrap">
                    <img src={casino?.img} className="game-img" alt="" />
                    <div className="online">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="10"
                        viewBox="0 0 9 10"
                        fill="none"
                      >
                        <path
                          d="M7.78243 7.00126C7.98931 8.18376 7.16525 9.0422 6.01681 9.23532C4.90775 9.42188 3.09993 9.42188 1.99087 9.23532C0.842435 9.04251 0.0183723 8.18438 0.225247 7.00157C0.400872 5.99813 1.25118 5.37282 2.28993 5.42657C3.04868 5.46594 3.51493 5.56469 4.05462 5.56469C4.60056 5.56469 4.96431 5.46594 5.71743 5.42657C6.75587 5.37219 7.60712 5.99782 7.78243 7.00126ZM3.86275 0.907195C4.95368 0.907195 5.83837 1.79157 5.83837 2.88313C5.83837 3.9747 4.95368 4.85907 3.86275 4.85907C2.7715 4.85907 1.88681 3.97438 1.88681 2.88313C1.88681 1.79188 2.7715 0.907195 3.86275 0.907195Z"
                          fill="url(#paint0_linear_451_3515)"
                        ></path>
                        <path
                          d="M7.42806 5.14407C7.95931 5.2425 8.59868 5.525 8.85493 6.28813C9.09181 6.99375 8.81275 7.54688 8.49493 7.91282C8.39368 8.02938 8.19087 7.92813 8.24118 7.78532C8.37181 7.41594 8.42431 6.94407 8.21993 6.42157C8.02118 5.91313 7.65337 5.59282 7.31962 5.39563C7.18025 5.31344 7.26681 5.11407 7.42806 5.14407ZM5.63118 0.938442C5.47243 0.825317 5.58681 0.582817 5.77868 0.631255C5.98087 0.682192 6.189 0.761567 6.38306 0.883442C7.02337 1.28657 7.33993 1.99969 7.22712 2.79188C7.17462 3.16157 7.01056 3.44907 6.82587 3.66625C6.70431 3.80969 6.46431 3.69032 6.51431 3.51157C6.63181 3.09219 6.6665 2.55657 6.44056 1.96813C6.25431 1.48344 5.93587 1.15625 5.63118 0.938442Z"
                          fill="#26AB4B"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_451_3515"
                            x1="5.21662"
                            y1="0.333274"
                            x2="5.21662"
                            y2="9.37524"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#85F25E"></stop>
                            <stop offset="1" stopColor="#33EF00"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <span>{casino?.active_players}</span>
                    </div>
                  </a>
                  <div className="bot-info">
                    <div className="game-tit">
                      <a className="txt">{casino?.game_name}</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CasinoCard;
