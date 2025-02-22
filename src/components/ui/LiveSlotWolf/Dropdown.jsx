/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const Dropdown = ({
  showLeftDropdown,
  setShowLeftDropdown,
  data,
  showRightDropdown,
  setShowRightDropdown,
  setProduct,
  setGameList,
  product,
  gameList,
}) => {
  /* Close drop down click out side */
  const dropdownRef = useRef();
  useCloseModalClickOutside(dropdownRef, () => {
    setShowLeftDropdown(false);
    setShowRightDropdown(false);
  });

  return (
    <div
      style={{ position: "relative" }}
      _ngcontent-ng-c1965075897=""
      className="filter-search"
    >
      <div _ngcontent-ng-c1965075897="" className="select-wrap">
        <div _ngcontent-ng-c1965075897="" className="label-cont">
          <label _ngcontent-ng-c1965075897="">Game Provider</label>
        </div>
        <div
          _ngcontent-ng-c1965075897=""
          className="mat-mdc-form-field mat-form-field  ng-tns-c1205077789-1 mat-mdc-form-field-type-mat-select mat-form-field-appearance-fill mat-primary ng-pristine ng-valid ng-star-inserted ng-touched"
        >
          <div
            onClick={() => setShowLeftDropdown(!showLeftDropdown)}
            style={{
              backgroundColor: "#c6c6c6",
              borderRadius: "5px",
              padding: "5px",
            }}
            className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-1 mdc-text-field--filled mdc-text-field--no-label"
          >
            <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-1 ng-star-inserted"></div>

            <div className="mat-mdc-form-field-flex ng-tns-c1205077789-1">
              <div className="mat-mdc-form-field-infix ng-tns-c1205077789-1">
                <div
                  _ngcontent-ng-c1965075897=""
                  role="combobox"
                  aria-autocomplete="none"
                  aria-haspopup="listbox"
                  ngskiphydration=""
                  name="game_provider"
                  className="mat-mdc-select ng-tns-c3393473648-2 ng-tns-c1205077789-1 ng-pristine ng-valid ng-star-inserted ng-touched"
                  aria-labelledby="mat-select-value-1"
                  id="mat-select-0"
                  aria-expanded="false"
                  aria-required="false"
                  aria-disabled="false"
                  aria-invalid="false"
                >
                  <div
                    cdk-overlay-origin=""
                    className="mat-mdc-select-trigger ng-tns-c3393473648-2"
                  >
                    <div
                      className="mat-mdc-select-value ng-tns-c3393473648-2"
                      id="mat-select-value-1"
                    >
                      <span className="mat-mdc-select-value-text ng-tns-c3393473648-2 ng-star-inserted">
                        <span className="mat-mdc-select-min-line ng-tns-c3393473648-2 ng-star-inserted">
                          {product === "All" ? "All Providers" : product}
                        </span>
                      </span>
                    </div>
                    <div className="mat-mdc-select-arrow-wrapper ng-tns-c3393473648-2">
                      <div className="mat-mdc-select-arrow ng-tns-c3393473648-2">
                        <svg
                          viewBox="0 0 24 24"
                          width="24px"
                          height="24px"
                          focusable="false"
                          aria-hidden="true"
                          className="ng-tns-c3393473648-2"
                        >
                          <path
                            d="M7 10l5 5 5-5z"
                            className="ng-tns-c3393473648-2"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              matformfieldlineripple=""
              className="mdc-line-ripple ng-tns-c1205077789-1 ng-star-inserted"
            ></div>
          </div>
          <div className="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c1205077789-1">
            <div
              className="mat-mdc-form-field-hint-wrapper ng-tns-c1205077789-1 ng-trigger ng-trigger-transitionMessages ng-star-inserted"
              style={{ opacity: 1, transform: "translateY(0%)" }}
            >
              <div className="mat-mdc-form-field-hint-spacer ng-tns-c1205077789-1"></div>
            </div>
          </div>
        </div>
      </div>
      {showLeftDropdown && (
        <motion.div
          ref={dropdownRef}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="dropdown-container"
        >
          <button
            className={`${product === "All" ? "dropdownBG" : "white-bg"}`}
            onClick={() => {
              setProduct("All");
              setShowLeftDropdown(false);
            }}
            style={{
              color: `${product === "All" ? "white" : "black"}`,
            }}
          >
            All Providers
          </button>
          {data?.companyListData?.map((item, i) => {
            return (
              <button
                className={`${
                  item?.product === product ? "dropdownBG" : "white-bg"
                }`}
                onClick={() => {
                  setProduct(item?.product);
                  setShowLeftDropdown(false);
                }}
                style={{
                  color: `${item?.product === product ? "white" : "black"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                key={i}
              >
                <img
                  style={{
                    height: "20px",
                    objectFit: "contain",
                  }}
                  src={item?.url_thumb}
                  alt=""
                />
                <span> {item?.product}</span>
              </button>
            );
          })}
        </motion.div>
      )}
      <div _ngcontent-ng-c1965075897="" className="select-wrap">
        <div _ngcontent-ng-c1965075897="" className="label-cont">
          <label _ngcontent-ng-c1965075897="">Game Type</label>
        </div>
        <div
          _ngcontent-ng-c1965075897=""
          className="mat-mdc-form-field mat-form-field  ng-tns-c1205077789-3 mat-mdc-form-field-type-mat-select mat-form-field-appearance-fill mat-primary ng-pristine ng-valid ng-star-inserted ng-touched"
        >
          <div
            // mdc-text-field--filled
            onClick={() => setShowRightDropdown(!showRightDropdown)}
            style={{
              backgroundColor: "#c6c6c6",
              borderRadius: "5px",
              padding: "5px",
            }}
            className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-3 mdc-text-field--filled mdc-text-field--no-label"
          >
            <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-3 ng-star-inserted"></div>

            <div className="mat-mdc-form-field-flex ng-tns-c1205077789-3">
              <div className="mat-mdc-form-field-infix ng-tns-c1205077789-3">
                <div
                  _ngcontent-ng-c1965075897=""
                  role="combobox"
                  aria-autocomplete="none"
                  aria-haspopup="listbox"
                  ngskiphydration=""
                  name="game_type"
                  placeholder="All"
                  className="mat-mdc-select ng-tns-c3393473648-4 ng-tns-c1205077789-3 ng-pristine ng-valid ng-star-inserted ng-touched"
                  aria-labelledby="mat-select-value-3"
                  id="mat-select-2"
                  aria-expanded="false"
                  aria-required="false"
                  aria-disabled="false"
                  aria-invalid="false"
                >
                  <div
                    cdk-overlay-origin=""
                    className="mat-mdc-select-trigger ng-tns-c3393473648-4"
                  >
                    <div
                      className="mat-mdc-select-value ng-tns-c3393473648-4"
                      id="mat-select-value-3"
                    >
                      <span className="mat-mdc-select-value-text ng-tns-c3393473648-4 ng-star-inserted">
                        <span className="mat-mdc-select-min-line ng-tns-c3393473648-4 ng-star-inserted">
                          {gameList === "All" ? "All Games" : gameList}
                        </span>
                      </span>
                    </div>
                    <div className="mat-mdc-select-arrow-wrapper ng-tns-c3393473648-4">
                      <div className="mat-mdc-select-arrow ng-tns-c3393473648-4">
                        <svg
                          viewBox="0 0 24 24"
                          width="24px"
                          height="24px"
                          focusable="false"
                          aria-hidden="true"
                          className="ng-tns-c3393473648-4"
                        >
                          <path
                            d="M7 10l5 5 5-5z"
                            className="ng-tns-c3393473648-4"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              matformfieldlineripple=""
              className="mdc-line-ripple ng-tns-c1205077789-3 ng-star-inserted"
            ></div>
          </div>
          <div className="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c1205077789-3">
            <div
              className="mat-mdc-form-field-hint-wrapper ng-tns-c1205077789-3 ng-trigger ng-trigger-transitionMessages ng-star-inserted"
              style={{ opacity: 1, transform: "translateY(0%)" }}
            >
              <div className="mat-mdc-form-field-hint-spacer ng-tns-c1205077789-3"></div>
            </div>
          </div>
        </div>
      </div>
      {showRightDropdown && (
        <motion.div
          ref={dropdownRef}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="dropdown-container"
        >
          <button
            className={`${gameList === "All" ? "dropdownBG" : "white-bg"}`}
            onClick={() => {
              setGameList("All");
              setShowRightDropdown(false);
            }}
            style={{
              color: `${gameList === "All" ? "white" : "black"}`,
            }}
          >
            All Games
          </button>
          {data?.gameListData?.map((item, i) => {
            return (
              <button
                className={`${item === gameList ? "dropdownBG" : "white-bg"}`}
                onClick={() => {
                  setGameList(item);
                  setShowRightDropdown(false);
                }}
                style={{
                  color: `${item === gameList ? "white" : "black"}`,
                }}
                key={i}
              >
                {item}
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
