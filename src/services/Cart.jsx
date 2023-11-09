import call from "./Call";

const AddtoCart = async (data) => {
  let d = await call({
    path: "user/cart-store",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};

const RemovetoCart = async (data) => {
  let d = await call({
    path: "user/cart-remove",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};

const CartList = async (data) => {
  let d = await call({
    path: "user/cart-list",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};
const DealerCode = async (data) => {
  let d = await call({
    path: "apply-dealer-code",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};

const exportObject = { AddtoCart, RemovetoCart, CartList, DealerCode };

export default exportObject;
