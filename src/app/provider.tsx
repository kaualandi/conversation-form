'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <Toaster position='top-right' />
      {children}
    </NextUIProvider>
  );
};
