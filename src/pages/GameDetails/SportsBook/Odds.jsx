import { useEffect, useState } from "react";
import ColumnThree from "./ColumnThree";
import ColumnTwo from "./ColumnTwo";
import ColumnOne from "./ColumnOne";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import MatchOdds from "../GameType/MatchOdds";
import Bookmaker from "../GameType/Bookmaker";
import Fancy from "../GameType/Fancy";
import BetSlip from "../../../components/modal/BetSlip";
import useContextState from "../../../hooks/useContextState";
import { useParams } from "react-router-dom";
import useExposer from "../../../hooks/useExposer";
import HorseGreyhound from "../GameType/HorseGreyhound";
const Odds = ({
  sportsBook,
  eventTypeId,
  priceClasses,
  setPriceClasses,
  prevPrices,
  setPrevPrices,
  data,
  horseGreyhound,
  match_odds,
  setMatch_odds,
  refetchCurrentBets,
}) => {
  const { eventId } = useParams();
  const { placeBetValues, setPlaceBetValues, openBetSlip, setOpenBetSlip } =
    useContextState();
  const [bookmarker, setBookmarker] = useState([]);
  // const [bookmarker2, setBookmarker2] = useState([]);
  const [normal, setNormal] = useState([]);
  // const [fancy1, setFancy1] = useState([]);
  // const [overByOver, setOverByOver] = useState([]);
  const { exposer, refetchExposure } = useExposer(eventId);

  useEffect(() => {
    if (eventId) {
      refetchExposure();
    }
  }, [eventId, refetchExposure]);

  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials"
    );

  const itemsLengthArray =
    (sports && sports?.map((group) => group?.Items?.length)) || [];
  const [openItems, setOpenItems] = useState(
    new Array(itemsLengthArray[0] || 0).fill(false).map((_, index) => index < 5)
  );

  const toggleItem = (index) => {
    const newOpenItems = [...openItems];
    newOpenItems[index] = !newOpenItems[index];
    setOpenItems(newOpenItems);
  };

  useEffect(() => {
    setOpenItems(
      new Array(itemsLengthArray[0] || 0)
        .fill(false)
        .map((_, index) => index < 15)
    );
  }, [eventTypeId]);

  /* Filtered all the game  */
  useEffect(() => {
    const filterMatch_odds = data?.filter(
      (match_odd) =>
        match_odd?.btype === "MATCH_ODDS" && match_odd?.visible == true
    );
    setMatch_odds(filterMatch_odds);

    const bookmarkerFilter = data?.filter(
      (bookmarker) =>
        bookmarker?.btype === "BOOKMAKER" && bookmarker?.visible == true
    );
    setBookmarker(bookmarkerFilter);

    // const filterBookmarker2 = data?.filter(
    //   (bookmarker2) =>
    //     bookmarker2.btype === "BOOKMAKER2" && bookmarker2.visible == true
    // );
    // setBookmarker2(filterBookmarker2);

    const normalFilter = data?.filter(
      (normal) =>
        normal?.btype === "FANCY" &&
        normal?.tabGroupName === "Normal" &&
        normal?.visible == true
    );
    setNormal(normalFilter);

    // const fancy1Filter = data?.filter(
    //   (fancy1) =>
    //     fancy1.btype === "ODDS" &&
    //     fancy1.tabGroupName === "Fancy1" &&
    //     fancy1.visible == true
    // );
    // setFancy1(fancy1Filter);

    // const overByOverFilter = data?.filter(
    //   (overByOver) =>
    //     overByOver.btype === "FANCY" &&
    //     overByOver.tabGroupName === "Over By Over" &&
    //     overByOver.visible == true
    // );
    // setOverByOver(overByOverFilter);
  }, [data]);

  return (
    <div className="bt12498">
      <div className="bt12671">
        {/* Tabs */}
        {match_odds?.length > 0 && (
          <MatchOdds
            setOpenBetSlip={setOpenBetSlip}
            setPlaceBetValues={setPlaceBetValues}
            exposer={exposer}
            match_odds={match_odds}
          />
        )}
        {bookmarker?.length > 0 && (
          <Bookmaker
            bookmarker={bookmarker}
            setOpenBetSlip={setOpenBetSlip}
            setPlaceBetValues={setPlaceBetValues}
            exposer={exposer}
          />
        )}
        {normal?.length > 0 && (
          <Fancy
            normal={normal}
            setOpenBetSlip={setOpenBetSlip}
            setPlaceBetValues={setPlaceBetValues}
            exposer={exposer}
          />
        )}
        {eventTypeId == 7 || eventTypeId == 4339 ? (
          <HorseGreyhound
            data={horseGreyhound}
            setOpenBetSlip={setOpenBetSlip}
            setPlaceBetValues={setPlaceBetValues}
            exposer={exposer}
          />
        ) : null}
        {openBetSlip && (
          <BetSlip
            refetchCurrentBets={refetchCurrentBets}
            refetchExposure={refetchExposure}
            setOpenBetSlip={setOpenBetSlip}
            placeBetValues={placeBetValues}
          />
        )}

        {eventTypeId != 4 &&
          sports?.map((group) =>
            group?.Items?.map((item, iIdx) => {
              const isOpen = openItems[iIdx];

              return (
                <div key={iIdx} className="bt12687">
                  <div onClick={() => toggleItem(iIdx)} className="bt12695">
                    <div className="bt12689" data-editor-id="marketTitle">
                      {item?.Name}
                      <div
                        className="bt6471 bt12696 bt12690"
                        style={{ width: "16px", height: "16px" }}
                      >
                        {isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}

                        {/* <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
                      </svg> */}
                      </div>
                    </div>
                  </div>

                  {item?.MColumnCount === 3 && (
                    <ColumnThree
                      item={item}
                      isOpen={isOpen}
                      sportsBook={sportsBook}
                      priceClasses={priceClasses}
                      setPriceClasses={setPriceClasses}
                      prevPrices={prevPrices}
                      setPrevPrices={setPrevPrices}
                    />
                  )}
                  {item?.MColumnCount === 2 && (
                    <ColumnTwo
                      item={item}
                      isOpen={isOpen}
                      sportsBook={sportsBook}
                      priceClasses={priceClasses}
                      setPriceClasses={setPriceClasses}
                      prevPrices={prevPrices}
                      setPrevPrices={setPrevPrices}
                    />
                  )}
                  {item?.MColumnCount === 1 && (
                    <ColumnOne
                      item={item}
                      isOpen={isOpen}
                      sportsBook={sportsBook}
                      priceClasses={priceClasses}
                      setPriceClasses={setPriceClasses}
                      prevPrices={prevPrices}
                      setPrevPrices={setPrevPrices}
                    />
                  )}
                </div>
              );
            })
          )}
      </div>
    </div>
  );
};

export default Odds;
