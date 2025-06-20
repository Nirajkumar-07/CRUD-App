import axios from "axios";

export async function getProductList() {
  try {
    const res = await axios.get("https://dummyjson.com/products");

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}

export async function createProduct(prevState, formData) {
  const body = {
    title: formData.get("name"),
    category: formData.get("category"),
    rating: formData.get("rating"),
    price: formData.get("amount"),
  };

  try {
    const res = await axios.post("https://dummyjson.com/products/add", body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("create =>", res);

    return {
      success: true,
      data: res.data,
      message: "successfull",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "failed...",
    };
  }
}

export async function updateProduct(prevState, formData) {
  const body = {
    title: formData.get("name"),
    category: formData.get("category"),
    rating: formData.get("rating"),
    price: formData.get("amount"),
  };

  try {
    const res = await axios.put(
      `https://dummyjson.com/products/${formData.get("productId")}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("update =>", res);

    return {
      success: true,
      data: res.data,
      message: "successfull",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "failed...",
    };
  }
  // fetch('https://dummyjson.com/products/1', {
  //   method: 'PUT', /* or PATCH */
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     title: 'iPhone Galaxy +1'
  //   })
  // })
  // .then(res => res.json())
  // .then(console.log);
}

export async function deleteProduct(productId) {
  console.log("productId =>", productId);
  try {
    const res = await axios.delete(
      `https://dummyjson.com/products/${productId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("delete =>", res);

    if (res.status === 200) {
      return {
        success: true,
        message: "successfull",
      };
    } else {
      return {
        success: false,
        message: "failed...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "failed...",
    };
  }
  //   fetch('https://dummyjson.com/products/1', {
  //   method: 'DELETE',
  // })
  // .then(res => res.json())
  // .then(console.log);
}
