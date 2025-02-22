import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
/* get withdraw breakdown data */
const useWithdrawBreakdown = () => {
  const { data: withdrawBreakdown = {} } = useQuery({
    queryKey: ["withdraw-breakdown"],
    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.withdrawBreakdown}`);
      const data = res.data;
      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
  return { withdrawBreakdown };
};

export default useWithdrawBreakdown;
