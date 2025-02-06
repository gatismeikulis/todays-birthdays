import { RECORDS_PER_PAGE } from "./constants";
import { Birth, BirthRecord } from "./types";

export function sliceAndTransformBirths(births: Birth[], page: number): BirthRecord[] {
  const adjustedPage = page > 0 ? page - 1 : 0;
  const sliced = births.slice(
    adjustedPage * RECORDS_PER_PAGE,
    adjustedPage * RECORDS_PER_PAGE + RECORDS_PER_PAGE,
  );

  return sliced.map((birth) => ({
    name: birth.text.split(",")[0],
    description: birth.text.split(",")[1],
    year: birth.year,
    image: birth.pages[0]?.originalimage?.source,
    linkToArticle: birth.pages[0]?.content_urls.desktop.page, // this should be somehow calculated depending on screen width - either desktop or mobile link
  }));
}
