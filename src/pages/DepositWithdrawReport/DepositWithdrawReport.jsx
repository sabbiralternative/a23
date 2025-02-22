import { useState } from "react";
import DepositReport from "./DepositReport";
import WithdrawReport from "./WithdrawReport";

const DepositWithdrawReport = () => {
  const [depositWithdraw, setDepositWithdraw] = useState("deposit");

  return (
    <>
      <div className="deposit-withdraw-btns  ">
        <div className="btns-animation ">
          <div className="btnBox ">
            <button
              onClick={() => setDepositWithdraw("deposit")}
              className="btn-inactive "
            >
              <span className="">Deposit</span>
            </button>
            <button
              onClick={() => setDepositWithdraw("withdraw")}
              className="btn-inactive "
            >
              <span className="">Withdraw</span>
            </button>
          </div>
          <div
            className={` ${
              depositWithdraw === "deposit"
                ? "animation-div-1"
                : "animation-div-2"
            }`}
          ></div>
        </div>
      </div>
      {depositWithdraw === "deposit" ? <DepositReport /> : <WithdrawReport />}
    </>
  );
};

export default DepositWithdrawReport;
