import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const Slider = ({ card }) => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item?.link) {
      navigate(`/game-details/${item?.link}`);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="swiper swiper-initialized swiper-horizontal swiper-ios mySwiper swiper-backface-hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <div
            className="swiper-wrapper"
            style={{
              transitionDuration: "0ms",
              transform: "translate3d(0px, 0px, 0px)",
              transitionDelay: "0ms",
            }}
          >
            <div
              className="swiper-slide swiper-slide-active"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                marginRight: "10px",
              }}
            >
              {card?.map((item, i) => {
                return (
                  <SwiperSlide
                    style={{
                      width: "270px",
                      borderRadius: "10px",
                    }}
                    onClick={() => handleNavigate(item)}
                    key={i}
                  >
                    <div>
                      <img
                        className="banner"
                        alt="Instant Games"
                        src={item?.image}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
