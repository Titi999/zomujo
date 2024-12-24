import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <div>Sidebar</div>
      {children}
    </div>
  );
}
