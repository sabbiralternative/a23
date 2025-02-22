import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosInstance } from "../lib/AxiosInstance";

const useGetMac88 = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["mac88"],

    queryFn: async () => {
      const res = await AxiosInstance.post(API.mac88, {
        isHome: false,
      });
      const result = res?.data;
      if (result?.success) {
        return result?.data;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { data, refetch, isLoading };
};

export default useGetMac88;
