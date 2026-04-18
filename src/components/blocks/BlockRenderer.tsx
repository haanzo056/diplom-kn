type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "divider" }
  | { type: "list"; style: "ordered" | "unordered"; items: string[] };

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3";
      const sizes = { 1: "text-4xl", 2: "text-2xl", 3: "text-xl" };
      return (
        <Tag key={index} className={`${sizes[block.level]} font-bold text-slate-900 mt-8 mb-3`}>
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p key={index} className="text-slate-700 leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-slate-300 pl-5 my-6 italic text-slate-600">
          <p className="mb-1">{block.text}</p>
          {block.author && <cite className="text-sm not-italic text-slate-400">— {block.author}</cite>}
        </blockquote>
      );
    case "image":
      return (
        <figure key={index} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt={block.alt ?? ""} className="w-full rounded-md object-cover" />
          {block.caption && <figcaption className="text-sm text-slate-400 text-center mt-2">{block.caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={index} className="my-8 border-slate-200" />;
    case "list": {
      const Tag = block.style === "ordered" ? "ol" : "ul";
      return (
        <Tag key={index} className={`my-4 pl-6 space-y-1 text-slate-700 ${block.style === "ordered" ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      );
    }
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: unknown }) {
  if (!Array.isArray(blocks)) return null;
  return <>{(blocks as Block[]).map((block, i) => renderBlock(block, i))}</>;
}
