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
      <section className="bg-[#3d63dd] px-4 md:px-[100px] pt-[24px] pb-[24px]">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[17px] md:gap-[20px] md:h-[560px]">
          {/* Left column */}
          <div className="w-full md:flex-1 flex flex-col gap-[17px]">
            <div
              className="relative overflow-hidden rounded-[20px] md:rounded-none md:rounded-tl-[24px] h-[260px] md:h-[365px]"
            >
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
                className="absolute top-[24px] left-[24px] md:top-[33px] md:left-[33px] text-white uppercase text-[22px] md:text-[32px] tracking-[2px] md:tracking-[3px]"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 800,
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
                className="absolute bottom-[24px] left-[24px] md:bottom-[33px] md:left-[33px] text-white text-[16px] md:text-[20px]"
                style={{
                  fontFamily: 'var(--font-montserrat)',
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
              className="relative overflow-hidden rounded-[20px] md:rounded-none md:rounded-bl-[24px] flex items-center justify-center transition-all duration-300 hover:brightness-110 h-[150px] md:h-[178px]"
            >
              <Image
                src="/images/bg/curses.png"
                alt="Підготовчі курси"
                fill
                className="object-cover"
                style={{ objectPosition: '0px -16px' }}
              />
              <span
                className="relative text-[18px] md:text-[24px]"
                style={{
                  color: '#FFF',
                  textShadow: '8px 8px 40px #000, 8px 8px 40px #000, 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  lineHeight: '150%',
                  letterSpacing: '-0.456px',
                }}
              >
                Підготовчі курси
              </span>
            </Link>
          </div>

          {/* Right column — 3-col grid on mobile, flex-col on desktop */}
          <div className="w-full md:flex-1 grid grid-cols-3 md:flex md:flex-col gap-[17px]">
            <Link
              href="/rules"
              className="relative overflow-hidden rounded-[16px] md:rounded-none md:rounded-tr-[24px] flex items-center justify-center transition-all duration-300 hover:brightness-110 h-[110px] md:h-[178px]"
            >
              <Image
                src="/images/bg/rulse.png"
                alt="Правила прийому"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span
                className="relative text-center text-[12px] md:text-[24px]"
                style={{
                  color: '#FFF',
                  textShadow: '4px 4px 50px rgba(0,0,0,0.9), 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  lineHeight: '130%',
                  letterSpacing: '-0.2px',
                }}
              >
                Правила
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                прийому
              </span>
            </Link>

            <Link
              href="/specialties"
              className="relative overflow-hidden rounded-[16px] md:rounded-none flex items-center justify-center transition-all duration-300 hover:brightness-110 h-[110px] md:h-[178px]"
            >
              <Image
                src="/images/bg/special.png"
                alt="Спеціальності"
                fill
                className="object-cover"
              />
              <span
                className="relative text-center text-[12px] md:text-[24px]"
                style={{
                  color: '#FFF',
                  textShadow:
                    '8px 8px 40px #000, 8px 8px 40px #000, 8px 8px 40px #000, 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  lineHeight: '130%',
                  letterSpacing: '-0.2px',
                }}
              >
                Спеціаль&shy;ності
              </span>
            </Link>

            <Link
              href="/education"
              className="relative overflow-hidden rounded-[16px] md:rounded-none md:rounded-br-[24px] flex items-center justify-center transition-all duration-300 hover:brightness-110 h-[110px] md:h-[178px]"
            >
              <Image
                src="/images/bg/vihivna_robota.png"
                alt="Виховна робота"
                fill
                className="object-cover"
              />
              <span
                className="relative text-center text-[12px] md:text-[24px]"
                style={{
                  color: '#FFF',
                  textShadow: '4px 4px 50px rgba(0,0,0,0.9), 8px 8px 40px #000',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  lineHeight: '130%',
                  letterSpacing: '-0.2px',
                }}
              >
                Виховна
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                робота
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-[40px]">
        <h2
          className="text-center mb-[32px] md:mb-[40px] text-[26px] md:text-[40px] tracking-[2px] md:tracking-[4px] px-4"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#18222e',
            lineHeight: 'normal',
          }}
        >
          Спеціальності
        </h2>
        {/* horizontal scroll on mobile, centered flex on desktop */}
        <div className="flex gap-[16px] md:gap-[32px] px-4 md:px-[100px] md:justify-center overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none">
          {SPECIALTIES.map((spec) => (
            <Link
              key={spec.code}
              href={`/specialties/${spec.slug}`}
              className="relative overflow-hidden rounded-[20px] md:rounded-[24px] flex flex-col items-center justify-end p-[16px] md:p-[20px] group snap-center shrink-0 w-[260px] md:w-[392px] h-[360px] md:h-[467px]"
            >
              <Image
                src={spec.image}
                alt={spec.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 rounded-[20px] md:rounded-[24px]"
                style={{
                  backgroundImage:
                    'linear-gradient(179.87deg, rgba(24,34,46,0) 47.439%, rgb(24,34,46) 95.422%)',
                }}
              />
              <div className="relative flex flex-col gap-[8px] text-center text-white w-full">
                <p
                  className="text-[20px] md:text-[24px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  {spec.code}
                </p>
                <p
                  className="text-[16px] md:text-[20px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
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
          className="text-center mb-[32px] md:mb-[40px] text-[26px] md:text-[40px] tracking-[2px] md:tracking-[4px] px-4"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[32px] px-4 md:px-[100px]">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="bg-white rounded-[20px] md:rounded-[24px] overflow-hidden flex flex-col"
                style={{
                  boxShadow: '0px 0px 2px rgba(29,29,29,0.06)',
                }}
              >
                <div className="relative shrink-0 h-[200px] md:h-[260px]">
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
                  <div className="absolute top-[16px] left-[16px] md:top-[20px] md:left-[20px]">
                    <span
                      className="inline-flex items-center justify-center capitalize text-white text-[13px] md:text-[16px]"
                      style={{
                        background: '#3164e6',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        lineHeight: 'normal',
                      }}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] p-[16px] md:p-[20px] flex-1">
                  <div className="flex items-center gap-[8px]">
                    <CalendarDays style={{ width: '20px', height: '20px', color: '#c0c0c0' }} />
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
                    className="line-clamp-2 capitalize text-[17px] md:text-[20px]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
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
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#3164e6',
                        lineHeight: 'normal',
                      }}
                    >
                      Детальніше
                    </span>
                    <ArrowRight style={{ width: '20px', height: '20px', color: '#3164e6' }} />
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
