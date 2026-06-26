'use client';
import { PageForm } from './components/PageForm';
import { useCreateNewPage } from './hooks/useCreateNewPage';

export const CreateNewPage = () => {
  const { handleCreatePage, isPending } = useCreateNewPage();
  return (
    <div>
      <PageForm onSubmit={handleCreatePage} isPending={isPending} />
    </div>
  );
};
