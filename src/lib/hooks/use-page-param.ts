import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function usePageParam(defaultPage = 1) {
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

  let currentPage = defaultPage;

  // handle case when 'page' param is there and it's a valid page number
  if (pageParam !== null) {
    const parsed = parseInt(pageParam, 10);
    if (isPageParamValidPageNumber(parsed)) {
      currentPage = parsed;
    }
  }

  // handles rare cases on page load when 'page' param is there and it's not a valid page number
  useEffect(() => {
    if (pageParam !== null) {
      const parsed = parseInt(pageParam, 10);
      if (!isPageParamValidPageNumber(parsed)) {
        setPage(defaultPage);
      }
    }
  }, []);

  return {
    currentPage,
    setPage,
  };
}

function isPageParamValidPageNumber(num: number) {
  return !(Number.isNaN(num) || num < 1);
}
