'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link'

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: 'What dates is Smashh Zone Badminton Championship happening?',
    answer:
      "The championship runs September 12-13, 2026, at Gaddafi Stadium, Lahore. Day 1 covers group stage and quarterfinal matches, and Day 2 features the semifinals, championship final, and the Concert Night.",
  },
  {
    question: 'What time do gates open?',
    answer:
      'Gates open at 9:00 AM for registration, with matches starting at 10:00 AM both days. Entry is through Gate 3.',
  },
  {
    question: "Who's performing at the concert?",
    answer:
      "Our Concert Night headliner is being finalized — the full reveal is coming soon. Stay tuned to our socials and this page for the announcement.",
  },
  {
    question: 'Is there an age restriction?',
    answer:
      "The event is open to ages 15+. If you're bringing a younger attendee, we'd advise having a guardian accompany them.",
  },
  {
    question: 'Why do you need my CNIC?',
    answer:
      "We collect your CNIC number for identity verification tied to your ticket purchase, and so we're able to assist law enforcement in the event of a security incident at the venue. It's checked against your ticket at entry. We never use it for marketing, and it's permanently deleted two months after the event concludes.",
  },
  {
    question: "What's your policy on refunds and transfers?",
    answer:
      "All ticket sales are final. We don't offer refunds, exchanges, or cancellations for any reason — including change of mind, inability to attend, or scheduling conflicts — and this applies equally across all ticket tiers. Please double-check your tier and date before completing checkout.",
  },
  {
    question: 'How do I file a complaint or dispute?',
    answer:
      "Email support@smashhzone.com with your order details and a description of the issue. We acknowledge all complaints within 2-3 business days and aim to resolve them within 5-7 business days. For missing tickets specifically, see our \"Didn't Get Your Ticket?\" page linked in the footer.",
  },
  {
    question: 'Can I be removed from the event?',
    answer:
      'Yes. Buying a ticket does not guarantee continued access — entry can be refused or a ticket revoked, without refund, if you behave in a disruptive, threatening, or unsafe manner, provide false or misleading information (including fraudulent ID or duplicated tickets), break venue rules or the law, or pose a risk to the safety of staff or other attendees.',
  },
  {
    question: "What if I didn't receive my ticket after purchase?",
    answer:
      "Head to the \"Didn't Get Your Ticket?\" page linked in the footer, or reach out directly to support@smashhzone.com.",
  },
  {
    question: "Who's organizing the event?",
    answer:
      'Smashh Zone is directed and managed by JSM (Jojo Sports & Management).',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-[#080c0a] px-6 py-20 text-white md:px-12 md:py-28">

      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-104 w-lg -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
    
        <div className="text-center">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Got Questions?
          </span>
          <h2 className="mt-4 font-primary text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            Frequently Asked
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300 md:text-base">
           Find quick answers regarding tickets, entry requirements, and event policies below.
          </p>
        </div>

   
        <div className="mt-16 flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleFaq(index)}
                className={`cursor-pointer rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 ${
                  isOpen
                    ? 'border-accent/40 bg-white/5'
                    : 'border-white/10 bg-white/3 hover:border-white/20'
                }`}
              >
        
                <div className="flex items-center justify-between gap-4 font-primary text-base font-bold uppercase tracking-wide text-white">
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-5 w-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-slate-400'}`} />
                    <span className={`transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-white'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${
                      isOpen ? 'rotate-180 text-accent' : ''
                    }`}
                  />
                </div>

        
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 text-xs leading-relaxed text-slate-300 sm:text-sm md:pl-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <p className="mt-12 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
          Still have questions? Contact support at{' '}
          <Link
            href="mailto:support@smashhzone.com"
            className="text-accent underline hover:opacity-80 transition-opacity"
          >
            support@smashhzone.com
          </Link>
        </p>
      </div>
    </section>
  );
}