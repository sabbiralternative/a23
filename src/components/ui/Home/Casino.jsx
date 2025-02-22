import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import useContextState from "../../../hooks/useContextState";
import { Settings } from "../../../api";
import AEDRules from "../../modal/AEDRules";
const Casino = ({ casino, title }) => {
  /* get all casino */

  const [category, setCategory] = useState("Top Games");
  const [filteredData, setFilteredData] = useState({});
  const navigate = useNavigate();
  const { token, wallet, setShowWarning } = useContextState();
  const [showModal, setShowModal] = useState(false);
  const [casinoInfo, setCasinoInfo] = useState({});

  /* find sports by tabs on ui */
  useEffect(() => {
    if (casino?.length > 0) {
      const filteredCasino =
        casino?.find((casino) => casino?.category === category) || {};
      setFilteredData(filteredCasino);
    }
  }, [category, casino]);

  const navigateCasinoVideo = (casino) => {
    if (token) {
      if (wallet === "main") {
        if (Settings.casinoCurrency !== "AED") {
          navigate(
            `/casino/${casino?.provider_name.replace(/ /g, "")}/${
              casino?.game_id
            }`
          );
        } else {
          setShowModal(true);
          setCasinoInfo({
            provider_name: casino?.provider_name.replace(/ /g, ""),
            game_id: casino?.game_id,
            base: "casino",
          });
        }
      } else {
        /* Showing warning modal */
        setShowWarning(true);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {showModal && (
        <AEDRules setShowModal={setShowModal} casinoInfo={casinoInfo} />
      )}
      <div className="svhk5i1">
        <div className="casino-head">
          <div className="title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9632 0C14.5239 0 14.978 0.441131 14.978 0.986262C14.978 1.43259 14.673 1.80872 14.2553 1.93092C15.1002 3.77432 16.265 5.45218 17.7461 6.96363C17.9043 7.12506 18.0693 7.29187 18.2393 7.46377L18.2396 7.46405C20.9807 10.2353 25.0306 14.3297 22.9555 18.524C21.7093 21.0434 19.1631 21.9846 16.2208 21.0608C15.6246 20.8736 14.7986 20.377 13.7422 19.5692H12.7274C11.6709 20.3761 10.8441 20.8736 10.2479 21.0608C7.30563 21.9838 4.75942 21.0434 3.51319 18.524C1.43773 14.3282 5.4887 10.2337 8.23045 7.46254L8.23049 7.46251C8.40012 7.29105 8.56474 7.12467 8.72259 6.96363C10.2011 5.45564 11.3633 3.78125 12.21 1.94132C11.7689 1.83299 11.4447 1.44646 11.4447 0.986262C11.4447 0.441998 11.8988 0 12.4596 0C12.5523 0 12.6416 0.0121333 12.7274 0.0346665L12.7265 5.42531L12.7274 5.42444V11.5483C12.1354 11.7511 11.7117 12.2997 11.7117 12.9436C11.7117 13.7609 12.3928 14.423 13.2343 14.423C14.0759 14.423 14.7562 13.7609 14.7562 12.9436C14.7562 12.2997 14.3324 11.7511 13.7405 11.5483L13.7396 5.42444L13.7413 5.42531L13.7396 0.0242666C13.8115 0.00866663 13.8861 0 13.9623 0H13.9632ZM13.1876 26.0003H7.75115C7.63155 26.0003 7.53449 25.9032 7.53449 25.7836C7.53449 25.7143 7.56742 25.6493 7.62375 25.6086C8.467 24.9933 9.31545 24.202 10.1691 23.2357C11.216 22.0501 12.0688 20.8281 12.7274 19.5705H13.1417H13.2344H13.6487C14.3073 20.8281 15.1601 22.0501 16.207 23.2357C17.0598 24.202 17.9082 24.9933 18.7515 25.6086C18.8078 25.6493 18.8407 25.7143 18.8407 25.7836C18.8407 25.9032 18.7445 26.0003 18.6241 26.0003H13.1885L13.1881 25.9407L13.1876 26.0003Z"
                fill="#65C316"
              ></path>
            </svg>
            {title}
          </div>
          {/* <a href="/casino" className="">
          View all
        </a> */}
        </div>

        <div className="tabs-wrap">
          {casino?.map((casino, i) => {
            return (
              <a
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => setCategory(casino?.category)}
                key={i}
                className={`nav-item ${
                  category === casino?.category ? "active is-active" : ""
                }`}
              >
                {casino?.category}
              </a>
            );
          })}
        </div>

        <div className="g1an962a s1qlggg6 game-list casino-list">
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper s138s2zu grid-list mySwiper"
            style={{ "--grid-num": "3.2" }}
          >
            <div className="s138s2zu grid-list" style={{ "--grid-num": "3.2" }}>
              {filteredData?.games?.map((casino, i) => {
                return (
                  <SwiperSlide key={i} className="s1raq561 grid-item">
                    <div
                      onClick={() => navigateCasinoVideo(casino)}
                      className="s1raq561 grid-item"
                    >
                      <a className="game-img-wrap">
                        <img src={casino?.img} className="game-img" alt="" />
                        {/* <div className="online">
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
                        </div> */}
                      </a>
                      <div className="bot-info">
                        <div className="game-tit">
                          <a style={{ fontSize: "12px" }} className="txt">
                            {casino?.provider_name}
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Casino;
