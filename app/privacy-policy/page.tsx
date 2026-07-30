import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PolicySection from '../components/policy-section';

const LAST_UPDATED = 'July 30, 2026';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#0a0f0d] text-white">
        <div
          className="pointer-events-none absolute -top-1/4 left-1/2 h-96 w-xl -translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #d4f21e 0%, transparent 70%)' }}
        />


        <section className="relative px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Legal
            </span>
            <h1 className="mt-3 font-primary text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
              Privacy <span className="font-display font-normal text-accent lowercase">Policy</span>
            </h1>
            <p className="mt-4 text-sm text-slate-400">
              Last updated: {LAST_UPDATED}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              Smashh Zone is produced and operated by JSM (Jojo Sports &amp; Management).
              This page explains what personal data we collect through smashhzone.com,
              why we collect it, how long we keep it, and what happens to it.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              By visiting this website or purchasing a ticket through it, you agree to
              the handling of your personal data as described below.
            </p>
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-14 border-t border-white/10 pt-14">

            <PolicySection number="01" title="Personal Data We Collect">
              <p>
                When you purchase a ticket through smashhzone.com, we collect:
              </p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>CNIC number</li>
              </ul>
              <p>
                We collect CNIC numbers specifically for identity verification tied to
                ticket purchases, and to be able to assist law enforcement in the event
                of a security incident at the venue.
              </p>
              <p>
                We do not collect personal data from visitors who are simply browsing
                the site without purchasing a ticket.
              </p>
              <p className="rounded-2xl border border-accent/20 bg-accent/5 p-4 text-slate-200">
                <span className="font-semibold text-accent">
                  We never collect or store your payment card details.
                </span>{' '}
                All payments are processed directly through Safepay, our payment
                processor. Your card number, expiry date, and CVV are entered on
                Safepay&apos;s secure payment page and never pass through or get stored
                on smashhzone.com.
              </p>
            </PolicySection>

            <PolicySection number="02" title="Website Analytics">
              <p>
                We use Umami Analytics to understand how people use our site — for
                example, which pages are viewed and general traffic patterns. This is:
              </p>
              <ul>
                <li><strong className="text-white">Cookieless</strong> — no tracking cookies are placed on your device.</li>
                <li><strong className="text-white">Aggregate only</strong> — we see overall traffic and page-view numbers, not individual visitor behavior.</li>
                <li><strong className="text-white">Not personally identifiable</strong> — this data is never linked to your name, email, phone number, or any information collected during a ticket purchase.</li>
              </ul>
            </PolicySection>

            <PolicySection number="03" title="How We Use Your Personal Data">
              <p>We use the personal data collected during ticket purchase to:</p>
              <ul>
                <li>Process and confirm your ticket order</li>
                <li>Verify your identity for entry at the venue</li>
                <li>Respond to questions or support requests you send us</li>
                <li>Investigate and resolve disputes related to your order (e.g. payment issues, duplicate tickets, refund requests)</li>
                <li>Assist law enforcement if required — for example, in the event of a security incident, threat, or act of terrorism at or connected to the event</li>
              </ul>
              <p>
                We do not use this data for advertising, marketing emails, or any
                purpose beyond what&apos;s listed above.
              </p>
            </PolicySection>

            <PolicySection number="04" title="How Long We Keep Your Data">
              <p>
                We retain the personal data collected during ticket purchase (name,
                email, phone number, CNIC number) for{' '}
                <strong className="text-white">two (2) months after the event concludes</strong>.
              </p>
              <p>This retention period exists solely to allow us to:</p>
              <ul>
                <li>Handle post-event disputes (refunds, entry issues, payment discrepancies)</li>
                <li>Respond to law enforcement requests related to incidents at the event, including matters of public safety or terrorism</li>
              </ul>
              <p>
                After this two-month period, we permanently delete this data. We do not
                retain it for any longer-term purpose, and we do not use it to build a
                marketing database or contact you after the event.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Who We Share Your Data With">
              <p>
                We share personal data only where necessary to operate the event and
                process your purchase, including with:
              </p>
              <ul>
                <li>
                  <strong className="text-white">Safepay</strong>, our payment processor,
                  to complete your transaction. Safepay handles your payment details
                  directly — we only receive confirmation that payment was successful,
                  not your card information.
                </li>
                <li>
                  <strong className="text-white">Law enforcement or relevant authorities</strong>,
                  if legally required or in connection with a security incident at the
                  event
                </li>
              </ul>
              <p>
                We do not sell your personal data, and we do not share it with
                advertisers or third parties for marketing purposes.
              </p>
            </PolicySection>

            <PolicySection number="06" title="How We Protect Your Data">
              <p>
                We take reasonable steps to protect the personal data we hold,
                including access controls and secure handling practices, to guard
                against unauthorized access, loss, misuse, or alteration of your data
                during the retention period described above.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Your Data, Your Questions">
              <p>
                If you have questions about the personal data we hold about you, or
                want to know more about how it&apos;s handled, you can reach us at:
              </p>
              <ul>
                <li>
                  General contact:{' '}
                  <Link href="mailto:contact@smashhzone.com" className="text-accent hover:underline">
                    contact@smashhzone.com
                  </Link>
                </li>
                <li>
                  Support enquiries:{' '}
                  <Link href="mailto:support@smashhzone.com" className="text-accent hover:underline">
                    support@smashhzone.com
                  </Link>
                </li>
              </ul>
            </PolicySection>

            <PolicySection number="08" title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time — for example, if
                our data practices change or if legal requirements change. The version
                in effect at the time you purchase a ticket is the one that applies to
                your purchase.
              </p>
            </PolicySection>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
