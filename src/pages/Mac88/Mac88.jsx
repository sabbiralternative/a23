/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import useContextState from "../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import { Settings } from "../../api";
import Warning from "../../components/modal/Warning";
import AEDRules from "../../components/modal/AEDRules";
import useGetMac88 from "../../hooks/useGetMac88";

const Mac88 = () => {
  const { token, wallet } = useContextState();
  const { data } = useGetMac88();
  const [warnMessage, setWarnMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({
    provider_name: "",
    game_id: "",
    base: "",
  });
  const navigate = useNavigate();

  const handleLiveSlotCasino = (id, name) => {
    if (token) {
      if (wallet === "bonus") {
        return setWarnMessage("Bonus wallet is available only on sports.");
      }
      if (Settings.casinoCurrency !== "AED") {
        navigate(`/casino/${name.replace(/ /g, "")}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({
          provider_name: name.replace(/ /g, ""),
          game_id: id,
          base: "casino",
        });
        setShowWarning(true);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      {warnMessage && <Warning setShowModal={setWarnMessage} />}
      {showWarning && (
        <AEDRules setShowModal={setShowWarning} casinoInfo={gameInfo} />
      )}
      <div _ngcontent-ng-c1965075897="" className="page-body">
        <div
          _ngcontent-ng-c1965075897=""
          className="casino-section live-casino game-play mt-2 mb-3 ng-star-inserted"
        >
          <div
            _ngcontent-ng-c1965075897=""
            className="game-type-list ng-star-inserted"
          >
            <ul _ngcontent-ng-c1965075897="">
              {data?.map((item, i) => {
                return (
                  <li
                    onClick={() =>
                      handleLiveSlotCasino(item?.game_id, item?.game_name)
                    }
                    key={i}
                    _ngcontent-ng-c1965075897=""
                    className="ng-star-inserted"
                  >
                    <a _ngcontent-ng-c1965075897="" className="active">
                      <img
                        _ngcontent-ng-c1965075897=""
                        alt=""
                        src={item?.img}
                      />
                    </a>

                    <div _ngcontent-ng-c1965075897="" className="game-detail">
                      <p _ngcontent-ng-c1965075897="" className="game-name">
                        {item?.game_name}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mac88;
