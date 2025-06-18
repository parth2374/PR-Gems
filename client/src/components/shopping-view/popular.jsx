import { useEffect, useState } from "react";
import ShoppingProductTile from "./product-tile";

function ProductsListByOriginAndSort({
  certificate = "gjepc",
  sortBy = "price-lowtohigh",
  handleGetProductDetails,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cacheKey = `products_${certificate}_${sortBy}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheExpiry = 1000 * 60 * 10; // 10 minutes
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);
    const now = Date.now();

    const shouldUseCache = cachedData && cacheTime && now - cacheTime < cacheExpiry;

    if (shouldUseCache) {
      setProducts(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ certificate, sortBy });

    fetch(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const data = Array.isArray(json.data) ? json.data : [];
        setProducts(data);
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}_time`, now.toString());
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [certificate, sortBy]);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  // Determine how many products to show
  const visibleCount = certificate === "gii" ? 4 : 8;

  return (

      <div className="md:grid md:grid-cols-4 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-none flex [&::-webkit-scrollbar]:hidden">
        {products.slice(0, visibleCount).map((p) => (
          <div className="flex-shrink-0 md:flex-shrink">
            <ShoppingProductTile
              key={p._id}
              product={p}
              handleGetProductDetails={handleGetProductDetails}
            />
          </div>
        ))}
      </div>
  );
}

export default ProductsListByOriginAndSort;