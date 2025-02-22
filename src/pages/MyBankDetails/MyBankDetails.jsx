import { useState } from "react";
import useBankAccount from "../../hooks/useBankAccount";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddBank from "../../components/modal/bank/AddBank";
import Swal from "sweetalert2";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { API } from "../../api";
import toast from "react-hot-toast";

const MyBankDetails = () => {
  const [showAddBank, setShowAddBank] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [tab, setTab] = useState(1);
  const { bankData, refetchBankData, isFetched } = useBankAccount({
    type: "getBankAccounts",
    status: tab,
  });

  const handleShowDetails = (index) => {
    if (index === showDetails) {
      setShowDetails(null);
    } else {
      setShowDetails(index);
    }
  };

  const handleDeleteBank = (bankId) => {
    const payload = {
      bankId,
      type: "deleteBankAccount",
    };
    Swal.fire({
      title: "Delete Bank",
      text: "Are you sure you want to delete this bank?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await AxiosSecure.post(API.bankAccount, payload);
        if (data?.success) {
          toast.success(data?.result?.message);
          refetchBankData();
        } else {
          toast.error(data?.error?.errorMessage);
          refetchBankData();
        }
      }
    });
  };

  const handleMakeDefault = (bankId) => {
    const payload = {
      bankId,
      type: "defaultBank",
    };
    Swal.fire({
      title: "Default Bank",
      text: "Are you sure you want to set this default bank?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok, Set",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await AxiosSecure.post(API.bankAccount, payload);
        if (data?.success) {
          toast.success(data?.result?.message);
          refetchBankData();
        } else {
          toast.error(data?.error?.errorMessage);
          refetchBankData();
        }
      }
    });
  };
  return (
    <>
      {showAddBank && (
        <AddBank
          setAddBank={setShowAddBank}
          refetchBankData={refetchBankData}
        />
      )}

      <div className="deposit-withdraw-btns">
        <div className="btns-animation ">
          <div className="btnBox ">
            <button onClick={() => setTab(1)} className="btn-inactive ">
              <span className="">Active</span>
            </button>
            <button onClick={() => setTab(2)} className="btn-inactive ">
              <span className="">Deleted</span>
            </button>
          </div>
          <div
            className={` ${tab === 1 ? "animation-div-1" : "animation-div-2"}`}
          ></div>
        </div>
      </div>
      <div style={{ margin: "10px" }}>
        <button
          onClick={() => setShowAddBank(true)}
          className="btn"
          style={{ background: "var(--color1)", color: "white" }}
        >
          Add New Bank
        </button>
        <h2 style={{ marginTop: "5px", fontWeight: "500" }}>Bank Details</h2>

        {bankData?.length > 0 &&
          bankData?.map((bank, i) => {
            return (
              <div
                style={{
                  marginTop: "10px",
                  background: "white",
                  padding: "10px",
                  cursor: "pointer",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontSize: "12px",
                }}
                key={i}
              >
                <div
                  onClick={() => handleShowDetails(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <img
                      style={{
                        height: "30px",
                        width: "30px",
                        objectFit: "contain",
                      }}
                      alt="Bank Icon"
                      src={`/src/assets/img/${bank?.bankCode}.png`}
                    />
                    <div>
                      <p> {bank?.bankName}</p>
                      {bank?.isDefault === 1 && (
                        <span style={{ color: "#488feb" }}>Default</span>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {tab === 1 && (
                      <button
                        onClick={() => handleDeleteBank(bank?.bankId)}
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px",
                          borderRadius: "50%",
                        }}
                      >
                        {" "}
                        <MdDelete size={20} />
                      </button>
                    )}

                    {showDetails === i ? (
                      <IoMdArrowDropdown size={20} />
                    ) : (
                      <IoMdArrowDropright size={20} />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    paddingTop: "5px",
                    borderTop: "1px solid gray",
                    display: showDetails === i ? "block" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Account Holder Name: </p> <p>{bank?.bankAccountName}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "4px",
                    }}
                  >
                    {" "}
                    <p> Account number: </p> <p>{bank?.accountNumber}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "4px",
                    }}
                  >
                    {" "}
                    <p> IFSC Code: </p> <p>{bank?.ifsc}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "4px",
                    }}
                  >
                    {" "}
                    <p> Bank Branch: </p> <p>{bank?.bankBranch}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "4px",
                    }}
                  >
                    {" "}
                    <p> Account added on: </p> <p>{bank?.dateAdded}</p>
                  </div>
                  {bank?.isDefault === 0 && tab === 1 && (
                    <button
                      onClick={() => handleMakeDefault(bank?.bankId)}
                      className="btn"
                      style={{
                        background: "var(--color1)",
                        color: "white",
                        marginTop: "15px",
                      }}
                    >
                      Default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        {bankData?.length === 0 && isFetched && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "30px",
              fontSize: "12px",
            }}
          >
            {tab === 1
              ? `No Bank Details found! Adding Bank Details is mandatory for
                 processing withdrawals`
              : `No deleted bank data available`}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBankDetails;
