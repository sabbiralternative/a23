import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import useContextState from "./useContextState";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetVersion = () => {
  const { noticeLoaded } = useContextState();
  const { data: version, refetch: refetchVersion } = useQuery({
    queryKey: ["version"],
    enabled: noticeLoaded,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.siteSettings);
      const data = res?.data;
      if (data?.success) {
        return data?.result;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { version, refetchVersion };
};

export default useGetVersion;
