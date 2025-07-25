import ProductFilter from "@/components/shopping-view/filter";
import { Footer } from "@/components/shopping-view/footer";
import Newsletter from "@/components/shopping-view/newsletter";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import Service from "@/components/shopping-view/service";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Lottie from "lottie-react";
import loadingAnim from './../../assets/Loading sand clock.json'
import { sortOptions } from "@/config";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    // Initial call in case width changes after mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails, pagination, isLoading } = useSelector(
    (state) => state.shopProducts
  );

  // const [percent, setPercent] = useState(0);
  // const [showLoader, setShowLoader] = useState(false);

  // // Kick off live percent when loading starts
  // useEffect(() => {
  //   if (!isLoading) return;
  //   setShowLoader(true);
  //   setPercent(0);
  //   const id = setInterval(() => {
  //     setPercent(p => Math.min(90, p + Math.random()*10));
  //   }, 200);
  //   return () => clearInterval(id);
  // }, [isLoading]);

  // // Finish loader when loading ends
  // useEffect(() => {
  //   if (isLoading) return;
  //   setPercent(100);
  //   const t = setTimeout(() => setShowLoader(false), 300);
  //   return () => clearTimeout(t);
  // }, [isLoading]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const CACHE_DURATION = 1000 * 60 * 60 * 6;

  const windowWidth = useWindowWidth();

  // const { cartItems } = useSelector((state) => state.shopCart);
  // const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  // const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // const { toast } = useToast();
  const navigate = useNavigate();

  const originSearchParam = searchParams.get("origin");

  // When window resizes, auto-show filters on large screens, hide on small
  useEffect(() => {
    if (windowWidth >= 768) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [windowWidth]);

  function handleRangeFilter(key, min, max) {
    // setFilters(f => ({
    //   ...f,
    //   [key]: { min: min ? Number(min) : null, max: max ? Number(max) : null },
    // }));

    const next = { ...filters, [key]: { min, max } };
  console.log("next filters:", next);
  setFilters(next);
  }

  function handleSort(value) {
    setSort(value);
  }

  // function handleFilter(getSectionId, getCurrentOption) {
  //   let cpyFilters = { ...filters };
  //   const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

  //   if (indexOfCurrentSection === -1) {
  //     cpyFilters = {
  //       ...cpyFilters,
  //       [getSectionId]: [getCurrentOption],
  //     };
  //   } else {
  //     const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

  //     if (indexOfCurrentOption === -1)
  //       cpyFilters[getSectionId].push(getCurrentOption);
  //     else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
  //   }

  //   setFilters(cpyFilters);
  //   sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  // }
  function handleFilter(category, ids, clearAll = false) {
  setFilters((prev) => {
    const nextFilters = { ...prev };

    let newSet;
    if (Array.isArray(ids)) {
      // If we get an array, *always* select exactly those IDs
      newSet = new Set(ids);
    } else {
      // Single ID toggle or clearAll
      newSet = new Set(nextFilters[category] || []);
      if (clearAll) {
        newSet.clear();
      } else {
        if (newSet.has(ids)) newSet.delete(ids);
        else newSet.add(ids);
      }
    }

    nextFilters[category] = Array.from(newSet);
    sessionStorage.setItem("filters", JSON.stringify(nextFilters));
    return nextFilters;
  });
}

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`);
  }

  // function handleAddtoCart(getCurrentProductId, getTotalStock) {
  //   console.log(cartItems);
  //   let getCartItems = cartItems.items || [];

  //   if (getCartItems.length) {
  //     const indexOfCurrentItem = getCartItems.findIndex(
  //       (item) => item.productId === getCurrentProductId
  //     );
  //     if (indexOfCurrentItem > -1) {
  //       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
  //       if (getQuantity + 1 > getTotalStock) {
  //         toast({
  //           title: Only ${getQuantity} quantity can be added for this item,
  //           variant: "destructive",
  //         });

  //         return;
  //       }
  //     }
  //   }

  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 1,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Product is added to cart",
  //       });
  //     }
  //   });
  // }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [originSearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);
const memoizedSort = useMemo(() => sort, [JSON.stringify(sort)]);
  // useEffect(() => {
  //   if (filters !== null && sort !== null)
  //     dispatch(
  //       fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
  //     );
  // }, [dispatch, sort, filters]);
//   useEffect(() => {
//   if (memoizedFilters && memoizedSort) {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: memoizedFilters,
//         sortParams: memoizedSort,
//       })
//     );
//   }
// }, [dispatch, memoizedFilters, memoizedSort]);
  // whenever filters, sort or page changes, fetch that page
  useEffect(() => {
    if (memoizedFilters && memoizedSort) {
      dispatch(fetchAllFilteredProducts({
        filterParams: memoizedFilters,
        sortParams: memoizedSort,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }));
    }
  }, [dispatch, memoizedFilters, memoizedSort, currentPage]);

  // And your effect to sync query‐string:
  useEffect(() => {
    if (filters && Object.keys(filters).length) {
      const params = new URLSearchParams();

      for (const [key, val] of Object.entries(filters)) {
        if (Array.isArray(val)) {
          if (val.length) params.set(key, val.join(","));
        } else if (val && typeof val === "object") {
          if (val.min != null) params.set(`min${capitalize(key)}`, val.min);
          if (val.max != null) params.set(`max${capitalize(key)}`, val.max);
        }
      }

      params.set("sortBy", sort);
      setSearchParams(params);
    }
  }, [filters, sort]);

  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

  // useEffect(() => {
  //   if (productDetails !== null) setOpenDetailsDialog(true);
  // }, [productDetails]);

  console.log(productDetails, "productDetails");
  
  useEffect(() => {
    // Compose cache key based on filters & sort so cache updates per different query
    const cacheKey = `productsCache_${JSON.stringify(filters)}_${sort}`;
    const cacheTimeKey = `${cacheKey}_time`;

    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheTimeKey);
    const now = Date.now();

    if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
      // If cache is valid, dispatch action to set products from cached data
      // Assuming you have an action to directly set productList in redux, or you can use local state instead
      dispatch({ type: 'shopProducts/setProductList', payload: JSON.parse(cachedData) });
    } else {
      // Fetch fresh products and cache them
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      ).then((action) => {
        if (action.payload && action.payload.data) {
          localStorage.setItem(cacheKey, JSON.stringify(action.payload.data));
          localStorage.setItem(cacheTimeKey, now.toString());
        }
      });
    }
  }, [dispatch, filters, sort]);

  return (
    // <div>
    //   <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 -mt-7">
    //   <ProductFilter filters={filters} handleFilter={handleFilter} handleRangeFilter={handleRangeFilter} />
    //   <div className="bg-background w-full rounded-lg shadow-sm">
    //     <div className="p-4 border-b flex items-center justify-between">
    //       <h2 className="text-lg font-extrabold">All Products</h2>
    //       <div className="flex items-center gap-3">
    //         <span className="text-muted-foreground">
    //           {productList?.length} Products
    //         </span>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button
    //               size="sm"
    //               className="flex items-center gap-1"
    //             >
    //               <ArrowUpDownIcon className="h-4 w-4" />
    //               <span>Sort by</span>
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end" className="w-[200px]">
    //             <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
    //               {sortOptions.map((sortItem) => (
    //                 <DropdownMenuRadioItem
    //                   value={sortItem.id}
    //                   key={sortItem.id}
    //                 >
    //                   {sortItem.label}
    //                 </DropdownMenuRadioItem>
    //               ))}
    //             </DropdownMenuRadioGroup>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    //       {productList && productList.length > 0
    //         ? productList.map((productItem) => (
    //             <ShoppingProductTile
    //               handleGetProductDetails={handleGetProductDetails}
    //               product={productItem}
    //             />
    //           ))
    //         : null}
    //     </div>
    //   </div>

    // </div>

    //   <Newsletter />

    //   <Service />

    //   <Footer />
    //   </div>
    <div>
      <div className="p-4 md:p-6 -mt-7">
        {/* Button to toggle filters on small screens */}
        {windowWidth < 768 && (
        <div className="md:hidden mb-4">
          <button role="button" onClick={() => setShowFilters((prev) => !prev)} className="w-full button-54 mt-8">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          {/* Conditionally render filters: always show on md+; show only if toggled on small screens */}
          {(showFilters || window.innerWidth >= 768) && (
            <ProductFilter
              filters={filters}
              handleFilter={handleFilter}
              handleRangeFilter={handleRangeFilter}
            />
          )}

          <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-extrabold">All Products</h2>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  {productList?.length} Products
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="flex items-center gap-1">
                      <ArrowUpDownIcon className="h-4 w-4" />
                      <span>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                      {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={loadingAnim} loop />
                  </div>
                  <div className="mt-2 text-lg font-medium">Loading products...</div>
                </div>
              ) : null}
              {productList && productList.length > 0
                ? productList.map((productItem) => (
                    <ShoppingProductTile
                      key={productItem.id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* pagination controls */}
      {pagination && !isLoading && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span>Page {currentPage} of {pagination.pages}</span>

          <button
            onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
            disabled={currentPage === pagination.pages}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      </div>

      <Newsletter />
      <Service />
      <Footer />
    </div>
  );
}

export default React.memo(ShoppingListing);
