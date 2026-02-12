import { useState } from "react";
// import logo from "../../../src/assets/img//logo_small_w.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { API, Settings } from "../../api";
import handleDepositMethod from "../../utils/handleDepositMethod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useContextState from "../../hooks/useContextState";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { HiArrowNarrowDown } from "react-icons/hi";
import { GrAndroid } from "react-icons/gr";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const { setGetToken, closePopupForForever } = useContextState();

  /* handle login */
  const onSubmit = async ({ username, password }) => {
    setDisable(true);

    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
      apk: closePopupForForever ? true : false,
    };

    const { data } = await AxiosSecure.post(API.login, loginData);
    console.log(data);
    if (data.success) {
      setDisable(false);
      if (Settings.deposit) {
        const handleDeposit = handleDepositMethod(data.result.token);
        const res = await handleDeposit();
        if (res?.success) {
          localStorage.setItem("depositMethod", JSON.stringify(res?.result));
        }
      }

      /* Set token to localeStorage */
      localStorage.setItem("mobile", data.result.mobile);
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("memberId", data.result.memberId);
      /* Set bonus token in locale storage */
      localStorage.setItem("bonusToken", data?.result?.bonusToken);
      /* Set login name to locale storage */
      localStorage.setItem("loginName", data.result.loginName);
      const banner = data.result.banner;
      if (banner) {
        localStorage.setItem("banner", banner);
      }
      const buttonValue = JSON.stringify(data.result.buttonValue.game);
      /* set button value to locale storage */
      localStorage.setItem("buttonValue", buttonValue);
      if (Settings.referral) {
        const referralCode = data.result.referralCode;
        localStorage.setItem(
          "referralCode",
          referralCode == null ? "show" : referralCode,
        );
      }
      /* if in locale storage token and login name available and  data?.result?.changePassword === false */
      setGetToken((prev) => !prev);
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("loginName") &&
        data?.result?.changePassword === false
      ) {
        toast.success("Login Successful");
        navigate("/");
      }
      if (data?.result?.changePassword) {
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
    } else {
      /* Show error message during login failed */
      setDisable(false);
      toast.error(data?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    setDisable(true);

    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
      apk: closePopupForForever ? true : false,
    };
    const { data } = await AxiosSecure.post(API.login, loginData);
    console.log(data);
    if (data?.success) {
      setDisable(false);
      const banner = data.result.banner;
      if (banner) {
        localStorage.setItem("banner", banner);
      }
      /* Set token to localeStorage */
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("branchMobile", data.result.branchMobile);
      /* Set login name to locale storage */
      /* Set bonus token in locale storage */
      localStorage.setItem("bonusToken", data?.result?.bonusToken);
      localStorage.setItem("loginName", data.result.loginName);
      /* set button value to locale storage */
      const buttonValue = JSON.stringify(data.result.buttonValue.game);
      localStorage.setItem("buttonValue", buttonValue);
      /* if in locale storage token and login name available and  data?.result?.changePassword === false */
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("loginName") &&
        data?.result?.changePassword === false
      ) {
        /* get current token from locale storage */
        setGetToken((prev) => !prev);
        navigate("/");
        toast.success("Login Successful");
      } else {
        /* Show error message during login failed */
        setDisable(false);
        toast.error(data?.error);
      }
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  return (
    <div className="e-p-body-bc">
      <div className="login-page-abc">
        <div>
          <div className="login-page">
            <div className="login-box">
              <div className="login-card">
                {/* <div className="login-card-header">
                <span>Log in</span>
                <div className="login-text">
                  <p>Welcome</p>
                  <img
                    loading="lazy"
                    src={logo}
                    alt="waving-hand"
                    style={{ height: "24px", width: "24px" }}
                  />
                </div>
              </div> */}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: "100%" }}
                  className="animateSignInFormUserId ng-dirty ng-touched ng-invalid"
                  data-gtm-form-interact-id="2"
                >
                  <div className="whatsup-login-box">
                    <div className="mobile-input">
                      <span>User ID / Mobile Number*</span>
                      <div className="input-box">
                        <div className=""></div>
                        <input
                          {...register("username", {
                            required: true,
                          })}
                          type="text"
                          placeholder="Enter User ID / Mobile Number"
                          className="ng-dirty ng-touched ng-invalid"
                          data-gtm-form-interact-field-id="4"
                        />
                      </div>

                      <div className="password-input password-input-1">
                        <span>Password*</span>
                        <input
                          {...register("password", {
                            required: true,
                          })}
                          placeholder="Enter your password"
                          type={`${showPassword ? "text" : "password"}`}
                          className="ng-dirty ng-touched ng-invalid"
                          data-gtm-form-interact-field-id="5"
                        />
                        <span className="showPass">
                          <div className=""></div>
                          {showPassword ? (
                            <FaEye
                              onClick={() => setShowPassword((prev) => !prev)}
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() => setShowPassword((prev) => !prev)}
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          )}
                        </span>
                      </div>
                      {Settings.register && (
                        <div
                          onClick={() => {
                            navigate("/forgot-password");
                          }}
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            width: "100%",
                            justifyContent: "flex-end",
                            cursor: "pointer",
                          }}
                          className="forgot"
                        >
                          <span>Forgot Password?</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    disabled={disable}
                    type="submit"
                    className="login-btn"
                  >
                    <span>Log in</span>
                  </button>
                  <div className="login-with">
                    <div className="line"></div>
                    <span>OR </span>
                    <div className="line"></div>
                  </div>
                  <div className="login-box1">
                    <div
                      style={{ border: "none" }}
                      onClick={loginWithDemo}
                      id="buttonDiv"
                      className="google-login"
                    >
                      <span>Demo Login</span>
                    </div>
                    <div
                      onClick={() => {
                        navigate("/register");
                      }}
                      className="google-login"
                      style={{ cursor: "pointer", border: "none" }}
                    >
                      <span>Register</span>
                    </div>
                    {Settings.apk_link && (
                      <div
                        onClick={handleDownload}
                        className="google-login"
                        style={{
                          cursor: "pointer",
                          border: "none",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            gap: "6px",
                          }}
                        >
                          <GrAndroid /> Download .apk <HiArrowNarrowDown />
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
