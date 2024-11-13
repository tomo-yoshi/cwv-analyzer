import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SignUpForm from './SignUpForm';

export default async function SignUpPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return <SignUpForm />;
}