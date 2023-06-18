import { useOutletContext } from '@remix-run/react';
import { Database } from 'db_types';
import { useEffect, useState } from 'react';
import { SupabaseOutletContext } from '~/root';

type Message = Database['public']['Tables']['messages']['Row'];

export default function RealtimeMessages({
  serverMessages,
}: {
  serverMessages: Message[];
}) {
  const [messages, setMessages] = useState(serverMessages);
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  //this 2nd useEffect is for when user logs in/out -- which is when our 'serverMessages' change
  useEffect(() => {
    setMessages(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          // gets the new inserted message
          const newMessage = payload.new as Message;

          //check if message is already in our state, if not, insert it
          if (!messages.find((message) => message.id === newMessage.id)) {
            setMessages([...messages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, messages, setMessages]);

  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
}
