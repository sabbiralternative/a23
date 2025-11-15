import { useEffect, useState } from "react";
import AddBankAccount from "./AddBankAccount";
import AddUSDTAccount from "./AddUSDTAccount";
import OldAccount from "./OldAccount";
import useBankAccount from "../../hooks/useBankAccount";

const BankAccount = ({ amount }) => {
  const bankData = {
    type: "getBankAccounts",
    status: "1",
  };
  const { bankData: data, refetchBankData } = useBankAccount(bankData);
  const [tab, setTab] = useState("");

  useEffect(() => {
    if (data?.length > 0) {
      setTab("oldAccount");
    } else {
      setTab("add-bank-account");
    }
  }, [data]);

  return (
    <div className="bank-account-container">
      <div className="bank-account-content">
        <div className="bank-account-header">
          <span className="bank-account-header-text">
            Please fill in all required fields*
          </span>
          <div className="tab-container">
            <div id="step-selectMode" className="tab-wrapper">
              <button
                onClick={() => setTab("add-bank-account")}
                className={`tab-button ${
                  tab === "add-bank-account" ? "tab-button-active" : ""
                }`}
              >
                Add Bank Account
              </button>
              <button
                onClick={() => setTab("add-usdt-account")}
                className={`tab-button ${
                  tab === "add-usdt-account" ? "tab-button-active" : ""
                }`}
              >
                Add USDT Account
              </button>
              <button
                onClick={() => setTab("oldAccount")}
                className={`tab-button ${
                  tab === "oldAccount" ? "tab-button-active" : ""
                }`}
              >
                Use Previous Account
              </button>
              <div
                className={`tab-indicator ${
                  tab === "oldAccount"
                    ? "tab-indicator-right"
                    : tab === "add-bank-account"
                    ? "tab-indicator-left"
                    : "tab-indicator-center"
                }`}
              >
                <div className="tab-indicator-bg" />
              </div>
            </div>
          </div>
        </div>
        {tab === "add-bank-account" && (
          <AddBankAccount
            setTab={setTab}
            refetchBankAccounts={refetchBankData}
          />
        )}
        {tab === "add-usdt-account" && (
          <AddUSDTAccount
            setTab={setTab}
            refetchBankAccounts={refetchBankData}
          />
        )}
        {tab === "oldAccount" && (
          <OldAccount
            bankAccounts={data}
            amount={amount}
            refetchBankAccounts={refetchBankData}
          />
        )}
      </div>
    </div>
  );
};

export default BankAccount;
