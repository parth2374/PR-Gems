import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  pagination: { totalCount: 0, perPage: 15, currentPage: 1, totalPages: 0 },
  status: "idle",
  error: null,
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

// export const fetchAllProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async () => {
//     const result = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/admin/products/get`
//     );

//     return result?.data;
//   }
// );
export const fetchAllProducts = createAsyncThunk(
  "admin/products/fetchAll",
  async ({ page = 1, limit = 15 } = {}) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
      { params: { page, limit } }
    )
    return result.data
  }
)

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

export const toggleProductListing = createAsyncThunk(
  "/products/toggleListing",
  async ({ id, isListed }) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/toggle-listing/${id}`,
      { isListed }
    );
    return res.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data;
        state.pagination = action.payload?.pagination;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      });
  },
});

export default AdminProductsSlice.reducer;
