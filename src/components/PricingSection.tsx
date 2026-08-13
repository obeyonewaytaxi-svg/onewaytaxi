// import { Link } from 'react-router-dom';
// import { CheckCircle2 } from 'lucide-react';
// import { cabs } from '../data/siteData';

// const pricingCars = cabs.slice(0, 4).map((cab) => ({
//   slug: cab.slug,
//   name: cab.title,
//   rate: cab.rate,
//   roundTripRate: cab.roundTripRate,
//   subtitle: cab.description,
//   image: cab.image,
//   details: cab.details,
// }));

// const PricingSection = () => (
//   <section id="pricing" className="mx-auto max-w-7xl px-5 py-section md:px-8">
//     <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">Pricing</p>
//           <h2 className="mt-3 font-heading text-display-xs md:text-display-sm text-slate-900">Transparent fares for every premium taxi ride.</h2>
//         </div>
//       </div>

//       <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {pricingCars.map((car) => (
//           <article
//             key={car.slug}
//             className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:shadow-card-hover"
//           >
//             <div className="overflow-hidden rounded-xl bg-slate-50">
//               <img src={car.image} alt={car.name} className="h-36 w-full object-contain" loading="lazy" />
//             </div>
//             <div className="mt-4 flex items-center justify-between gap-3">
//               <div>
//                 <h3 className="font-heading text-lg font-bold text-slate-900">{car.name}</h3>
//                 <p className="mt-0.5 text-xs text-brand-muted">{car.subtitle}</p>
//               </div>
//               <div className="shrink-0 space-y-1 rounded-xl border border-brand-secondary/20 bg-brand-secondary/10 px-3 py-2 text-right">
//                 <div>
//                   <p className="font-numbers text-sm font-bold leading-tight text-slate-900">₹{car.rate}/km</p>
//                   <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">One way</p>
//                 </div>
//                 <div className="border-t border-brand-secondary/20 pt-1">
//                   <p className="font-numbers text-sm font-bold leading-tight text-slate-900">₹{car.roundTripRate}/km</p>
//                   <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Round trip</p>
//                 </div>
//               </div>
//             </div>
//             <ul className="mt-4 space-y-2 text-sm text-brand-muted">
//               {car.details.map((detail) => (
//                 <li key={detail} className="flex items-center gap-2">
//                   <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary" />
//                   {detail}
//                 </li>
//               ))}
//             </ul>
//             <Link
//               to="/fare-calculator"
//               className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-slate-800"
//             >
//               Book Now
//             </Link>
//           </article>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default PricingSection;



import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { cabs } from "../data/siteData";
import { CarImage } from "./shared/CarImage";

const pricingCars = cabs.slice(0, 4).map((cab) => ({
  slug: cab.slug,
  name: cab.title,
  rate: cab.rate,
  roundTripRate: cab.roundTripRate,
  subtitle: cab.description,
  image: cab.image,
  details: cab.details,
}));

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="w-full bg-gradient-to-br from-slate-50 via-white to-yellow-50 py-24"
    >
      {/* Full Width Container */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-5 py-2 text-xs font-bold uppercase tracking-wider text-yellow-700">
            OBEY ONE WAY TAXI
          </span>

          <h2 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl xl:text-6xl">
            Affordable Pricing For Every Journey
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-500">
            Premium intercity taxi service with transparent pricing.
            No hidden charges. Book your One Way or Round Trip ride today.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            Rated 4.9★ by 1,820+ travellers
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {pricingCars.map((car, index) => (
            <article
              key={car.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_25px_60px_rgba(15,23,42,0.15)]"
            >
              {/* Badge */}
              {index === 0 && (
                <div className="absolute right-5 top-5 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black shadow">
                  ★ Popular
                </div>
              )}

              {/* Image */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-yellow-50 p-5">
                <CarImage
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  className="h-48 w-full object-contain transition duration-300 group-hover:scale-105"
                  width={300}
                  height={192}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
              </div>

              {/* Name */}
              <div className="mt-6">
                <h3 className="text-2xl font-black text-slate-900">
                  {car.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {car.subtitle}
                </p>
              </div>

              {/* Pricing */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 p-5 text-center shadow-lg">
                <div>
                  <p className="text-4xl font-black text-black">
                    ₹{car.rate}
                  </p>

                  <p className="text-xs font-bold uppercase tracking-wider text-black/70">
                    ONE WAY / KM
                  </p>
                </div>

                <div className="my-4 border-t border-black/20"></div>

                <div>
                  <p className="text-3xl font-black text-black">
                    ₹{car.roundTripRate}
                  </p>

                  <p className="text-xs font-bold uppercase tracking-wider text-black/70">
                    ROUND TRIP / KM
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="mt-6 flex-1 space-y-3">
                {car.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                to="/fare-calculator"
                className="mt-8 flex items-center justify-center rounded-2xl bg-slate-900 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:shadow-xl"
              >
                Book Now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;