import { redirect } from 'next/navigation';

export default function AiDraftsRedirect() {
  redirect('/admin/articles');
}
