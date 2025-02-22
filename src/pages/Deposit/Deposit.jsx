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
        <UploadTransaction paymentId={paymentId} amount={amount} />
      )}
      {paymentMethods && (
        <PaymentMethods
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
