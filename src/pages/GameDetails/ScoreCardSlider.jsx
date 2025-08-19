import { useNavigate, useParams } from "react-router-dom";
import useSportsBook from "../../hooks/home/useSportsBook";
import { handleNavigateEventPage } from "../../utils/handleNavigateEventPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const ScoreCardSlider = () => {
  const { eventTypeId, eventId } = useParams();
  const { sports } = useSportsBook(eventTypeId);
  const navigate = useNavigate();
  const SportsLength =
    sports &&
    Object?.keys(sports)?.filter((key) => {
      return sports?.[key]?.visible === true;
    })?.length;

  return (
    <>
      {sports && SportsLength > 1 && (
        <div className="bt12496">
          <div className="bt12506" data-editor-id="horizontalNavigation">
            <div
              className="bt12508"
              data-editor-id="horizontalNavigationDropDownButton"
            >
              <div
                className="bt6471 bt12510"
                style={{ width: "16px", height: "16px" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
                </svg>
              </div>
            </div>

            <Swiper
              spaceBetween={10}
              slidesPerView="auto"
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              <div className="bt6452" style={{ height: "58px" }}>
                <div className="bt6454">
                  <div className="bt6453" style={{ height: "58px" }}>
                    <div className="bt12511">
                      {sports && Object?.values(sports)?.length > 0
                        ? Object?.keys(sports)
                            ?.filter((key) => {
                              return sports?.[key]?.visible === true;
                            })
                            .sort(
                              (keyA, keyB) =>
                                sports?.[keyA]?.sort - sports?.[keyB]?.sort
                            )
                            ?.map((key, index) => {
                              return (
                                <SwiperSlide
                                  onClick={() => {
                                    handleNavigateEventPage(
                                      sports,
                                      key,
                                      navigate
                                    );
                                  }}
                                  key={index}
                                  style={{
                                    width: "auto",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                  }}
                                  className={`${
                                    eventId === key
                                      ? "bt12513 bt12529 bt12514 bt12512 bt12515 bt12530"
                                      : "bt12513 bt12524 bt12514 bt12512"
                                  } `}
                                >
                                  <div
                                    // className={`${
                                    //   eventId === key
                                    //     ? "bt12513 bt12529 bt12514 bt12512 bt12515 bt12530"
                                    //     : "bt12513 bt12524 bt12514 bt12512"
                                    // } `}
                                    data-editor-id="horizontalNavigationEvent"
                                  >
                                    <div className="bt12516">
                                      {sports?.[key]?.inPlay ? (
                                        <svg
                                          className="bt12518"
                                          data-cy="ic-live-simple"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="#FF4E4E"
                                          xmlns="http://www.w3.org/2000/svg"
                                          style={{
                                            display: "block",
                                            fill: `${
                                              eventId === key
                                                ? "rgb(255, 78, 78)"
                                                : "rgba(49, 55, 61, 0.5)"
                                            }`,
                                            color: `${
                                              eventId === key
                                                ? "rgb(255, 78, 78)"
                                                : "rgba(49, 55, 61, 0.5)"
                                            }`,
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
                                      ) : (
                                        <p
                                          style={{
                                            height: "16px",
                                            width: "22px",
                                          }}
                                        ></p>
                                      )}

                                      <div
                                        className="bt6541 bt12528 bt12519 bt12520 bt12526"
                                        data-editor-id="horizontalNavigationEventCrumbs"
                                      >
                                        {/* {sports?.[key]?.timeStatus} */}
                                      </div>
                                    </div>
                                    <div className="bt12517">
                                      <div className="bt12521">
                                        <div className="bt12522">
                                          {sports?.[key]?.score?.total_1}
                                        </div>
                                        <div className="bt12522">
                                          {sports?.[key]?.score?.total_2}
                                        </div>
                                      </div>
                                      <div
                                        style={{ alignItems: "flex-start" }}
                                        className="bt12523"
                                      >
                                        <div> {sports?.[key]?.player1}</div>
                                        <div>{sports?.[key]?.player2}</div>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              );
                            })
                        : null}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    zIndex: "3",
                    pointerEvents: "none",
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    width: "40px",
                    height: "100%",
                    background: `linear-gradient(to left,rgb(235, 237, 244),rgb(235,237, 244, 0)
              )`,
                  }}
                ></div>
              </div>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreCardSlider;
