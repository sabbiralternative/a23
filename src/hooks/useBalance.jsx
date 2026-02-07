import { useQuery } from "@tanstack/react-query";
import useContextState from "./useContextState";
import { API } from "../api";
import { handleLogOut } from "../utils/handleLogOut";
import { useNavigate } from "react-router-dom";
import { AxiosSecure } from "../lib/AxiosSecure";

const useBalance = () => {
  const { setTokenLoading, setGetToken } = useContextState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { data: balanceData = {}, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    enabled: token ? true : false,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.balance);

      if (res?.data?.success === false && token) {
        /* Logout if success false  */
        handleLogOut();
        setTokenLoading(true);
        setGetToken((prev) => !prev);
        navigate("/login");
      }
      if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
    /* Refetch based on balanceApiLoop in notice.json */
  });

  return { balanceData, refetchBalance };
};

export default useBalance;
