import PostBlockRenderer from '@/src/helpers/PostBlockRenderer';
import { PostBlock } from '@/src/lib/api/admin/post/new/api-new-post';

type PostArticleProps = {
  post: {
    id: string;
    title: string;
    excerpt?: string | null;
    image?: string | null;
    blocks?: unknown;
  };
};

export const PostArticle = ({ post }: PostArticleProps) => {
  return (
    <article className="border-b pb-12 last:border-none">
      {/* Image */}
      {post.image && (
        <div className="mb-6 overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full object-cover max-h-100"
            loading="lazy"
          />
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl font-semibold text-slate-900 mb-3">{post.title}</h2>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-slate-500 mb-6 text-lg leading-relaxed">{post.excerpt}</p>
      )}

      {/* Content */}
      <div className="prose prose-slate max-w-none">
        <PostBlockRenderer blocks={(post.blocks ?? []) as PostBlock[]} />
      </div>
    </article>
  );
};
