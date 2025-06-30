import { useEffect } from "react";
import useContextState from "../../../hooks/useContextState";
import { handleSportsBookPlaceBet } from "../../../utils/handleSportsBookPlaceBet";
import { isSportsRunnerSuspended } from "../../../utils/isSportsRunnerSuspended";
import { useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";

const ColumnOne = ({
  item,
  isOpen,
  sportsBook,
  priceClasses,
  setPriceClasses,
  prevPrices,
  setPrevPrices,
}) => {
  const { setPlaceBetValues, setOpenBetSlip, token } = useContextState();
  const navigate = useNavigate();
  const handlePriceChange = (newPrice, id) => {
    if (prevPrices[id] !== undefined && newPrice !== prevPrices[id]) {
      const isGreen = newPrice > prevPrices[id];
      const blinkClass = isGreen ? "green_blink" : "red_blink";

      // Apply blink class
      setPriceClasses((prev) => ({
        ...prev,
        [id]: blinkClass,
      }));

      // Remove blink class after 2 seconds
      setTimeout(() => {
        setPriceClasses((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }, 2000);
    }

    // Always update the previous price
    setPrevPrices((prev) => ({
      ...prev,
      [id]: newPrice,
    }));
  };
  useEffect(() => {
    if (item?.Items) {
      item.Items.forEach((column) => {
        handlePriceChange(column.Price, column.Id);
      });
    }
  }, [item?.Items]);
  return (
    <>
      {isOpen && (
        <div
          className=""
          style={{
            height: "auto",
            overflow: "visible",
            transition: "height 0.25s ease 0s",
          }}
        >
          <div style={{ overflow: " visible" }}>
            <div className="bt12683">
              {item?.Items?.map((column, i) => {
                const isActive =
                  column?.Price > 0 && !isSportsRunnerSuspended(column, item);
                return (
                  <div
                    onClick={() =>
                      handleSportsBookPlaceBet(
                        column,
                        item,
                        sportsBook,
                        setOpenBetSlip,
                        setPlaceBetValues,
                        token,
                        navigate
                      )
                    }
                    key={i}
                    data-editor-id="tableOutcomePlate"
                    className="bt6588 bt12698 bt6589"
                    style={{
                      cursor: isActive ? "pointer" : "auto",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div
                      className="bt6592 bt12699"
                      style={{
                        backgroundColor: `${
                          isSportsRunnerSuspended(column, item)
                            ? "lightgray"
                            : ""
                        }`,
                      }}
                    >
                      <div className="bt1570">
                        <span className={priceClasses[column?.Id]}></span>
                      </div>
                      {isActive ? (
                        <>
                          <div
                            className="bt6596 bt12703"
                            data-editor-id="tableOutcomePlateName"
                          >
                            <span className="bt6598"> {column?.Name}</span>
                          </div>
                          <div className="bt6564 bt6599">
                            <span className="bt6566">
                              {column?.Price?.toFixed(2)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <CiLock />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ColumnOne;
