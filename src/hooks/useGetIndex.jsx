import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
import { getSiteURL } from "../utils/getSiteURL";

const useGetIndex = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      let payload = { type: "get_referral_code" };
      const { siteURL } = getSiteURL();
      if (siteURL) {
        payload.site = siteURL;
      }
      const res = await AxiosSecure.post(API.index, payload);
      const result = res?.data;
      if (result?.success) {
        return result?.result;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { data, refetch, isLoading };
};

export default useGetIndex;
