'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import computePricing from '@/lib/pricing';

const attendeeSchema = z.object({
  name: z.string().min(2, 'Required'),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Format: 12345-1234567-1'),
  phone: z.string().min(10, 'Required'),
  email: z.string().email('Invalid email'),
});

const checkoutSchema = z
  .object({
    quantity: z.number().min(1, 'At least 1 ticket required').max(20, 'Max 20 tickets per order'),
    buyerName: z.string().min(2, 'Required'),
    buyerEmail: z.string().email('Invalid email'),
    buyerPhone: z.string().min(10, 'Required'),
    buyerCnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Format: 12345-1234567-1'),
    affiliationType: z.enum(['Private', 'Association', 'School', 'College', 'University']),
    institutionName: z.string().optional(),
    attendees: z.array(attendeeSchema),
    acknowledgeFinalSale: z.literal(true, {
      message: 'You must acknowledge this before continuing',
    }),
    agreeToTerms: z.literal(true, {
      message: 'You must agree to the Terms of Service and Privacy Policy',
    }),
  })
  .refine(
    (data) => {
      if (data.affiliationType !== 'Private') {
        return !!data.institutionName && data.institutionName.trim().length >= 2;
      }
      return true;
    },
    {
      message: 'Please specify your institution/organization name',
      path: ['institutionName'],
    }
  );

type CheckoutFormValues = z.infer<typeof checkoutSchema>;
type Variant = { label: string; price: number; tierKey: string };

