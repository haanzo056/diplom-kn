import { SPECIALTIES } from '@/feature/public/specialties/data';
import { prisma } from '@/lib/prisma';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORY_LABELS: Record<string, string> = {
  NEWS: 'Новини',
  ARTICLE: 'Стаття',
  TUTORIAL: 'Навчання',
  REVIEW: 'Огляд',
  OPINION: 'Думка',
  INTERVIEW: "Інтерв'ю",
  ANNOUNCEMENT: 'Оголошення',
  OTHER: 'Інше',
};

function formatDate(date: Date | null): string {
  if (!date) return '';
  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
}

export const HomePage = async () => {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ publishedAt: { sort: 'desc', nulls: 'last' } }, { createdAt: 'desc' }],
    take: 6,
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

  return (
    <div className="bg-[#f2f2f2]">
      {/* Hero Section */}
      <section className="bg-[#3d63dd] px-[100px] pt-[24px] pb-[24px]">
        <div className="max-w-[1240px] mx-auto flex gap-[20px]" style={{ height: '560px' }}>
          {/* Left column: tall top + short bottom */}
          <div className="flex-1 flex flex-col gap-[17px]">
            <div className="relative overflow-hidden rounded-tl-[24px]" style={{ height: '365px' }}>
              <Image
                src="/images/bg/maybutne.png"
                alt="Твоє майбутнє"
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(153.63deg, rgba(0,0,0,0.4) 28.575%, rgba(102,102,102,0) 56.051%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)',
                }}
              />
              <h1
                className="absolute top-[33px] left-[33px] text-white uppercase"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '32px',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  lineHeight: 'normal',
                }}
              >
                Твоє майбутнє
                <br />
                в цифровому
                <br />
                світі
              </h1>
              <p
                className="absolute bottom-[33px] left-[33px] text-white"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '20px',
                  fontWeight: 500,
                  letterSpacing: '-0.38px',
                  lineHeight: '150%',
                }}
              >
                м. Одеса, просп. Українських Героїв, 6
              </p>
            </div>

            <Link
              href="/prep-courses"
              className="relative overflow-hidden rounded-bl-[24px] flex items-center justify-center transition-all duration-300 hover:brightness-110"
              style={{ height: '178px' }}
            >
              <Image
                src="/images/bg/curses.png"
                alt="Підготовчі курси"
                fill
                className="object-cover"
                style={{ objectPosition: '0px -16px' }}
              />
              <span
                className="relative"
                style={{
                  color: '#FFF',
                  textShadow: '8px 8px 40px #000, 8px 8px 40px #000, 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '150%',
                  letterSpacing: '-0.456px',
                }}
              >
                Підготовчі курси
              </span>
            </Link>
          </div>

          {/* Right column: 3 equal images */}
          <div className="flex-1 flex flex-col gap-[17px]">
            <Link
              href="/rules"
              className="relative overflow-hidden rounded-tr-[24px] flex items-center justify-center transition-all duration-300 hover:brightness-110"
              style={{ height: '178px' }}
            >
              <Image
                src="/images/bg/rulse.png"
                alt="Правила прийому"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span
                className="relative"
                style={{
                  color: '#FFF',
                  textShadow: '4px 4px 50px rgba(0,0,0,0.9), 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '150%',
                  letterSpacing: '-0.456px',
                }}
              >
                Правила прийому
              </span>
            </Link>

            <Link
              href="/specialties"
              className="relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:brightness-110"
              style={{ height: '178px' }}
            >
              <Image
                src="/images/bg/special.png"
                alt="Спеціальності"
                fill
                className="object-cover"
              />
              <span
                className="relative"
                style={{
                  color: '#FFF',
                  textShadow:
                    '8px 8px 40px #000, 8px 8px 40px #000, 8px 8px 40px #000, 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '150%',
                  letterSpacing: '-0.456px',
                }}
              >
                Спеціальності
              </span>
            </Link>

            <Link
              href="/education"
              className="relative overflow-hidden rounded-br-[24px] flex items-center justify-center transition-all duration-300 hover:brightness-110"
              style={{ height: '178px' }}
            >
              <Image
                src="/images/bg/vihivna_robota.png"
                alt="Виховна робота"
                fill
                className="object-cover"
              />
              <span
                className="relative"
                style={{
                  color: '#FFF',
                  textShadow: '4px 4px 50px rgba(0,0,0,0.9), 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '150%',
                  letterSpacing: '-0.456px',
                }}
              >
                Виховна робота
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-[40px]">
        <h2
          className="text-center mb-[40px]"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '40px',
            fontWeight: 800,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#18222e',
            lineHeight: 'normal',
          }}
        >
          Спеціальності
        </h2>
        <div className="flex gap-[32px] px-[100px] justify-center">
          {SPECIALTIES.map((spec) => (
            <Link
              key={spec.code}
              href={`/specialties/${spec.slug}`}
              className="relative overflow-hidden rounded-[24px] flex flex-col items-center justify-end p-[20px] group"
              style={{ width: '392px', height: '467px', flexShrink: 0 }}
            >
              <Image
                src={spec.image}
                alt={spec.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  backgroundImage:
                    'linear-gradient(179.87deg, rgba(24,34,46,0) 47.439%, rgb(24,34,46) 95.422%)',
                }}
              />
              <div className="relative flex flex-col gap-[8px] text-center text-white w-full">
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  {spec.code}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: 'normal',
                  }}
                >
                  «{spec.name}»
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="py-[40px]">
        <h2
          className="text-center mb-[40px]"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: '40px',
            fontWeight: 800,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#18222e',
            lineHeight: 'normal',
          }}
        >
          Новини
        </h2>

        {posts.length === 0 ? (
          <p className="text-center" style={{ color: '#c0c0c0' }}>
            Новини відсутні
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-[32px] px-[100px]">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="bg-white rounded-[24px] overflow-hidden flex flex-col"
                style={{
                  boxShadow: '0px 0px 2px rgba(29,29,29,0.06)',
                }}
              >
                <div className="relative shrink-0" style={{ height: '260px' }}>
                  {post.image?.url ? (
                    <Image src={post.image.url} alt={post.title} fill className="object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #3d63dd, #18222e)' }}
                    >
                      <Image
                        src="/logo_w.png"
                        alt=""
                        width={80}
                        height={80}
                        className="opacity-30 object-contain"
                      />
                    </div>
                  )}
                  <div className="absolute top-[20px] left-[20px]">
                    <span
                      className="inline-flex items-center justify-center capitalize text-white"
                      style={{
                        background: '#3164e6',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: 'normal',
                      }}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] p-[20px] flex-1">
                  <div className="flex items-center gap-[8px]">
                    <CalendarDays style={{ width: '24px', height: '24px', color: '#c0c0c0' }} />
                    <span
                      className="capitalize"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#c0c0c0',
                        lineHeight: 'normal',
                      }}
                    >
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  <h3
                    className="line-clamp-2 capitalize"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#000',
                      lineHeight: 'normal',
                    }}
                  >
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p
                      className="line-clamp-3 flex-1"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#797979',
                        lineHeight: 'normal',
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-[8px] p-[4px] mt-auto">
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#3164e6',
                        lineHeight: 'normal',
                      }}
                    >
                      Детальніше
                    </span>
                    <ArrowRight style={{ width: '24px', height: '24px', color: '#3164e6' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
