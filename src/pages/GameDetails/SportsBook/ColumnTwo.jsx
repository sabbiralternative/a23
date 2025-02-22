import { useEffect } from "react";
import { handleSportsBookPlaceBet } from "../../../utils/handleSportsBookPlaceBet";
import useContextState from "../../../hooks/useContextState";
import { isSportsRunnerSuspended } from "../../../utils/isSportsRunnerSuspended";
import { useNavigate } from "react-router-dom";

const ColumnTwo = ({
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

  useEffect(() => {
    if (item?.Items) {
      const newPrevPrices = {};
      item.Items.forEach((column) => {
        newPrevPrices[column?.Id] = column.Price;
      });

      setPrevPrices({ ...newPrevPrices });
      const timer = setTimeout(() => {
        setPriceClasses({});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [item?.Items, setPrevPrices, setPriceClasses]);

  useEffect(() => {
    item?.Items?.forEach((column) => {
      handlePriceChange(column.Price, column?.Id);
    });
  }, [item?.Items]);

  const handlePriceChange = (newPrice, id) => {
    if (prevPrices[id] !== undefined) {
      if (newPrice !== prevPrices[id]) {
        if (newPrice > prevPrices[id]) {
          setPriceClasses((prev) => ({
            ...prev,
            [id]: "green_blink",
          }));
        } else if (newPrice < prevPrices[id]) {
          setPriceClasses((prev) => ({ ...prev, [id]: "red_blink" }));
        }
      } else {
        setPriceClasses((prev) => {
          const updatedClasses = { ...prev };
          delete updatedClasses[id];
          return updatedClasses;
        });
      }
    }
  };


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
          <div style={{ overflow: "visible" }}>
            <div className="bt12683">
              {item?.Items?.map((column, i) => {
               
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
                    className="bt6588 bt12698 bt6590"
                  >
                    <div
                      className="bt6592 bt12699"
                      style={{
                        backgroundColor: `${
                          isSportsRunnerSuspended(column,item) ? "lightgray" : ""
                        }`,
                      }}
                    >
                      <div accessKey="" className="bt1570">
                        <span className={priceClasses[column?.Id]}></span>
                      </div>
                      <div
                        className="bt6596 bt12703"
                        data-editor-id="tableOutcomePlateName"
                      >
                        <span className="bt6598"> {column?.Name}</span>
                      </div>
                      <div className="bt6564 bt6599">
                        <span className="bt6566">
                          {column?.Price > 0 &&
                            !isSportsRunnerSuspended(column,item) &&
                            column?.Price}
                        </span>
                      </div>
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

export default ColumnTwo;
