import { PostBlock } from '@/lib/api/admin/post/api-get-posts';

type Props = { blocks: PostBlock[] };

export default function PostBlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={i} className="text-2xl font-semibold mt-6 mb-2">{block.value}</h3>;
          case 'image':
            return <img key={i} src={block.value} alt="" className="w-full rounded-lg my-4" />;
          default:
            return <p key={i} className="mb-4 leading-relaxed">{block.value}</p>;
        }
      })}
    </>
  );
}
