import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, Building2, CheckCircle2, Clock, GraduationCap } from 'lucide-react';
import type { Specialty } from './data';
import { SpecialtyProgramTabs } from './SpecialtyProgramTabs';

function programName(title: string): string {
  const match = title.match(/«(.+)»/);
  return match ? match[1] : title;
}

type Program = { id: string; title: string; slug: string; excerpt: string | null };

export function SpecialtyDetailPage({
  specialty,
  posts,
}: {
  specialty: Specialty;
  posts: Program[];
}) {
  return (
    <div className="bg-[#f2f2f2]">
      {/* Hero */}
      <section className="relative h-[320px] sm:h-[460px]">
        <Image
          src={specialty.image}
          alt={specialty.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18222e]/95 via-[#18222e]/60 to-[#18222e]/20" />
        <div className="relative h-full max-w-[1240px] mx-auto px-4 md:px-[100px] flex flex-col justify-end pb-10 sm:pb-14">
          <span
            className="inline-block w-fit text-white text-sm font-bold px-3 py-1 rounded-lg mb-4"
            style={{ background: '#3d63dd' }}
          >
            {specialty.code}
          </span>
          <h1
            className="text-white text-[28px] sm:text-[48px] max-w-3xl leading-tight"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
          >
            {specialty.name}
          </h1>
          <p
            className="text-white/60 text-sm sm:text-base mt-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {specialty.field}
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Clock className="w-4 h-4 text-[#3d63dd]" />
              <span style={{ fontFamily: 'Inter, sans-serif' }}>{specialty.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <GraduationCap className="w-4 h-4 text-[#3d63dd]" />
              <span style={{ fontFamily: 'Inter, sans-serif' }}>{specialty.degree}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 md:px-[100px] py-12 flex flex-col gap-12">
        {/* Description */}
        <section>
          <p
            className="text-[17px] sm:text-[20px] text-slate-700 leading-relaxed max-w-3xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {specialty.description}
          </p>
        </section>

        {/* Programs (tabs) OR single competencies/careers/workplaces */}
        {specialty.programs && specialty.programs.length > 0 ? (
          <section>
            <h2
              className="text-[22px] sm:text-[32px] text-[#18222e] mb-8 uppercase tracking-[2px]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
            >
              Освітні програми
            </h2>
            <SpecialtyProgramTabs programs={specialty.programs} />
          </section>
        ) : (
          <>
            {/* Competencies */}
            <section>
              <h2
                className="text-[22px] sm:text-[32px] text-[#18222e] mb-6 uppercase tracking-[2px]"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
              >
                Компетентності
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialty.competencies.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 bg-white rounded-2xl p-5"
                    style={{ boxShadow: '0px 0px 2px rgba(29,29,29,0.06)' }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#3d63dd] shrink-0 mt-0.5" />
                    <span
                      className="text-[15px] text-slate-700 leading-snug"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Careers + Workplaces */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#3d63dd] rounded-[24px] p-7 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-white" />
                  <h3
                    className="text-white text-[18px] sm:text-[22px] uppercase tracking-[1.5px]"
                    style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
                  >
                    {"Кар'єра"}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {specialty.careers.map((career) => (
                    <li key={career} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                      <span
                        className="text-white/90 text-[15px]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {career}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#18222e] rounded-[24px] p-7 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-white" />
                  <h3
                    className="text-white text-[18px] sm:text-[22px] uppercase tracking-[1.5px]"
                    style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
                  >
                    Де працювати
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {specialty.workplaces.map((place) => (
                    <li key={place} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                      <span
                        className="text-white/90 text-[15px]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {place}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}

        {/* Educational programs from CMS */}
        {posts.length > 0 && (
          <section>
            <h2
              className="text-[22px] sm:text-[32px] text-[#18222e] mb-6 uppercase tracking-[2px]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
            >
              Матеріали
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="group bg-white rounded-[20px] p-6 flex flex-col hover:shadow-md transition-all duration-200"
                  style={{ boxShadow: '0px 0px 2px rgba(29,29,29,0.06)' }}
                >
                  <h3
                    className="text-[17px] leading-snug mb-2 group-hover:text-[#3d63dd] transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#18222e' }}
                  >
                    {programName(post.title)}
                  </h3>
                  {post.excerpt && (
                    <p
                      className="text-sm flex-1 leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#797979' }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1" style={{ color: '#3d63dd' }}>
                    <span
                      className="text-sm"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      Детальніше
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[24px] bg-[#3d63dd] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3
              className="text-white text-[22px] sm:text-[30px] uppercase tracking-[2px]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
            >
              Готові вступити?
            </h3>
            <p
              className="text-white/70 text-[15px]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Дізнайтесь умови прийому та почніть свій шлях у цифровому світі
            </p>
          </div>
          <Link
            href="/rules"
            className="shrink-0 flex items-center gap-2 bg-white rounded-[14px] px-6 py-3 text-[#3d63dd] transition-all hover:brightness-95"
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px' }}>
              Правила прийому
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
