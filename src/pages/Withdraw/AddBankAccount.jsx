import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { API, Settings } from "../../api";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { useBankMutation } from "../../hooks/bankAccount";
import useContextState from "../../hooks/useContextState";

const AddBankAccount = ({ setTab, refetchBankAccounts }) => {
  const { token } = useContextState();
  const { mutate: addNewBank } = useBankMutation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    ifsc: "",
    accountNumber: "",
    confirmAccountNumber: "",
    upiId: "",
    otp: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();

    if (bankDetails.accountNumber != bankDetails.confirmAccountNumber) {
      return toast.error("Account number not matched!");
    }

    if (mobile && !bankDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }
    /* generating random token for post data */

    let bankData = {
      accountName: bankDetails.accountName,
      ifsc: bankDetails.ifsc,
      accountNumber: bankDetails.accountNumber,
      upiId: bankDetails.upiId,
      type: "addBankAccount",
    };
    if (mobile) {
      bankData.mobile = mobile;
      bankData.otp = bankDetails.otp;
      bankData.orderId = orderId;
    }

    const res = await addNewBank(bankData).unwrap();
    if (res?.success) {
      setBankDetails({
        accountName: "",
        ifsc: "",
        accountNumber: "",
        confirmAccountNumber: "",
        otp: "",
      });
      toast.success(res?.result?.message);
      setTab("oldAccount");
      refetchBankAccounts();
      window.scrollTo(0, 0);
    } else {
      toast.error(res?.result?.message);
    }
  };

  const validateForm = (bankDetails) => {
    const isaccountNameFilled = bankDetails.accountName.trim() !== "";
    const isaccountNumberFilled = bankDetails.accountNumber.trim() !== "";
    const isIfscFilled = bankDetails.ifsc.trim() !== "";
    const isOTPFilled =
      mobile && Settings.otp ? bankDetails.otp.trim() !== "" : true;
    const isFormValid =
      isaccountNameFilled &&
      isIfscFilled &&
      isaccountNumberFilled &&
      isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(bankDetails);
  }, [bankDetails]);

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
        {/* UPI ID Field */}
        <div className="form-field">
          <div className="field-label">UPI ID (Optional)</div>
          <div className="input-wrapper">
            <input
              className="form-input"
              placeholder="Enter UPI ID"
              aria-label="Account No"
              id="accountNo"
              type="text"
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  upiId: e.target.value,
                });
              }}
              value={bankDetails.upiId}
            />
          </div>
          <div className="field-helper">
            <div className="helper-space" />
          </div>
        </div>

        {/* Account Name Field */}
        <div className="form-field">
          <div className="field-label">
            Account Name
            <span className="required-asterisk">*</span>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  accountName: e.target.value,
                });
              }}
              className="form-input"
              placeholder="Enter Account Name"
              aria-label="Confirm Account No"
              id="confirmAccountNo"
              type="text"
              value={bankDetails.accountName}
            />
          </div>
          <div className="field-helper">
            <div className="helper-space" />
          </div>
        </div>

        {/* Account No Field */}
        <div className="form-field">
          <div className="field-label">
            Account No <span className="required-asterisk">*</span>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  accountNumber: e.target.value,
                });
              }}
              className="form-input"
              placeholder="Enter Account No"
              aria-label="Account Name"
              id="accountName"
              type="text"
              value={bankDetails.accountNumber}
            />
          </div>
          <div className="field-helper">
            <div className="helper-space" />
          </div>
        </div>

        {/* Confirm Account No Field */}
        <div className="form-field">
          <div className="field-label">
            Confirm Account No <span className="required-asterisk">*</span>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  confirmAccountNumber: e.target.value,
                });
              }}
              className="form-input"
              placeholder="Re-enter Account No"
              aria-label="Account Name"
              id="accountName"
              type="text"
              value={bankDetails.confirmAccountNumber}
            />
          </div>
          <div className="field-helper">
            <div className="helper-space" />
          </div>
        </div>

        {/* IFSC Code Field */}
        <div className="form-field">
          <div className="field-label">
            IFSC Code <span className="required-asterisk">*</span>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  ifsc: e.target.value,
                });
              }}
              className="form-input"
              placeholder="Enter IFSC Code"
              aria-label="Account Name"
              id="accountName"
              type="text"
              value={bankDetails.ifsc}
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
                  setBankDetails({
                    ...bankDetails,
                    otp: e.target.value,
                  });
                }}
                className="form-input"
                placeholder="Enter OTP"
                aria-label="Account Name"
                id="accountName"
                type="text"
                value={bankDetails.otp}
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

export default AddBankAccount;
