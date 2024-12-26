'use client';
import { ReactNode } from 'react';
import '@/app/global.scss';
import ProjectContextProvider from '@/store/project-context';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="jp">
      <body>
        <ProjectContextProvider>
          <div id="add-edit-modal"></div>
          <div id="alert-modal"></div>
          {children}
        </ProjectContextProvider>
      </body>
    </html>
  );
}
