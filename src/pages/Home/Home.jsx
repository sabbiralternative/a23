import { useEffect } from "react";
import Banner from "../../components/ui/Home/Banner";
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
import useGetSocialLink from "../../hooks/useGetSocialLink";
import Warning from "../../components/modal/Warning";

const Home = () => {
  const { sportsType, tokenLoading, showWarning, setShowWarning, token } =
    useContextState();
  const { bannerImage } = useBannerImage();
  const { refetchSports, sports } = useSportsBook(sportsType);
  const { refetchBalance } = useBalance();
  const { homeCasino } = useHomeCasino();
  const { casinoGames } = useCasinoGames();
  const { socialLink, refetchSocialLinks } = useGetSocialLink();

  useEffect(() => {
    refetchSports();
  }, [refetchSports, sportsType]);

  useEffect(() => {
    if (!tokenLoading && !Settings.balanceApiLoop) {
      refetchBalance();
    }
  }, []);

  useEffect(() => {
    refetchSocialLinks();
  }, [token, refetchSocialLinks]);

  const navigateWhatsApp = () => {
    if (token && socialLink?.branchWhatsapplink) {
      window.open(socialLink?.branchWhatsapplink, "_blank");
    } else {
      window.open(socialLink?.whatsapplink, "_blank");
    }
  };

  return (
    <>
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

      {socialLink?.telegramLink ? (
        <div
          onClick={() => window.open(socialLink?.telegramLink, "_blank")}
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
      {socialLink?.whatsapplink || socialLink?.branchWhatsapplink ? (
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
