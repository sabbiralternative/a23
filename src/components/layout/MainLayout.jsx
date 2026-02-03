import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../ui/Footer/Footer";
import Header from "../ui/Header/Header";
import useContextState from "../../hooks/useContextState";
import { useEffect } from "react";
import disableDevtool from "disable-devtool";
import { handleLogOut } from "../../utils/handleLogOut";
import { Settings } from "../../api";

const MainLayout = () => {
  const location = useLocation();
  const { addBank, setTokenLoading } = useContextState();
  const disabledDevtool = Settings?.disabledDevtool;
  const navigate = useNavigate();

  /* Disable devtool */
  useEffect(() => {
    /* If disable devtool true in notice.json then logout the user */
    if (window.location.hostname !== "localhost") {
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

  useEffect(() => {
    if (Settings?.pixel) {
      // Create fb pixel main script
      const script = document.createElement("script");
      script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ${Settings?.pixel});
      fbq('track', 'PageView');
    `;
      document.head.appendChild(script);

      // Create noscript + img
      const noscript = document.createElement("noscript");
      const img = document.createElement("img");
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      img.src = `https://www.facebook.com/tr?id=${Settings?.pixel}&ev=PageView&noscript=1`;
      noscript.appendChild(img);

      document.body.appendChild(noscript);

      return () => {
        // cleanup when component unmounts
        script.remove();
        noscript.remove();
      };
    }
  }, []);

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
