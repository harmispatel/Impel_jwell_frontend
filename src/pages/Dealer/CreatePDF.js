import React, { useLayoutEffect, useState } from "react";
import DealerPdf from "../../services/Dealer/PdfShare";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import emptycart from "../../assets/images/empty-cart.png";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import jsPDF from "jspdf";

const CreatePDF = () => {
  const DealerEmail = localStorage.getItem("email");
  const [isLoading, setIsLoading] = useState(true);
  const [pdfList, setPdfList] = useState([]);
  const [removingItemId, setRemovingItemId] = useState(null);

  const DealerPdfList = () => {
    DealerPdf.pdfList({ email: DealerEmail })
      .then((res) => {
        setPdfList(res?.data?.pdf_items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const RemovePdf = (id) => {
    setRemovingItemId(id);
    DealerPdf.removePdf({ email: DealerEmail, design_id: id })
      .then((res) => {
        DealerPdfList();
        setIsLoading(false);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 14;
    const imgWidth = 50;
    const imgHeight = 50;
    const textX = 70;
    const lineHeight = 60;

    doc.setFontSize(22);
    doc.text("Dealer PDF Share", margin, 22);

    const promises = pdfList.map((product, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = product.image;
        img.onload = () => {
          doc.addImage(
            img,
            "JPEG",
            margin,
            30 + index * lineHeight,
            imgWidth,
            imgHeight
          );
          doc.setFontSize(16);
          doc.text(product.name, textX, 45 + index * lineHeight);

          // Set text color for the price
          doc.setTextColor(0, 128, 0); // Green color
          doc.text(
            `₹${numberFormat(product.total_amount_18k)}`, // Format with Indian Rupee style
            textX,
            55 + index * lineHeight
          );

          // Reset color for any subsequent text if needed
          doc.setTextColor(0, 0, 0); // Black color
          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {
      doc.save("Dealer_PDF_Sharing.pdf");
    });
  };

  useLayoutEffect(() => {
    DealerPdfList();
  }, [DealerEmail]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  return (
    <>
      <Helmet>
        <title>Impel Store - Dealer PDF Share</title>
      </Helmet>
      <section className="wishlist">
        <div className="container">
          {isLoading ? (
            <div className="h-100 d-flex justify-content-center">
              <div className="animation-loading">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              {pdfList?.length ? (
                <>
                  <div className="new-wishlist-section ">
                    <div className="container py-3">
                      <div className="d-flex justify-content-between">
                        <h3>Dealer PDF Share</h3>
                        <button className="pdf-share-btn" onClick={generatePDF}>
                          Share <IoShareSocial className="ms-2" />
                        </button>
                      </div>
                      <div className="row">
                        {pdfList?.map((product) => {
                          return (
                            <div class="container" key={product.id}>
                              <div class="row">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <hr />
                                  <div class="cart-item">
                                    <div class="row">
                                      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                        <div class="d-flex mb-3">
                                          <img
                                            class=""
                                            style={{
                                              width: "120px",
                                              height: "auto",
                                            }}
                                            src={product?.image}
                                            alt={product?.image}
                                          />
                                          <div class="mx-3">
                                            <h5>{product?.name}</h5>
                                            {/* <p className="mb-2">
                                              Lorem ipsum, dolor sit
                                            </p> */}
                                            <h5 className="text-success fw-bold">
                                              ₹
                                              {numberFormat(
                                                product?.total_amount_18k
                                              )}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                        <div class="d-flex justify-content-end">
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() =>
                                              RemovePdf(product?.id)
                                            }
                                          >
                                            {removingItemId === product?.id ? (
                                              <CgSpinner
                                                size={20}
                                                className="animate_spin"
                                              />
                                            ) : (
                                              <MdDeleteOutline
                                                style={{ fontSize: "20px" }}
                                              />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="card border shadow-sm p-4">
                      <div className="text-center mb-4">
                        <h2 className="card-title mb-0">Design PDF Sharing</h2>
                      </div>
                      <div className="text-center my-4">
                        <img
                          src={emptycart}
                          alt="Empty Cart Illustration"
                          className="img-fluid mb-3"
                          style={{ maxWidth: "200px" }}
                        />
                        <h5 className="text-muted mb-3">
                          Oops! Your Sharing is Empty.
                        </h5>
                        <p className="text-muted">
                          Explore our collection and add your sharing products
                          in your Selections
                        </p>
                      </div>
                      <div className="text-center">
                        <Link
                          to="/shop"
                          className="view_all_btn px-4 py-2"
                          style={{ borderRadius: "8px" }}
                        >
                          <FaLongArrowAltLeft className="mr-2" /> &nbsp;Back to
                          Shop
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CreatePDF;
