import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetSocialLink = () => {
  /* get whats app link */
  const { data: socialLink = {}, refetch: refetchSocialLinks } = useQuery({
    queryKey: ["whatsApp"],

    queryFn: async () => {
      const res = await AxiosSecure.post(API.whatsApp);
      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { socialLink, refetchSocialLinks };
};

export default useGetSocialLink;
