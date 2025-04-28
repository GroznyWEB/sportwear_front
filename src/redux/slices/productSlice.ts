// // src/store/productsSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Начальное состояние
// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// // Асинхронный экшен для загрузки товаров
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (_, thunkAPI) => {
//     try {
//       const res = await fetch("http://localhost:4000/product");
//       const data = await res.json();
//       return data;
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// // Слайс
// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default productsSlice.reducer;
