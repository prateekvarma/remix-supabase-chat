import { V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import createServerSupabase from 'utils/supabase.server';

import type { LoaderArgs } from '@remix-run/node';
import Login from 'components/login';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });
  const { data } = await supabase.from('messages').select();
  return json({ messages: data ?? [] }, { headers: response.headers });
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
