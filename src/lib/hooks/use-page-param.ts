import { useSearchParams } from "react-router";

export function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (page: number) => {
    if (page < 1) return;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page.toString());
      return params;
    });
  };

  const pageParam = searchParams.get("page");

  const currentPage = extractCurrentPage(pageParam);

  return {
    currentPage,
    setPage,
  };
}

function extractCurrentPage(pageParam: string | null) {
  const defaultPage = 1;
  if (pageParam === null) return defaultPage;
  const parsed = +pageParam;
  if (Number.isNaN(parsed) || parsed < 1) return defaultPage;
  return Math.floor(parsed);
}
