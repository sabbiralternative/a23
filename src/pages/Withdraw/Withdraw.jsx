import { useEffect, useState } from "react";
import SelectAmount from "./SelectAmount";
import BankAccounts from "./BankAccounts";
import useBankAccount from "../../hooks/useBankAccount";
import WithdrawConfirm from "./WithdrawConfirm";
import AddBank from "../../components/modal/bank/AddBank";
import useContextState from "../../hooks/useContextState";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [bank, setBank] = useState("");
  const { addBank, setAddBank } = useContextState();
  const payload = {
    type: "getBankAccounts",
    status: "1",
  };
  const { bankData, refetchBankData } = useBankAccount(payload);

  useEffect(() => {
    setShowBankAccount(false);
    setConfirmWithdraw(false);
  }, []);

  useEffect(() => {
    if (showBankAccount && bankData?.length < 1) {
      setShowBankAccount(false);
      setAddBank(true);
    }
  }, [bankData, setAddBank, showBankAccount]);

  return (
    <>
      {!showBankAccount && !confirmWithdraw && (
        <SelectAmount
          setShowBankAccount={setShowBankAccount}
          setAmount={setAmount}
          amount={amount}
        />
      )}
      {showBankAccount && bankData?.length > 0 && (
        <BankAccounts
          refetchBankData={refetchBankData}
          setAmount={setAmount}
          bankData={bankData}
          setConfirmWithdraw={setConfirmWithdraw}
          setShowBankAccount={setShowBankAccount}
          bank={bank}
          setBank={setBank}
        />
      )}
      {addBank && bankData?.length < 1 && (
        <AddBank setAddBank={setAddBank} refetchBankData={refetchBankData} />
      )}
      {confirmWithdraw && (
        <WithdrawConfirm
          amount={amount}
          bank={bank}
          setAmount={setAmount}
          setShowBankAccount={setShowBankAccount}
          setConfirmWithdraw={setConfirmWithdraw}
          setBank={setBank}
        />
      )}
    </>
  );
};

export default Withdraw;
