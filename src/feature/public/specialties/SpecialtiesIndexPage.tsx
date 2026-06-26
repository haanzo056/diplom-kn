import Image from 'next/image';
import Link from 'next/link';
import { SPECIALTIES } from './data';

export function SpecialtiesIndexPage() {
  return (
    <div className="bg-[#f4f5f7]">
      <section className="bg-[#3D5AF1] px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl uppercase tracking-tight">
            Спеціальності
          </h1>
          <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Оберіть напрям підготовки та дізнайтеся більше про освітні програми коледжу
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SPECIALTIES.map((spec) => (
            <Link
              key={spec.code}
              href={`/specialties/${spec.slug}`}
              className="relative rounded-2xl overflow-hidden aspect-4/3 group"
            >
              <Image
                src={spec.image}
                alt={spec.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0d1b6e]/90 via-[#0d1b6e]/45 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-[#3D5AF1] text-white text-sm font-bold px-3 py-1 rounded-md mb-2">
                  {spec.code}
                </span>
                <p className="text-white text-base font-bold leading-snug">{spec.name}</p>
                <p className="text-white/70 text-sm mt-1.5 leading-snug line-clamp-2">{spec.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
