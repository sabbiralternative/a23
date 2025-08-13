import { useState } from "react";
import DepositModal from "../../components/modal/DepositModal";
import AmountBox from "./AmountBox";
import PaymentMethods from "./PaymentMethods";
import UploadTransaction from "./UploadTransaction";

const Deposit = () => {
  const [amount, setAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(false);
  const [uploadTransaction, setUploadTransaction] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [tabs, setTabs] = useState("");
  return (
    <>
      {!paymentMethods && !uploadTransaction && (
        <AmountBox
          amount={amount}
          setAmount={setAmount}
          setShowModal={setShowModal}
        />
      )}
      {uploadTransaction && (
        <UploadTransaction tabs={tabs} paymentId={paymentId} amount={amount} />
      )}
      {paymentMethods && (
        <PaymentMethods
          setTabs={setTabs}
          tabs={tabs}
          setUploadTransaction={setUploadTransaction}
          setPaymentMethods={setPaymentMethods}
          setPaymentId={setPaymentId}
          amount={amount}
        />
      )}
      {showModal && (
        <DepositModal
          amount={amount}
          setShowModal={setShowModal}
          setPaymentMethods={setPaymentMethods}
        />
      )}
    </>
  );
};

export default Deposit;
