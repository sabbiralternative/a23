import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "./useContextState";
import { API, Settings } from "../api";
import { handleLogOut } from "../utils/handleLogOut";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";

const useBonusBalance = () => {
  const { setGetToken, setTokenLoading } = useContextState();
  const bonusToken = localStorage.getItem("bonusToken");
  /* Bonus balance api */

  const { data: bonusBalanceData = {}, refetch: bonusRefetchBalance } =
    useQuery({
      queryKey: ["bonusBalance"],
      queryFn: async () => {
        const generatedToken = handleRandomToken();
        let payload = {
          token: generatedToken,
        };
        if (Settings.language) {
          payload.language = localStorage.getItem("language") || "english";
        }

        const encryptedData = handleEncryptData(payload);
        const res = await axios.post(API.balance, encryptedData, {
          headers: {
            Authorization: `Bearer ${bonusToken}`,
          },
        });
        /* Logout if success false */
        if (res?.data?.success === false && bonusToken) {
          handleLogOut();
          setTokenLoading(true);
          setGetToken((prev) => !prev);
        } else if (res?.data?.success && bonusToken) {
          const data = res.data?.result;
          return data;
        }
      },
      /* Refetch after 6 second */
      refetchInterval: Settings?.balanceApiLoop ? 6000 : "",
    });

  return { bonusBalanceData, bonusRefetchBalance };
};

export default useBonusBalance;
