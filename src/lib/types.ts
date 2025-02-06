import { z } from "zod";
import { birthSchema } from "./schemas";

export type Birth = z.infer<typeof birthSchema>;

export type BirthRecord = {
  name: string;
  description: string;
  year: number;
  imageSrc?: string;
  linkToArticle?: string;
};
