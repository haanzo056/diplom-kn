import Link from 'next/link';

const cards = [
  { label: 'Страницы', href: '/admin/pages' },
  { label: 'Посты', href: '/admin/posts' },
  { label: 'Медиатека', href: '/admin/media' },
];

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
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
