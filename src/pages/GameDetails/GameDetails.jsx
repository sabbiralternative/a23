import { useParams } from "react-router-dom";
import MatchTrackerTab from "./MatchTrackerTab";
import Odds from "./SportsBook/Odds";
import ScoreBoardCard from "./ScoreBoardCard";
import ScoreCardSlider from "./ScoreCardSlider";
import useEventDetails from "../../hooks/useEventDetails";
import { useEffect, useState } from "react";
import { Settings } from "../../api";
import useContextState from "../../hooks/useContextState";
import useBalance from "../../hooks/useBalance";
import useCurrentBets from "../../hooks/useCurrentBets";
import OpenBets from "../../components/modal/OpenBets";
// import ScoreCard from "./ScoreCard";
import CricketScore from "./CricketScore";

const GameDetails = () => {
  const { tokenLoading } = useContextState();
  const { refetchBalance } = useBalance();
  const { eventTypeId, eventId } = useParams();
  const [priceClasses, setPriceClasses] = useState({});
  const [prevPrices, setPrevPrices] = useState({});
  const [showMyBets, setShowMyBets] = useState(false);
  const [match_odds, setMatch_odds] = useState([]);
  const { eventsData, refetchEventsData } = useEventDetails(
    eventTypeId,
    eventId
  );

  const { myBets, refetchCurrentBets } = useCurrentBets(eventId);

  useEffect(() => {
    if (eventId && eventTypeId) {
      refetchEventsData();
      refetchCurrentBets();
    }
  }, [refetchEventsData, eventTypeId, eventId, refetchCurrentBets]);

  useEffect(() => {
    setPrevPrices({});
    setPriceClasses({});
  }, [eventId, eventTypeId]);

  useEffect(() => {
    if (!tokenLoading && !Settings?.balanceApiLoop) {
      refetchBalance();
    }
  }, []);

  return (
    <>
      {showMyBets && (
        <OpenBets myBets={myBets} setShowOpenBets={setShowMyBets} />
      )}
      <ScoreCardSlider />
      {Array.isArray(eventsData?.result?.[0]?.score2) &&
        eventsData?.score &&
        eventTypeId != 4 && (
          <ScoreBoardCard
            eventTypeId={eventTypeId}
            score={eventsData?.score}
            match_odds={match_odds}
          />
        )}
      <MatchTrackerTab eventTypeId={eventTypeId} score={eventsData?.score} />
      {/* {eventTypeId == 4 &&
        eventsData?.result?.[0]?.score2?.length !== 0 &&
        !Array.isArray(eventsData?.result?.[0]?.score2) && (
          <ScoreCard score2={eventsData?.result?.[0]?.score2} />
        )} */}
      {eventTypeId == 4 && eventsData?.iscore && (
        <CricketScore iscore={eventsData?.iscore} />
      )}
      {eventsData && (
        <Odds
          refetchCurrentBets={refetchCurrentBets}
          match_odds={match_odds}
          setMatch_odds={setMatch_odds}
          data={eventsData?.result}
          eventTypeId={eventTypeId}
          sportsBook={eventsData?.sportsbook?.Result}
          priceClasses={priceClasses}
          setPriceClasses={setPriceClasses}
          prevPrices={prevPrices}
          setPrevPrices={setPrevPrices}
        />
      )}

      <div className="tabbar-item">
        <div className="ob_button " onClick={() => setShowMyBets(true)}>
          <div className="bt1043">
            <div
              className="open_bets_button"
              data-editor-id="betslipMobileButtonGradient"
            >
              <svg
                data-cy="ic-betslip"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                style={{
                  fill: "white",
                  color: "white",
                  width: "auto",
                  height: "24",
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.125 2C6.84683 2 5 3.8804 5 6.2V25.8C5 28.1196 6.84683 30 9.125 30H22.875C25.1532 30 27 28.1196 27 25.8V6.2C27 3.8804 25.1532 2 22.875 2H9.125ZM11.5 21C10.6716 21 10 21.6716 10 22.5C10 23.3284 10.6716 24 11.5 24H20.5C21.3284 24 22 23.3284 22 22.5C22 21.6716 21.3284 21 20.5 21H11.5ZM10 16.5C10 15.6716 10.6716 15 11.5 15H20.5C21.3284 15 22 15.6716 22 16.5C22 17.3284 21.3284 18 20.5 18H11.5C10.6716 18 10 17.3284 10 16.5ZM11.5 9C10.6716 9 10 9.67157 10 10.5C10 11.3284 10.6716 12 11.5 12H20.5C21.3284 12 22 11.3284 22 10.5C22 9.67157 21.3284 9 20.5 9H11.5Z"
                ></path>
              </svg>
              <div
                id="bt-header-total"
                className="bt1054 bt1063 bt1052 bt1042"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
