export const MediaLibrary = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Медиатека</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          Загрузить
        </button>
      </div>
      {/* TODO: grid of uploaded files */}
      <div className="bg-white rounded-lg border p-6 text-gray-400 text-sm">
        Файлов нет.
      </div>
    </div>
  );
};