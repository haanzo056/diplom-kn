import { EditPage } from '@/feature/admin/pages/editPage';

export default async function EditPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditPage id={id} />;
}
