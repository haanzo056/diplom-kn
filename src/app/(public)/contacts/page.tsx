import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакти | Наш Коледж',
  description: 'Контактна інформація, адреси та телефони приймальної комісії.',
};

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Контакти</h1>
        <p className="mt-4 text-lg text-slate-600">
          Ми завжди раді відповісти на ваші запитання. Зв'яжіться з нами будь-яким зручним способом.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Ліва колонка: Інформація */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Адреса</h2>
            <p className="text-slate-600">
              м. Одеса, вул. Преображенська, 24
              <br />
              Головний навчальний корпус
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Приймальна комісія</h2>
            <p className="text-slate-600 mb-1">
              <span className="font-medium text-slate-900">Телефон:</span> +38 (048) 723-45-67
            </p>
            <p className="text-slate-600 mb-1">
              <span className="font-medium text-slate-900">Мобільний:</span> +38 (093) 123-45-67
            </p>
            <p className="text-slate-600 mb-1">
              <span className="font-medium text-slate-900">Email:</span> admission@college.od.ua
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Години роботи:</span> Пн-Пт, 09:00 -
              17:00
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Деканат</h2>
            <p className="text-slate-600 mb-1">
              <span className="font-medium text-slate-900">Телефон:</span> +38 (048) 765-43-21
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Email:</span> info@college.od.ua
            </p>
          </div>
        </div>

        {/* Права колонка: Заглушка для карти */}
        <div className="h-full min-h-75 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
          <div className="text-center p-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21984.234747290877!2d30.729978496379626!3d46.46792675442485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6319a08b00001%3A0xcb36bac9d96fc806!2z0KTQsNGF0L7QstC40Lkg0JrQvtC70LXQtNC2INCX0LLigJnRj9C30LrRgyDQotCwINCG0L3RhNC-0YDQvNCw0YLQuNC30LDRhtGW0Zcg0JTQtdGA0LbQsNCy0L3QvtCz0L4g0KPQvdGW0LLQtdGA0YHQuNGC0LXRgtGDINCG0L3RgtC10LvQtdC60YLRg9Cw0LvRjNC90LjRhSDQotC10YXQvdC-0LvQvtCz0ZbQuSDQhiDQl9Cy4oCZ0Y_Qt9C60YM!5e0!3m2!1sru!2sua!4v1776030534521!5m2!1sru!2sua"
              width="600"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
