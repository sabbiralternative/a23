import axios from "axios";
import { API, Settings } from "../api";
import handleRandomToken from "./handleRandomToken";
import handleEncryptData from "./handleEncryptData";
/* handle deposit api */
const handleDepositMethod = (token) => {
  const handleDeposit = async () => {
    const generatedToken = handleRandomToken();
    let bankData = {
      type: "depositMethods",
      token: generatedToken,
      site: Settings.siteUrl,
    };
    if (Settings.language) {
      bankData.language = localStorage.getItem("language") || "english";
    }
    const encryptedData = handleEncryptData(bankData);
    const res = await axios.post(API.bankAccount, encryptedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = res?.data;
    if (result?.success) {
      return result;
    }
  };
  return handleDeposit;
};

export default handleDepositMethod;
