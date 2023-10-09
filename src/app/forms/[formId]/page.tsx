import { getForm } from '@/api/form';
import { getCachedToken } from '@/api/mcToken';
import AnswerForm from '@/components/AnswerForm';

const Home = async ({ params }: { params: { formId: number } }) => {
  const token = getCachedToken() ?? '';
  const form = await getForm(params.formId, token);

  return <AnswerForm form={form} />;
};

export default Home;
