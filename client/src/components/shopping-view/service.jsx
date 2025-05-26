import React from "react";

const Service = () => {
  return (
    <section className="pb-12 pt-3 md:pb-12 md:pt-3 lg:pb-7 lg:pt-3">
      <div className="container mx-auto">
        {/* <div className="-mx-4 flex flex-wrap"> */}
        <div className="ms-4 md:-ms-4 lg:ms-4 xl:-ms-4 flex flex-nowrap overflow-x-auto md:flex-nowrap [&::-webkit-scrollbar]:hidden scrollbar-none xl:flex-nowrap">
          <ServiceCard
            title="Certified Quality Gems"
            details="All stones come with verified lab reports"
            icon={
              <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-1.5b1776e2a1d7ec897722f605a8118984.svg" />
            }
          />
          <ServiceCard
            title="Consistent Supply Chain"
            details="Guaranteed availability for high-volume orders"
            icon={
              <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-2.622b96aa8375916171721496261f6986.svg" />
            }
          />
          <ServiceCard
            title="Global Experience"
            details="Efficient documentation worldwide"
            icon={
              <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-3.a41b48d5c6678b96129a842057548c86.svg" />
            }
          />
          <ServiceCard
            title="Dedicated Managers"
            details="Single point of contact for all your needs"
            icon={
              <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-4.84d7a8a08622e302a2d50459d2cddb62.svg" />
            }
          />
          <ServiceCard
            title="Real-Time Inventory"
            details="Updated listings for faster decision-making"
            icon={
              <img className="h-10 w-10" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-5.e85986742a6c5c3748db8c239b11dd57.svg" />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Service;

const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      {/* <div className="w-full px-4 md:w-1/2 lg:w-1/3"> */}
      <div className="flex-shrink-0 w-[16rem] px-1 md:w-[16rem] lg:w-[16rem]">
        <div className="flex rounded-[20px] bg-[#F4F6FA] md:px-1 xl:px-1 p-6 gap-5">
          <div className="flex items-center justify-center rounded-2xl ps-0 md:ps-3 lg:ps-3">
            {icon}
          </div>
          <div>
            <h4 className="mb-[4px] text-md font-semibold text-dark dark:text-white truncate">
            {title}
          </h4>
          <p className="text-[#A9A9AB] dark:text-dark-6 line-clamp-2">{details}</p>
          </div>
        </div>
      </div>
    </>
  );
};