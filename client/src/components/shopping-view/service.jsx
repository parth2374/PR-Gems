// import React from "react";

// const Service = () => {
//   return (
//     <section className="pb-12 w-full pt-3 md:pb-12 md:pt-3 lg:pb-7 lg:pt-3">
//       <div className="container">
//         {/* <div className="-mx-4 flex flex-wrap"> */}
//         <div className="ms-4 md:-ms-4 lg:ms-4 xl:-ms-4 flex flex-nowrap overflow-x-auto md:flex-nowrap [&::-webkit-scrollbar]:hidden scrollbar-none xl:flex-nowrap">
//         {/* <div className="ms-4 md:ms-0 lg:ms-0 xl:ms-0 flex flex-wrap md:flex-nowrap overflow-x-auto md:overflow-x-visible [&::-webkit-scrollbar]:hidden scrollbar-none"> */}
//           <ServiceCard
//             title="Certified Quality Gems"
//             details="All stones come with verified lab reports"
//             icon={
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-1.5b1776e2a1d7ec897722f605a8118984.svg" />
//             }
//           />
//           <ServiceCard
//             title="Consistent Supply Chain"
//             details="Guaranteed availability for high-volume orders"
//             icon={
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-2.622b96aa8375916171721496261f6986.svg" />
//             }
//           />
//           <ServiceCard
//             title="Global Experience"
//             details="Efficient documentation worldwide"
//             icon={
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-3.a41b48d5c6678b96129a842057548c86.svg" />
//             }
//           />
//           <ServiceCard
//             title="Dedicated Managers"
//             details="Single point of contact for all your needs"
//             icon={
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-4.84d7a8a08622e302a2d50459d2cddb62.svg" />
//             }
//           />
//           <ServiceCard
//             title="Real-Time Inventory"
//             details="Updated listings for faster decision-making"
//             icon={
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-5.e85986742a6c5c3748db8c239b11dd57.svg" />
//             }
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Service;

// const ServiceCard = ({ icon, title, details }) => {
//   return (
//     <>
//       {/* <div className="w-full px-4 md:w-1/2 lg:w-1/3"> */}
//       <div className="flex-shrink-0 min-w-fit px-1 md:px-1 lg:px-1">
//         <div className="flex rounded-[20px] bg-[#F4F6FA] md:px-1 xl:px-1 p-6 gap-5">
//           <div className="flex items-center justify-center rounded-2xl ps-0 md:ps-3 lg:ps-3">
//             {icon}
//           </div>
//           <div>
//             <h4 className="mb-[4px] text-md font-semibold text-dark truncate">
//             {title}
//           </h4>
//           <p className="text-[#A9A9AB] line-clamp-2">{details}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// import React from "react";

// const Service = () => {
//   return (
//     <section class="bg-white">
//       <div class="pb-8 px-4 mx-auto max-w-screen-xl sm:pb-16 lg:px-6">
//         <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
//           <div>
//             <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-1.5b1776e2a1d7ec897722f605a8118984.svg" />
//             </div>
//             <h3 class="mb-2 text-xl font-bold">Certified Quality Gems</h3>
//             <p class="text-gray-500">All stones come with certified lab reports so you can buy with confidence and trust the authenticity of every gemstone we offer.</p>
//           </div>
//           <div>
//             <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-2.622b96aa8375916171721496261f6986.svg" />
//             </div>
//             <h3 class="mb-2 text-xl font-bold">Consistent Supply Chain</h3>
//             <p class="text-gray-500">Guaranteed availability even for high-volume orders, ensuring you never face delays or shortages when sourcing premium gemstones.</p>
//           </div>
//           <div>
//             <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-3.a41b48d5c6678b96129a842057548c86.svg" />
//             </div>
//             <h3 class="mb-2 text-xl font-bold">Global Experience</h3>
//             <p class="text-gray-500">Experience hassle-free global trade with our efficient documentation services, ensuring smooth processing and delivery across international borders.</p>
//           </div>
//           <div>
//             <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-4.84d7a8a08622e302a2d50459d2cddb62.svg" />
//             </div>
//             <h3 class="mb-2 text-xl font-bold">Dedicated Managers</h3>
//             <p class="text-gray-500">Enjoy seamless communication and support with a dedicated manager—your single point of contact for every stage of the process.</p>
//           </div>
//           <div>
//             <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
//               <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-5.e85986742a6c5c3748db8c239b11dd57.svg" />
//             </div>
//             <h3 class="mb-2 text-xl font-bold">Real-Time Inventory</h3>
//             <p class="text-gray-500">Make quicker, smarter choices with real-time inventory updates and always stay ahead with the latest available listings.</p>
//           </div>
//           <div>
//             <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 className="w-10 h-10"
//               >
//                 <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.8" />

//                 <path
//                   d="M12 6v1.5M12 16.5V18M6 12H7.5M16.5 12H18M8.22 8.22l1.06 1.06M14.72 14.72l1.06 1.06M8.22 15.78l1.06-1.06M14.72 9.28l1.06-1.06"
//                   stroke="#facc15"
//                   strokeWidth="1.6"
//                   strokeLinecap="round"
//                 />

//                 <path
//                   d="M12 12l3 1"
//                   stroke="#22c55e"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>

//             </div>
//             <h3 class="mb-2 text-xl font-bold">Operations</h3>
//             <p class="text-gray-500">Seamless operations management that aligns logistics, communication, and execution to deliver consistent results across your entire business workflow.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )

// };

// export default Service

import React from "react";

const services = [
  {
    title: "Certified Quality Gems",
    description:
      "All stones come with certified lab reports so you can buy with confidence and trust the authenticity of every gemstone we offer.",
    icon: "https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-1.5b1776e2a1d7ec897722f605a8118984.svg",
  },
  {
    title: "Consistent Supply Chain",
    description:
      "Guaranteed availability even for high-volume orders, ensuring you never face delays or shortages when sourcing premium gemstones.",
    icon: "https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-2.622b96aa8375916171721496261f6986.svg",
  },
  {
    title: "Global Experience",
    description:
      "Experience hassle-free global trade with our efficient documentation services, ensuring smooth processing and delivery across international borders.",
    icon: "https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-3.a41b48d5c6678b96129a842057548c86.svg",
  },
  {
    title: "Dedicated Managers",
    description:
      "Enjoy seamless communication and support with a dedicated manager—your single point of contact for every stage of the process.",
    icon: "https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-4.84d7a8a08622e302a2d50459d2cddb62.svg",
  },
  {
    title: "Real-Time Inventory",
    description:
      "Make quicker, smarter choices with real-time inventory updates and always stay ahead with the latest available listings.",
    icon: "https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-5.e85986742a6c5c3748db8c239b11dd57.svg",
  },
  {
    title: "Operations",
    description:
      "Seamless operations management that aligns logistics, communication, and execution to deliver consistent results across your entire business workflow.",
    icon: "custom",
  },
];

const Service = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-gray-100 shadow-md hover:-translate-y-2 transform transition duration-300 bg-gradient-to-b from-blue-50 to-white"
            >
              <div className="flex justify-center items-center mb-4 w-14 h-14 rounded-full bg-blue-100 shadow-inner">
                {service.icon === "custom" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#22c55e"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 6v1.5M12 16.5V18M6 12H7.5M16.5 12H18M8.22 8.22l1.06 1.06M14.72 14.72l1.06 1.06M8.22 15.78l1.06-1.06M14.72 9.28l1.06-1.06"
                      stroke="#facc15"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12l3 1"
                      stroke="#22c55e"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-10 h-10"
                  />
                )}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
