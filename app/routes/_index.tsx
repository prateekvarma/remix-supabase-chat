import type { V2_MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import supabase from 'utils/supabase';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const { data } = await supabase.from('messages').select();
  return { data };
};

export default function Index() {
  const { data } = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
