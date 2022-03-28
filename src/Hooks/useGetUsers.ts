import { useInfiniteQuery } from "react-query";
import { getUsers } from "../ApiCalls/getUsers";

export function useGetUsers(page: number) {
  const query = useInfiniteQuery(
    ["users", page],
    ({ pageParam = 1 }) => {
      return getUsers(pageParam);
    },
    {
      refetchOnWindowFocus: false,
      onSettled: (data, error) => {
        // I would put logs here
      },
      getNextPageParam: (lastPages, allPages) => {
        if (lastPages.info.page === 50) {
          return undefined;
        }
        return lastPages.info.page + 1;
      },
    }
  );

  return query;
}
