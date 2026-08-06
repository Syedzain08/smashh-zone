import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Find Your Tickets',
  description: 'Missing your tickets? Enter your email to have your Smashh Zone Badminton Championship passes resent instantly.',
};

export default function MissingTicketsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}