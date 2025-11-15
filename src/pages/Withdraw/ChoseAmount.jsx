import useWithdrawBreakdown from "../../hooks/useWithdrawBreakdown";
import "./withdraw.css";

const ChooseAmount = ({ setTab, setAmount, amount }) => {
  const { data } = useWithdrawBreakdown();

  const handleShowBank = () => {
    if (
      amount < data?.result?.minimumWithdraw ||
      amount > data?.result?.mainWallet
    ) {
      return;
    } else {
      setTab("bank");
    }
  };

  return (
    <div>
      <div className="withdraw-container">
        <div className="withdraw-header-card">
          <div className="withdraw-title">Withdraw Funds</div>
          <div className="withdraw-instructions">
            <div className="instruction-item">
              1. This form is for withdrawing the amount from the main wallet
              only.
            </div>

            <div className="instruction-wrapper">
              <div className="instruction-item">
                2. The bonus wallet amount cannot be withdrawn by this form.
              </div>
            </div>
            <div className="instruction-wrapper">
              <div className="instruction-item">
                3. Do not put Withdraw request without betting with deposit
                amount. Such activity will be identified as Suspicious
              </div>
            </div>
            <div className="instruction-wrapper">
              <div className="instruction-item">
                4. If multiple users are using same withdraw account then all
                the linked users will be blocked.
              </div>
            </div>
          </div>
        </div>

        <div className="withdraw-form-section">
          <div className="form-header">
            <span className="form-header-text">
              Please fill in all required fields*
            </span>
          </div>

          <div className="form-card">
            <div className="form-content">
              <span className="available-balance">
                Available to withdrawal : ₹ {data?.result?.mainWallet}
              </span>

              <div className="input-group">
                <div className="input-label">
                  Amount <span className="required-mark">*</span>
                </div>
                <div
                  className={`input-wrapper ${
                    !amount ||
                    amount < data?.result?.minimumWithdraw ||
                    amount > data?.result?.mainWallet
                      ? "input-error-border"
                      : "input-success"
                  }`}
                >
                  <div className="currency-symbol">₹</div>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="amount-input"
                    placeholder="Enter Amount"
                    inputMode="numeric"
                    aria-label="Amount"
                    id="amount"
                    type="number"
                    value={amount}
                  />
                  <div className="minimum-text">
                    Minimum {data?.result?.minimumWithdraw}
                  </div>
                </div>
                <div className="input-helper">
                  <div className="helper-spacer" />
                </div>
              </div>
            </div>
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

          <div className="submit-section">
            <button
              onClick={handleShowBank}
              disabled={
                !amount ||
                amount < data?.result?.minimumWithdraw ||
                amount > data?.result?.mainWallet
              }
              className="submit-button"
              type="button"
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAmount;
