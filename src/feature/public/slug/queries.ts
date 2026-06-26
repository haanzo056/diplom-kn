import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getPagePosts = cache(async (pageId: string) => {
  return prisma.post.findMany({
    where: { pageId, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      publishedAt: true,
      image: { select: { url: true } },
    },
  });
});

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
