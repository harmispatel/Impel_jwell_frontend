import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import profileService from "../../services/Home";
import Select from "react-select";
import { Skeleton } from "antd";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa";
import toast from "react-hot-toast";
import DealerPdf from "../../services/Dealer/PdfShare";

const imageURL = process.env.REACT_APP_API_KEY_IMAGE_;

const ReadytoDispatch = () => {
  const id = "1,4";
  const staticId = 4;
  const navigate = useNavigate();
  const location = useLocation();

  const userType = localStorage.getItem("user_type");
  const email = localStorage.getItem("email");

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [tagNoChange, setTagNoChange] = useState(null);

  const [items, setItems] = useState(null);
  const [subItems, setSubItems] = useState(null);

  const [itemGroups, setItemGroups] = useState(null);

  const [styles, setStyles] = useState(null);

  const [sizes, setSizes] = useState(null);

  const [allPrices, setAllPrices] = useState([]);
  const [totalItems, setTotalItems] = useState([]);

  const [pdfItems, setPdfItems] = useState([]);

  const handleCategory = (selectedOption) => {
    setIsLoading(true);
    setItemGroups(selectedOption);
  };

  const handleSearchItems = (e) => {
    if (tagNoChange?.length < 0) {
      setIsLoading(true);
    }
    setTagNoChange(e.target.value);
  };

  const handleItems = (selectedOption) => {
    setIsLoading(true);
    setItems(selectedOption);
  };

  const handleSubItems = (selectedOption) => {
    setIsLoading(true);
    setSubItems(selectedOption);
  };

  const handleStylesTag = (selectedOption) => {
    setIsLoading(true);
    setStyles(selectedOption);
  };

  const handleSizeTag = (selectedOption) => {
    setIsLoading(true);
    setSizes(selectedOption);
  };

  useEffect(() => {
    setTimeout(() => {
      profileService
        .GetProductsFilterAPI({
          PageNo: 1,
          PageSize: 60,
          DeviceID: 0,
          SortBy: "",
          SearchText: "",
          TranType: "",
          CommaSeperate_ItemGroupID: itemGroups?.value
            ? itemGroups?.value
            : itemGroups,
          CommaSeperate_ItemID: items?.value || "",
          CommaSeperate_StyleID: styles?.value || "",
          CommaSeperate_ProductID: "",
          CommaSeperate_SubItemID: subItems?.value || "",
          CommaSeperate_AppItemCategoryID: "",
          CommaSeperate_ItemSubID: "",
          CommaSeperate_KarigarID: "",
          CommaSeperate_BranchID: "",
          CommaSeperate_Size: sizes?.value || "",
          CommaSeperate_CounterID: "",
          MaxNetWt: 0,
          MinNetWt: 0,
          OnlyCartItem: false,
          OnlyWishlistItem: false,
          StockStatus: "",
          DoNotShowInClientApp: 0,
          HasTagImage: 0,
          CommaSeperate_CompanyID: id,
        })
        .then((res) => {
          setFilters(res?.Filters);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, [itemGroups, items, subItems, styles, sizes, id]);

  useEffect(() => {
    profileService
      .GetProductsPrices()
      .then((res) => {
        setAllPrices(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  var finalPrice = [
    {
      price_24k: allPrices?.price_24k,
    },
    {
      sales_wastage: allPrices?.sales_wastage_rtd,
    },
    {
      sales_wastage_discount: allPrices?.sales_wastage_discount_rtd,
    },
  ];

  // <-------------------- PAGINATION FUNCTION HERE START -------------------->

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages = Math.ceil(totalItems / 60);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLength: 60,
  });

  const paginationPage = (page) => {
    getProducts(page);
    setPagination({ ...pagination, currentPage: page });
    scrollup();
    setIsLoading(true);
  };

  const paginationPrev = () => {
    if (pagination.currentPage > 1) {
      const prevPage = pagination.currentPage - 1;
      setPagination({ ...pagination, currentPage: prevPage });
      getProducts(prevPage);
      scrollup();
      setIsLoading(true);
    }
  };

  const paginationNext = () => {
    if (pagination.currentPage < totalPages) {
      const nextPage = pagination.currentPage + 1;
      setPagination({ ...pagination, currentPage: nextPage });
      getProducts(nextPage);
      scrollup();
      setIsLoading(true);
    }
  };

  // <-------------------- PAGINATION FUNCTION HERE END -------------------->

  const getProducts = (page) => {
    profileService
      .GetProductsAPI({
        PageNo: page,
        PageSize: 60,
        DeviceID: 0,
        SortBy: "",
        SearchText: tagNoChange || "",
        TranType: "",
        CommaSeperate_ItemGroupID: itemGroups?.value
          ? itemGroups?.value
          : itemGroups,
        CommaSeperate_ItemID: items?.value || "",
        CommaSeperate_StyleID: styles?.value || "",
        CommaSeperate_ProductID: "",
        CommaSeperate_CompanyID: id || "",
        CommaSeperate_SubItemID: subItems?.value || "",
        CommaSeperate_AppItemCategoryID: "",
        CommaSeperate_ItemSubID: "",
        CommaSeperate_KarigarID: "",
        CommaSeperate_BranchID: "",
        CommaSeperate_Size: sizes?.value || "",
        CommaSeperate_CounterID: "",
        MaxNetWt: 0,
        MinNetWt: 0,
        OnlyCartItem: false,
        OnlyWishlistItem: false,
        StockStatus: "",
        DoNotShowInClientApp: 0,
        HasTagImage: 0,
      })
      .then((res) => {
        setProducts(res?.Tags);
        setTotalItems(res?.TotalItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts(pagination?.currentPage || 1);
  }, [
    itemGroups,
    items,
    subItems,
    styles,
    sizes,
    tagNoChange,
    id,
    pagination?.currentPage,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const pdfTip = <Tooltip id="tooltip">My PDF share</Tooltip>;

  const DealerLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/dealer-login");
  };

  // Dealder List PDF creation
  const getPdfList = async () => {
    DealerPdf.readyPdfList({ email: email })
      .then((res) => {
        setPdfItems(res?.data?.ready_pdfs_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    getPdfList();
  }, []);

  // Dealder add product for PDF creation
  const addToPDF = async (e, product, allPrices) => {
    e.preventDefault();
    if (!pdfItems.some((item) => item.Barcode === product.Barcode)) {
      DealerPdf.readytAddToPdf({
        email: email,
        company_id: 4,
        item_group_id: 44,
        item_id: product?.ItemGroupID,
        sub_item_id: product?.ItemSubID,
        style_id: product?.StyleID,
        barcode: product?.Barcode,
        tag_no: product?.TagNo,
        group_name: product?.GroupName,
        name: product?.ItemName,
        size: "",
        gross_weight: product?.GrossWt,
        net_weight: product?.NetAmt,
        metal_value: allPrices?.metal_value,
        making_charge: allPrices?.labour_charge,
        making_charge_discount: allPrices?.labour_charge_discount,
        total_amount: allPrices?.total_prices,
      })
        .then((res) => {
          getPdfList();
          toast.success(res.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  // Dealder remove product for PDF creation
  const removeToPDF = (e, product) => {
    e.preventDefault();
    DealerPdf.readyRemovePdf({
      ready_pdf_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          getPdfList();
          toast.success(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="ready-to-dispatch">
        <div className="container">
          {isLoading ? (
            <div className="animation-loading">
              <Loader />
            </div>
          ) : (
            <>
              <div className="row">
                <div className="col-md-3 mb-2 mb-md-4">
                  <div className="form-group d-flex align-items-center">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search with tag no"
                      onChange={(e) => handleSearchItems(e)}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-2 mb-md-4">
                  <Select
                    placeholder="Select Sizes"
                    isClearable
                    isSearchable={false}
                    value={sizes}
                    onChange={handleSizeTag}
                    options={filters?.Size?.map((data) => ({
                      label: data?.Size1,
                      value: data?.RowNumber,
                    }))}
                  />
                </div>

                {/* Category Wise Filter */}
                {/* <div className="col-md-3">
                  <Select
                    placeholder="Select Category"
                    isClearable
                    isSearchable={false}
                    value={itemGroups}
                    onChange={handleCategory}
                    options={filters?.ItemGroups?.map((data) => ({
                      label: data?.GroupName,
                      value: data?.ItemGroupID,
                    }))}
                  />
                </div> */}
                <div className="col-md-3 my-2 my-md-0">
                  <Select
                    placeholder="Select Item"
                    isClearable
                    isSearchable={false}
                    value={items}
                    onChange={handleItems}
                    options={filters?.Items?.map((data) => ({
                      label: data?.ItemName,
                      value: data?.ItemID,
                    }))}
                  />
                </div>
                <div className="col-md-3 mb-2 mb-md-0">
                  <Select
                    placeholder="Select Sub Item"
                    isClearable
                    isSearchable={false}
                    value={subItems}
                    onChange={handleSubItems}
                    options={filters?.SubItems?.map((data) => ({
                      label: data?.SubItemName,
                      value: data?.SubItemID,
                    }))}
                  />
                </div>
                {/* <div className="col-md-3">
                  <Select
                    placeholder="Select Style"
                    isClearable
                    isSearchable={false}
                    value={styles}
                    onChange={handleStylesTag}
                    options={filters?.Styles?.map((data) => ({
                      label: data?.StyleName,
                      value: data?.StyleID,
                    }))}
                  />
                </div> */}
              </div>
              <div className="row mt-4">
                {products?.length > 0 ? (
                  <>
                    {products?.map((data, index) => {
                      var sales_wastage_of_category =
                        finalPrice[1]?.sales_wastage[data?.SubItemID] || 0;

                      var sales_wastage_discount_of_category =
                        finalPrice[2]?.sales_wastage_discount[
                          data?.SubItemID
                        ] || 0;

                      var labour_charge =
                        (finalPrice[0]?.price_24k[data?.SubItemID] *
                          sales_wastage_of_category) /
                          100 || 0;

                      if (labour_charge > 0) {
                        labour_charge = labour_charge * data?.NetWt || 0;
                      }

                      const labour_charge_discount =
                        sales_wastage_discount_of_category > 0
                          ? labour_charge -
                            (labour_charge *
                              sales_wastage_discount_of_category) /
                              100
                          : 0;

                      var metal_value =
                        finalPrice[0]?.price_24k[data?.SubItemID] *
                          (data?.Touch / 100) *
                          data?.NetWt || 0;

                      const allPrices = {
                        total_prices:
                          labour_charge_discount > 0
                            ? metal_value + labour_charge_discount
                            : metal_value + labour_charge,
                        labour_charge_discount: numberFormat(
                          labour_charge_discount
                        ),
                        metal_value: numberFormat(metal_value),
                        labour_charge: numberFormat(labour_charge),
                      };

                      return (
                        <>
                          <div
                            className="col-md-3 col-sm-4 col-xs-6"
                            key={index}
                          >
                            <div className="item-product text-center">
                              <Link
                                to={`/ready-to-dispatch/${id}/${data?.TagNo}`}
                              >
                                <div className="product-thumb">
                                  {loading ? (
                                    <Skeleton.Image
                                      active
                                      style={{ width: "100%" }}
                                    />
                                  ) : data?.Images[0]?.ImageName ? (
                                    <img
                                      src={`${imageURL}${data?.Images[0]?.ImageName}`}
                                      alt=""
                                      className="w-100"
                                    />
                                  ) : (
                                    <img
                                      src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                      alt=""
                                      className="w-100"
                                    />
                                  )}
                                </div>
                              </Link>
                              <div className="wishlist-top">
                                {userType == 1 && (
                                  <>
                                    <div className="mt-2">
                                      {email ? (
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={pdfTip}
                                        >
                                          <Link
                                            to="#"
                                            className=""
                                            onClick={(e) => {
                                              if (
                                                pdfItems?.find(
                                                  (item) =>
                                                    item?.Barcode ===
                                                    data?.Barcode
                                                )
                                              ) {
                                                removeToPDF(e, data);
                                              } else {
                                                addToPDF(e, data, allPrices);
                                              }
                                            }}
                                          >
                                            {pdfItems?.find(
                                              (item) =>
                                                item?.Barcode === data?.Barcode
                                            ) ? (
                                              <FaFilePdf />
                                            ) : (
                                              <FaRegFilePdf />
                                            )}
                                          </Link>
                                        </OverlayTrigger>
                                      ) : (
                                        <span onClick={(e) => DealerLogin(e)}>
                                          <FaRegFilePdf />
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="product-info d-grid">
                                {labour_charge_discount > 0 ? (
                                  <>
                                    <del>
                                      ₹
                                      {numberFormat(
                                        labour_charge + metal_value
                                      )}
                                    </del>
                                    <label>
                                      <strong className="text-success">
                                        ₹
                                        {numberFormat(
                                          metal_value + labour_charge_discount
                                        )}
                                      </strong>
                                    </label>
                                  </>
                                ) : (
                                  <strong className="text-success">
                                    ₹{numberFormat(metal_value + labour_charge)}
                                  </strong>
                                )}
                              </div>
                              {userType == 1 && (
                                <div className="mt-2">
                                  <span
                                    style={{
                                      color: "#db9662",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {data?.TagNo}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}

                    {/* PAGINATION */}
                    <div className="pt-5">
                      {totalPages > 1 && (
                        <div className="paginationArea">
                          <nav aria-label="navigation">
                            <ul className="pagination">
                              {/* Previous Page Button */}
                              <li
                                className={`page-item ${
                                  pagination.currentPage === 1 ? "disabled" : ""
                                }`}
                                style={{
                                  display:
                                    pagination.currentPage === 1
                                      ? "none"
                                      : "block",
                                }}
                              >
                                <Link
                                  to="#"
                                  className="page-link"
                                  onClick={paginationPrev}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                  Prev
                                </Link>
                              </li>

                              {/* Display pages with ellipses */}
                              {Array.from({ length: totalPages }).map(
                                (_, index) => {
                                  const pageNumber = index + 1;
                                  const isCurrentPage =
                                    pagination.currentPage === pageNumber;

                                  // Display first and last pages
                                  if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= pagination.currentPage - 1 &&
                                      pageNumber <= pagination.currentPage + 1)
                                  ) {
                                    return (
                                      <li
                                        key={pageNumber}
                                        className={`page-item ${
                                          isCurrentPage ? "active" : ""
                                        }`}
                                        onClick={() =>
                                          paginationPage(pageNumber)
                                        }
                                      >
                                        <Link to="#" className="page-link">
                                          {pageNumber}
                                        </Link>
                                      </li>
                                    );
                                  }

                                  // Display ellipses
                                  if (index === 1 || index === totalPages - 2) {
                                    return (
                                      <li
                                        key={pageNumber}
                                        className="page-item disabled"
                                      >
                                        <Link to="#" className="page-link">
                                          ...
                                        </Link>
                                      </li>
                                    );
                                  }

                                  return null;
                                }
                              )}

                              {/* Next Page Button */}
                              <li
                                className={`page-item ${
                                  pagination.currentPage === totalPages
                                    ? "disabled"
                                    : ""
                                }`}
                                style={{
                                  display:
                                    pagination.currentPage === totalPages
                                      ? "none"
                                      : "block",
                                }}
                              >
                                <Link
                                  to="#"
                                  className="page-link"
                                  onClick={paginationNext}
                                >
                                  Next
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="not-products">
                          <p>No products available.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ReadytoDispatch;
