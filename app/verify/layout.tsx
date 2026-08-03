import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Verification',
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}