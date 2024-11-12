import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SignInForm from './SignInForm';

export default async function SignInPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return <SignInForm />;
}