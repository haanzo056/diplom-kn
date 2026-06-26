'use client';

import { useState } from 'react';
import { Briefcase, Building2, CheckCircle2 } from 'lucide-react';
import type { SubProgram } from './data';

export function SpecialtyProgramTabs({ programs }: { programs: SubProgram[] }) {
  const [active, setActive] = useState(0);
  const program = programs[active];

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs */}
      <div className="flex gap-3 flex-wrap">
        {programs.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative px-5 py-3 rounded-[14px] text-[14px] transition-all duration-200"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              background: active === i ? '#3d63dd' : '#fff',
              color: active === i ? '#fff' : '#18222e',
              boxShadow: active === i ? '0 4px 20px rgba(61,99,221,0.3)' : '0px 0px 2px rgba(29,29,29,0.06)',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <p
        className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-3xl"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
      >
        {program.description}
      </p>

      {/* Competencies */}
      <div>
        <h3
          className="text-[18px] sm:text-[24px] text-[#18222e] mb-5 uppercase tracking-[1.5px]"
          style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
        >
          Компетентності
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {program.competencies.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 bg-white rounded-2xl p-5"
              style={{ boxShadow: '0px 0px 2px rgba(29,29,29,0.06)' }}
            >
              <CheckCircle2 className="w-5 h-5 text-[#3d63dd] shrink-0 mt-0.5" />
              <span
                className="text-[14px] text-slate-700 leading-snug"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Careers + Workplaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3d63dd] rounded-[24px] p-7 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-white" />
            <h3
              className="text-white text-[18px] sm:text-[20px] uppercase tracking-[1.5px]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
            >
              {"Кар'єра"}
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {program.careers.map((career) => (
              <li key={career} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                <span
                  className="text-white/90 text-[14px]"
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
              className="text-white text-[18px] sm:text-[20px] uppercase tracking-[1.5px]"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}
            >
              Де працювати
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {program.workplaces.map((place) => (
              <li key={place} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                <span
                  className="text-white/90 text-[14px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {place}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
