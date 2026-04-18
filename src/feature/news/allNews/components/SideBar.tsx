import { ChevronRight } from 'lucide-react';

// Выносим данные в массивы, чтобы код компонента был чище
const RECENT_POSTS = [
  {
    id: 1,
    title: 'День Відкритих Дверей 2025',
    date: '2025-06-28',
    isActive: true, // Для имитации подчеркивания активной ссылки
  },
  {
    id: 2,
    title: 'Участь у конкурсі читців поезії Тараса Шевченка',
    date: '2026-03-18',
  },
  {
    id: 3,
    title: "День кар'єри для здобувачів освіти спеціальності G3 (141)",
    date: '2026-03-14',
  },
  {
    id: 4,
    title: 'Продовжуємо сезон екскурсій на бази практики',
    date: '2026-03-14',
  },
  {
    id: 5,
    title: 'Свято весни, краси та ніжності!',
    date: '2026-03-07',
  },
];

const CATEGORIES = [
  'Студентська рада',
  'Безпека життєдіяльності',
  'Культура',
  'Освіта',
  'Вступнику',
  'Спорт',
];

const SideBar = () => {
  return (
    <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 h-auto lg:h-[calc(100vh-4rem)] overflow-y-aut">
      <div className="bg-[#f4f5f7] p-8 rounded-xl">
        {/* <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Недавні записи</h2>
          <div className="w-12 h-1 bg-blue-600 mb-6" />

          <ul className="space-y-6">
            {RECENT_POSTS.map((post) => (
              <li key={post.id} className="flex items-start gap-3 group cursor-pointer">
                <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <span
                    className={`text-[17px] font-medium leading-snug transition-colors group-hover:text-blue-600 group-hover:underline ${
                      post.isActive
                        ? 'text-slate-900 underline decoration-blue-600 decoration-2 underline-offset-4'
                        : 'text-slate-800'
                    }`}
                  >
                    {post.title}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <CalendarDays className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Секция: Категорії */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Категорії</h2>
          <div className="w-12 h-1 bg-blue-600 mb-6" />

          <ul className="space-y-5">
            {CATEGORIES.map((category, index) => (
              <li key={index} className="flex items-center gap-3 group cursor-pointer">
                <ChevronRight className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-[17px] font-medium text-slate-800 transition-colors group-hover:text-blue-600 group-hover:underline">
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
