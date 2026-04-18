'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { loginAdmin } from './actions'; // Это серверное действие мы создадим ниже

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Вызываем серверную функцию проверки пароля
    const result = {};

    if (result.success) {
      router.push('/admin/news'); // Если ок, пускаем в админку
    } else {
      setError('Невірний пароль!'); // Украинский, как договаривались
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Вхід в адмін-панель</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть пароль..."
          className="w-full mb-4 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Увійти
        </button>
      </form>
    </div>
  );
};
