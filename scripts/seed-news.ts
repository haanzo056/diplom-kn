import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

const NEWS = [
  {
    title: 'День відкритих дверей 2026',
    slug: 'den-vidkrytykh-dverei-2026',
    category: 'ANNOUNCEMENT',
    excerpt: 'Запрошуємо майбутніх абітурієнтів та їхніх батьків на традиційний День відкритих дверей. Ви дізнаєтесь про спеціальності, умови вступу та познайомитесь з викладачами.',
    image: { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop', name: 'den-vidkrytykh-dverei.jpg' },
    blocks: [
      { type: 'heading', value: 'Запрошуємо на День відкритих дверей!' },
      { type: 'paragraph', value: 'Щороку наш коледж відкриває свої двері для всіх, хто мріє пов\'язати майбутнє з інформаційними технологіями та зв\'язком. Цього року захід відбудеться 28 червня 2026 року о 10:00.' },
      { type: 'paragraph', value: 'Під час заходу ви зможете:\n• Ознайомитися з навчальними корпусами та лабораторіями\n• Поспілкуватися з викладачами та студентами\n• Дізнатися про спеціальності та умови вступу\n• Переглянути студентські проєкти та досягнення' },
      { type: 'paragraph', value: 'Адреса: м. Одеса, просп. Українських Героїв, 6. Вхід вільний.' },
    ],
    publishedAt: new Date('2026-05-15'),
  },
  {
    title: 'Студенти коледжу перемогли на всеукраїнській олімпіаді з програмування',
    slug: 'peremoha-na-olimpiadi-z-programuvannia-2026',
    category: 'NEWS',
    excerpt: 'Команда студентів нашого коледжу здобула перше місце на Всеукраїнській студентській олімпіаді з програмування. Вітаємо переможців!',
    image: { url: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&auto=format&fit=crop', name: 'olimpiada-programuvannia.jpg' },
    blocks: [
      { type: 'heading', value: 'Перша перемога на всеукраїнському рівні!' },
      { type: 'paragraph', value: 'Команда студентів спеціальності «Інженерія програмного забезпечення» у складі Дмитра Коваленка, Олени Петрової та Максима Сидоренка здобула перше місце на Всеукраїнській студентській олімпіаді з програмування.' },
      { type: 'paragraph', value: 'Змагання проходили протягом трьох днів у форматі командного розв\'язання алгоритмічних задач. Наші студенти показали блискучі результати, вирішивши 11 із 12 завдань.' },
      { type: 'paragraph', value: 'Директор коледжу привітав переможців та вручив їм дипломи і грошову винагороду. Ця перемога — результат наполегливої праці та таланту наших студентів і викладачів.' },
    ],
    publishedAt: new Date('2026-04-20'),
  },
  {
    title: 'Відкриття нової лабораторії кібербезпеки',
    slug: 'vidkryttia-laboratorii-kiberbezpeky',
    category: 'NEWS',
    excerpt: 'В коледжі відкрилась сучасна лабораторія кібербезпеки, обладнана найновішим обладнанням. Тут студенти навчатимуться захисту мереж та виявленню вразливостей.',
    image: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop', name: 'laboratoriia-kiberbezpeka.jpg' },
    blocks: [
      { type: 'heading', value: 'Новітня лабораторія для майбутніх фахівців з кібербезпеки' },
      { type: 'paragraph', value: 'Коледж відкрив сучасну лабораторію кібербезпеки, яка стала результатом партнерства з провідними IT-компаніями Одеси. Лабораторія оснащена спеціалізованими серверами, мережевим обладнанням Cisco та програмним забезпеченням для моделювання кібератак і захисту.' },
      { type: 'paragraph', value: 'У лабораторії студенти зможуть практикуватися в: пентестингу та виявленні вразливостей, налаштуванні файрволів та систем виявлення вторгнень, захисті мереж та криптографії, роботі з реальними сценаріями кіберзагроз.' },
      { type: 'paragraph', value: 'Лабораторія буде використовуватися студентами спеціальностей F2, F3 та G5 починаючи з вересня 2026 року.' },
    ],
    publishedAt: new Date('2026-04-10'),
  },
  {
    title: 'Студентська рада запускає проєкт «Зелений коледж»',
    slug: 'zelenyi-koledzh-2026',
    category: 'ARTICLE',
    excerpt: 'Студентська рада ініціювала екологічний проєкт із озеленення території коледжу та впровадження роздільного збору сміття. Долучайтесь!',
    image: { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop', name: 'zelenyi-koledzh.jpg' },
    blocks: [
      { type: 'heading', value: 'Разом робимо коледж зеленішим' },
      { type: 'paragraph', value: 'Студентська рада коледжу запустила ініціативу «Зелений коледж» — комплексний екологічний проєкт, спрямований на покращення екологічного стану нашої навчальної установи та формування свідомого ставлення до довкілля.' },
      { type: 'paragraph', value: 'Перший етап проєкту передбачає:\n• Висадку 50 дерев та кущів на території коледжу\n• Встановлення контейнерів для роздільного збору сміття\n• Облаштування зони відпочинку з лавками та клумбами\n• Встановлення сонячних панелей на даху головного корпусу' },
      { type: 'paragraph', value: 'Проєкт реалізується за підтримки міської ради Одеси. Запрошуємо всіх студентів долучитися до суботників з озеленення, які проходитимуть щосуботи о 10:00.' },
    ],
    publishedAt: new Date('2026-04-05'),
  },
  {
    title: 'Майстер-клас від провідних розробників Google Ukraine',
    slug: 'maister-klas-vid-google-ukraine',
    category: 'TUTORIAL',
    excerpt: 'Інженери Google Ukraine провели для наших студентів інтенсивний майстер-клас з розробки Android-додатків та сучасних підходів до архітектури програмного забезпечення.',
    image: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop', name: 'maister-klas-google.jpg' },
    blocks: [
      { type: 'heading', value: 'Google Ukraine в нашому коледжі' },
      { type: 'paragraph', value: 'Минулого тижня студенти спеціальностей F2 та F3 мали унікальну можливість поспілкуватися з провідними інженерами Google Ukraine. Впродовж двох днів учасники занурились у світ сучасної мобільної розробки та архітектурних патернів.' },
      { type: 'paragraph', value: 'Програма майстер-класу включала:\n• Введення в Jetpack Compose для Android\n• Clean Architecture та MVVM на практиці\n• Continuous Integration/Deployment з GitHub Actions\n• Код-рев\'ю та best practices від Google engineers' },
      { type: 'paragraph', value: 'Три найкращі студенти отримали запрошення на стажування в київський офіс Google. Наступний майстер-клас заплановано на жовтень 2026 року.' },
    ],
    publishedAt: new Date('2026-03-25'),
  },
  {
    title: 'Спортивний фестиваль «Технос-2026»: підсумки',
    slug: 'tekhnos-2026-pidsumky',
    category: 'NEWS',
    excerpt: 'Щорічний спортивний фестиваль «Технос-2026» зібрав понад 300 учасників. Змагання проходили з футболу, волейболу, баскетболу, шахів та кіберспорту.',
    image: { url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop', name: 'tekhnos-sport.jpg' },
    blocks: [
      { type: 'heading', value: 'Спорт, дружба та здоровий дух «Технос-2026»' },
      { type: 'paragraph', value: 'Уже вдесяте наш коледж провів традиційний спортивний фестиваль «Технос». Цього року у змаганнях взяли участь понад 300 студентів і викладачів, а також гості з партнерських навчальних закладів Одеси.' },
      { type: 'paragraph', value: 'Результати головних змагань:\n🏆 Футбол: 1 місце — команда «Байти», 2 місце — «Нейрони»\n🏆 Волейбол: 1 місце — «Сервери», 2 місце — «Пікселі»\n🏆 Кіберспорт (CS2): 1 місце — «Dark Mode», 2 місце — «Stack Overflow»\n🏆 Шахи: Максим Грищенко (F3, гр. 21)' },
      { type: 'paragraph', value: 'Переможці нагороджені кубками, медалями та грошовими преміями від спонсорів фестивалю. Наступний «Технос» відбудеться у березні 2027 року.' },
    ],
    publishedAt: new Date('2026-03-15'),
  },
  {
    title: 'Нові стипендії для талановитих студентів від IT-компаній',
    slug: 'novi-stypendii-vid-it-kompanii-2026',
    category: 'ANNOUNCEMENT',
    excerpt: 'Провідні IT-компанії Одеси оголосили про запуск стипендіальної програми для студентів нашого коледжу. Щомісячна підтримка — від 3000 до 8000 гривень.',
    image: { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop', name: 'stypendii-it.jpg' },
    blocks: [
      { type: 'heading', value: 'Інвестиція у ваше майбутнє' },
      { type: 'paragraph', value: 'Коледж уклав угоди з 8 провідними IT-компаніями Одеси про запуск спільної стипендіальної програми. Починаючи з вересня 2026 року, талановиті студенти зможуть отримувати щомісячну фінансову підтримку від партнерів.' },
      { type: 'paragraph', value: 'Умови участі:\n• Середній бал не нижче 4.5\n• Участь у студентських проєктах або конкурсах\n• Проходження технічного інтерв\'ю з представниками компанії\n• Навчання на 2-4 курсі' },
      { type: 'paragraph', value: 'Розмір стипендії залежить від компанії-партнера та складає від 3000 до 8000 грн на місяць. Деякі компанії також пропонують оплачуване стажування та гарантоване працевлаштування після закінчення навчання. Подати заявку можна до 1 серпня 2026 року в деканаті.' },
    ],
    publishedAt: new Date('2026-03-01'),
  },
  {
    title: 'Наші студенти на виставці технологій TechExpo Odesa 2026',
    slug: 'techexpo-odesa-2026',
    category: 'NEWS',
    excerpt: 'Студенти коледжу представили власні розробки на міжнародній виставці технологій TechExpo Odesa 2026. Особливу увагу привернули проєкти зі штучного інтелекту та IoT.',
    image: { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop', name: 'techexpo-odesa.jpg' },
    blocks: [
      { type: 'heading', value: 'Наші проєкти на TechExpo Odesa 2026' },
      { type: 'paragraph', value: 'На міжнародній виставці технологій TechExpo Odesa 2026 студенти нашого коледжу представили 12 власних проєктів, які викликали справжній фурор серед відвідувачів та експертів галузі.' },
      { type: 'paragraph', value: 'Найбільшу увагу привернули:\n🤖 «SmartHome UA» — система розумного будинку на базі Arduino та Raspberry Pi (команда групи F2-23)\n🧠 «MedAI» — додаток для попередньої діагностики захворювань за допомогою нейронних мереж\n📡 «SafeNet» — система моніторингу мережевого трафіку в реальному часі' },
      { type: 'paragraph', value: 'Проєкт «SmartHome UA» отримав спеціальний приз від компанії Bosch Ukraine, а команда «MedAI» запрошена до участі в акселераторі стартапів Odesa IT Hub. Пишаємося нашими студентами!' },
    ],
    publishedAt: new Date('2026-02-20'),
  },
];

async function main() {
  console.log('🗑️  Видалення старих постів та медіафайлів...');

  await prisma.post.deleteMany({});
  await prisma.mediaFile.deleteMany({});

  console.log('✅ Очищено');
  console.log('📝 Створення нових новин...');

  for (const news of NEWS) {
    const mediaFile = await prisma.mediaFile.create({
      data: {
        name: news.image.name,
        url: news.image.url,
        mimeType: 'image/jpeg',
        size: 150000,
      },
    });

    await prisma.post.create({
      data: {
        title: news.title,
        slug: news.slug,
        category: news.category as any,
        excerpt: news.excerpt,
        blocks: news.blocks,
        status: 'PUBLISHED',
        imageId: mediaFile.id,
        publishedAt: news.publishedAt,
      },
    });

    console.log(`  ✓ ${news.title}`);
  }

  console.log(`\n🎉 Готово! Створено ${NEWS.length} новин.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
