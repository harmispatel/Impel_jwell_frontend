import call from "../Call";

const collectionData = async (data) => {
    let d = await call({
      path: "add-remove-collection-design",
      method: "POST",
      enctype:"multipart/form-data",
      data,
    });
    return d;
};

const ListCollection = async (data) => {
  let d = await call({
    path: "list-collection-design",
    method: "POST",
    enctype:"multipart/form-data",
    data,
  });
  return d;
}

const exportObject = { collectionData,ListCollection };

export default exportObject;
