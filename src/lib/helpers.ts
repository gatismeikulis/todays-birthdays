import { Birth, BirthRecord } from "./types";

export function transformBirthData(birth: Birth): BirthRecord {
  return {
    name: birth.text.split(",")[0],
    description: birth.text.split(",")[1],
    year: birth.year,
    imageSrc: birth.pages[0]?.originalimage?.source,
    linkToArticle: birth.pages[0]?.content_urls.desktop.page, // this should be somehow determined depending on screen width - either desktop or mobile link
  };
}
