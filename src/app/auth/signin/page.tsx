import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import SignInForm from './SignInForm';

export default async function SignInPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return <SignInForm />;
}