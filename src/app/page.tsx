'use client';

import Chat from './pages/chat';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Chat />
    </Suspense>
  );
}
