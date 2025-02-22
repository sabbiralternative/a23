import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
/*  deposit statement api */
const useDepositStatement = () => {
  /* from date seven days earlier */
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];

  const { data: accountStatement = [] } = useQuery({
    queryKey: ["deposit-statement"],

    queryFn: async () => {
      /* Encrypt post data */
      const payload = {
        from: fromDate,
        to: toDate,
        type: "DEPOSIT",
        status: "ALL",
      };
      const res = await AxiosSecure.post(API.accountStatement, payload);
      const data = res?.data;

      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { accountStatement };
};

export default useDepositStatement;
