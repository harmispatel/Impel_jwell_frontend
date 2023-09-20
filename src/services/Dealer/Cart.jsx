import call from "../Call";

const AddtoCart = async (data) => {
    let d = await call({
      path: "dealer/cart-store",
      method: "POST",
      enctype:"multipart/form-data",
      data,
    });
    return d;
};

const RemovetoCart = async (data) => {
  let d = await call({
    path: "dealer/cart-remove",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const CartList = async (data) => {
    let d = await call({
      path: "dealer/cart-list",
      method: "POST",
      enctype:"multipart/form-data",
      data,
    });
    return d;
};

const PlaceOrder = async (data) => {
  let d = await call({
    path: "dealer/order-store",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const OrderList = async (data) => {
  let d = await call({
    path: "dealer/order-list",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
};

const exportObject = { OrderList,PlaceOrder,AddtoCart,RemovetoCart,CartList };

export default exportObject;
