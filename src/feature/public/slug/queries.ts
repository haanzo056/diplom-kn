import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getContent = cache(async (slug: string) => {
  const page = await prisma.page.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  if (page) return { type: "page" as const, data: page };

  const post = await prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      image: { select: { url: true, name: true } },
    },
  });
  if (post) return { type: "post" as const, data: post };

  return null;
});
