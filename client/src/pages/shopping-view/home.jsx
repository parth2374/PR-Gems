import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  ArrowLeftCircle,
  ArrowRightCircle,
  BabyIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  MoveRight,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import ProductsListByOriginAndSort from "@/components/shopping-view/popular";
import Newsletter from "@/components/shopping-view/newsletter";
import Service from "@/components/shopping-view/service";
import { Footer } from "@/components/shopping-view/footer";
import ImageFooter from "@/components/shopping-view/imageFooter";

// const categoriesWithIcon = [
//   { id: "gia", label: "GIA", icon: ShirtIcon },
//   { id: "gii", label: "GII", icon: UmbrellaIcon },
//   { id: "gjepc", label: "GJEPC", icon: CloudLightning },
//   { id: "grs", label: "GRS", icon: BabyIcon },
//   { id: "igitl", label: "IGITL", icon: WatchIcon },
// ];
const categories = [
  {
    img: "https://cdn.shopaccino.com/jewellery/filter-images/cushion-1636427710_s.png",
    title: "Cushion",
    id: 'cushion',
    color: '#fff'
  },
  {
    img: "https://cdn.shopaccino.com/jewellery/filter-images/oval-737270791_s.png",
    title: "Oval",
    id: 'oval',
    color: '#FEEFEA'
  },
  {
    img: "https://cdn.shopaccino.com/jewellery/filter-images/heart-1679245788_s.png",
    title: "Heart",
    id: 'heart'
  },
  {
    img: "https://cdn.shopaccino.com/jewellery/filter-images/octagon-606017921_s.png",
    title: "Octagon",
    id: 'octagon',
    color: '#DEF3FF'
  },
  {
    img: "https://cdn.shopaccino.com/jewellery/filter-images/pear-86036560_s.png",
    title: "Pear",
    id: 'pear'
  },
  {
    img: "https://cdn.shopaccino.com/jewellery/filter-images/round-1688914715_s.png",
    title: "Round",
    id: 'round'
  }
];

