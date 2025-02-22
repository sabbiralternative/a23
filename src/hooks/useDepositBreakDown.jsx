import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

/* get deposit breakdown */
const useDepositBreakDown = (amount) => {
  const { data: depositBreakdown = {} } = useQuery({
    queryKey: ["deposit-breakdown"],
    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.depositBreakdown}`, { amount });
      const data = res.data;

      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
  return { depositBreakdown };
};

export default useDepositBreakDown;
