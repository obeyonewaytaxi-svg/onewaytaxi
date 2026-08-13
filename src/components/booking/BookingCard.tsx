import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LocationAutocomplete } from './LocationAutocomplete';
import { tripTypeOptions, timeOptions, buildWhatsAppMessage } from '../../lib/booking';
import type { TripType } from '../../types';
import { cabs } from '../../data/siteData';
import { siteConfig, waLink } from '../../config/site';
import { Input, Select, FieldLabel } from '../ui/Input';
import { Button } from '../ui/Button';
import { CarImage } from '../shared/CarImage';
import { trackEvent } from '../../lib/analytics';

function todayLocal(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

const bookingSchema = z
  .object({
    pickup: z
      .string()
      .min(3, 'Enter your pickup city')
      .regex(/^[A-Za-z][A-Za-z\s.'-]*$/, 'Enter a valid city name'),
    drop: z
      .string()
      .min(3, 'Enter your drop city')
      .regex(/^[A-Za-z][A-Za-z\s.'-]*$/, 'Enter a valid city name'),
    date: z.string().min(1, 'Pickup date is required'),
    time: z.string().min(1, 'Pickup time is required'),
    returnDate: z.string().optional(),
    name: z.string().min(2, 'Name is required'),
    phone: z.string().regex(/^(\+?91[\-\s]?)?[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  })
  .refine((data) => data.pickup.toLowerCase() !== data.drop.toLowerCase(), {
    message: 'Pickup and drop must be different',
    path: ['drop'],
  })
  .superRefine((data, ctx) => {
    if (data.date && data.date < todayLocal()) {
      ctx.addIssue({ code: 'custom', path: ['date'], message: 'Pickup date cannot be in the past' });
    }
    if (data.returnDate && data.date && data.returnDate < data.date) {
      ctx.addIssue({ code: 'custom', path: ['returnDate'], message: 'Return date must be on or after pickup date' });
    }
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

type BookingCardProps = {
  compact?: boolean;
};

export function BookingCard({ compact = false }: BookingCardProps) {
  const [tripType, setTripType] = useState<TripType>('One Way');
  const [selectedCab, setSelectedCab] = useState(cabs[0].title);
  const [acceptedLocations, setAcceptedLocations] = useState<Record<string, boolean>>({});

  const defaultPickupDate = todayLocal();
  const defaultReturnDate = (() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset + 86400000).toISOString().slice(0, 10);
  })();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickup: 'Chennai',
      drop: 'Coimbatore',
      date: defaultPickupDate,
      time: '10:00 AM',
      returnDate: defaultReturnDate,
    },
  });

  useEffect(() => {
    setValue('returnDate', defaultReturnDate);
  }, []);

  const swapLocations = () => {
    const pickup = watch('pickup');
    const drop = watch('drop');
    setValue('pickup', drop, { shouldValidate: true });
    setValue('drop', pickup, { shouldValidate: true });
  };

  const onSubmit = (values: BookingFormValues) => {
    const pickupAccepted = acceptedLocations.pickup ?? true;
    const dropAccepted = acceptedLocations.drop ?? true;
    if (!pickupAccepted || !dropAccepted) {
      if (!pickupAccepted) {
        setError('pickup', { type: 'manual', message: 'Select a city from the suggestions' });
      } else {
        clearErrors('pickup');
      }
      if (!dropAccepted) {
        setError('drop', { type: 'manual', message: 'Select a city from the suggestions' });
      } else {
        clearErrors('drop');
      }
      return;
    }
    const message = buildWhatsAppMessage({
      pickup: values.pickup,
      drop: values.drop,
      date: values.date,
      time: values.time,
      tripType,
      cabTitle: selectedCab,
      returnDate: tripType === 'Round Trip' ? values.returnDate : undefined,
      name: values.name,
      phone: values.phone,
    });
    window.open(waLink(message), '_blank');
    trackEvent('book_click', {
      flow: 'booking_card',
      trip_type: tripType,
      vehicle: selectedCab,
      pickup: values.pickup,
      drop: values.drop,
      date: values.date,
      time: values.time,
      path: window.location.pathname,
    });
  };

  return (
    // <div className="rounded-3xl border border-slate-400 bg-white p-5 shadow-5xl md:p-7">
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-5xl ring-1 ring-slate-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-8">
      {/* <h2 className="mb-4 font-heading text-lg font-bold text-slate-900">One Way Taxi Booking</h2> */}
    {/* <h2 className="mb-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 py-3 text-center text-xl font-white uppercase tracking-[0.2em] text-black shadow-lg">
  ONE WAY TAXI BOOKING
</h2> */}
     <h2 className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-black to-slate-900 py-4 text-center text-xl font-black uppercase tracking-[0.25em] text-yellow-400 shadow-xl ring-1 ring-yellow-500/30">
  🚖 ONE WAY TAXI BOOKING
</h2>
      <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          {tripTypeOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTripType(option)}
              className={cn(
                'rounded-lg px-4 py-2.5 text-sm font-semibold transition-all',
                tripType === option ? 'bg-brand-secondary text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700',
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <LocationAutocomplete
            id="booking-pickup"
            label="Pickup"
            placeholder="Pickup City / Airport"
            value={watch('pickup')}
            onChange={(value) => setValue('pickup', value, { shouldValidate: true })}
            onAcceptChange={(accepted) => {
              setAcceptedLocations((prev) => ({ ...prev, pickup: accepted }));
              if (accepted) clearErrors('pickup');
            }}
            error={errors.pickup?.message}
          />

          <button
            type="button"
            onClick={swapLocations}
            className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:rotate-180 hover:border-brand-secondary hover:text-brand-secondary"
            aria-label="Swap pickup and drop"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>

          <LocationAutocomplete
            id="booking-drop"
            label="Drop"
            placeholder="Drop City / Airport"
            value={watch('drop')}
            onChange={(value) => setValue('drop', value, { shouldValidate: true })}
            onAcceptChange={(accepted) => {
              setAcceptedLocations((prev) => ({ ...prev, drop: accepted }));
              if (accepted) clearErrors('drop');
            }}
            error={errors.drop?.message}
          />
        </div>


        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="pickup-date">Pickup date</FieldLabel>
            <Input id="pickup-date" type="date" min={todayLocal()} {...register('date')} />
            {errors.date && <p className="text-xs font-medium text-red-600">{errors.date.message}</p>}
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="pickup-time">Pickup time</FieldLabel>
            <Select id="pickup-time" {...register('time')}>
              <option value="">Pickup Time</option>
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {errors.time && <p className="text-xs font-medium text-red-600">{errors.time.message}</p>}
          </div>
        </div>

        {tripType === 'Round Trip' && (
          <div className="space-y-1.5">
            <FieldLabel htmlFor="return-date">Return date</FieldLabel>
            <Input id="return-date" type="date" min={watch('date') || todayLocal()} {...register('returnDate')} />
            {errors.returnDate && <p className="text-xs font-medium text-red-600">{errors.returnDate.message}</p>}
          </div>
        )}

        {/* Minimum Billing Highlight */}
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2">
          <p className="text-[11px] font-bold text-yellow-800">
            🚕 Minimum Billing Applies:
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-yellow-700">
            {tripType === 'One Way' ? 'One Way trips are billed for a minimum of 130 km.' : 'Round Trips are billed for a minimum of 250 km.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Select your cab</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {cabs.slice(0, 4).map((cab) => (
              <button
                key={cab.title}
                type="button"
                onClick={() => setSelectedCab(cab.title)}
                className={cn(
                  'group overflow-hidden rounded-xl border p-2.5 text-left transition-all',
                  selectedCab === cab.title
                    ? 'border-brand-secondary bg-white shadow-md shadow-brand-secondary/10 ring-1 ring-brand-secondary/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{cab.title}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">₹{tripType === 'Round Trip' ? cab.roundTripRate : cab.rate} / Km</p>
                  </div>
                  <CarImage src={cab.image} alt={cab.title} className="h-14 w-20 rounded-lg object-cover" width={80} height={56} loading="lazy" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="booking-name">Your name</FieldLabel>
              <Input id="booking-name" type="text" {...register('name')} placeholder="John Doe" />
              {errors.name && <p className="text-xs font-medium text-red-600">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="booking-phone">Phone</FieldLabel>
              <Input id="booking-phone" type="tel" {...register('phone')} placeholder="+91 98765 43210" />
              {errors.phone && <p className="text-xs font-medium text-red-600">{errors.phone.message}</p>}
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" size="lg">
          <ArrowRight className="h-4 w-4" />
          Send Booking Request
        </Button>
        <p className="text-center text-[10px] leading-relaxed text-slate-500">
          Note: Minimum billing of 130km (One Way) and 250km (Round Trip) applies. Tolls, permits, and parking are extra. Hill station driver bata ₹300 extra.
          <br className="hidden sm:block" />
          Opens WhatsApp with your booking details. Our team confirms within minutes.
        </p>
      </form>
    </div>
  );
}