const CategoryItem = ({ product }) => {

  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  return (
    <a href="#!">
      <div className="flex flex-col items-center justify-center">
        {/* <div className="w-34 h-34 flex justify-center items-center shadow-none hover:shadow-2xl rounded-full">
					<img
						src={product.img}
						className="rounded-full max-w-full max-h-full w-auto"
						alt="..."
					/>
				</div> */}
        <div
          className={`
    w-24 h-24
    md:w-28 md:h-28
    lg:w-34 lg:h-34
    flex justify-center items-center 
    shadow-none hover:shadow-md bg-[${product.color}] shadow-gray-500
    rounded-full 

    transform
    transition-transform
    duration-300
    hover:-translate-y-1
  `}
          onClick={() =>
            handleNavigateToListingPage(product, "shape")
          }
        >
          <img
            src={product.img}
            className="rounded-full max-w-full max-h-full w-auto"
            alt="…"
          />
        </div>

        <div className="p-2 md:p-2">
          <h2 className="text-lg font-bold leading-none my-2 oswald">
            {product.title}
          </h2>
        </div>
      </div>
    </a>
  );
};

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: Shirt },
//   { id: "adidas", label: "Adidas", icon: WashingMachine },
//   { id: "puma", label: "Puma", icon: ShoppingBasket },
//   { id: "levi", label: "Levi's", icon: Airplay },
//   { id: "zara", label: "Zara", icon: Images },
//   { id: "h&m", label: "H&M", icon: Heater },
// ];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const slideCount = featureImageList.length
  // const timeoutRef = useRef(null)

  // const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // const { user } = useSelector((state) => state.auth);

  const slides = [bannerOne, bannerTwo, bannerThree]

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`);
  }
  useEffect(() => {
    if (!slideCount) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setCurrentSlide((prev) => (prev + 1) % slideCount),
      5000
    );
    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide, slideCount]);

  // useEffect(() => {
  //   dispatch(
  //     fetchAllFilteredProducts({
  //       filterParams: {},
  //       sortParams: "price-lowtohigh",
  //     })
  //   );
  // }, [dispatch]);

  console.log(productList, "productListHome");

  // const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
  // const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount)

  let [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  let previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? featureImageList.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === featureImageList.length - 1 ? 0 : prev + 1
    );
  };

  // auto-advance every 5s
  useEffect(() => {
    // clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setCurrent((prev) =>
        prev === featureImageList.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    // cleanup on unmount or before next run
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, featureImageList.length]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "feature")

  return (
    <div className="flex flex-col min-h-screen">

      <div className="overflow-hidden relative">
        <div
          className={`flex transition ease-out duration-500`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {featureImageList.map((s, i) => {
            return <img src={s.image} />;
          })}
        </div>

        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
          <button onClick={() => {
            previousSlide();
            // reset timer immediately
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }} className="bg-[#F2F3F4] p-1 hidden md:block lg:block rounded-full text-black">
            <ChevronLeft />
          </button>
          <button onClick={() => {
            nextSlide();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }} className="bg-[#F2F3F4] hidden md:block lg:block p-1 rounded-full text-black">
            <ChevronRight />
          </button>
        </div>

        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
          {featureImageList.map((s, i) => {
            return (
              <div
                onClick={() => {
              setCurrent(i);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
                key={"circle" + i}
                className={`rounded-full w-5 h-5 cursor-pointer  ${i == current ? "bg-white" : "bg-gray-500"
                  }`}
              ></div>
            );
          })}
        </div>
      </div>
      {/* <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          // variant="outline"
          size="icon"
          // onClick={() =>
          //   setCurrentSlide(
          //     (prevSlide) =>
          //       (prevSlide - 1 + featureImageList.length) %
          //       featureImageList.length
          //   )
          // }
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          // variant="outline"
          size="icon"
          // onClick={() =>
          //   setCurrentSlide(
          //     (prevSlide) => (prevSlide + 1) % featureImageList.length
          //   )
          // }
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div> */}

      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by certificate
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "certificate")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      {/* <section className="ezy__epcategory3 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="container px-4 mx-auto">
				<div className="flex justify-center items-center text-center md:text-start">
					<h2 className="text-2xl leading-none md:text-[40px] font-bold mb-2 ml-3">
						Shop By Category
					</h2>
				</div>

				<div className="grid grid-cols-12 gap-6 text-center mt-6 md:mt-12">
					{categories.map((product, i) => (
						<div
							className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
							key={i}
						>
							<CategoryItem product={product} />
						</div>
					))}
				</div>
			</div>
		</section> */}
      <section className="ezy__epcategory3 light py-7 md:py-7 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-visible z-10">
        <div className="container mx-auto">
          <div className="flex justify-start items-center text-center md:text-start">
            <h2 className="leading-none text-xl md:text-[25px] font-bold mb-2 ml-3 oswald">
              Featured Shapes
            </h2>
          </div>
          <div
            className="
       flex flex-row flex-nowrap justify-evenly
        gap-0 md:gap-1 lg:gap-1 xl:gap-1 mt-4 md:mt-6
        overflow-x-auto overflow-y-hidden
        ps-2 pe-20 md:pe-10
        
   [&::-webkit-scrollbar]:hidden
   [scrollbar-width:none]
   [-ms-overflow-style:none]
     "
          >
            {categories.map((product, i) => (
              <div
                key={i}
                className="
           flex-shrink-0
            w-2/5 sm:w-1/4 md:w-1/6
         "
              >
                <CategoryItem product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-0">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-[1.5rem] md:text-[2rem] font-bold mb-7 text-center oswald">Featured Products</h2> */}
          <div className="flex items-center justify-center my-10 gap-4">
   <hr className="w-1/5 border-t border-gray-300 dark:border-gray-600" />
  <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white md:text-3xl lg:text-4xl whitespace-nowrap">
    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
      Featured
    </span> Products
  </h1>
   <hr className="w-1/5 border-t border-gray-300 dark:border-gray-600" />
</div>

          <div /* className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"*/>
            {/* {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))} */}
            <ProductsListByOriginAndSort
      certificate="gjepc"
      sortBy="price-lowtohigh"
      handleGetProductDetails={handleGetProductDetails}
    />
          </div>
        </div>
      </section>

      <ImageFooter />

      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center my-10 gap-4">
   <hr className="hidden md:block lg:block w-1/5 border-t border-gray-300 dark:border-gray-600" />
  <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Popular <mark class="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500">Products</mark></h1>
   <hr className="hidden md:block lg:block w-1/5 border-t border-gray-300 dark:border-gray-600" />
</div>
          <div /* className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"*/>
            {/* {productList && productList.length > 0
              ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                />
              ))
              : null} */}
              <ProductsListByOriginAndSort
      certificate="gii"
      sortBy="price-lowtohigh"
      handleGetProductDetails={handleGetProductDetails} />
          </div>
        </div>
      </section>
      {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}

      <Newsletter />

      <Service />

      <Footer />
    </div>
  );
}

export default ShoppingHome;
