import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Settings } from "../../api";
import { useIndex } from "../../hooks";

const NotFound = () => {
  const { mutate } = useIndex();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const showRegister = () => {
      if (
        location.pathname?.toLowerCase() === "/register" &&
        Settings.register
      ) {
        navigate("/register");
      } else if (location.pathname.includes("/ref/") && Settings.register) {
        const splitPath = location.pathname.split("/");
        const lastDigit = splitPath[splitPath?.length - 1];

        if (parseFloat(lastDigit)) {
          mutate({ type: "addReferralCount", referral_id: lastDigit });
          localStorage.setItem("referralCode", lastDigit);
          navigate("/register");
        }
      }
    };
    showRegister();
  }, [location, navigate]);

  return <Navigate to="/" replace />;
};

export default NotFound;
