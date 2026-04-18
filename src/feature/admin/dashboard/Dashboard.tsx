import Image from 'next/image';
import Link from 'next/link';

const cards = [
  { label: 'Сторінки', href: '/admin/pages' },
  { label: 'Пости', href: '/admin/posts' },
  { label: 'Медіатека', href: '/admin/media' },
];

export const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Image src="/logo.png" alt="Логотип" width={64} height={64} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ВСП «ФКЗІ ГУІТС»</h1>
          <p className="text-sm text-gray-500">Панель керування</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-lg border p-5 hover:shadow-sm transition-shadow"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
