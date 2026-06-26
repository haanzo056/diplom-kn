import GradientText from '@/components/bits/GradientText';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f4f5f7]">
      {/* ambient gradient orbs */}
      <div
        className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-[#3D5AF1]/25 blur-3xl"
        style={{ animation: 'not-found-drift 9s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-24 -bottom-48 h-112 w-md rounded-full bg-[#3D5AF1]/15 blur-3xl"
        style={{ animation: 'not-found-drift 11s ease-in-out infinite reverse' }}
      />
      <div
        className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
        style={{ animation: 'not-found-drift 13s ease-in-out infinite' }}
      />

      {/* dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] mask-[radial-gradient(ellipse_60%_60%_at_50%_45%,#000_30%,transparent_75%)]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-7 px-6 text-center">
        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-1.5 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm">
          <Sparkles className="size-3.5 text-[#3D5AF1]" />
          Помилка 404
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-[#3D5AF1]/30 to-transparent bg-clip-text text-[6rem] leading-none font-bold tracking-tight text-transparent blur-2xl select-none sm:text-[10rem]"
          >
            404
          </span>
          <h1
            className="relative text-[6rem] leading-none font-bold tracking-tight sm:text-[10rem]"
            style={{ animation: 'not-found-float 6s ease-in-out infinite' }}
          >
            <GradientText colors={['#3D5AF1', '#8b5cf6', '#3D5AF1']} animationSpeed={5}>
              404
            </GradientText>
          </h1>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Сторінку не знайдено
          </p>
          <p className="max-w-md text-sm text-slate-500 sm:text-base">
            Можливо, її було переміщено, перейменовано або вона ще ніколи не існувала.
            Перевірте адресу або поверніться на головну.
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="gap-2 bg-[#3D5AF1] text-white shadow-lg shadow-[#3D5AF1]/30 transition-transform hover:-translate-y-0.5 hover:bg-[#2d4ae0]"
            render={<Link href="/" />}
          >
            <Compass />
            На головну
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-slate-200 bg-white/80 text-slate-700 backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
            render={<Link href="/news" />}
          >
            <ArrowLeft />
            До новин
          </Button>
        </div>

        <Image
          src="/logo_b.png"
          alt="Logo"
          width={36}
          height={36}
          className="mt-6 opacity-50 grayscale"
        />
      </div>

      <style>{`
        @keyframes not-found-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes not-found-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
