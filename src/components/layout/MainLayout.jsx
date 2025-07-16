import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../ui/Footer/Footer";
import Header from "../ui/Header/Header";
import useContextState from "../../hooks/useContextState";
import { Settings } from "../../api";
import { useEffect } from "react";
import disableDevtool from "disable-devtool";
import { handleLogOut } from "../../utils/handleLogOut";

const MainLayout = () => {
  const location = useLocation();
  const { addBank, setTokenLoading } = useContextState();
  const disabledDevtool = Settings.disabledDevtool;
  const navigate = useNavigate();

  /* Disable devtool */
  useEffect(() => {
    /* If disable devtool true in notice.json then logout the user */
    if (disabledDevtool) {
      disableDevtool({
        ondevtoolopen: (type) => {
          const info = "devtool opened!; type =" + type;
          if (info) {
            handleLogOut();
            setTokenLoading(true);
            window.location.href = "https://www.google.com/";
          }
        },
      });
    }
  }, [navigate, disabledDevtool]);

  /* handling main content height */
  const handleMainContainerHeight = () => {
    if (
      !location.pathname.includes("/casino") &&
      !addBank &&
      !location.pathname.includes("/1") &&
      !location.pathname.includes("/2") &&
      !location.pathname.includes("/4")
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const changePassword = localStorage.getItem("changePassword");
    if (changePassword) {
      navigate("/change-password");
    }
  }, [location.pathname, navigate]);

  return (
    <div
      className="centered-div"
      style={{
        paddingBottom: `${location.pathname.includes("/casino") ? "0px" : ""}`,
      }}
    >
      <Header />
      <div
        style={{
          minHeight: `calc(100vh - ${
            handleMainContainerHeight() ? "268px" : "210px"
          })`,
        }}
      >
        <Outlet />
      </div>
      {!location.pathname.includes("/casino") &&
      !addBank &&
      !location.pathname.includes("/1") &&
      !location.pathname.includes("/2") &&
      !location.pathname.includes("/4") &&
      !location.pathname.includes("/funbar") ? (
        <Footer />
      ) : null}
    </div>
  );
};

export default MainLayout;
