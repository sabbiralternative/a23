import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useBankMutation } from "../../hooks/bankAccount";
import { API, Settings } from "../../api";
import { AxiosSecure } from "../../lib/AxiosSecure";
import useContextState from "../../hooks/useContextState";

const AddUSDTAccount = ({ setTab, refetchBankAccounts }) => {
  const { token } = useContextState();
  const { mutate: addNewUSDTAccount } = useBankMutation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [mobile, setMobile] = useState(null);

  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [usdtDetails, setUsdtDetails] = useState({
    otp: "",
    usdt_type: "",
    wallet_address: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();

    if (mobile && !usdtDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }
    /* generating random token for post data */

    let payload = {
      wallet_address: usdtDetails.wallet_address,
      usdt_type: usdtDetails.usdt_type,
      type: "addUSDTAccount",
    };
    if (mobile) {
      payload.mobile = mobile;
      payload.otp = usdtDetails.otp;
      payload.orderId = orderId;
    }

    addNewUSDTAccount(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setUsdtDetails({
            otp: "",
            usdt_type: "",
            wallet_address: "",
          });
          toast.success(data?.result?.message);
          setTab("oldAccount");
          refetchBankAccounts();
          window.scrollTo(0, 0);
        } else {
          toast.error(data?.result?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.result?.message);
      },
    });
  };

  const validateForm = (usdtDetails) => {
    const isUSDTTypeFilled = usdtDetails.usdt_type.trim() !== "";
    const isWalletAddressFilled = usdtDetails.wallet_address.trim() !== "";
    const isOTPFilled = mobile ? usdtDetails.otp.trim() !== "" : true;
    const isFormValid =
      isUSDTTypeFilled && isWalletAddressFilled && isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(usdtDetails);
  }, [usdtDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrderId(data?.result?.orderId);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  useEffect(() => {
    const getMobile = () => {
      const decode = jwtDecode(token);

      if (decode?.mobile) {
        setMobile(decode?.mobile);
      }
    };
    getMobile();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);

  const getOtpOnWhatsapp = async () => {
    const otpData = {
      mobile: mobile,
      type: "otpsend",
    };

    const res = await AxiosSecure.post(API.otpless, otpData);
    const data = res.data;

    if (data?.success) {
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };
  return (
    <form onSubmit={handleAddBank} className="new-account-form">
      <div className="form-container">
        {/* Wallet Address Field */}
        <div className="form-field">
          <div className="field-label">
            USDT Type <span className="required-asterisk">*</span>
          </div>
          <div
            className="input-wrapper"
            style={{
              gap: "0px 10px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0px 3px" }}
            >
              <p style={{ margin: "0px", fontSize: "12px" }}>BEP20</p>
              <input
                name="usdt-type"
                onChange={(e) => {
                  setUsdtDetails({
                    ...usdtDetails,
                    usdt_type: e.target.value,
                  });
                }}
                type="radio"
                placeholder="Enter Wallet Address"
                className="pr-2"
                value="BEP20"
              />
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0px 3px" }}
            >
              <p style={{ margin: "0px", fontSize: "12px" }}>TRC20</p>
              <input
                name="usdt-type"
                onChange={(e) => {
                  setUsdtDetails({
                    ...usdtDetails,
                    usdt_type: e.target.value,
                  });
                }}
                type="radio"
                placeholder="Enter Wallet Address"
                className="pr-2"
                value="TRC20"
              />
            </div>
          </div>
          <div className="field-helper">
            <div className="helper-space" />
          </div>
        </div>
        {/* Wallet Address Field */}
        <div className="form-field">
          <div className="field-label">
            Wallet Address <span className="required-asterisk">*</span>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => {
                setUsdtDetails({
                  ...usdtDetails,
                  wallet_address: e.target.value,
                });
              }}
              className="form-input"
              placeholder="Enter Wallet Address"
              type="text"
              value={usdtDetails.ifsc}
            />
          </div>
          <div className="field-helper">
            <div className="helper-space" />
          </div>
        </div>

        {/* Mobile Field (Conditional) */}
        {mobile && Settings.otp && (
          <div className="form-field">
            <div className="field-label">
              Mobile <span className="required-asterisk">*</span>
            </div>
            <div className="input-wrapper">
              <input
                readOnly
                className="form-input"
                placeholder="Enter Mobile No"
                aria-label="Account Name"
                id="accountName"
                type="text"
                value={mobile}
              />
              <div className="otp-button-container">
                {timer ? (
                  <button onClick={getOtp} className="otp-button" type="button">
                    <span>Retry in {timer}</span>
                  </button>
                ) : (
                  <div className="otp-buttons-group">
                    {Settings.otpWhatsapp && (
                      <button
                        onClick={getOtpOnWhatsapp}
                        className="otp-button otp-button-primary"
                        type="button"
                      >
                        <span className="otp-button-text">
                          Get OTP Whatsapp
                        </span>
                        <span className="shimmer"></span>
                      </button>
                    )}

                    <button
                      onClick={getOtp}
                      className="otp-button otp-button-primary"
                      type="button"
                    >
                      <span className="otp-button-text">Get OTP SMS</span>
                      <span className="shimmer"></span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="field-helper">
              <div className="helper-space" />
            </div>
          </div>
        )}

        {/* OTP Field (Conditional) */}
        {mobile && Settings.otp && (
          <div className="form-field">
            <div className="field-label">
              OTP <span className="required-asterisk">*</span>
            </div>
            <div className="input-wrapper">
              <input
                maxLength={6}
                onChange={(e) => {
                  setUsdtDetails({
                    ...usdtDetails,
                    otp: e.target.value,
                  });
                }}
                className="form-input"
                placeholder="Enter OTP"
                aria-label="Account Name"
                id="accountName"
                type="text"
                value={usdtDetails.otp}
              />
              <div className="otp-button-container"></div>
            </div>
            <div className="field-helper">
              <div className="helper-space" />
            </div>
          </div>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="terms-section">
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span className="checkmark"></span>
        </label>
        <span className="terms-text">
          I have read and agree with{" "}
          <span className="terms-link">
            the terms of payment and withdrawal policy.
          </span>
        </span>
      </div>

      {/* Submit Button */}
      <div className="submit-container">
        <button disabled={!isFormValid} className="submit-button" type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default AddUSDTAccount;
