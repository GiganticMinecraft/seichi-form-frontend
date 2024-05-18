'use client';

import { redirect } from 'next/navigation';
import useSWR from 'swr';
import { ThemeProvider } from '@emotion/react';
import adminDashboardTheme from '../../../theme/adminDashboardTheme';
import { CssBaseline } from '@mui/material';
import FormEditForm from './_components/FormEditForm';
import { GetFormResponse } from '@/app/api/_schemas/ResponseSchemas';

const Home = ({ params }: { params: { id: number } }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<GetFormResponse>(
    `http://localhost:3000/api/form?formId=${params.id}`,
    fetcher
  );

  if (!isLoading && !data) {
    redirect('/');
  } else if (!data) {
    return null;
  }

  return (
    <ThemeProvider theme={adminDashboardTheme}>
      <CssBaseline />
      <FormEditForm form={data} />
    </ThemeProvider>
  );
};

export default Home;
