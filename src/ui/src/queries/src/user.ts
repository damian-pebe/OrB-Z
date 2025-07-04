import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../lib/fetcher";

const fetchUser = async () => {
  return fetcher("/api/me");
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 min
    retry: false,
  });
};
