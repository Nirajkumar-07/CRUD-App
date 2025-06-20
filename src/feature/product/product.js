import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchList: (state, action) => {
      state.products = action.payload;
    },
    createStateProduct: (state, action) => {
      console.log("payload =>", action.payload);
      state.products.push(action.payload);
    },
    updateStateProduct: (state, action) => {
      const foundIndex = state.products
        .map((product) => product.id)
        .indexOf(action.payload.id);
      if (foundIndex !== -1) {
        state.products[foundIndex] = action.payload;
      }
    },
    deleteStateProduct: (state, action) => {
      const foundIndex = state.products
        .map((product) => product.id)
        .indexOf(action.payload);
      if (foundIndex !== -1) {
        state.products.splice(foundIndex, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchList,
  createStateProduct,
  updateStateProduct,
  deleteStateProduct,
} = productSlice.actions;
export const selectList = (state) => state.product.products;

export default productSlice.reducer;
