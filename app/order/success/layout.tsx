import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success | Smashh Zone',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}