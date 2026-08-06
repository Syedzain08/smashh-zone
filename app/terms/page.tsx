import Link from 'next/link';
import PolicySection from '../components/policy-section';
import type { Metadata } from "next";

const LAST_UPDATED = 'July 30, 2026';


export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for ticket purchases and website use for Smashh Zone Badminton Championship at Gaddafi Stadium, Lahore.',
};

export default function TermsPage() {
  return (
    <>
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
              Terms &amp; <span className="font-display font-normal text-accent lowercase">Conditions</span>
            </h1>
            <p className="mt-4 text-sm text-slate-400">
              Last updated: {LAST_UPDATED}
            </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            This website (smashhzone.com) is owned and operated by JSM (Jojo Sports
            &amp; Management), registered at House No. 7, P Block, Marghzar Colony, Iqbal Town,
            Lahore, Pakistan. Smashh Zone is an event produced and managed by JSM,
            held at Gaddafi Stadium, Lahore.
          </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              By visiting this site and/or purchasing a ticket, you agree to be bound
              by the terms below.
            </p>
          </div>
        </section>

        <section className="relative px-6 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-14 border-t border-white/10 pt-14">

            <PolicySection number="01" title="Introduction">
              <p>
                This website, including all information, tools, tickets, and services
                available on it, is offered to you, the user, conditioned upon your
                acceptance of all terms, conditions, policies, and notices stated here.
              </p>
              <p>
                If you have any problems purchasing a ticket, or need support after
                your purchase, contact us at:
              </p>
              <ul>
                <li>
                  General enquiries:{' '}
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

            <PolicySection number="02" title="Applicability and Updates">
              <p>
                By visiting this site and/or purchasing a ticket from us, you engage in
                our &quot;Service&quot; and agree to be bound by these Terms &amp;
                Conditions, including any additional terms and policies referenced here
                or available by hyperlink (including our Privacy Policy). These Terms
                apply to all users of the site, including browsers and ticket
                purchasers.
              </p>
              <p>
                By using our website and services, you represent that you are of legal
                age to form a binding contract, or are purchasing with the consent and
                involvement of a parent or guardian where required, and are not barred
                from receiving products or services under the laws of Pakistan or any
                other applicable jurisdiction.
              </p>
              <p>
                We may update these Terms &amp; Conditions from time to time. Each time
                you purchase a ticket through our website, you agree to the version of
                these Terms in effect at that time.
              </p>
            </PolicySection>

            <PolicySection number="03" title="Ticket Sales">
              <p className="rounded-2xl border border-accent/20 bg-accent/5 p-4 text-slate-200">
                <span className="font-semibold text-accent">
                  All ticket sales are final.
                </span>{' '}
                We do not offer refunds, exchanges, or cancellations under any
                circumstances, including but not limited to change of mind, inability
                to attend, scheduling conflicts, or personal emergencies.
              </p>
              <p>
                This no-refund policy applies regardless of the reason for
                non-attendance, and applies equally to all ticket tiers.
              </p>
              <p>
                Tickets are sold subject to entry conditions, venue capacity, and
                applicable law. It is your responsibility to ensure you have selected
                the correct ticket tier and date before completing your purchase.
              </p>
             <p>
              Payments are processed through Safepay. We do not collect or store your
            payment card details — see our{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
          <p>
            For complaints or disputes related to your order, see our{' '}
            <Link href="/#faq" className="text-accent hover:underline">
              FAQ
            </Link>{' '}
            or contact{' '}
            <Link href="mailto:support@smashhzone.com" className="text-accent hover:underline">
              support@smashhzone.com
            </Link>.
          </p>
            </PolicySection>

            <PolicySection number="04" title="Entry, Conduct & Right to Refuse or Revoke Access">
              <p>
                Purchasing a ticket does not guarantee entry or continued access to the
                event. We reserve the right to refuse entry, remove you from the venue,
                or revoke your ticket at any time, without refund, if you:
              </p>
              <ul>
                <li>Behave in a disruptive, threatening, aggressive, or unsafe manner toward staff, performers, or other attendees;</li>
                <li>Provide false, misleading, or deceptive information in connection with your ticket purchase or entry (including fraudulent identification or duplicated/resold tickets);</li>
                <li>Violate any venue rules, applicable law, or these Terms &amp; Conditions; or</li>
                <li>Pose a risk to the safety or security of the event, its staff, or other attendees.</li>
              </ul>
              <p>
                Where a ticket is revoked or entry is refused under this section, no
                refund, compensation, or replacement ticket will be provided.
              </p>
              <p>
                We may request valid identification and/or your CNIC at entry to verify
                your ticket, consistent with our Privacy Policy.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Terms of Website Usage">
              <p>You are prohibited from using this website or its content:</p>
              <ul>
                <li>For any unlawful purpose;</li>
                <li>To solicit others to perform or participate in any unlawful acts;</li>
                <li>To violate any international, federal, provincial, or state laws, regulations, or rules;</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
                <li>To submit false or misleading information;</li>
                <li>To upload or transmit viruses or any other malicious code intended to affect the functionality of the service or circumvent its security features;</li>
                <li>To collect or track the personal information of others, or to spam, phish, pretext, spider, crawl, or scrape the site; or</li>
                <li>For any obscene or immoral purpose.</li>
              </ul>
              <p>
                We reserve the right to terminate your access to the Service for
                violating any of the above.
              </p>
            </PolicySection>

            <PolicySection number="06" title="Intellectual Property">
              <p>
                This website and its related content (including images, designs, and
                the Smash Zone name and branding) are the intellectual property of JSM
                (Jojo Sports &amp; Management). Except as expressly stated in these
                Terms, nothing here grants you any intellectual property rights in the
                website, its content, or the Smash Zone brand. All rights are reserved.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Indemnity and Limitation of Liability">
              <p>
                You agree to indemnify, defend, and hold harmless JSM (Jojo Sports
                &amp; Management) and its officers, directors, agents, contractors,
                service providers, and employees from any claim or demand — including
                reasonable attorneys&apos; fees — arising from your breach of these
                Terms, or your violation of any law or the rights of a third party.
              </p>
              <p>
                We do not warrant or guarantee the accuracy, timeliness, performance,
                completeness, or suitability of information found on this website for
                any particular purpose. You acknowledge such information may contain
                inaccuracies or errors, and we exclude liability for these to the
                fullest extent permitted by law.
              </p>
              <p>
                Your use of this website, and your attendance at the event, is at your
                own risk. To the extent permitted by law, we disclaim all warranties,
                whether express or implied, including implied warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
              <p>
                We reserve the right not to process a ticket order, including where we
                no longer hold ticket inventory for the requested tier, where the event
                has reached capacity, or for reasons outside our control.
              </p>
            </PolicySection>

            <PolicySection number="08" title="Termination">
              <p>
                We may change or terminate your access to our website or services at
                any time, with or without notice, and without liability to you or any
                third party — including where you have provided false or misleading
                information, interfered with other users or the operation of our
                services, upon request by law enforcement or other governmental
                authorities, or otherwise violated these Terms.
              </p>
            </PolicySection>

            <PolicySection number="09" title="Severability and Waiver">
              <p>
                If any portion of these Terms is found unenforceable, that portion will
                be amended to the minimum extent necessary to make it enforceable, or
                severed if it cannot be made enforceable, with the remaining Terms
                continuing in full force. Our failure to enforce any part of these
                Terms is not a waiver of that right. Any amendment or waiver must be
                made in writing and signed by us.
              </p>
            </PolicySection>

            <PolicySection number="10" title="Governing Law">
              <p>
                These Terms &amp; Conditions are governed by the laws of the Islamic
                Republic of Pakistan. You agree that the courts of Lahore (including
                any consumer court, where applicable) will have exclusive jurisdiction
                over any dispute arising between you and us.
              </p>
            </PolicySection>

          </div>
        </section>
      </main>

   
    </>
  );
}

