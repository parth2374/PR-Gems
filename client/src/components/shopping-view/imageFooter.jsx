import React from "react";

const ImageFooter = () => {
	return (
		<section className="pb-5 pt-10 md:pb-7 md:pt-10 lg:pb-7 lg:pt-10">
			<div className="container mx-auto">
				{/* <div className="-mx-4 flex flex-wrap"> */}
				<div className="ms-4 md:-ms-4 lg:ms-4 xl:-ms-4 flex flex-nowrap overflow-x-auto md:flex-nowrap [&::-webkit-scrollbar]:hidden scrollbar-none xl:flex-nowrap">
					<ServiceCard
						title="Best prices & offers"
						details="Orders $50 or more"
						icon={
							<img className="h-full w-full rounded-2xl transition-transform duration-500 transform hover:scale-110" src="https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg" />
						}
					/>
					<ServiceCard
						title="Free delivery"
						details="Orders $50 or more"
						icon={
							<img className="h-full w-full rounded-2xl transition-transform duration-500 transform hover:scale-110" src="https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg" />
						}
					/>
					<ServiceCard
						title="Great daily deal"
						details="Orders $50 or more"
						icon={
							<img className="h-full w-full rounded-2xl transition-transform duration-500 transform hover:scale-110" src="https://api.spicezgold.com/download/file_1734525620831_NewProject(3).jpg" />
						}
					/>
					<ServiceCard
						title="Wide assortment"
						details="Orders $50 or more"
						icon={
							<img className="h-full w-full rounded-2xl transition-transform duration-500 transform hover:scale-110" src="https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg" />
						}
					/>
				</div>
			</div>
		</section>
	);
};

export default ImageFooter;

const ServiceCard = ({ icon, title, details }) => {
	return (
		<>
			{/* <div className="w-full px-4 md:w-1/2 lg:w-1/3"> */}
			<div className="flex-shrink-0 px-1 w-[12rem] md:w-[14rem] lg:w-[20rem] items-center justify-center">
				<div className="rounded-2xl bg-[#F4F6FA] overflow-hidden">
					{/* <div className="flex items-center justify-center rounded-2xl ps-0 md:ps-3 lg:ps-3">
						{icon}
					</div>
					<div>
						<h4 className="mb-[4px] text-md font-semibold text-dark dark:text-white">
						{title}
					</h4>
					<p className="text-[#A9A9AB] dark:text-dark-6">{details}</p>
					</div> */}
					{icon}
				</div>
			</div>
		</>
	);
};