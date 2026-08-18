/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import useGetReferralStatement from "../../hooks/useGetReferralStatement";
import { DatePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../constant/constant";

const ReferralStatement = () => {
  const { getLanguage } = useLanguage();
  const [fetchData, setFetchData] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7)),
  );
  const [endDate, setEndDate] = useState(new Date());
  const { data } = useGetReferralStatement(
    startDate,
    endDate,
    fetchData,
    setFetchData,
  );
  return (
    <div className="main-content">
      <p>{getLanguage(LanguageKey.REFERRAL_DATE)}</p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <div>
          <p
            style={{
              marginBottom: "2px",
              marginLeft: "4px",
              fontSize: "12px",
            }}
          >
            {getLanguage(LanguageKey.FROM_DATE)}
          </p>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            defaultValue={startDate}
          />
        </div>
        <div>
          <p
            style={{ marginBottom: "2px", marginLeft: "4px", fontSize: "12px" }}
          >
            {getLanguage(LanguageKey.TO_DATE)}
          </p>
          <DatePicker
            onChange={(date) => setEndDate(date)}
            defaultValue={endDate}
          />
        </div>

        <button
          onClick={() => setFetchData(true)}
          style={{
            backgroundColor: "var(--color1)",
            border: "none",
            padding: "10px 20px",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
            height: "34px",
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getLanguage(LanguageKey.SUBMIT)}
        </button>
      </div>
      {data && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div>
              <ul>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    fontSize: "11px",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      flex: 1,
                    }}
                  >
                    {getLanguage(LanguageKey.TOTAL_CLIENTS)}{" "}
                    <span>{data?.total_clients}</span>
                  </p>
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      flex: 1,
                    }}
                  >
                    {getLanguage(LanguageKey.TOTAL_DEPOSIT)}{" "}
                    <span>{data?.total_deposit}</span>
                  </p>
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      width: "100%",
                      flex: 1,
                    }}
                  >
                    <span>{getLanguage(LanguageKey.TOTAL_WITHDRAW)}</span>
                    <span style={{ marginRight: "70px" }}>
                      {data?.total_withdraw}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralStatement;
