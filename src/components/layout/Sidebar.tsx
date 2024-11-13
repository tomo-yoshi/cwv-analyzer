import { createClient } from '@/lib/supabase/server';
import { SidebarClient } from './SidebarClient';

export async function Sidebar() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return <SidebarClient initialSession={session} />;
}
