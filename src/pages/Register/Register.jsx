import { useEffect, useRef, useState } from "react";
import indFlag from "../../../src/assets/img/ind-flag-icon.svg";
import { API, Settings } from "../../api";
import GetOTP from "./GetOTP";
import { useForm } from "react-hook-form";
import handleDepositMethod from "../../utils/handleDepositMethod";
import useContextState from "../../hooks/useContextState";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AxiosSecure } from "../../lib/AxiosSecure";

const Register = () => {
  const referralCode = localStorage.getItem("referralCode");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [orderId, setOrderId] = useState({
    orderId: "",
    otpMethod: "",
  });
  const [showRegister, setShowRegister] = useState(false);
  const [countDown, setCountDown] = useState(45);
  const { setGetToken } = useContextState();
  const navigate = useNavigate();
  const inputs = useRef([]);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  /* handle count down for register page */
  useEffect(() => {
    if (showRegister) {
      if (countDown > 0) {
        setTimeout(() => {
          setCountDown((prev) => prev - 1);
        }, 1000);
      }
    }
  }, [countDown, showRegister]);

  /* handle focus first input for enter otp */
  useEffect(() => {
    if (showRegister) {
      setTimeout(() => {
        if (inputs?.current?.length > 0) {
          inputs?.current?.[0]?.focus();
        }
      }, 1000);
    }
  }, [showRegister]);

  /* handle focus input element  */
  const handleInput = (index, e) => {
    const newValue = e.target.value.slice(0, 1);
    const newOtpValues = [...otpValues];
    newOtpValues[index] = newValue;
    setOtpValues(newOtpValues);
    if (newValue && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  /* handle register */
  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    if (user.password.length < 8 || user.confirmPassword.length < 8) {
      return toast.error("Password should be at least 8 character");
    }
    if (user.password !== user?.confirmPassword) {
      return toast.error("Password did not matched");
    }

    const registerData = {
      username: user?.userName,
      password: user?.password,
      confirmPassword: user?.confirmPassword,
      mobile: mobileNo,
      otp: otpValues.join(""),
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || user.referralCode,
      orderId: orderId.orderId,
      otpMethod: orderId.otpMethod,
    };

    const { data } = await AxiosSecure.post(API.register, registerData);
    if (data?.success) {
      localStorage.removeItem("referralCode");
      if (Settings.deposit) {
        const handleDeposit = handleDepositMethod(data.result.token);
        const res = await handleDeposit();
        if (res?.success) {
          localStorage.setItem("depositMethod", JSON.stringify(res?.result));
        }
      }
      const banner = data.result.banner;
      if (banner) {
        localStorage.setItem("banner", banner);
      }
      /* Set token to localeStorage */
      localStorage.setItem("token", data.result.token);
      /* Set bonus token in locale storage */
      localStorage.setItem("bonusToken", data?.result?.bonusToken);
      /* Set login name to locale storage */
      localStorage.setItem("loginName", data.result.loginName);
      const buttonValue = JSON.stringify(data.result.buttonValue.game);
      /* set button value to locale storage */
      localStorage.setItem("buttonValue", buttonValue);

      /* if in locale storage token and login name available and  data?.result?.changePassword === false */
      setGetToken((prev) => !prev);
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("loginName") &&
        data?.result?.changePassword === false
      ) {
        /* Show success message */
        toast.success("User registration successful!");
        /* Close modal */
        navigate("/");
      } else {
        toast.error(data?.error?.description);
      }
    } else {
      toast.error(data?.error?.description);
    }
  };

  const getOtp = async () => {
    const otpData = {
      mobile: mobileNo,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setCountDown(45);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  return (
    <>
      {Settings.otp && !showRegister ? (
        <GetOTP
          setMobileNo={setMobileNo}
          mobileNo={mobileNo}
          setShowRegister={setShowRegister}
          setOrderId={setOrderId}
        />
      ) : (
        <div className="">
          <div className="login-page-abc">
            <div>
              <div className="register-box">
                <div className="register-card">
                  {/* <div className="register-card-header">
                    <span>New Member?</span>
                    <div className="register-text">
                      <p>Register Now,</p>
                      <img
                        src={handLogo}
                        alt=""
                        style={{ height: "24px", width: "24px" }}
                      />
                    </div>
                  </div> */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="ng-invalid ng-submitted ng-untouched ng-pristine"
                    data-gtm-form-interact-id="4"
                  >
                    <div className="mobile-input">
                      <span>Mobile Number*</span>
                      <div className="input-box">
                        <span className="drp-btn">+91</span>
                        <img
                          loading="lazy"
                          src={indFlag}
                          alt=""
                          className="india-flag"
                        />
                        <div className="str-line">
                          <img
                            loading="lazy"
                            src="assets/img/straight-line1.svg"
                            alt=""
                          />
                        </div>
                        <input
                          type="tel"
                          className="mobile-input ng-dirty ng-touched"
                          placeholder="Enter your Phone Number"
                          value={mobileNo}
                          readOnly
                          data-gtm-form-interact-field-id="8"
                        />
                        <img
                          src="assets/img/right-click-check.svg"
                          alt=""
                          style={{
                            position: "absolute",
                            right: "-1rem",
                            marginRight: "1.5rem",
                          }}
                        />
                      </div>
                    </div>
                    {/* <div className="terms">
                      <div className="radio-check">
                        <img
                          src="assets/img/checked.webp"
                          alt=""
                          style={{ height: "1rem" }}
                        />
                      </div>
                      <span>
                        I confirm that I am 18 years old or above and agree to
                        the terms and conditions.
                      </span>
                    </div> */}
                    <div>
                      <div className="otp-input-box">
                        <span>Enter OTP*</span>
                        <div className="input-boxes">
                          {[...Array(6)].map((_, index) => (
                            <input
                              key={index}
                              ref={(el) => (inputs.current[index] = el)}
                              onChange={(e) => handleInput(index, e)}
                              placeholder="_"
                              id="first"
                              type="number"
                              value={otpValues[index]}
                              className="ng-untouched ng-pristine ng-invalid"
                            />
                          ))}
                        </div>
                        {countDown <= 0 ? (
                          <span onClick={getOtp} className="resend-otp">
                            Resend
                          </span>
                        ) : (
                          <span className="resend-otp">
                            Resend in 00:{countDown}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div className="pwd-box">
                        <span className="pwd-text">Password*</span>
                        <input
                          onChange={(e) => {
                            setUser({
                              ...user,
                              password: e.target.value,
                            });
                          }}
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          className="ng-untouched ng-pristine ng-invalid"
                        />
                        <span className="showPass">
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
                      <div className="pwd-box">
                        <span className="pwd-text">Confirm Password*</span>
                        <input
                          onChange={(e) => {
                            setUser({
                              ...user,
                              confirmPassword: e.target.value,
                            });
                          }}
                          placeholder="Enter Confirm password"
                          type={showConfirmPass ? "text" : "password"}
                          className="ng-untouched ng-pristine ng-valid"
                        />
                        <span className="showPass">
                          {showConfirmPass ? (
                            <FaEye
                              onClick={() =>
                                setShowConfirmPass((prev) => !prev)
                              }
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() =>
                                setShowConfirmPass((prev) => !prev)
                              }
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          )}
                        </span>
                      </div>
                      <div className="pwd-box">
                        <span className="pwd-text">Referral Code</span>
                        <input
                          onChange={(e) => {
                            setUser({
                              ...user,
                              referralCode: e.target.value,
                            });
                          }}
                          readOnly={referralCode}
                          placeholder="Enter Referral Code"
                          type="text"
                          className="ng-untouched ng-pristine ng-valid"
                          defaultValue={referralCode}
                        />
                      </div>
                    </div>
                    <button type="submit" className="submit-btn">
                      <span>Register</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
