import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/store/shop/products-slice";
import React, { Fragment, useState } from "react";
import Newsletter from "@/components/shopping-view/newsletter";
import Service from "@/components/shopping-view/service";
import { Footer } from "@/components/shopping-view/footer";
import RelatedProducts from "@/components/shopping-view/relatedProducts";
// import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";

const product = {
	title: "Bed Sheet Home Textile Modern",
	previews: [
		{
			previewUrl: "https://cdn.easyfrontend.com/pictures/products/bed1.jpg",
			thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bed1.jpg",
		},
		{
			previewUrl: "https://cdn.easyfrontend.com/pictures/products/bed3.jpg",
			thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bed3.jpg",
		},
		{
			previewUrl: "https://cdn.easyfrontend.com/pictures/products/bed2.jpg",
			thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bed2.jpg",
		},
	],
	rating: 5.0,
	rateCount: 3,
	price: 870.99,
	colorVariants: [
		{ bgcolor: "bg-yellow-500", value: "Multi" },
		{ bgcolor: "bg-blue-500", value: "Blue" },
		{ bgcolor: "bg-red-400", value: "Pink" },
		{ bgcolor: "bg-black", value: "Black" },
		{ bgcolor: "bg-red-600", value: "Red" },
	],
	sizeVariants: [
		{
			label: "18L",
			value: "18L",
			content: "Perfect fora a reasonable amount of snacks",
		},
		{
			label: "20L",
			value: "20L",
			content: "Perfect fora a reasonable amount of snacks",
		},
	],
};

// const ProductPreviews = ({ previews }) => {
// 	const [index, setIndex] = useState(0);

// 	return (
// 		<div className="lg:mr-6">
// 			<div className="text-center rounded-lg overflow-hidden m-2">
// 				<img
// 					src={previews.image}
// 					alt=""
// 					className="max-h-[450px] object-cover max-w-full w-full"
// 				/>
// 			</div>

// 			<ul className="flex flex-nowrap">
// 				{previews.map((preview, i) => (
// 					<li
// 						className="rounded-lg overflow-hidden m-2"
// 						key={i}
// 						onClick={() => setIndex(i)}
// 					>
// 						<a href="#!">
// 							<img
// 								src={preview.video}
// 								alt=""
// 								className="w-auto max-h-[150px] object-cover"
// 							/>
// 						</a>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };
const ProductPreviews = ({ previews }) => {
  // Normalize previews into an array of objects with type/src
  const items = useMemo(() => {
    if (Array.isArray(previews)) {
      return previews;
    }
    return [
      { type: 'image', src: previews.image },
      { type: 'video', src: previews.video, thumbnail: previews.thumbnail || previews.image }
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

// ProductPreviews.propTypes = {
// 	previews: PropTypes.array.isRequired,
// };

const ColorVariant = () => {
	const [selectedColor, setSelectedColor] = useState("Multi");

	const handleColorChange = (value) => {
		setSelectedColor(value);
	};

	return (
		<>
			<div className="mb-6">
				<h5 className="font-medium mb-2">
					Color:{" "}
					<span className="opacity-50">
						{selectedColor &&
							product.colorVariants.find(
								(color) => color.value === selectedColor
							)?.value}
					</span>
				</h5>
				<div className="flex flex-wrap gap-2 mb-2">
					{product.colorVariants.map((item, i) => (
						<Fragment key={i}>
							<input
								type="radio"
								className="absolute hidden"
								autoComplete="off"
								checked={selectedColor === item.value}
								onChange={() => handleColorChange(item.value)}
							/>
							<label
								className={`w-8 h-8 rounded-full ${
									item.bgcolor
								} border-2 border-white dark:border-[#0b1727] cursor-pointer mt-1 hover:outline hover:outline-1 hover:outline-${
									item.color
								} ${
									selectedColor === item.value &&
									`outline outline-1 outline-${item.color}`
								}`}
								onClick={() => handleColorChange(item.value)}
							></label>
						</Fragment>
					))}
				</div>
			</div>
		</>
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

const QtyField = ({ name, value, onChange }) => {
	const qtyControl = (qty) =>
		onChange({
			target: {
				name,
				type: "radio",
				value: qty < 1 ? 1 : qty,
			},
		});

	return (
		<div className="flex h-11 w-24 mb-4">
			<input
				className="w-2/3 pl-2 text-center bg-gray-100 dark:bg-slate-800 focus:outline-none rounded-lg overflow-hidden font-bold text-lg"
				type="number"
				placeholder=""
				value={value}
				onChange={(e) => qtyControl(e.target.value)}
			/>
			<div className="w-1/3 rounded-lg overflow-hidden flex flex-col bg-gray-100 dark:bg-slate-800 p-0">
				<button
					className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg"
					type="button"
					onClick={() => qtyControl(parseInt(value) - 1)}
				>
					-
				</button>
				<button
					className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg"
					type="button"
					onClick={() => qtyControl(parseInt(value) + 1)}
				>
					+
				</button>
			</div>
		</div>
	);
};

// QtyField.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	onChange: PropTypes.func.isRequired,
// 	value: PropTypes.any,
// };

export default function ProductDetail() {

	const navigate = useNavigate();

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

	function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`);
  }

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


							{/* <h3 className="text-2xl text-blue-600 font-medium -mt-3">
								{" "}
								{product.price.toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}
							</h3> */}
						</div>

						<form action="#!">
							{/* <div className="mb-6">
								<ColorVariant />
							</div> */}
							<div className="mb-6">
								<SizeVariant />
							</div>
							{/* <div className="mb-6">
								<h5 className="font-medium mb-2">QTY</h5>
								<QtyField onChange={setField} name="qty" value={formData.qty} />
							</div> */}

							<div className="flex flex-wrap gap-3 items-center my-7">
								<button class="button-86" role="button">Contact Us For Pricing</button>
								{/* <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 h-10 md:px-12 min-w-[202px]">
									Add To Cart
								</button> */}
								<button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
									{/* <FontAwesomeIcon icon={faHeart} /> */}
								</button>
								<button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
									{/* <FontAwesomeIcon icon={faShareAlt} className="mr-1 text-sm" /> */}
								</button>
							</div>

							<div className="w-full lg:mr-56 xl:mr-80">
								<p className="text-2xl archivo text-center font-bold">Trusted by Leading Gemstone Buyers Worldwide</p>
								<p className="text-2xl mt-2 text-center text-yellow-400">★★★★★</p>
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


// export default function ProductDetail() {
//   const { productId } = useParams();
//   const dispatch = useDispatch();
//   const { productDetails, isLoading } = useSelector(state => state.shopProducts);

//   useEffect(() => {
//     dispatch(fetchProductDetails(productId));
//   }, [dispatch, productId]);

//   if (isLoading) return <div>Loading…</div>;
//   if (!productDetails) return <div>Product not found</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{productDetails.title}</h1>
//       <video src={productDetails.video} alt={productDetails.title} className="max-w-xs mt-6" autoPlay loop muted />
//       <img src={productDetails.image} alt={productDetails.title} className="max-w-xs"/>
//       <p>Price: ${productDetails.price}</p>
//       <p>Weight: {productDetails.weight}g</p>
//       <p>SKU: {productDetails.sku}</p>
//       <p>Origin: {productDetails.origin}</p>
//       <p>Shape: {productDetails.shape}</p>
//     </div>
//   );
// }