import call from "./Call";

const slider = async () => {
  let d = await call({
    path: "slider",
    method: "GET",
  });
  return d;
};

const category = async () => {
  let d = await call({
    path: "parent-category",
    method: "GET",
  });
  return d;
};

const TopSelling = async () =>{
  let d = await call({
    path: "highest-selling-designs",
    method: "GET",
  });
  return d;
}

const RecentAdd = async () =>{
  let d = await call({
    path: "latest-designs",
    method: "GET",
  });
  return d;
}

const Featured = async () =>{
  let d = await call({
    path: "flash-design",
    method: "GET",
  });
  return d;
}

const exportObject = { slider,category,TopSelling,RecentAdd,Featured };

export default exportObject;
