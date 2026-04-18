import Link from 'next/link';
// Замени на свой правильный импорт призмы
import { prisma } from '@/src/lib/db';

// Отключаем кеширование, чтобы в админке всегда были свежие данные
export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  // Запрашиваем все посты (новости) из базы данных
  // Замени `prisma.post` на ту модель, в которой у тебя хранятся новости
  const news = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Шапка страницы */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Всі новини</h1>
          <p className="text-slate-500 mt-1">Керування публікаціями на сайті коледжу</p>
        </div>

        {/* Кнопка создания (На самом деле это ссылка, стилизованная под кнопку) */}
        <Link
          href="/admin/news/new" // Укажи тут путь к странице создания новости
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Створити новину
        </Link>
      </header>

      {/* Основной контент: Список новостей */}
      <main>
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Обложка карточки */}
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400">Немає фото</span>
                  </div>
                )}

                {/* Текст карточки */}
                <div className="p-5 grow flex flex-col">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 grow">
                    {item.excerpt || 'Немає короткого опису...'}
                  </p>

                  {/* Футер карточки (Дата и кнопки действий) */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-xs font-medium text-slate-400">
                      {new Intl.DateTimeFormat('uk-UA', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      }).format(item.createdAt)}
                    </span>

                    <Link
                      href={`/admin/news/${item.id}/edit`} // Путь к редактированию
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Редагувати
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <svg
              className="mx-auto h-12 w-12 text-slate-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
              />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Немає жодної новини</h3>
            <p className="text-slate-500 mb-6">
              Натисніть кнопку вище, щоб створити першу публікацію.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
