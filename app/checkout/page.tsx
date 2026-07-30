import CheckoutForm from './checkout-form';

const VARIANTS: Record<string, { label: string; price: number; tierKey: string }> = {
  rhythm: {
    label: 'The Rhythm Pass',
    price: 199900, // Rs. 1,999 
    tierKey: 'rhythm',
  },
  champion: {
    label: 'The Champion Pass',
    price: 229900, // Rs. 2,299 
    tierKey: 'champion',
  },
  elite: {
    label: 'The Elite Pass',
    price: 499900, // Rs. 4,999 
    tierKey: 'elite',
  },
};

type SearchParams = Promise<{ tier?: string }>;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const tierKey = resolvedParams.tier?.toLowerCase() || 'rhythm';
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