import { useNavigate } from "react-router-dom";
import { handleNavigateEventPage } from "../../../../utils/handleNavigateEventPage";

const CardThree = ({ liveSports, keys }) => {
  const navigate = useNavigate();
  const eventTypeImg = {
    4: "",
    1: "",
    2: "",
  };
  return (
    <div
      onClick={() => handleNavigateEventPage(liveSports, keys, navigate)}
      className="live-banner-item"
      style={{ fontSize: "12px" }}
    >
      <div className="b-top">
        <div className="b-top-icon">
          <div className="liveSports-icon-wrap">
            <img src={eventTypeImg[liveSports[keys]?.eventTypeId]} alt="" />
          </div>
          <p className="name">{liveSports[keys]?.seriesName}</p>
        </div>
        <div className="t-right">
          <p className="status">{liveSports?.[keys]?.timeStatus}</p>
          {/* <div className="live ttu">Live</div> */}
        </div>
      </div>
      <div className="b-match">
        <div className="c-left match-item">
          <div className="c-img">
            <div className="match-icon-wrap">
              <img alt="icon" src={liveSports?.[keys]?.image1} />
            </div>
          </div>
          <p className="c-name">{liveSports[keys]?.player1}</p>
        </div>
        <div className="c-center">
          <p>
            {liveSports[keys]?.score?.total_1} :{" "}
            {liveSports[keys]?.score?.total_2}
          </p>
        </div>
        <div className="c-right match-item">
          <div className="c-img">
            <div className="liveSports-icon-wrap">
              <img src={liveSports[keys]?.image2} alt="" />
            </div>
          </div>
          <p className="c-name">{liveSports[keys]?.player2}</p>
        </div>
      </div>
      <div className="b-markets">
        {liveSports?.[keys]?.[0]?.ex?.availableToBack?.[0]?.price && (
          <div className="market-item">
            <span>1</span>
            <span>
              {liveSports?.[keys]?.[0]?.ex?.availableToBack?.[0]?.price}
            </span>
          </div>
        )}

        {liveSports?.[keys]?.[2]?.ex?.availableToBack?.[0]?.price && (
          <div className="market-item">
            <span>draw </span>
            <span>
              {" "}
              {liveSports?.[keys]?.[2]?.ex?.availableToBack?.[0]?.price}
            </span>
          </div>
        )}
        {liveSports?.[keys]?.[1]?.ex?.availableToBack?.[0]?.price && (
          <div className="market-item">
            <span>2</span>
            <span>
              {" "}
              {liveSports?.[keys]?.[1]?.ex?.availableToBack?.[0]?.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardThree;
