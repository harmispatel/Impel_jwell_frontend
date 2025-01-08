import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FaFilePdf,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaRegFilePdf,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Select from "react-select";
import profileService from "../../services/Home";
import DealerPdf from "../../services/Dealer/PdfShare";
import { Helmet } from "react-helmet-async";

const imageURL = process.env.REACT_APP_API_KEY_IMAGE_;

const ReadytoDispatch = () => {
  const id = "1,4,5";
  const navigate = useNavigate();
  const location = useLocation();

  const userType = localStorage.getItem("user_type");
  const email = localStorage.getItem("email");

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [tagNoChange, setTagNoChange] = useState(null);

  const [sizes, setSizes] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState(null);

  const [itemGroups, setItemGroups] = useState(null);

  const [items, setItems] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);

  const [subItems, setSubItems] = useState(null);
  const [selectedSubItems, setSelectedSubItems] = useState(null);

  const [styles, setStyles] = useState(null);

  const [allPrices, setAllPrices] = useState([]);

  const [pdfItems, setPdfItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLength: 20,
  });

  const totalPages = Math.ceil(totalItems / pagination?.dataShowLength);

  const handleSearchItems = (e) => {
    if (tagNoChange?.length < 0) {
      setIsLoading(true);
    }
    setTagNoChange(e.target.value);
  };

  const handleSizeTag = (selectedOption) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    queryParams.delete("page");
    if (selectedOption) {
      queryParams.set("sizes", selectedOption.value);
    } else {
      queryParams.delete("sizes");
    }

    navigate(
      `/ready-to-dispatch${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`
    );

    setSizes(selectedOption ? selectedOption.value : "");
    setSelectedSizes(selectedOption);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // const handleCategory = (selectedOption) => {
  //   setIsLoading(true);
  //   setItemGroups(selectedOption);
  // };

  const handleItems = (selectedOption) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    if (selectedOption) {
      queryParams.set("items", selectedOption.value);
    } else {
      queryParams.delete("items");
    }

    navigate(
      `/ready-to-dispatch${queryParams ? `?${queryParams.toString()}` : ""}`
    );

    setItems(selectedOption ? selectedOption.value : "");
    setSelectedItems(selectedOption);
  };

  const handleSubItems = (selectedOption) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    if (selectedOption) {
      queryParams.set("sub-items", selectedOption.value);
    } else {
      queryParams.delete("sub-items");
    }

    navigate(
      `/ready-to-dispatch${queryParams ? `?${queryParams.toString()}` : ""}`
    );

    setSubItems(selectedOption ? selectedOption.value : "");
    setSelectedSubItems(selectedOption);
  };

  // const handleStylesTag = (selectedOption) => {
  //   setIsLoading(true);
  //   setStyles(selectedOption);
  // };

  const getProductsFilterAndData = async (offset) => {
    try {
      const sizeToPass = sizes || "";

      // Fetch filter data
      const filterResponse = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.indianjewelcast.com/api/Tag/GetFilters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PageNo: 1,
            PageSize: 20,
            DeviceID: 0,
            SortBy: "",
            SearchText: "",
            TranType: "",
            CommaSeperate_ItemGroupID: itemGroups?.value || "",
            CommaSeperate_ItemID: items || "",
            CommaSeperate_StyleID: styles?.value || "",
            CommaSeperate_ProductID: "",
            CommaSeperate_SubItemID: subItems || "",
            CommaSeperate_AppItemCategoryID: "",
            CommaSeperate_ItemSubID: "",
            CommaSeperate_KarigarID: "",
            CommaSeperate_BranchID: "",
            CommaSeperate_Size: sizeToPass,
            CommaSeperate_CounterID: "",
            MinNetWt: 0,
            OnlyCartItem: false,
            OnlyWishlistItem: false,
            StockStatus: "",
            DoNotShowInClientApp: 0,
            HasTagImage: 0,
            CommaSeperate_CompanyID: id,
            MaxNetWt: 1000,
          }),
        }
      );

      if (!filterResponse.ok) {
        throw new Error(`Failed to fetch filters: ${filterResponse.status}`);
      }

      const filterData = await filterResponse.json();
      setFilters(filterData?.Filters);

      // Fetch product data
      const productsResponse = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.indianjewelcast.com/api/Tag/GetAll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PageNo: offset || 1,
            PageSize: 20,
            DeviceID: 0,
            SortBy: "",
            SearchText: tagNoChange || "",
            TranType: "",
            CommaSeperate_ItemGroupID: itemGroups?.value || "",
            CommaSeperate_ItemID: items || "",
            CommaSeperate_StyleID: styles?.value || "",
            CommaSeperate_ProductID: "",
            CommaSeperate_CompanyID: id || "",
            CommaSeperate_SubItemID: subItems || "",
            CommaSeperate_AppItemCategoryID: "",
            CommaSeperate_ItemSubID: "",
            CommaSeperate_KarigarID: "",
            CommaSeperate_BranchID: "",
            CommaSeperate_Size: sizeToPass,
            CommaSeperate_CounterID: "",
            MinNetWt: 0,
            OnlyCartItem: false,
            OnlyWishlistItem: false,
            StockStatus: "",
            DoNotShowInClientApp: 0,
            HasTagImage: 0,
            MaxNetWt: 1000,
          }),
        }
      );

      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();
      setProducts(productsData?.Tags);
      setTotalItems(productsData?.TotalItems);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setIsLoading(true);
    }
  };

  useLayoutEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const sizeFromURL = queryParams.get("sizes");

    setPagination((prev) => ({ ...prev, currentPage }));

    const selectedSort = filters?.Size?.find(
      (item) => item?.RowNumber === Number(sizeFromURL)
    );

    if (selectedSort) {
      setSelectedSizes({
        value: selectedSort?.RowNumber,
        label: selectedSort?.Size1,
      });

      getProductsFilterAndData(currentPage);
    }

    getProductsFilterAndData(currentPage);
  }, [location.search, filters?.length, pagination.currentPage, sizes]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://cors-anywhere.herokuapp.com/https://api.indianjewelcast.com/api/Tag/GetAll";
      const requestBody = {
        PageNo: 1,
        PageSize: 20,
        DeviceID: 0,
        SortBy: "",
        SearchText: "",
        TranType: "",
        CommaSeperate_ItemGroupID: "",
        CommaSeperate_ItemID: "",
        CommaSeperate_StyleID: "",
        CommaSeperate_ProductID: "",
        CommaSeperate_SubItemID: "",
        CommaSeperate_AppItemCategoryID: "",
        CommaSeperate_ItemSubID: "",
        CommaSeperate_KarigarID: "",
        CommaSeperate_BranchID: "",
        CommaSeperate_Size: "",
        CommaSeperate_CounterID: "",
        MaxNetWt: 1000,
        MinNetWt: 0,
        OnlyCartItem: false,
        OnlyWishlistItem: false,
        StockStatus: "",
        DoNotShowInClientApp: 0,
        HasTagImage: 0,
        CommaSeperate_CompanyID: "1, 4, 5",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updatePagination = (page) => {
    getProductsFilterAndData(page);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    navigate(`/ready-to-dispatch?${queryParams.toString()}`);
    setPagination((prev) => ({ ...prev, currentPage: page }));
    setIsLoading(true);
    scrollup();
  };

  const paginationPrev = (e) => {
    if (pagination.currentPage > 1) {
      e.preventDefault();
      updatePagination(pagination.currentPage - 1);
      scrollup();
    }
  };

  const paginationNext = (e) => {
    if (pagination.currentPage < totalPages) {
      e.preventDefault();
      updatePagination(pagination.currentPage + 1);
      scrollup();
    }
  };

  const fetchPdfList = async () => {
    try {
      const res = await DealerPdf.readyPdfList({ email: email });
      setPdfItems(res?.data?.ready_pdfs_list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProductPrices = async () => {
      try {
        const res = await profileService.GetProductsPrices();
        setAllPrices(res?.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductPrices();

    if (email) {
      fetchPdfList();
    }
  }, [email]);

  const addToPDF = async (e, product, allPrices) => {
    e.preventDefault();

    if (!pdfItems?.some((item) => item?.barcode === product?.Barcode)) {
      try {
        const res = await DealerPdf.readytAddToPdf({
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
        });

        fetchPdfList();
        toast.success(res?.message);
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  const removeToPDF = async (e, product) => {
    e.preventDefault();
    try {
      const res = await DealerPdf.readyRemovePdf({
        design_ids: [product.Barcode],
      });
      if (res?.success === true) {
        fetchPdfList();
        toast.success(res?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DealerLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/dealer-login");
  };

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

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  const pdfTip = <Tooltip id="tooltip">My PDF share</Tooltip>;
  const shimmerItems = Array(20).fill(null);

  return (
    <>
      <Helmet>
        <title>Impel Store - Ready Jewellery</title>
      </Helmet>
      <section className="ready-to-dispatch">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mb-md-3 mb-2">
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
            <div className="col-lg-3 col-md-6 col-12 mb-md-3 mb-2">
              <Select
                placeholder="Select Sizes"
                isClearable
                isSearchable={false}
                value={selectedSizes}
                onChange={handleSizeTag}
                options={filters?.Size?.map((data) => ({
                  label: data?.Size1,
                  value: data?.RowNumber,
                }))}
              />
            </div>
            {/* <div className="col-lg-3 col-md-6 col-12 mb-md-3 mb-2">
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
            <div className="col-lg-3 col-md-6 col-12 mb-md-3 mb-2">
              <Select
                placeholder="Select Item"
                isClearable
                isSearchable={false}
                value={selectedItems}
                onChange={handleItems}
                options={filters?.Items?.map((data) => ({
                  label: data?.ItemName,
                  value: data?.ItemID,
                }))}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-md-4 mb-2">
              <Select
                placeholder="Select Sub Item"
                isClearable
                isSearchable={false}
                value={selectedSubItems}
                onChange={handleSubItems}
                options={filters?.SubItems?.map((data) => ({
                  label: data?.SubItemName,
                  value: data?.SubItemID,
                }))}
              />
            </div>
            {/* <div className="col-lg-3 col-md-6 col-12 mb-md-4 mb-2">
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
          {isLoading ? (
            <>
              <div className="row">
                {shimmerItems?.map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-12">
                    <div key={index} className="shimmer-product">
                      <div className="shimmer-image"></div>
                      <div className="shimmer-price"></div>
                      <div className="shimmer-price"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="row mt-md-0 mt-4">
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
                          <div className="col-lg-3 col-md-6 col-12" key={index}>
                            <motion.div
                              className="item-product text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Link to={`/ready-to-dispatch/${data?.TagNo}`}>
                                <div className="product-thumb">
                                  <motion.img
                                    src={`${imageURL}${data?.Images[0]?.ImageName}`}
                                    alt=""
                                    className="w-100"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                  />
                                </div>
                              </Link>
                              <div className="wishlist-top">
                                {userType === "1" && (
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
                                                    item?.barcode ===
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
                                                item?.barcode === data?.Barcode
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

                              {userType === "1" && (
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
                            </motion.div>
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
                              <li
                                className={`page-item ${
                                  pagination.currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <Link
                                  to="#"
                                  className="page-link d-flex align-items-center gap-2"
                                  onClick={paginationPrev}
                                >
                                  <FaLongArrowAltLeft />
                                  Prev
                                </Link>
                              </li>

                              {Array.from({ length: totalPages }).map(
                                (_, index) => {
                                  const pageNumber = index + 1;
                                  const isCurrentPage =
                                    pagination.currentPage === pageNumber;

                                  return pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= pagination.currentPage - 1 &&
                                      pageNumber <=
                                        pagination.currentPage + 1) ? (
                                    <li
                                      key={pageNumber}
                                      className={`page-item ${
                                        isCurrentPage ? "active" : ""
                                      }`}
                                      onClick={() =>
                                        updatePagination(pageNumber)
                                      }
                                    >
                                      <Link
                                        to="#"
                                        className="page-link"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {pageNumber}
                                      </Link>
                                    </li>
                                  ) : index === 1 ||
                                    index === totalPages - 2 ? (
                                    <li
                                      key={pageNumber}
                                      className="page-item disabled"
                                    >
                                      <Link
                                        to="#"
                                        className="page-link"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        ...
                                      </Link>
                                    </li>
                                  ) : null;
                                }
                              )}

                              <li
                                className={`page-item ${
                                  pagination.currentPage === totalPages
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <Link
                                  to="#"
                                  className="page-link d-flex align-items-center gap-2"
                                  onClick={paginationNext}
                                >
                                  Next
                                  <FaLongArrowAltRight />
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
