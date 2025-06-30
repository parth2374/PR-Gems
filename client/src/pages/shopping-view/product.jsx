import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/store/shop/products-slice";
import React, { Fragment, useState } from "react";
import Newsletter from "@/components/shopping-view/newsletter";
import Service from "@/components/shopping-view/service";
import { Footer } from "@/components/shopping-view/footer";
import RelatedProducts from "@/components/shopping-view/relatedProducts";

const ProductPreviews = ({ previews }) => {
	// Normalize previews into an array of objects with type/src
	const items = useMemo(() => {
		if (Array.isArray(previews)) {
			return previews;
		}
		return [
			{ type: 'image', src: previews.frontSide },
			{ type: 'image', src: previews.backSide },
			{ type: 'video', src: previews.video, thumbnail: previews.thumbnail || previews.image },
			{ type: 'image', src: previews.image }
		];
	}, [previews]);

	const [selectedIdx, setSelectedIdx] = useState(0);
	const videoRef = useRef(null);
	const selected = items[selectedIdx] || items[0];

	const renderMain = () => {
		if (selected.type === "video") {
			return (
				<video
					ref={videoRef}
					src={selected.src}
					controls
					autoPlay
					className="max-h-[450px] w-full object-cover rounded-lg overflow-hidden m-2"
				/>
			);
		}

		return (
			<img
				src={selected.src}
				alt="Product Preview"
				className="max-h-[450px] w-full object-cover rounded-lg overflow-hidden m-2"
			/>
		);
	};

	const renderThumbnail = (preview, i) => {
		const isActive = i === selectedIdx;
		const baseClass = "m-2 rounded-lg overflow-hidden border-2";
		const activeClass = isActive ? "border-blue-500" : "border-transparent";

		if (preview.type === "video") {
			return (
				<li
					key={i}
					className={`${baseClass} ${activeClass}`}
					onClick={() => setSelectedIdx(i)}
				>
					<video
						muted
						src={preview.src}
						// poster={preview.thumbnail}
						className="max-h-[150px] w-auto object-cover cursor-pointer"
					/>
				</li>
			);
		}

		return (
			<li
				key={i}
				className={`${baseClass} ${activeClass}`}
				onClick={() => setSelectedIdx(i)}
			>
				<img
					src={preview.src}
					alt="Thumbnail"
					className="max-h-[150px] w-auto object-cover cursor-pointer"
				/>
			</li>
		);
	};

	return (
		<div className="lg:mr-6">
			<div className="text-center">
				{renderMain()}
			</div>

			<ul className="flex flex-nowrap">
				{items.map(renderThumbnail)}
			</ul>
		</div>
	);
};

const SizeVariant = () => {
	const [selectedSize, setSelectedSize] = useState("18L");

	const handleSizeChange = (value) => {
		setSelectedSize(value);
	};

	return (
		<div className="mb-6">
			{/* <h5 className="text-sm font-medium mb-2">
				Size:{" "}
				<span className="opacity-50">
					{selectedSize &&
						product.sizeVariants.find((size) => size.label === selectedSize)
							?.label}
				</span>
			</h5> */}
			<div className="flex gap-2 mb-2">
				{/* {product.sizeVariants.map((size, index) => (
					<React.Fragment key={size.label}>
						<input
							type="radio"
							className="sr-only"
							autoComplete="off"
							checked={selectedSize === size.value}
							onChange={() => handleSizeChange(size.value)}
						/> */}
				<label
					className={`cursor-pointer flex flex-col overflow-hidden text-start border-1 border-black dark:border-[#0b1727]
								"outline-1 outline-blue-600 dark:outline-blue-600"
							hover:outline-blue-600 px-6 py-4`}
				// onClick={() => handleSizeChange(size.value)}
				>
					<span className="opacity-75 mb-2">Being an exclusive and exceptional gemstone, the price of this <b>stone</b> may vary. The cost depends on the quality of the gem. Connect with our gemstone experts to know the exact value.</span>
				</label>
				{/* </React.Fragment>
				))} */}
			</div>
		</div>
	);
};

