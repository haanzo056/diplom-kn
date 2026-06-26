import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Specialty } from './data';

function programName(title: string): string {
  const match = title.match(/«(.+)»/);
  return match ? match[1] : title;
}

type Program = { id: string; title: string; slug: string; excerpt: string | null };

export function SpecialtyDetailPage({ specialty, posts }: { specialty: Specialty; posts: Program[] }) {
  return (
    <div className="bg-[#f4f5f7]">
      <section className="relative h-72 sm:h-96">
        <Image src={specialty.image} alt={specialty.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d1b6e]/90 via-[#0d1b6e]/55 to-[#0d1b6e]/15" />
        <div className="relative h-full max-w-5xl mx-auto px-4 flex flex-col justify-end pb-10">
          <span className="inline-block w-fit bg-[#3D5AF1] text-white text-sm font-bold px-3 py-1 rounded-md mb-3">
            {specialty.code}
          </span>
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight max-w-2xl">
            {specialty.name}
          </h1>
          <p className="text-white/70 text-sm sm:text-base mt-3">{specialty.field}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{specialty.description}</p>

        {posts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Освітні програми</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-md hover:border-[#3D5AF1]/30 transition-all duration-200"
                >
                  <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#3D5AF1] transition-colors duration-200">
                    {programName(post.title)}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">{post.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-[#3D5AF1] text-sm font-medium">
                    Детальніше
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
