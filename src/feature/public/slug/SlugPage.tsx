import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { SPECIALTIES } from "@/feature/public/specialties/data";
import { SpecialtiesIndexPage } from "@/feature/public/specialties/SpecialtiesIndexPage";
import { SpecialtyDetailPage } from "@/feature/public/specialties/SpecialtyDetailPage";
import { getContent, getPagePosts } from "./queries";

const CATEGORY_LABELS: Record<string, string> = {
  NEWS: "Новини",
  ARTICLE: "Стаття",
  TUTORIAL: "Навчання",
  REVIEW: "Огляд",
  OPINION: "Думка",
  INTERVIEW: "Інтерв'ю",
  ANNOUNCEMENT: "Оголошення",
  OTHER: "Інше",
};

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("uk-UA", { dateStyle: "long" }).format(new Date(date));
}

export async function SlugPage({ slug }: { slug: string }) {
  const content = await getContent(slug);

  if (!content) notFound();

  if (content.type === "page") {
    const { data } = content;

    if (slug === "specialties") {
      return <SpecialtiesIndexPage />;
    }

    const specialtyMatch = slug.match(/^specialties\/([a-z0-9]+)$/);
    if (specialtyMatch) {
      const specialty = SPECIALTIES.find((s) => s.slug === specialtyMatch[1]);
      if (specialty) {
        const programs = await getPagePosts(data.id);
        return <SpecialtyDetailPage specialty={specialty} posts={programs} />;
      }
    }

    const posts = await getPagePosts(data.id);

    return (
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{data.title}</h1>
        <BlockRenderer blocks={data.content} />

        {posts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Публікації</h2>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="flex gap-4 bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {post.image?.url ? (
                      <Image src={post.image.url} alt={post.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                      <span className="text-[#3D5AF1] font-medium">
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                      {post.publishedAt && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {formatDate(post.publishedAt)}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 leading-snug line-clamp-1">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="mt-auto pt-2 flex items-center gap-1 text-[#3D5AF1] text-sm font-medium">
                      Детальніше
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    );
  }

  const { data: post } = content;
  const publishedAt = post.publishedAt
    ? new Intl.DateTimeFormat("uk-UA", { dateStyle: "long" }).format(new Date(post.publishedAt))
    : null;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image.url}
            alt={post.image.name}
            className="w-full rounded-md object-cover mb-6 max-h-80"
          />
        )}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          {publishedAt && <span>{publishedAt}</span>}
          {post.author && (
            <>
              <span>·</span>
              <span>{post.author.name}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">{post.title}</h1>
        {post.excerpt && (
          <p className="text-lg text-slate-500 leading-relaxed">{post.excerpt}</p>
        )}
      </header>
      <BlockRenderer blocks={post.blocks} />
    </article>
  );
}
