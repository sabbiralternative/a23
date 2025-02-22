import handLogo from "../../../src/assets/img/hand-logo.webp";
import indFlag from "../../../src/assets/img/ind-flag-icon.svg";
import { API, Settings } from "../../api";
import toast from "react-hot-toast";
import useGetSocialLink from "../../hooks/useGetSocialLink";
import getOtpOnWhatsapp from "../../utils/getOtpOnWhatsapp";
import { images } from "../../assets";
import { AxiosSecure } from "../../lib/AxiosSecure";
const GetOTP = ({ setMobileNo, mobileNo, setShowRegister, setOrderId }) => {
  /* get social link */
  const { socialLink } = useGetSocialLink();
  const getOtp = async (e) => {
    e.preventDefault();
    /* Get Otp based on settings*/
    if (Settings.otp) {
      const otpData = {
        mobile: mobileNo,
      };

      const res = await AxiosSecure.post(API.otp, otpData);
      const data = res.data;
      if (data?.success) {
        setOrderId({
          orderId: data?.result?.orderId,
          otpMethod: "sms",
        });
        toast.success(data?.result?.message);
        setShowRegister(true);
      } else {
        toast.error(data?.error?.errorMessage);
      }
    } else {
      setShowRegister(true);
    }
  };

  const getWhatsAppId = (links) => {
    window.open(links?.link, "_blank");
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobileNo(e.target.value);
    }
  };

  const handleGetOtpOnWhatsapp = async () => {
    await getOtpOnWhatsapp(mobileNo, setOrderId, setShowRegister);
  };

  return (
    <div className="" style={{ backdropFilter: "blur(1px)" }}>
      <div className="login-page-abc">
        <div>
          <div className="register-box">
            <div className="register-card">
              <div className="register-card-header">
                {/* <span>New Member?</span> */}
                <div className="register-text">
                  <p>Register Now,</p>
                  <img
                    src={handLogo}
                    alt=""
                    style={{ height: "24px", width: "24px" }}
                  />
                </div>
              </div>
              <form
                onSubmit={getOtp}
                className="ng-untouched ng-pristine ng-invalid"
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
                      <img loading="lazy" src={images.straightLine1} alt="" />
                    </div>
                    <input
                      onChange={(e) => handleMobileNo(e)}
                      type="number"
                      value={mobileNo}
                      className="mobile-input ng-untouched ng-pristine ng-invalid"
                      placeholder="Enter your Phone Number"
                    />
                  </div>
                </div>
                <div className="terms">
                  <div className="radio-check">
                    <img
                      src={images.checked}
                      alt=""
                      style={{ height: "1rem" }}
                    />
                  </div>
                  <span>
                    I confirm that I am 18 years old or above and agree to the
                    terms and conditions.
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    disabled={Settings.otp && mobileNo?.length < 10}
                    type="submit"
                    className="otp-btn"
                  >
                    <span> {Settings.otp ? "Get OTP on SMS" : "Proceed"}</span>
                  </button>

                  {Settings.otpless && (
                    <button
                      onClick={handleGetOtpOnWhatsapp}
                      disabled={mobileNo?.length < 10}
                      type="button"
                      className="otp-btn"
                    >
                      <span> Get OTP on Whatsapp</span>
                    </button>
                  )}
                </div>
              </form>
              {socialLink?.link && (
                <div
                  onClick={() => getWhatsAppId(socialLink)}
                  className="whatsup-card"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    style={{ height: "20px" }}
                    loading="lazy"
                    src={images.whatsapp}
                    alt=""
                  />
                  <span>Get Instant ID on Whatsapp</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetOTP;
