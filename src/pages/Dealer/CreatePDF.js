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
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  productContainer: {
    border: "1px solid grey",
    borderRadius: 5,
    marginVertical: 10,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    border: "1px solid grey",
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    borderRight: "1px solid grey",
    padding: "10px",
  },
  tableRow: {
    flexDirection: "row",
    border: "1px solid grey",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    padding: "10px",
    borderRight: "1px solid grey",
  },
  image: {
    width: 180,
    height: 180,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "left",
  },
  code: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "left",
  },
  totalAmount: {
    fontSize: 12,
    color: "black",
    textAlign: "left",
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 15,
    fontWeight: "bold",
  },
});

const CreatePDF = () => {
  const DealerEmail = localStorage.getItem("email");
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLists, setPdfList] = useState([]);
  const [readyPdfLists, setReadyPdfList] = useState([]);
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

  const ReadyDealerPdfList = () => {
    DealerPdf.readyPdfList({ email: DealerEmail })
      .then((res) => {
        setReadyPdfList(res?.data?.ready_pdfs_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const ReadyRemovePdf = (id) => {
    setRemovingItemId(id);
    DealerPdf.readyRemovePdf({ ready_pdf_id: id })
      .then((res) => {
        ReadyDealerPdfList();
        setIsLoading(false);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useLayoutEffect(() => {
    DealerPdfList();
    ReadyDealerPdfList();
  }, [DealerEmail]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  const pdfDataPrint = () => {
    return (
      <Document>
        <Page size="A3">
          <Text style={styles.headerText}>Make by Order PDF Share Design</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Image</Text>
              <Text style={styles.tableHeaderCell}>Name</Text>
              <Text style={styles.tableHeaderCell}>Code</Text>
              <Text style={styles.tableHeaderCell}>Total Amount</Text>
            </View>
            {pdfLists.map((page) => (
              <View key={page.id} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Image style={styles.image} cache={false} src={page?.image} />
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.name}>{page.name}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.code}>{page.code}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.totalAmount}>
                    Rs. {page.total_amount_18k}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  const pdfReadyDataPrint = () => {
    return (
      <Document>
        <Page size="A3">
          <Text style={styles.headerText}>
            Ready jewellery PDF Share Design
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Image</Text>
              <Text style={styles.tableHeaderCell}>Name</Text>
              <Text style={styles.tableHeaderCell}>Code</Text>
              <Text style={styles.tableHeaderCell}>Total Amount</Text>
            </View>
            {readyPdfLists.map((page) => (
              <View key={page.id} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Image style={styles.image} cache={false} src={page?.image} />
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.name}>{page.name}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.code}>{page.tag_no}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.totalAmount}>
                    Rs. {page.total_amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

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
              <>
                <div className="new-wishlist-section">
                  <div className="container py-3">
                    <div className="row">
                      {pdfLists?.length ? (
                        <>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="d-flex justify-content-between">
                              <h3>Make by Order PDF Share</h3>
                            </div>
                            <div
                              style={{
                                border: "1px solid #b4b4b4",
                                borderRadius: "5px",
                                padding: "12px",
                              }}
                            >
                              <PDFDownloadLink
                                document={pdfDataPrint()}
                                filename="FORM.pdf"
                                style={{ textDecoration: "none" }}
                              >
                                {({ loading }) =>
                                  loading ? (
                                    <button className="pdf-share-btn mt-2">
                                      Loading Document...
                                    </button>
                                  ) : (
                                    <button className="pdf-share-btn mt-2">
                                      Share <IoShareSocial className="ms-2" />
                                    </button>
                                  )
                                }
                              </PDFDownloadLink>
                              {pdfLists?.map((product) => {
                                return (
                                  <>
                                    <div key={product.id}>
                                      <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                          <hr />
                                          <div className="cart-item">
                                            <div className="row">
                                              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                <div className="d-flex mb-3">
                                                  <img
                                                    className=""
                                                    style={{
                                                      width: "120px",
                                                      height: "auto",
                                                    }}
                                                    src={product?.image}
                                                    alt={product?.name}
                                                  />
                                                  <div className="mx-3">
                                                    <h5>{product?.name}</h5>
                                                    <p className="mb-2">
                                                      {product?.code}
                                                    </p>
                                                    <h5 className="text-success fw-bold">
                                                      &#x20B9;
                                                      {numberFormat(
                                                        product?.total_amount_18k
                                                      )}
                                                    </h5>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                <div className="d-flex justify-content-end">
                                                  <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                      RemovePdf(product?.id)
                                                    }
                                                  >
                                                    {removingItemId ===
                                                    product?.id ? (
                                                      <CgSpinner
                                                        size={20}
                                                        className="animate_spin"
                                                      />
                                                    ) : (
                                                      <MdDeleteOutline
                                                        style={{
                                                          fontSize: "20px",
                                                        }}
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
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-lg-6">
                          <div className="card border shadow-sm p-4">
                            <div className="text-center mb-4">
                              <h2 className="card-title mb-0">
                                Design PDF Sharing
                              </h2>
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
                                Explore our collection and add your sharing
                                products in your Selections
                              </p>
                            </div>
                            <div className="text-center">
                              <Link
                                to="/shop"
                                className="view_all_btn px-4 py-2"
                                style={{ borderRadius: "8px" }}
                              >
                                <FaLongArrowAltLeft className="mr-2" />{" "}
                                &nbsp;Back to Shop
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                      {readyPdfLists?.length ? (
                        <>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="d-flex justify-content-between">
                              <h3>Ready jewellery PDF Share Design</h3>
                            </div>
                            <div
                              style={{
                                border: "1px solid #b4b4b4",
                                borderRadius: "5px",
                                padding: "12px",
                              }}
                            >
                              <PDFDownloadLink
                                document={pdfReadyDataPrint()}
                                filename="FORM.pdf"
                                style={{ textDecoration: "none" }}
                              >
                                {({ loading }) =>
                                  loading ? (
                                    <button className="pdf-share-btn mt-2">
                                      Loading Document...
                                    </button>
                                  ) : (
                                    <button className="pdf-share-btn mt-2">
                                      Share <IoShareSocial className="ms-2" />
                                    </button>
                                  )
                                }
                              </PDFDownloadLink>
                              {readyPdfLists?.map((product) => {
                                return (
                                  <div key={product.id}>
                                    <div className="row">
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <hr />
                                        <div className="cart-item">
                                          <div className="row">
                                            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                                              <div className="d-flex mb-3">
                                                <img
                                                  className=""
                                                  style={{
                                                    width: "120px",
                                                    height: "auto",
                                                  }}
                                                  src={product?.image}
                                                  onError={(e) => {
                                                    e.target.onerror = null;
                                                  }}
                                                  alt=""
                                                />
                                                <div className="mx-3">
                                                  <h5>{product?.name}</h5>
                                                  <p className="mb-2">
                                                    {product?.tag_no}
                                                  </p>
                                                  <h5 className="text-success fw-bold">
                                                    ₹
                                                    {numberFormat(
                                                      product?.total_amount
                                                    )}
                                                  </h5>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                              <div className="d-flex justify-content-end">
                                                <button
                                                  type="button"
                                                  className="btn btn-danger"
                                                  onClick={() =>
                                                    ReadyRemovePdf(product?.id)
                                                  }
                                                >
                                                  {removingItemId ===
                                                  product?.id ? (
                                                    <CgSpinner
                                                      size={20}
                                                      className="animate_spin"
                                                    />
                                                  ) : (
                                                    <MdDeleteOutline
                                                      style={{
                                                        fontSize: "20px",
                                                      }}
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
                        </>
                      ) : (
                        <div className="col-lg-6">
                          <div className="card border shadow-sm p-4">
                            <div className="text-center mb-4">
                              <h2 className="card-title mb-0">
                                Design PDF Sharing
                              </h2>
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
                                Explore our collection and add your sharing
                                products in your Selections
                              </p>
                            </div>
                            <div className="text-center">
                              <Link
                                to="/shop"
                                className="view_all_btn px-4 py-2"
                                style={{ borderRadius: "8px" }}
                              >
                                <FaLongArrowAltLeft className="mr-2" />{" "}
                                &nbsp;Back to Shop
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CreatePDF;
