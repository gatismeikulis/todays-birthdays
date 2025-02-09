import { Birth, BirthRecord } from "./types";

export function transformBirthData(birth: Birth, isSmallScreen = false): BirthRecord {
  return {
    name: birth.text.split(",")[0],
    description: birth.text.split(",")[1],
    year: birth.year,
    imageSrc: birth.pages[0]?.thumbnail?.source,
    linkToArticle: isSmallScreen
      ? birth.pages[0]?.content_urls.mobile.page
      : birth.pages[0]?.content_urls.desktop.page,
  };
}

export function getPaginationInfo({
  totalItems,
  currentPage,
  itemsPerPage,
}: {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    totalPages,
    startIndex,
    endIndex,
  };
}
