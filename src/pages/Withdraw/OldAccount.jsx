import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useBankMutation } from "../../hooks/bankAccount";

const OldAccount = ({ amount, bankAccounts, refetchBankAccounts }) => {
  const navigate = useNavigate();
  const { mutate: handleBank } = useBankMutation();
  const [bankId, setBankId] = useState("");
  const [disable, setDisable] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (amount?.length > 0 && bankId) {
      const bankData = {
        type: "withdrawCoins",
        amount: amount,
        bankId,
      };
      handleBank(bankData, {
        onSuccess: (data) => {
          if (data?.success) {
            toast.success(data?.result?.message);
            navigate("/");
          } else {
            toast.error(data?.error?.errorMessage);
          }
        },
        onError: (data) => {
          toast.error(data?.error?.errorMessage);
        },
      });
    }
  };

  const handleRemoveBank = async (bankId) => {
    const bankData = {
      type: "deleteBankAccount",
      bankId,
    };
    handleBank(bankData, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          refetchBankAccounts();
        } else {
          toast.error(data?.error?.errorMessage);
        }
      },
    });
  };

  return (
    <Fragment>
      {bankAccounts?.length > 0 ? (
        <form onSubmit={handleWithdraw} className="old-account-form">
          <div className="account-list">
            {bankAccounts?.map((account, i) => {
              return (
                <div
                  onClick={() => setBankId(account?.bankId)}
                  key={i}
                  className="account-row"
                >
                  <div
                    className={`account-card ${
                      account?.bankId === bankId ? "selected" : ""
                    }`}
                  >
                    <div className="account-icon">S</div>
                    <div className="account-info">
                      <span className="account-text">
                        <span className="account-name">
                          {account?.bankAccountName}
                        </span>
                        <span className="account-number">
                          {account?.accountNumber}
                        </span>
                        <span className="account-bank">
                          {account?.bankName}
                        </span>
                        <span className="account-upi">{account?.upiId}</span>
                      </span>
                      <button
                        style={{ justifyContent: "end" }}
                        className="remove-btn"
                        type="button"
                      >
                        <svg
                          onClick={() => handleRemoveBank(account?.bankId)}
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.25 11.875C10.5261 11.875 10.75 11.6511 10.75 11.375V6.375C10.75 6.0989 10.5261 5.875 10.25 5.875C9.9739 5.875 9.75 6.0989 9.75 6.375V11.375C9.75 11.6511 9.9739 11.875 10.25 11.875Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M6.75 11.875C7.0261 11.875 7.25 11.6511 7.25 11.375V6.375C7.25 6.0989 7.0261 5.875 6.75 5.875C6.4739 5.875 6.25 6.0989 6.25 6.375V11.375C6.25 11.6511 6.4739 11.875 6.75 11.875Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M10.5 2.125C10.7761 2.125 11 1.9011 11 1.625C11 1.3489 10.7761 1.125 10.5 1.125H6.5C6.2239 1.125 6 1.3489 6 1.625C6 1.9011 6.2239 2.125 6.5 2.125H10.5Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M3 2.625C2.7239 2.625 2.5 2.8489 2.5 3.125C2.5 3.4011 2.7239 3.625 3 3.625H3.5V12.825C3.5 13.955 4.42 14.875 5.55 14.875H11.45C12.58 14.875 13.5 13.955 13.5 12.825V3.625H14C14.2761 3.625 14.5 3.4011 14.5 3.125C14.5 2.8489 14.2761 2.625 14 2.625H13H4H3ZM12.5 3.625V12.825C12.5 13.405 12.03 13.875 11.45 13.875H5.55C4.97 13.875 4.5 13.405 4.5 12.825V3.625H12.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
            <button
              style={{ cursor: !bankId || disable ? "not-allowed" : "pointer" }}
              disabled={!bankId || disable}
              className="submit-button"
              type="submit"
            >
              <span>{bankId ? "SUBMIT" : "Please select bank account"}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="no-account">
          <div className="no-account-content">
            <div className="no-account-animation">{/* SVG TODO */}</div>
            <span className="no-account-text">No Accounts Added.</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OldAccount;
