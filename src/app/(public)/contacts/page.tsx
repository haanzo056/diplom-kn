import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Контакти' };

const CONTACTS = [
  { no: 1, position: 'Директор', name: 'Петрусенко Сергій Юрійович', phone: '(048)763-01-01' },
  {
    no: 2,
    position: 'Заступник директора з навчальної роботи',
    name: 'Трофименко Юлія Володимирівна',
    phone: '(048)763-01-03',
  },
  {
    no: 3,
    position: 'Заст. директора з нав-чально-виховної роботи',
    name: 'Яцишина Ірина Ярославівна',
    phone: '(048)763-01-06',
  },
  {
    no: 4,
    position: 'Заступник директора з АГР',
    name: 'Івашковська Катерина Юріївна',
    phone: '(048)763-01-02',
  },
  {
    no: 5,
    position: 'Завідувач навчально-методичного кабінету',
    name: 'Гуменна Ольга Анатоліївна',
    phone: '(048)722-33-55',
  },
  { no: 6, position: 'Методист', name: 'Осадчук Тетяна Володимирівна', phone: '(048)763-01-07' },
  {
    no: 7,
    position: 'Головний бухгалтер',
    name: 'Пятковська Оксана Олексіївна',
    phone: '(048)705-03-52',
  },
  {
    no: 8,
    position: 'Приймальна директора',
    name: 'Вербицька Анжеліка Вікторівна',
    phone: '(048) 763-01-00',
  },
  {
    no: 9,
    position: 'Відділ кадрів',
    name: 'Івашковська Алла Григорівна',
    phone: '(048) 763-01-02',
  },
];

const SOCIAL = [
  {
    href: 'https://instagram.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
  {
    href: 'https://t.me',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
      </svg>
    ),
  },
  {
    href: 'mailto:coledgeonat@ukr.net',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Контакти</h1>
        <p className="font-semibold text-slate-800 underline">
          ВСП «ФАХОВИЙ КОЛЕДЖ ЗВ'ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ
        </p>
        <p className="font-semibold text-slate-800 underline">
          ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ'ЯЗКУ»
        </p>
        <p className="text-slate-700 mt-2">65045, м. Одеса, проспект Українських Героїв, 6</p>
        <p className="text-slate-700">
          <strong>E-mail:</strong>{' '}
          <a href="mailto:coledgeonat@ukr.net" className="text-[#3D5AF1] hover:underline">
            coledgeonat@ukr.net
          </a>
          {'       '}
          <strong>сайт:</strong>{' '}
          <a
            href="https://www.college.suitt.edu.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3D5AF1] hover:underline"
          >
            www.college.suitt.edu.ua
          </a>
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-center font-semibold text-slate-700 w-14">№ п/п</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">Посада</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">
                Прізвище, ім'я, по-батькові
              </th>
              <th className="px-4 py-3 text-center font-semibold text-slate-700">
                Телефон робочий
              </th>
            </tr>
          </thead>
          <tbody>
            {CONTACTS.map((c) => (
              <tr
                key={c.no}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-4 text-center text-slate-600">{c.no}.</td>
                <td className="px-4 py-4 text-center text-slate-700">{c.position}</td>
                <td className="px-4 py-4 text-center text-slate-700">{c.name}</td>
                <td className="px-4 py-4 text-center text-slate-700 whitespace-nowrap">
                  {c.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 ">
        <h2 className="text-lg font-bold text-slate-900">Наша адреса:</h2>
        <p className="text-slate-700">
          <strong>ВСП ФКЗІ ДУІТЗ</strong> проспект Українських Героїв, 6, Одеса, Одеська область,
          65045
        </p>
        <div className="rounded-2xl overflow-hidden h-72 border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.8507412754334!2d30.734733799999997!3d46.480438299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6319a08b00001%3A0xcb36bac9d96fc806!2z0KTQsNGF0L7QstC40Lkg0JrQvtC70LXQtNC2INCX0LLigJnRj9C30LrRgyDQotCwINCG0L3RhNC-0YDQvNCw0YLQuNC30LDRhtGW0Zcg0JTQtdGA0LbQsNCy0L3QvtCz0L4g0KPQvdGW0LLQtdGA0YHQuNGC0LXRgtGDINCG0L3RgtC10LvQtdC60YLRg9Cw0LvRjNC90LjRhSDQotC10YXQvdC-0LvQvtCz0ZbQuSDQhiDQl9Cy4oCZ0Y_Qt9C60YM!5e1!3m2!1sru!2sua!4v1780752145419!5m2!1sru!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        {SOCIAL.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#3D5AF1] transition-colors"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
