import CheckoutForm from './checkout-form';
import { VARIANTS, PassTierKey } from '@/lib/pricing';

type SearchParams = Promise<{ tier?: string }>;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const tierKey = (resolvedParams.tier?.toLowerCase() || 'rhythm') as PassTierKey;
  
 
  const selectedVariant = VARIANTS[tierKey] || VARIANTS.rhythm;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="font-primary text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Complete Order
          </h1>
          <p className="mt-2 text-sm opacity-80">
            Secure your passes for Smashh Zone
          </p>
        </header>

        <CheckoutForm variant={selectedVariant} />
      </div>
    </main>
  );
}