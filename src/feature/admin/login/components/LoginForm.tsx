'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 w-full">
      {state?.error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          required
          value={'admin@site.com'}
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={'admin123'}
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 w-full py-2.5 px-4 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {pending ? 'Зачекайте...' : 'Увійти'}
      </button>
    </form>
  );
}
