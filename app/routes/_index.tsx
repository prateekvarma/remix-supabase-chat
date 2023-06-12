import { V2_MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import supabase from 'utils/supabase';

import type { LoaderArgs } from '@remix-run/node';
import Login from 'components/login';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({}: LoaderArgs) => {
  const { data } = await supabase.from('messages').select();
  return { messages: data ?? [] };
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <>
      <Login />
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </>
  );
}