export default function ProductDetail() {



	const navigate = useNavigate();
	const [showDropdown, setShowDropdown] = useState(false);

	const [formData, setFormData] = useState({
		color: "Multi",
		size: "XL",
		qty: 1,
	});

	const setField = (e) => {
		const { name, value, type, checked } = e.target;

		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const { productId } = useParams();
	const dispatch = useDispatch();
	const { productDetails, isLoading } = useSelector(state => state.shopProducts);

	useEffect(() => {
		dispatch(fetchProductDetails(productId));
	}, [dispatch, productId]);

	console.log(productDetails, "productDetails")

	if (isLoading) return <div>Loading…</div>;
	if (!productDetails) return <div>Product not found</div>;



	const toggleDropdown = () => {
		setShowDropdown(prev => !prev);
	};

	const closeDropdown = () => {
		setShowDropdown(false);
	};

	function handleGetProductDetails(getCurrentProductId) {
		dispatch(fetchProductDetails(getCurrentProductId));
		navigate(`/shop/product/${getCurrentProductId}`);
	}

		const getDownloadUrl = (url, fileName = "download") => {
  if (!url || typeof url !== "string") return null;
  const parts = url.split("/upload/");
  return parts.length === 2
    ? `${parts[0]}/upload/fl_attachment:${fileName}/${parts[1]}`
    : url;
};

	// 	const firstPreviewUrl = productDetails?.video

	// 	const downloadUrl = getDownloadUrl(firstPreviewUrl);

	return (
		<section className="py-4 md:py-10 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-2 gap-6">
					<div className="col-span-2 lg:col-span-1">
						<ProductPreviews previews={productDetails} />
					</div>
					<div className="col-span-2 lg:col-span-1">
						<div className="mb-6 lg:mb-12">
							<h1 className="text-2xl leading-none md:text-4xl font-medium mb-4 archivo">
								{productDetails.title}
							</h1>
							<div className="opacity mb-6 archivo space-y-2 pt-2">
								<div className="border-b border-gray-200 pb-2 flex items-start gap-2">
									<span className="w-1.5 h-1.5 mt-2 bg-black inline-block rounded-sm"></span>
									<span><span className="font-[600]">SKU</span>: {productDetails.sku}</span>
								</div>
								<div className="border-b border-gray-200 pb-2 flex items-start gap-2">
									<span className="w-1.5 h-1.5 mt-2 bg-black inline-block rounded-sm"></span>
									<span><span className="font-[600]">Certificate</span>: {productDetails.certificate}</span>
								</div>
								<div className="border-b border-gray-200 pb-2 flex items-start gap-2">
									<span className="w-1.5 h-1.5 mt-2 bg-black inline-block rounded-sm"></span>
									<span><span className="font-[600]">Origin</span>: {productDetails.origin}</span>
								</div>
								<div className="border-b border-gray-200 pb-2 flex items-start gap-2">
									<span className="w-1.5 h-1.5 mt-2 bg-black inline-block rounded-sm"></span>
									<span><span className="font-[600]">Shape</span>: {productDetails.shape}</span>
								</div>
								<div className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 mt-2 bg-black inline-block rounded-sm"></span>
									<span><span className="font-[600]">Weight</span>: {productDetails.weight}</span>
								</div>
							</div>
						</div>

						<form action="#!">
							<div className="mb-6">
								<SizeVariant />
							</div>

							<div className="flex flex-wrap gap-3 items-center my-7">
								<button class="button-86" role="button">Contact Us For Pricing</button>
								<button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">

								</button>
								<button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">

								</button>
							</div>

							<div className="w-full lg:mr-56 xl:mr-80">
								<p className="text-2xl archivo text-center font-bold">Trusted by Leading Gemstone Buyers Worldwide</p>
								<p className="text-2xl mt-2 text-center text-yellow-400">★★★★★</p>
								{/* {downloadUrl && ( */}
								{/* <div className="absolute top-4 right-4 z-50">
									<div className="relative">
										<button
											onClick={toggleDropdown}
											className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition"
										>
											Download
										</button>

										{showDropdown && (
											<div className="absolute bg-white border rounded shadow mt-1 right-0 z-50">
												<a
													href={getDownloadUrl(productDetails?.image)}
													download
													onClick={closeDropdown}
													className="block px-4 py-2 hover:bg-gray-100 text-black"
												>
													Certificate
												</a>
												<a
													href={getDownloadUrl(productDetails?.video)}
													download
													onClick={closeDropdown}
													className="block px-4 py-2 hover:bg-gray-100 text-black"
												>
													Video
												</a>
												<a
													href={getDownloadUrl(productDetails?.frontSide)}
													download
													onClick={closeDropdown}
													className="block px-4 py-2 hover:bg-gray-100 text-black"
												>
													Front Side
												</a>
												<a
													href={getDownloadUrl(productDetails?.backSide)}
													download
													onClick={closeDropdown}
													className="block px-4 py-2 hover:bg-gray-100 text-black"
												>
													Back Side
												</a>
											</div>
										)}
									</div>
								</div> */}
								<a
  href={`${import.meta.env.VITE_API_URL}/api/download?url=${encodeURIComponent(productDetails?.video)}&name=video.mp4`}
  className="block px-4 py-2 hover:bg-gray-100 text-black"
>
  Video
</a>
								<a
  href={`${import.meta.env.VITE_API_URL}/api/download?url=${encodeURIComponent(productDetails?.image)}&name=certificate.jpg`}
  className="block px-4 py-2 hover:bg-gray-100 text-black"
>
  Certificate
</a>
								<a
  href={`${import.meta.env.VITE_API_URL}/api/download?url=${encodeURIComponent(productDetails?.frontSide)}&name=front.jpg`}
  className="block px-4 py-2 hover:bg-gray-100 text-black"
>
  Front Side
</a>
								<a
  href={`${import.meta.env.VITE_API_URL}/api/download?url=${encodeURIComponent(productDetails?.backSide)}&name=back.jpg`}
  className="block px-4 py-2 hover:bg-gray-100 text-black"
>
  Back Side
</a>
								{/* // )} */}
								<p className="font-medium mt-2 archivo text-center">BASED ON 200+ GOOGLE REVIEWS</p>

							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="mt-16">
				<div className="flex items-center justify-center my-10 gap-4">
					<hr className="hidden md:block lg:block w-1/5 border-t border-gray-300 dark:border-gray-600" />
					<h1 class="mb-4 ms-7 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Related <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Products</span></h1>
					<hr className="hidden md:block lg:block w-1/5 border-t border-gray-300 dark:border-gray-600" />
				</div>

				<RelatedProducts origin={productDetails.origin} handleGetProductDetails={handleGetProductDetails} />
			</div>

			<Newsletter />

			<Service />

			<Footer />

		</section>
	);
};
