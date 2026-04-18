'use client';

import { PostConstructor } from '../../posts/constructor/post-constructor';

// Укажи здесь правильный путь до твоего компонента PostConstructor

export default function CreateNewsPage() {
  return (
    // Обертка на всю высоту экрана, чтобы DND-редактор и боковое меню
    // корректно растягивались и не схлопывались
    <div className="max-w-[1400px] mx-auto px-4 py-8 h-[calc(100vh-64px)]">
      <PostConstructor />
    </div>
  );
}
