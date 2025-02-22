import indFlag from "../../../src/assets/img/ind-flag-icon.svg";
import { API, Settings } from "../../api";
import toast from "react-hot-toast";
import getOtpOnWhatsapp from "../../utils/getOtpOnWhatsapp";
import { AxiosSecure } from "../../lib/AxiosSecure";
const GetForgotOTP = ({ setShowOtp, mobileNo, setMobileNo, setOrderId }) => {
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
        setShowOtp(true);
      } else {
        toast.error(data?.error?.errorMessage);
      }
    } else {
      setShowOtp(true);
    }
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobileNo(e.target.value);
    }
  };

  const handleGetOtpOnWhatsapp = async () => {
    await getOtpOnWhatsapp(mobileNo, setOrderId, setShowOtp);
  };
  return (
    <div className="e-p-body-bc" style={{ backdropFilter: "blur(1px)" }}>
      <div className="login-page-abc">
        <div>
          <div className="register-box">
            <div className="register-card">
              <div className="register-card-header">
                <div className="register-text">
                  <p>Forgot Password</p>
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

                    <input
                      onChange={(e) => handleMobileNo(e)}
                      value={mobileNo}
                      type="tel"
                      className="mobile-input ng-untouched ng-pristine ng-invalid"
                      placeholder="Enter your Phone Number"
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    disabled={Settings.otp && mobileNo?.length < 10}
                    type="submit"
                    className="otp-btn"
                  >
                    <span>Get OTP on SMS</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetForgotOTP;
