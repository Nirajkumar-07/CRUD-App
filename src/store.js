import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/product/product";

export default configureStore({
  reducer: {
    product: productReducer,
  },
});
