import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getContent } from "./queries";

export async function SlugPage({ slug }: { slug: string }) {
  const content = await getContent(slug);

  if (!content) notFound();

  if (content.type === "page") {
    const { data } = content;
    return (
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{data.title}</h1>
        <BlockRenderer blocks={data.content} />
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
