import React, { useEffect } from "react";
import Header from "../../components/header";
import AuthWrapper from "../../components/auth-wrapper";
import { getProductList } from "../../actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import { fetchList, selectList } from "../../feature/product/product";
import ProductList from "../../components/product-list";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await getProductList();
      if (res.success) dispatch(fetchList(res.data.products));
    })();
  }, []);
  return (
    <AuthWrapper>
      <div className="w-full grid gap-4">
        <Header></Header>
        <ProductList />
      </div>
    </AuthWrapper>
  );
}

export default Home;
