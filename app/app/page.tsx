'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/app/overview'); }, [router]);
  return null;
}
