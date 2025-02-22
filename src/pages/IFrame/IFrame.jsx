import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API, Settings } from "../../api";
import Loader from "../../components/ui/Loader/Loader";
import { AxiosSecure } from "../../lib/AxiosSecure";

const IFrame = () => {
  const [loading, setLoading] = useState(false);
  const [iFrame, setIFrame] = useState("");
  const { gameId } = useParams();
  const token = localStorage.getItem("token");

  /* get iframe url */
  useEffect(() => {
    window.scrollTo(0, 0);
    const getCasinoVideo = async () => {
      setLoading(true);
      const payload = {
        gameId: gameId,
        isHome: false,
        mobileOnly: true,
        casinoCurrency: Settings.casinoCurrency,
      };

      try {
        const res = await AxiosSecure.post(API.liveCasinoIFrame, payload);
        const data = res?.data;
        setIFrame(data?.gameUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error opening casino game:", error);
      }
    };
    getCasinoVideo();
  }, [gameId, token]);

  /* handle loading animation */
  if (loading) {
    return <Loader />;
  }

  return (
    <iframe
      allow="fullscreen;"
      src={iFrame}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        margin: "0px",
        padding: "0px",
        overflow: "hidden",
        zIndex: "999999",
      }}
    ></iframe>
  );
};

export default IFrame;
