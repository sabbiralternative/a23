import { useState } from "react";
import ChooseAmount from "./ChoseAmount";
import BankAccount from "./BankAccount";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState("choseAmount");
  return (
    <div className="dep-w-info-bc  ng-star-inserted">
      {tab === "choseAmount" && (
        <ChooseAmount amount={amount} setAmount={setAmount} setTab={setTab} />
      )}
      {tab === "bank" && <BankAccount amount={amount} />}
    </div>
  );
};

export default Withdraw;