export default function CheckoutForm({ variant }: { variant: Variant }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      quantity: 1,
      affiliationType: 'Private',
      institutionName: '',
      attendees: [],
    },
  });

  const { fields, replace } = useFieldArray({ control, name: 'attendees' });

  const quantityValue = useWatch({ control, name: 'quantity' });
  const affiliationValue = useWatch({ control, name: 'affiliationType' });

  const selectedQuantity = quantityValue || 1;
  const selectedAffiliation = affiliationValue || 'Private';

  useEffect(() => {
    const additionalCount = Math.max(0, selectedQuantity - 1);
    if (fields.length !== additionalCount) {
      const newAttendees = Array.from({ length: additionalCount }, (_, i) => ({
        name: fields[i]?.name || '',
        cnic: fields[i]?.cnic || '',
        phone: fields[i]?.phone || '',
        email: fields[i]?.email || '',
      }));
      replace(newAttendees);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuantity, fields.length, replace]);

  const pricing = computePricing(variant.price, selectedQuantity, variant.label, selectedAffiliation);
  const {
    grossSubtotalPaisa,
    totalDiscountPaisa,
    processingFeePaisa,
    totalAmountPaisa,
    isDelegation,
  } = pricing;

  const handleQuantityChange = (delta: number) => {
    const nextVal = Math.min(20, Math.max(1, selectedQuantity + delta));
    setValue('quantity', nextVal, { shouldValidate: true });
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    clearErrors('root');
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierKey: variant.tierKey,
          quantity: data.quantity,
          buyerName: data.buyerName,
          buyerEmail: data.buyerEmail,
          buyerPhone: data.buyerPhone,
          buyerCnic: data.buyerCnic,
          affiliationType: data.affiliationType,
          institutionName: data.institutionName,
          attendees: data.attendees,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.error || 'Something went wrong');
      }

      const { checkoutUrl } = await res.json();

      window.location.assign(checkoutUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setError('root.serverError', {
        type: 'custom',
        message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">

      <div className="overflow-hidden rounded-2xl border border-primary/10 bg-primary text-secondary shadow-xl shadow-primary/10">
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary/70">Selected Pass</p>
          <div className="mt-1 flex items-baseline justify-between">
            <p className="font-primary text-3xl font-black uppercase tracking-tight">{variant.label}</p>
            <p className="text-sm font-semibold text-secondary/90">
              Rs. {(variant.price / 100).toLocaleString()} <span className="text-xs text-secondary/60">/ pass</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-secondary/15 bg-black/20 px-6 py-4 backdrop-blur-sm">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-secondary/70">
              Select Quantity
            </span>
            <span className="text-xs text-secondary/50">
              {selectedQuantity} ticket{selectedQuantity > 1 ? 's' : ''} total
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={selectedQuantity <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 font-bold text-secondary transition-all hover:bg-secondary/20 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              −
            </button>
            <span className="w-6 text-center font-primary text-lg font-bold text-secondary">
              {selectedQuantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={selectedQuantity >= 20}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 font-bold text-secondary transition-all hover:bg-secondary/20 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2 border-t border-secondary/15 bg-black/35 px-6 py-4 text-sm backdrop-blur-sm">
          <div className="flex justify-between text-secondary/80">
            <span>Pass Subtotal ({selectedQuantity} × Rs. {(variant.price / 100).toLocaleString()})</span>
            <span>Rs. {(grossSubtotalPaisa / 100).toLocaleString()}</span>
          </div>

          {isDelegation && (
            <div className="flex justify-between font-semibold text-emerald-400">
              <span>Delegation Discount ({selectedQuantity} Delegates)</span>
              <span>- Rs. {(totalDiscountPaisa / 100).toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-secondary/80">
            <span>Processing & Platform Fee</span>
            <span>Rs. {(processingFeePaisa / 100).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between border-t border-secondary/10 pt-3 font-primary text-xl font-bold text-secondary">
            <span>Total Payable</span>
            <span>
              Rs. {(totalAmountPaisa / 100).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <fieldset className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
        <legend className="px-1 font-primary text-xs font-bold uppercase tracking-wider text-primary">
          Buyer & Pass 1 Details
        </legend>
        <p className="mb-5 text-xs text-primary/60">Primary contact for this order & main pass holder</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" error={errors.buyerName?.message}>
            <input {...register('buyerName')} className={inputClass(!!errors.buyerName)} placeholder="Ahmed Raza" />
          </Field>
          <Field label="Email" error={errors.buyerEmail?.message}>
            <input {...register('buyerEmail')} type="email" className={inputClass(!!errors.buyerEmail)} placeholder="you@email.com" />
          </Field>
          <Field label="Phone Number" error={errors.buyerPhone?.message}>
            <input {...register('buyerPhone')} className={inputClass(!!errors.buyerPhone)} placeholder="+92 3XX XXXXXXX" />
          </Field>
          <Field label="CNIC" error={errors.buyerCnic?.message}>
            <input {...register('buyerCnic')} className={inputClass(!!errors.buyerCnic)} placeholder="12345-1234567-1" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
        <legend className="px-1 font-primary text-xs font-bold uppercase tracking-wider text-primary">
          Affiliation
        </legend>
        <p className="mb-4 text-xs text-primary/60">Are you attending privately or representing an institution?</p>

        <div className="grid gap-2.5 sm:grid-cols-5">
          {(['Private', 'Association', 'School', 'College', 'University'] as const).map((type) => (
            <label
              key={type}
              className={`flex select-none cursor-pointer items-center justify-center rounded-xl border p-3 text-xs font-semibold transition-all ${
                selectedAffiliation === type
                  ? 'border-primary bg-primary text-secondary shadow-sm'
                  : 'border-primary/20 bg-zinc-50/50 text-primary/80 hover:border-primary/40'
              }`}
            >
              <input type="radio" value={type} {...register('affiliationType')} className="sr-only" />
              {type}
            </label>
          ))}
        </div>

        {selectedAffiliation !== 'Private' && (
          <div className="mt-4 animate-in fade-in-50 slide-in-from-top-2">
            <Field label={`${selectedAffiliation} Name`} error={errors.institutionName?.message}>
              <input
                {...register('institutionName')}
                className={inputClass(!!errors.institutionName)}
                placeholder={`Enter name of your ${selectedAffiliation.toLowerCase()}...`}
              />
            </Field>
          </div>
        )}
      </fieldset>

      {fields.map((field, index) => (
        <fieldset key={field.id} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
          <legend className="px-1 font-primary text-xs font-bold uppercase tracking-wider text-primary">
            Pass {index + 2} Holder Details
          </legend>
          <p className="mb-5 text-xs text-primary/60">Details for additional attendee #{index + 2}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.attendees?.[index]?.name?.message}>
              <input {...register(`attendees.${index}.name`)} className={inputClass(!!errors.attendees?.[index]?.name)} placeholder="Attendee Name" />
            </Field>
            <Field label="Email" error={errors.attendees?.[index]?.email?.message}>
              <input {...register(`attendees.${index}.email`)} type="email" className={inputClass(!!errors.attendees?.[index]?.email)} placeholder="attendee@email.com" />
            </Field>
            <Field label="Phone Number" error={errors.attendees?.[index]?.phone?.message}>
              <input {...register(`attendees.${index}.phone`)} className={inputClass(!!errors.attendees?.[index]?.phone)} placeholder="+92 3XX XXXXXXX" />
            </Field>
            <Field label="CNIC" error={errors.attendees?.[index]?.cnic?.message}>
              <input {...register(`attendees.${index}.cnic`)} className={inputClass(!!errors.attendees?.[index]?.cnic)} placeholder="12345-1234567-1" />
            </Field>
          </div>
        </fieldset>
      ))}

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label
            className={`group flex select-none cursor-pointer items-start gap-3.5 rounded-2xl border p-5 transition-all ${
              errors.acknowledgeFinalSale
                ? 'border-red-400 bg-red-50/30'
                : 'border-primary/15 bg-white hover:border-primary/30 hover:bg-zinc-50/50'
            }`}
          >
            <input
              type="checkbox"
              {...register('acknowledgeFinalSale')}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-primary/20 text-primary accent-primary transition-transform group-hover:scale-105"
            />
            <span className="text-xs font-semibold leading-relaxed text-primary/80 group-hover:text-primary">
              I understand all ticket sales are final and non-refundable.
            </span>
          </label>
          {errors.acknowledgeFinalSale && (
            <p className="px-1 text-xs font-medium text-red-600 animate-in fade-in-50">
              {errors.acknowledgeFinalSale.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            className={`group flex select-none cursor-pointer items-start gap-3.5 rounded-2xl border p-5 transition-all ${
              errors.agreeToTerms
                ? 'border-red-400 bg-red-50/30'
                : 'border-primary/15 bg-white hover:border-primary/30 hover:bg-zinc-50/50'
            }`}
          >
            <input
              type="checkbox"
              {...register('agreeToTerms')}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-primary/20 text-primary accent-primary transition-transform group-hover:scale-105"
            />
            <span className="text-xs font-semibold leading-relaxed text-primary/80 group-hover:text-primary">
              I agree to the{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="px-1 text-xs font-medium text-red-600 animate-in fade-in-50">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>
      </div>

      {errors.root?.serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Submission Failed</p>
          <p className="mt-0.5 text-xs text-red-600">{errors.root.serverError.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary py-4 text-sm font-bold tracking-wide text-secondary shadow-lg shadow-primary/20 transition-all hover:cursor-pointer hover:opacity-95 hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
      >
        {isSubmitting
          ? 'Redirecting to payment…'
          : `Pay Rs. ${(totalAmountPaisa / 100).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} →`}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-primary/80">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-lg border bg-zinc-50/50 px-3.5 py-2.5 text-sm text-primary placeholder:text-primary/30 outline-none transition-all',
    hasError
      ? 'border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
      : 'border-primary/25 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20',
  ].join(' ');
}