import { useEffect, useState } from "react";
import Banner from "../../components/ui/Home/Banner";
import BannerModal from "../../components/modal/Banner";
import Casino from "../../components/ui/Home/Casino";
import LiveSports from "../../components/ui/Home/LiveSports/LiveSports";
import Slider from "../../components/ui/Slider/Slider";
import useBannerImage from "../../hooks/home/useBannerImage";
import useContextState from "../../hooks/useContextState";
import useSportsBook from "../../hooks/home/useSportsBook";
import Sports from "../../components/ui/Home/Sports/Sports";
import { Settings } from "../../api";
import useBalance from "../../hooks/useBalance";
import useHomeCasino from "../../hooks/useHomeCasino";
import useCasinoGames from "../../hooks/useCasinoGames";
import { images } from "../../assets";
import Warning from "../../components/modal/Warning";

const Home = () => {
  const { sportsType, tokenLoading, showWarning, setShowWarning, token } =
    useContextState();
  const { bannerImage } = useBannerImage();
  const { refetchSports, sports } = useSportsBook(sportsType);
  const { refetchBalance } = useBalance();
  const { homeCasino } = useHomeCasino();
  const { casinoGames } = useCasinoGames();

  useEffect(() => {
    refetchSports();
  }, [refetchSports, sportsType]);

  useEffect(() => {
    if (!tokenLoading && !Settings.balanceApiLoop) {
      refetchBalance();
    }
  }, []);

  const navigateWhatsApp = () => {
    if (token && Settings?.branchWhatsapplink) {
      window.open(Settings?.branchWhatsapplink, "_blank");
    } else {
      window.open(Settings?.whatsapplink, "_blank");
    }
  };

  const [showModal, setShowModal] = useState(false);
  const banner = localStorage.getItem("banner");

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("hasModalBeenShown");
    if (!hasModalBeenShown) {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {token && showModal && banner && (
        <BannerModal setShowModal={setShowModal} banner={banner} />
      )}

      {!sportsType && (
        <>
          {bannerImage?.banner?.length > 0 && (
            <Banner bannerImage={bannerImage?.banner} />
          )}
          {bannerImage?.card?.length > 0 && <Slider card={bannerImage?.card} />}
          {sports && Object.values(sports).length > 0 && (
            <LiveSports liveSports={sports} />
          )}

          {homeCasino?.length > 0 && (
            <Casino casino={homeCasino} title="Top Providers" />
          )}
          {homeCasino?.length > 0 && (
            <Casino casino={casinoGames} title=" Casino Games" />
          )}
        </>
      )}
      {sportsType ? <Sports sportsType={sportsType} sports={sports} /> : null}

      {Settings?.instagramLink ? (
        <div
          onClick={() => window.open(Settings?.instagramLink, "_blank")}
          className="tabbar-item"
        >
          <div className="ob_button" style={{ zIndex: 100, bottom: "28%" }}>
            <div className="bt1043">
              <div
                style={{ background: "none", height: "32px", width: "32px" }}
                className="open_bets_button"
                data-editor-id="betslipMobileButtonGradient"
              >
                <img
                  style={{ height: "32px", width: "32px" }}
                  src={images.instagram}
                  alt=""
                />
                <div
                  id="bt-header-total"
                  className="bt1054 bt1063 bt1052 bt1042"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {Settings?.telegramLink ? (
        <div
          onClick={() => window.open(Settings?.telegramLink, "_blank")}
          className="tabbar-item"
        >
          <div className="ob_button" style={{ zIndex: 100, bottom: "20%" }}>
            <div className="bt1043">
              <div
                style={{ background: "none", height: "32px", width: "32px" }}
                className="open_bets_button"
                data-editor-id="betslipMobileButtonGradient"
              >
                <img
                  style={{ height: "32px", width: "32px" }}
                  src={images.telegram}
                  alt=""
                />
                <div
                  id="bt-header-total"
                  className="bt1054 bt1063 bt1052 bt1042"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {Settings?.whatsapplink || Settings?.branchWhatsapplink ? (
        <div onClick={navigateWhatsApp} className="tabbar-item">
          <div className="ob_button" style={{ zIndex: 100, bottom: "13%" }}>
            <div className="bt1043">
              <div
                style={{ background: "none", height: "30px", width: "30px" }}
                className="open_bets_button"
                data-editor-id="betslipMobileButtonGradient"
              >
                <img
                  style={{ height: "30px", width: "30px" }}
                  src={images.whatsapp}
                  alt=""
                />
                <div
                  id="bt-header-total"
                  className="bt1054 bt1063 bt1052 bt1042"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showWarning && <Warning setShowModal={setShowWarning} />}
    </>
  );
};

export default Home;
