import { useQuery } from "@tanstack/react-query";
import { API } from "../../api";
import { AxiosSecure } from "../../lib/AxiosSecure";
/* Get casino banner image */
const useBannerImage = () => {
  const { data: bannerImage } = useQuery({
    queryKey: ["bannerImage"],
    queryFn: async () => {
      const res = await AxiosSecure.post(API.banner);
      const data = res?.data;
      if (data?.success) {
        return data?.result?.homepage;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { bannerImage };
};

export default useBannerImage;
