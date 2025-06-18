import { useEffect, useRef, useState } from "react";
import ShoppingProductTile from "./product-tile";
import { ChevronLeft, ChevronRight } from "lucide-react";

function RelatedProducts({ origin, handleGetProductDetails }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
	const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!origin) return;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      origin,
      sortBy: "price-lowtohigh",
    });

    fetch(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setProducts(Array.isArray(json.data) ? json.data.slice(0, 7) : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load related products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [origin]);

	const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  if (!origin) return null;
  if (loading) return <p>Loading related products…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0) return <p>No related products found.</p>;

  return (
		<div className="relative">
      {/* Arrows only on large screens */}
      <button
        onClick={() => scroll("left")}
        className="hidden lg:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10"
      >
        <ChevronLeft />
      </button>

    <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 scrollbar-hide [&::-webkit-scrollbar]:hidden px-2">
      {products.slice(0, 7).map((product) => (
				<div key={product._id} className="flex-shrink-0">
        <ShoppingProductTile
          product={product}
          handleGetProductDetails={handleGetProductDetails}
        />
				</div>
      ))}
    </div>

		<button
        onClick={() => scroll("right")}
        className="hidden lg:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default RelatedProducts;