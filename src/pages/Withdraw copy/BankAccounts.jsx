import { useEffect, useState } from "react";
import AddBank from "../../components/modal/bank/AddBank";
import DeleteBank from "../../components/modal/bank/DeleteBank";
import useContextState from "../../hooks/useContextState";
import { images } from "../../assets";

const BankAccounts = ({
  bankData,
  setConfirmWithdraw,
  setShowBankAccount,
  setAmount,
  refetchBankData,
  setBank,
  bank,
}) => {
  const { addBank, setAddBank } = useContextState();
  const [removeBank, setRemoveBank] = useState("");

  /* select first bank by default */
  useEffect(() => {
    setBank(bankData?.[0]);
  }, [bankData, setBank]);

  return (
    <>
      <div
        className="dep-w-info-bc"
        style={{
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <div className="bank-account-section  ">
          <div
            onClick={() => {
              setAmount("");
              setShowBankAccount(false);
              setBank("");
            }}
            className="back-nav-bc "
          >
            <img loading="lazy" src={images?.backArrow} alt="" className="" />
            <span className="back-nav-title-bc ellipsis ">Back to Amount</span>
          </div>

          {/*   <!-- no bank account start -->
           */}
          {/*  <!-- <div  className="bank-account-box  ">
                    <div  className="bank-account-inner ">
                        <div  className="bank-card "><img 
                                loading="lazy" src="assets/img/bank3d.svg" alt=""
                                className="">
                            <p  className="">You don't have any bank account added</p>
                            <button  className=""><span 
                                    className="">Add Bank Account</span></button>
                        </div>
                    </div>
                </div> 
                --> */}

          {/*   <!-- no bank account end --> */}

          {/*  <!-- bank account list start  --> */}

          <div
            style={{ width: "100%", gap: "1rem", display: "grid" }}
            className=" "
          >
            {bankData?.map((data, i) => {
              return (
                <div
                  onClick={() => setBank(data)}
                  key={i}
                  className={`bank-card${bankData?.length - i} ${
                    bank?.bankId === data?.bankId ? "active" : ""
                  }`}
                >
                  <div className=" bank-logo3">
                    <div className="logo ">
                      <img
                        style={{ maxWidth: "50px", width: "50px" }}
                        loading="lazy"
                        alt=""
                        className=""
                        src={images?.bankPicture}
                      />
                      <p className=""> {data?.bankName}</p>
                    </div>
                  </div>
                  <div className="bank-inner-box ">
                    <div className="bank-detail ">
                      <div
                        style={{
                          width: "max-content",
                          display: "flex",
                          flexDirection: "row",
                        }}
                        className=""
                      >
                        <span className="">Bank :-</span>
                        <span className="bank-detail-txt ">
                          {data?.bankName}
                        </span>
                      </div>
                      <div
                        onClick={() => setRemoveBank(data?.bankId)}
                        className=""
                      >
                        <img
                          loading="lazy"
                          src={images.deleteIcon}
                          alt=""
                          className="delete-logo "
                        />
                      </div>
                    </div>
                    <div className="bank-detail ">
                      <div
                        style={{
                          width: "max-content",
                          display: "flex",
                          flexDirection: "row",
                        }}
                        className=""
                      >
                        <span className="">IFSC :-</span>
                        <span className="bank-detail-txt ">{data?.ifsc}</span>
                      </div>
                    </div>
                    <div className="bank-detail ">
                      <div
                        style={{
                          width: "max-content",
                          display: "flex",
                          flexDirection: "row",
                        }}
                        className=""
                      >
                        <span className="">Account No :-</span>
                        <span className="bank-detail-txt ">
                          {data?.accountNumber}
                        </span>
                      </div>
                    </div>
                    <div className="bank-detail ">
                      <div
                        style={{
                          width: "max-content",
                          display: "flex",
                          flexDirection: "row",
                        }}
                        className=""
                      >
                        <span className="">Upi ID :-</span>
                        <span className="bank-detail-txt ">{data?.upiId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className=" bank-card3 active ">
              <div className=" bank-logo3">
                <div className="logo ">
                  <img
                    loading="lazy"
                    alt=""
                    className=""
                    src="https://s3.ap-south-1.amazonaws.com/cdn.mac1j.com/gstatic/bankIcons/ICICI_BANK.svg"
                  />
                  <p className="">test</p>
                </div>
              </div>
              <div className="bank-inner-box ">
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Bank :-</span>
                    <span className="bank-detail-txt ">ICICI Bank</span>
                  </div>
                  <div className="">
                    <img
                      loading="lazy"
                      src="assets/img/delete-icon.svg"
                      alt=""
                      className="delete-logo "
                    />
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">IFSC :-</span>
                    <span className="bank-detail-txt ">ICIC0000035</span>
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Account No :-</span>
                    <span className="bank-detail-txt ">12345678900</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bank-card2 ">
              <div className=" bank-logo2">
                <div className="logo ">
                  <img
                    loading="lazy"
                    alt=""
                    className=""
                    src="https://s3.ap-south-1.amazonaws.com/cdn.mac1j.com/gstatic/bankIcons/ICICI_BANK.svg"
                  />
                  <p className="">test test test test test</p>
                </div>
              </div>
              <div className="bank-inner-box ">
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Bank :-</span>
                    <span className="bank-detail-txt ">ICICI Bank</span>
                  </div>
                  <div className="">
                    <img
                      loading="lazy"
                      src="assets/img/delete-icon.svg"
                      alt=""
                      className="delete-logo "
                    />
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">IFSC :-</span>
                    <span className="bank-detail-txt ">ICIC0000035</span>
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Account No :-</span>
                    <span className="bank-detail-txt ">1234567899</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bank-card1 ">
              <div className=" bank-logo1">
                <div className="logo ">
                  <img
                    loading="lazy"
                    alt=""
                    className=""
                    src="https://s3.ap-south-1.amazonaws.com/cdn.mac1j.com/gstatic/bankIcons/ICICI_BANK.svg"
                  />
                  <p className="">test test</p>
                </div>
              </div>
              <div className="bank-inner-box ">
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Bank :-</span>
                    <span className="bank-detail-txt ">ICICI Bank</span>
                  </div>
                  <div className="">
                    <img
                      loading="lazy"
                      src="assets/img/delete-icon.svg"
                      alt=""
                      className="delete-logo "
                    />
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">IFSC :-</span>
                    <span className="bank-detail-txt ">ICIC0000035</span>
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Account No :-</span>
                    <span className="bank-detail-txt ">1234567890</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div style={{ gap: "1rem", display: "grid" }} className=" "></div>
          <div className="withdraw-page-buttons  ">
            <button onClick={() => setAddBank(true)} className="plus-btn  ">
              <img
                loading="lazy"
                src="assets/img/plus-logo.svg"
                alt=""
                className=""
              />
              <span className="">Add Bank Account</span>
            </button>
            <button
              onClick={() => {
                setConfirmWithdraw(true);
                setShowBankAccount(false);
              }}
              type="submit"
              className="process-btn "
              disabled={!bank}
            >
              <span className="">Proceed</span>
            </button>
          </div>

          {/*     <!-- bank accoutn list end  --> */}
        </div>
      </div>
      {addBank && (
        <AddBank setAddBank={setAddBank} refetchBankData={refetchBankData} />
      )}
      {removeBank && (
        <DeleteBank
          refetchBankData={refetchBankData}
          setRemoveBank={setRemoveBank}
          removeBank={removeBank}
        />
      )}
    </>
  );
};

export default BankAccounts;
