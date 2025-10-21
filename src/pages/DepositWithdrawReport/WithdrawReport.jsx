import useWithdrawStatement from "../../hooks/useWithdrawStatement";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlinePendingActions } from "react-icons/md";
import Complaint from "../../components/modal/Complaint/Complaint";
import { Settings } from "../../api";

const WithdrawReport = () => {
  const [complaintId, setComplaintId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const { withdrawStatement } = useWithdrawStatement();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (withdrawStatement?.length > 0) {
      const categories = Array.from(
        new Set(withdrawStatement?.map((item) => item?.date?.split(" ")?.[0]))
      );
      setCategory(categories);
    }
  }, [withdrawStatement]);

  return (
    <>
      {complaintId && (
        <Complaint
          setComplaintId={setComplaintId}
          complaintId={complaintId}
          method="withdraw"
        />
      )}
      {showModal && image && (
        <ImageModal setShowModal={setShowModal} image={image} />
      )}
      <div className="main-content  ">
        {withdrawStatement?.length > 0 ? (
          category?.map((category, i) => {
            return (
              <div key={i}>
                <span className="date-separator  "> {category}</span>
                {withdrawStatement
                  ?.filter((item) => item?.date?.split(" ")?.[0] === category)
                  ?.map((data, i) => {
                    return (
                      <div
                        // onClick={() => {
                        //   navigate(
                        //     `/deposit-withdraw-report/${data?.referenceNo}`
                        //   );
                        // }}
                        key={i}
                        className="card-deposit  "
                      >
                        <div
                          className="logo"
                          onClick={() => {
                            setImage("");
                            setShowModal(true);
                            setImage(data?.image);
                          }}
                        >
                          {data?.image && (
                            <img
                              src={data?.image}
                              alt="logo"
                              className="bank-logo  "
                            />
                          )}
                        </div>
                        <div
                          className="card-content "
                          style={{ padding: "0px" }}
                        >
                          <div
                            className="top-content "
                            style={{ padding: "0.75rem" }}
                          >
                            <div className="left-top-text ">
                              <span className="">{data?.referenceNo}</span>
                              <span className="status  status-aproved">
                                {data?.status === "APPROVED" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className=" "
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10ZM0.78125 5C0.78125 7.32995 2.67005 9.21875 5 9.21875C7.32995 9.21875 9.21875 7.32995 9.21875 5C9.21875 2.67005 7.32995 0.78125 5 0.78125C2.67005 0.78125 0.78125 2.67005 0.78125 5ZM4.58968 6.58651C4.43713 6.73906 4.1898 6.73906 4.03725 6.58651L2.78973 5.33901C2.63718 5.18647 2.63718 4.93914 2.78973 4.78659C2.94228 4.63404 3.1896 4.63403 3.34215 4.78658L4.31346 5.75787L6.65784 3.4135C6.81038 3.26095 7.05771 3.26095 7.21026 3.4135C7.36281 3.56605 7.36281 3.81338 7.21026 3.96592L4.58968 6.58651Z"
                                      fill="#17C964"
                                      className=""
                                    ></path>
                                  </svg>
                                )}
                                {data?.status === "REJECTED" && (
                                  <RxCrossCircled color="red" />
                                )}
                                {data?.status === "PENDING" && (
                                  <MdOutlinePendingActions color="yellowgreen" />
                                )}

                                <span
                                  className={`status-text ${
                                    data?.status === "APPROVED"
                                      ? "status-text-approved"
                                      : ""
                                  } ${
                                    data?.status === "REJECTED"
                                      ? "status-text-rejected"
                                      : ""
                                  } ${
                                    data?.status === "PENDING"
                                      ? "status-text-pending"
                                      : ""
                                  }`}
                                >
                                  {data?.status}
                                </span>
                              </span>
                              <span className="">{data?.date}</span>
                            </div>
                            <span className="right-top-amount  right-top-amount-approved">
                              {" "}
                              ₹ {data?.amount}{" "}
                            </span>
                          </div>
                          <div
                            className="bottom-content "
                            style={{ alignItems: "initial" }}
                          >
                            <span
                              className="left-bottom-id "
                              style={{ padding: "0.75rem" }}
                            >
                              {" "}
                              {data?.remark}{" "}
                            </span>
                            {Settings.complaint && (
                              <button
                                style={{
                                  backgroundColor: "rgb(255 131 46)",
                                  borderTopLeftRadius: "5px",
                                  borderBottomRightRadius: "5px",
                                  fontSize: "12px",
                                  padding: "5px 8px",
                                  color: "white",
                                  height: "fit-content",
                                  marginTop: "auto",
                                }}
                                onClick={() =>
                                  setComplaintId(data?.referenceNo)
                                }
                              >
                                Report Issue
                              </button>
                            )}
                            {/* <span className="right-bottom-date ">
                              {" "}
                              {data?.date}{" "}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })
        ) : (
          <div className="no-data ng-star-inserted">
            <p>No transaction yet!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawReport;
