import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
    limit: 16,
  },
};

// at top of slice
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

// export const fetchAllFilteredProducts = createAsyncThunk(
  // "/products/fetchAllProducts",
  // async ({ filterParams, sortParams }) => {
    export const fetchAllFilteredProducts = createAsyncThunk(
  "shoppingProducts/fetchAllFilteredProducts",
  async ({
    filterParams,
    sortParams,
    page = 1,
    limit = 16,
  }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    console.log(filterParams, "FilterParamsAaja")

    const params = new URLSearchParams();

    // const query = new URLSearchParams({
    //   ...filterParams,
    //   sortBy: sortParams,
    // });
    Object.entries(filterParams).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        if (val.length) params.set(key, val.join(","));
      } else if (val && typeof val === "object") {
        if (val.min != null) params.set(`min${capitalize(key)}`, val.min);
        if (val.max != null) params.set(`max${capitalize(key)}`, val.max);
      }
    });
    params.set("sortBy", sortParams);
    params.set("page",  String(page));
    params.set("limit", String(limit));

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${params}`
    );

    console.log(params, "params");

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    // setProductDetails: (state) => {
    //   state.productDetails = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
         state.pagination  = action.payload.pagination;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

// export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
