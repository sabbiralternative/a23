import { useLocation, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import useGetSocialLink from "../../../hooks/useGetSocialLink";
import { useEffect, useState } from "react";
import OpenBets from "../../modal/OpenBets";
import useCurrentBets from "../../../hooks/useCurrentBets";
import { Settings } from "../../../api";
import useLanguage from "../../../hooks/useLanguage";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../constant/constant";

const Footer = () => {
  const { valueByLanguage } = useLanguage();
  const { setSportsType, token } = useContextState();
  const navigate = useNavigate();
  const location = useLocation();
  const { socialLink } = useGetSocialLink();

  const loginName = localStorage.getItem("loginName");
  const { myBets } = useCurrentBets();
  const [showOpenBets, setShowOpenBets] = useState(false);
  /* Handle navigate  */
  const handleNavigate = (link) => {
    if (token) {
      navigate(link);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (Settings.chaportAppId) {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      const chaportConfig = {
        appId: Settings.chaportAppId,
        appearance: {
          windowColor: "#25d366",
          teamName: "Customer Care",
          onlineWelcome: "Hello, we are online!",
          offlineWelcome: "We are not online.",
          position: ["right", 0, 50],
          textStatuses: true,
        },
        launcher: {
          show: false,
        },
      };

      if (token) {
        chaportConfig.visitor = {
          name: loginName,
        };
      }
      const configString = JSON.stringify(chaportConfig);
      script.innerHTML = `
        (function(w,d,v3){
          w.chaportConfig = ${configString};
          
          if(w.chaport)return;v3=w.chaport={};v3._q=[];v3._l={};v3.q=function(){v3._q.push(arguments)};v3.on=function(e,fn){if(!v3._l[e])v3._l[e]=[];v3._l[e].push(fn)};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://app.chaport.com/javascripts/insert.js';var ss=d.getElementsByTagName('script')[0];ss.parentNode.insertBefore(s,ss);
        })(window, document);
      `;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [token, loginName]);

  // const openChaportOrWhatsapp = () => {
  //   if (Settings.chaportAppId) {
  //     return window.chaport.on("ready", function () {
  //       window.chaport.open();
  //     });
  //   }
  //   if (socialLink?.link) {
  //     window.open(socialLink?.link, "_blank");
  //   }
  // };
  const navigateWhatsApp = () => {
    if (token && socialLink?.branchWhatsapplink) {
      window.open(socialLink?.branchWhatsapplink, "_blank");
    } else {
      window.open(socialLink?.whatsapplink, "_blank");
    }
  };
  return (
    <>
      {showOpenBets && (
        <OpenBets myBets={myBets} setShowOpenBets={setShowOpenBets} />
      )}
      <div className="t1b5irhq footerBG footerText">
        <div
          onClick={() => {
            navigate("/more-page");
          }}
          className={`tabbar-item ${
            location.pathname === "/more-page" ? "active" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <svg viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
            <g className="footerIcon">
              <path d="M24.1627 21.0329C24.0232 21.1724 23.8576 21.2832 23.6753 21.3587C23.493 21.4343 23.2976 21.4731 23.1002 21.4731C22.9029 21.4731 22.7075 21.4343 22.5251 21.3587C22.3428 21.2832 22.1772 21.1724 22.0377 21.0329L19.3856 18.3808C18.2946 19.0791 17.0051 19.4969 15.6135 19.4969C11.7401 19.4969 8.6001 16.3569 8.6001 12.4836C8.6001 8.61019 11.7401 5.47021 15.6135 5.47021C19.4868 5.47021 22.6268 8.61019 22.6268 12.4836C22.6268 13.8752 22.209 15.1647 21.5107 16.2558L24.1627 18.9078C24.3023 19.0473 24.413 19.2129 24.4886 19.3953C24.5641 19.5776 24.603 19.773 24.603 19.9703C24.603 20.1677 24.5641 20.3631 24.4886 20.5454C24.413 20.7277 24.3023 20.8933 24.1627 21.0329ZM15.6135 7.47403C12.8472 7.47403 10.6039 9.7163 10.6039 12.4836C10.6039 15.2508 12.8472 17.4931 15.6135 17.4931C18.3807 17.4931 20.623 15.2508 20.623 12.4836C20.623 9.7163 18.3807 7.47403 15.6135 7.47403Z"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.1572 16.9289C12.1988 16.3113 12.2287 15.8679 11.548 15.8679H9.46919C10.2583 17.2974 11.5318 18.4222 13.0684 19.0209H17.8995L18.027 19.0156C18.288 18.994 17.7493 18.9071 16.9057 18.771C15.1674 18.4906 12.1346 18.0013 12.1346 17.4444C12.1346 17.2638 12.1463 17.0904 12.1572 16.9289ZM9.40822 19.0209H2.15853C1.29978 19.0209 0.603027 18.3151 0.603027 17.4444C0.603027 16.6171 1.23153 15.9391 2.03028 15.8731L2.15778 15.8679H7.25701C7.74417 17.0696 8.48304 18.1424 9.40822 19.0209ZM8.60082 12.5851C9.15168 12.3426 9.53717 11.7862 9.53717 11.1384C9.53717 10.689 9.35158 10.2835 9.05392 9.99635C8.76065 10.7694 8.6001 11.6077 8.6001 12.4836C8.6001 12.5175 8.60034 12.5513 8.60082 12.5851ZM7.08419 9.56185C6.7704 10.4781 6.6001 11.461 6.6001 12.4836C6.6001 12.5609 6.60107 12.638 6.60301 12.7149H2.15853C1.29978 12.7149 0.603027 12.0091 0.603027 11.1384C0.603027 10.3111 1.23153 9.6331 2.03028 9.5671L2.15778 9.56185H7.08419ZM9.70139 5.67986H2.15853C1.29978 5.67986 0.603027 4.97411 0.603027 4.10336C0.603027 3.27611 1.23153 2.59811 2.03028 2.53211L2.15778 2.52686H17.8988C18.7575 2.52686 19.4543 3.23261 19.4543 4.10336C19.4543 4.17696 19.4493 4.24938 19.4397 4.32029C18.2782 3.77497 16.9814 3.47021 15.6135 3.47021C13.3514 3.47021 11.284 4.3035 9.70139 5.67986ZM13.9047 5.67986C14.4516 5.54292 15.024 5.47021 15.6135 5.47021C16.2029 5.47021 16.7753 5.54292 17.3222 5.67986H13.9047Z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3196_4399">
                <rect
                  width="24"
                  height="24"
                  transform="translate(0.603027)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          <span>More</span>
        </div>
        <div
          onClick={() => {
            navigate("/");
            setSportsType(0);
          }}
          className={`tabbar-item ${location.pathname === "/" ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <svg viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
            <path
              className="footerIcon"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.3212 2.12156L21.258 7.89881C21.8707 8.40881 22.2247 9.16481 22.2247 9.96206V19.8148C22.2247 21.2976 21.0225 22.4998 19.5397 22.4998H14.6029V18.599C14.6029 18.0467 14.1552 17.599 13.6029 17.599H11.6029C11.0507 17.599 10.6029 18.0467 10.6029 18.599V22.4998H5.6662C4.18345 22.4998 2.9812 21.2976 2.9812 19.8148V9.96206C2.9812 9.16481 3.3352 8.40881 3.94795 7.89881L10.8847 2.12156C11.88 1.29281 13.326 1.29281 14.3212 2.12156Z"
            ></path>
          </svg>
          <span> {languageValue(valueByLanguage, LanguageKey.HOME)}</span>
        </div>
        {token ? (
          <div
            onClick={() =>
              setShowOpenBets(location.pathname !== "/open-bets" ? true : false)
            }
            className="tabbar-item"
          >
            <div className="wallet-tabbar-wrap">
              <div className="in-1 footerBG">
                <div className="in-2 footerCircle">
                  <svg
                    className="footerIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="1024"
                    height="1024"
                    viewBox="0 0 1024 1024"
                    style={{ marginTop: "-2px" }}
                  >
                    <title></title>
                    <g id="icomoon-ignore"></g>
                    <path d="M357.776 178.512c-77.118 0.807-123.488-30.712-173.478-1.85s-70.736 86.512-46.344 128.765l219.824-126.914z"></path>
                    <path d="M377.173 167.313c39.256-66.384 35.147-122.299 85.136-151.16 49.994-28.862 110.288-18.005 134.686 24.247l-219.824 126.914z"></path>
                    <path d="M45.215 409.818c-21.128 12.202-28.367 39.216-16.169 60.341l66.256 114.757 344.277-198.768-88.272-152.896 76.507-44.173 88.273 152.896 344.277-198.768-66.256-114.76c-12.202-21.128-39.211-28.367-60.336-16.169l-688.559 397.537z"></path>
                    <path d="M514.994 582.288h-353.367v397.539c0 24.398 19.776 44.173 44.173 44.173h309.2v-441.712zM603.34 582.288v441.712h265.026c24.398 0 44.173-19.776 44.173-44.173v-397.539h-309.2z"></path>
                    <path d="M713.767 516.032c0 12.195 9.89 22.086 22.086 22.086s22.086-9.89 22.086-22.086v-44.173h44.173c12.195 0 22.086-9.89 22.086-22.086s-9.89-22.086-22.086-22.086h-44.173v-44.173c0-12.198-9.89-22.086-22.086-22.086s-22.086 9.888-22.086 22.086v44.173h-44.173c-12.195 0-22.086 9.89-22.086 22.086s9.89 22.086 22.086 22.086h44.173v44.173z"></path>
                    <path d="M890.448 339.347c0 12.198 9.89 22.086 22.086 22.086s22.086-9.888 22.086-22.086v-44.173h44.173c12.195 0 22.086-9.888 22.086-22.086s-9.89-22.086-22.086-22.086h-44.173v-44.173c0-12.198-9.89-22.086-22.086-22.086s-22.086 9.888-22.086 22.086v44.173h-44.173c-12.195 0-22.086 9.888-22.086 22.086s9.89 22.086 22.086 22.086h44.173v44.173z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <span>Open Bets</span>
          </div>
        ) : (
          <div
            onClick={() => {
              navigate("/promotion");
            }}
            className={`tabbar-item ${
              location.pathname === "/promotion" ? "active" : ""
            }`}
          >
            <div className="wallet-tabbar-wrap">
              <div className="in-1 footerBG">
                <div className="in-2 footerCircle">
                  <svg
                    className="footerIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="1024"
                    height="1024"
                    viewBox="0 0 1024 1024"
                    style={{ marginTop: "-2px" }}
                  >
                    <title></title>
                    <g id="icomoon-ignore"></g>
                    <path d="M357.776 178.512c-77.118 0.807-123.488-30.712-173.478-1.85s-70.736 86.512-46.344 128.765l219.824-126.914z"></path>
                    <path d="M377.173 167.313c39.256-66.384 35.147-122.299 85.136-151.16 49.994-28.862 110.288-18.005 134.686 24.247l-219.824 126.914z"></path>
                    <path d="M45.215 409.818c-21.128 12.202-28.367 39.216-16.169 60.341l66.256 114.757 344.277-198.768-88.272-152.896 76.507-44.173 88.273 152.896 344.277-198.768-66.256-114.76c-12.202-21.128-39.211-28.367-60.336-16.169l-688.559 397.537z"></path>
                    <path d="M514.994 582.288h-353.367v397.539c0 24.398 19.776 44.173 44.173 44.173h309.2v-441.712zM603.34 582.288v441.712h265.026c24.398 0 44.173-19.776 44.173-44.173v-397.539h-309.2z"></path>
                    <path d="M713.767 516.032c0 12.195 9.89 22.086 22.086 22.086s22.086-9.89 22.086-22.086v-44.173h44.173c12.195 0 22.086-9.89 22.086-22.086s-9.89-22.086-22.086-22.086h-44.173v-44.173c0-12.198-9.89-22.086-22.086-22.086s-22.086 9.888-22.086 22.086v44.173h-44.173c-12.195 0-22.086 9.89-22.086 22.086s9.89 22.086 22.086 22.086h44.173v44.173z"></path>
                    <path d="M890.448 339.347c0 12.198 9.89 22.086 22.086 22.086s22.086-9.888 22.086-22.086v-44.173h44.173c12.195 0 22.086-9.888 22.086-22.086s-9.89-22.086-22.086-22.086h-44.173v-44.173c0-12.198-9.89-22.086-22.086-22.086s-22.086 9.888-22.086 22.086v44.173h-44.173c-12.195 0-22.086 9.888-22.086 22.086s9.89 22.086 22.086 22.086h44.173v44.173z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <span>Promotion</span>
          </div>
        )}
        <div
          onClick={() => handleNavigate("/account")}
          className="tabbar-item"
          style={{ cursor: "pointer" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g className="footerIcon">
              <path d="M5.61287 12.7928C7.64364 12.8944 8.89156 13.1502 10.3367 13.1502C10.7105 13.1502 11.0524 13.1338 11.3874 13.1071C10.3694 14.3318 9.75882 15.9027 9.75882 17.6157C9.75882 19.7472 10.7044 21.6591 12.2021 22.9587C9.65289 23.0707 6.80911 22.9648 4.81193 22.6409C1.79849 22.1518 -0.379556 20.0116 0.0553641 17.0481L0.0855072 16.8647C0.555738 14.2698 2.83196 12.6533 5.61287 12.7928ZM10.2006 0.609863C13.2235 0.609863 15.6746 3.04197 15.6746 6.04335C15.6746 9.04473 13.2235 11.4768 10.2006 11.4768C7.17686 11.4768 4.7258 9.04387 4.7258 6.04335C4.7258 3.04283 7.17686 0.609863 10.2006 0.609863Z"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 23.3424C21.3137 23.3424 24 20.6561 24 17.3424C24 14.0287 21.3137 11.3424 18 11.3424C14.6863 11.3424 12 14.0287 12 17.3424C12 20.6561 14.6863 23.3424 18 23.3424ZM18.4143 14.4323V13.9928H17.6041V14.4323L17.4222 14.4561H17.4182C16.539 14.4884 15.8386 15.0724 15.8386 15.7881C15.8386 15.8181 15.8394 15.8481 15.8417 15.8737C15.8409 15.8948 15.8402 15.916 15.8402 15.9372C15.8402 16.5909 16.2778 17.1627 16.9397 17.4776C17.5121 17.769 17.8347 17.9391 17.8957 17.9828C18.1349 18.2035 18.2797 18.4917 18.2797 18.807C18.2797 18.8637 18.2749 18.9192 18.2669 18.9676C18.2669 19.2232 18.1499 19.3458 17.9151 19.3458C17.9062 19.3465 17.8974 19.3471 17.8886 19.3471C17.7956 19.3471 17.7155 19.3026 17.6794 19.2374L17.6834 19.2484C17.6233 19.0974 17.5905 18.9367 17.5905 18.7702C17.5905 18.7495 17.5913 18.7295 17.5921 18.7121V18.1352H15.8306V18.6082C15.833 18.996 15.9868 19.3548 16.2417 19.6433L16.2441 19.6452C16.5767 19.955 17.0583 20.1583 17.6041 20.1822V20.6926H18.3614V20.1538H18.5666C19.6314 19.9963 20.1638 19.4273 20.1638 18.4469V18.452C20.1678 18.4127 20.1694 18.3733 20.1694 18.3333C20.1694 17.8351 19.8929 17.3879 19.4538 17.0852L17.9094 16.2863L17.9062 16.2844C17.8141 16.2282 17.7307 16.1624 17.657 16.0875L17.6594 16.0927C17.5953 15.9856 17.56 15.8655 17.56 15.7384C17.56 15.7165 17.5616 15.6952 17.5632 15.6765C17.5632 15.4209 17.6746 15.2886 17.8918 15.2886C18.109 15.2886 18.2148 15.4306 18.2148 15.7094V16.1346H19.9763V15.6829C19.9619 15.3757 19.8176 15.095 19.5892 14.8769C19.2807 14.6349 18.8751 14.4723 18.4143 14.4323Z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3205_7561">
                <rect width="24" height="24"></rect>
              </clipPath>
            </defs>
          </svg>
          <span>Account</span>
        </div>
        <div
          onClick={navigateWhatsApp}
          style={{ cursor: "pointer" }}
          className="tabbar-item"
        >
          {/* <div className="dont-badge"></div> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat"
            viewBox="0 0 16 16"
          >
            <path
              className="footerIcon"
              d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
            />
          </svg>
          <span>Chat</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
