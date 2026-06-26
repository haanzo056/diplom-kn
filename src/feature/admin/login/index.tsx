import Image from 'next/image';
import { LoginForm } from './components/LoginForm';
export const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#0f172a] px-12 py-14">
        <div className="flex items-center gap-3">
          <Image src="/logo_w.png" alt="Logo" width={50} height={50} />
          <span className="text-sm font-semibold text-white tracking-wide">Адмін-панель</span>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-3xl font-semibold text-white leading-snug">
            Керування
            <br />
            контентом сайту
          </p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Сторінки, пости, медіафайли та навігація — все в одному місці.
          </p>
        </div>

        <p className="text-xs text-slate-600">© {new Date().getFullYear()} ВСП ФКЗІ ДУІТЗ</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center px-6 py-14 bg-slate-50">
        {/* Mobile header */}

        <div className="w-full max-w-sm bg-white rounded-xl border border-slate-200 shadow-sm px-8 py-10 flex flex-col gap-7">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-slate-900">Вхід</h1>
            <p className="text-sm text-slate-500">Введіть ваші дані для доступу</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
