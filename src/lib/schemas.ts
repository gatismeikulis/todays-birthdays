import { z } from "zod";

export const birthSchema = z.object({
  text: z.string(),
  year: z.number(),
  pages: z.array(
    z.object({
      originalimage: z
        .object({
          source: z.string(),
        })
        .optional(),
      content_urls: z.object({
        desktop: z.object({
          page: z.string(),
        }),
        mobile: z.object({
          page: z.string(),
        }),
      }),
    }),
  ),
});

export const birthsResponseSchema = z.object({
  births: z.array(birthSchema),
});
