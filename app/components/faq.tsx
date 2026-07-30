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
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Duis aute irure dolor in reprehenderit in voluptate velit?',
    answer:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    question: 'Curabitur pretium tincidunt lacus nulla gravidas accumsan?',
    answer:
      'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.',
  },
  {
    question: 'Pellentesque habitant morbi tristique senectus et netus?',
    answer:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ut ultrices eros, sed sodales tellus. Phasellus quis diam sed massa porta semper.',
  },
  {
    question: 'Fusce aliquet mollis sem, at sodales magna tristique nec?',
    answer:
      'Fusce aliquet mollis sem, at sodales magna tristique nec. Proin imperdiet pretium metus, non feugiat elit rhoncus at. Integer aliquet, dui in accumsan vehicula, lorem nisi pellentesque elit.',
  },
  {
    question: 'Vivamus elementum semper nisi, aenean vulputate eleifend?',
    answer:
      'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.',
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find quick answers regarding tickets, entry requirements, and event policies below.
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