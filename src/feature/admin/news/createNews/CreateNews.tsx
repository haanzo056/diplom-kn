'use client';

import { PostConstructor } from '../../posts/constructor/post-constructor';

export default function CreateNewsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 h-[calc(100vh-64px)]">
      <PostConstructor />
    </div>
  );
}
