import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Failure | Smashh Zone',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FailureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}