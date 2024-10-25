import call from "../Call";

const addToPdf = async (data) => {
  let d = await call({
    path: "add-pdf-design",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};

const pdfList = async (data) => {
  let d = await call({
    path: "pdf-design-list",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};

const removePdf = async (data) => {
  let d = await call({
    path: "remove-pdf-design",
    method: "POST",
    enctype: "multipart/form-data",
    data,
  });
  return d;
};

const exportObject = { addToPdf, pdfList, removePdf };

export default exportObject;
