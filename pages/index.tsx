import { useRef, useState, useEffect, useMemo } from "react";
import { Navbar } from "../src/components/Navbar";
import { getUsers } from "../src/ApiCalls/getUsers";
import { Card } from "../src/components/Card";
import { QueryClient, dehydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useGetUsers } from "../src/Hooks/useGetUsers";
import { useIsElementVisible } from "../src/Hooks/useIsElementVisible";

const Home = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUsers(1);

  const loadRef = useRef(null);
  const isLoadRefVisible = useIsElementVisible(loadRef);
  const [search, setSearch] = useState("");

  // just filter current users not all users
  const filteredUserPages = useMemo(() => {
    const items = data?.pages?.map(({ results }, pageIndex) => {
      return results?.map((user, i: number) => {
        const lowerFirst = user.name.first.toLowerCase();
        const lowerLast = user.name.last.toLowerCase();
        const lowerSearch = search.toLowerCase();

        if (
          !search ||
          lowerFirst.includes(lowerSearch) ||
          lowerLast.includes(lowerSearch) ||
          (lowerFirst + " " + lowerLast).includes(lowerSearch)
        ) {
          return (
            <Card
              key={`pageI${pageIndex} userI${i}`}
              name={`${user.name.first} ${user.name.last}`}
              img={user.picture.large}
            />
          );
        }
      });
    });

    return items;
  }, [data.pages, search]);

  useEffect(() => {
    if (!isLoading && isLoadRefVisible && !search) {
      fetchNextPage();
    }
  }, [isLoadRefVisible, search]);

  if (error) return "Could get more users";

  return (
    <div className="page-container">
      <Navbar search={search} setSearch={(e) => setSearch(e.target.value)} />
      <div className="cards-container">{filteredUserPages}</div>
      <div ref={loadRef} className="load-indication">
        {isFetchingNextPage && hasNextPage
          ? "Loading More users... "
          : "No more users, you've reached the end!"}
      </div>
      <ReactQueryDevtools position="bottom-left" />
    </div>
  );
};

export const getStaticProps = async (_) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["users", 1], () => {
    return getUsers(1);
  });
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
