import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { FaFilePdf, FaRegFilePdf, FaRegStar, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import "rc-slider/assets/index.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ShopServices from "../../services/Shop";
import FilterServices from "../../services/Filter";
import DealerWishlist from "../../services/Dealer/Collection";
import DealerPdf from "../../services/Dealer/PdfShare";
import UserWishlist from "../../services/Auth";
import { WishlistSystem } from "../../context/WishListContext";
import { motion } from "framer-motion";
import Select from "react-select";

const Shop = () => {
  const { dispatch: wishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: removeWishlistDispatch } = useContext(WishlistSystem);

  const location = useLocation();
  const navigate = useNavigate();

  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [genderData, setGenderData] = useState([]);
  const [filterTag, setFilterTag] = useState([]);
  const [FilterPriceRange, setFilterPriceRange] = useState({
    minprice: 0,
    maxprice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [DealerCollection, setDealerCollection] = useState([]);
  const [UsercartItems, setUserCartItems] = useState([]);
  const [pdfItems, setPdfItems] = useState([]);
  const [paginate, setPaginate] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLength: 40,
  });

  const totalPages = Math.ceil(
    paginate?.total_records / pagination.dataShowLength
  );

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchFilters = () => {
    Promise.all([
      FilterServices.categoryFilter(),
      FilterServices.genderFilter(),
    ])
      .then(([categories, genders]) => {
        setCategoryData(categories.data);
        setGenderData(genders.data);
      })
      .catch(console.error);
  };

  // user wishlist API
  const GetUserWishList = async () => {
    UserWishlist.userWishlist({ phone: Phone })
      .then((res) => {
        setUserCartItems(res?.data?.wishlist_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // user wishlist products add
  const addToUserWishList = async (e, product) => {
    e.preventDefault();
    const payload = { id: product?.id };
    if (!UsercartItems.some((item) => item.id === product.id)) {
      UserWishlist.addtoWishlist({
        phone: Phone,
        design_id: product.id,
        gold_color: "yellow_gold",
        gold_type: "18k",
        design_name: product?.name,
      })
        .then((res) => {
          if (res.success === true) {
            toast.success("Design has been Added to Your Wishlist");
            GetUserWishList();
            wishlistDispatch({
              type: "ADD_TO_WISHLIST",
              payload,
            });
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  // user wishlist products remove
  const removeFromWishList = (e, product) => {
    e.preventDefault();
    const payload = product;
    UserWishlist.removetoWishlist({
      phone: Phone,
      design_id: product.id,
      gold_color: "yellow_gold",
      gold_type: "18k",
      design_name: product?.name,
    })
      .then((res) => {
        if (res.success === true) {
          toast.success("Design has been Removed from Your Wishlist.");
          GetUserWishList();
          removeWishlistDispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealer wishlist API
  const GetDealerSelection = () => {
    DealerWishlist.ListCollection({ email: email })
      .then((res) => {
        setDealerCollection(res.data?.wishlist_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealer Wishlist products add
  const AddToDealerSelection = async (e, product) => {
    e.preventDefault();
    if (!DealerCollection?.some((item) => item.id === product?.id)) {
      DealerWishlist.addtoDealerWishlist({
        email: email,
        design_id: product?.id,
      })
        .then((res) => {
          if (res.success === true) {
            toast.success("Design has been Added to Your Collection.");
            FilterData();
            GetDealerSelection();
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  // Dealer Wishlist products remove
  const removeFromSelection = (e, product) => {
    e.preventDefault();
    DealerWishlist.removetodealerWishlist({
      email: localStorage.getItem("email"),
      design_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message);
          FilterData();
          GetDealerSelection();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealder List PDF creation
  const getPdfList = async () => {
    DealerPdf.pdfList({ email: email })
      .then((res) => {
        setPdfItems(res?.data?.pdf_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealder add product for PDF creation
  const addToPDF = async (e, product) => {
    e.preventDefault();
    if (!pdfItems.some((item) => item.id === product.id)) {
      DealerPdf.addToPdf({
        email: email,
        design_id: product.id,
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
    DealerPdf.removePdf({
      email: email,
      design_id: product.id,
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

  const UserLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  const DealerLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/dealer-login");
  };

  const handleSelectCategory = (categoryID) => {
    setIsLoading(true);
    setSelectedCategory(categoryID);
    const offset = (pagination.currentPage - 1) * pagination.dataShowLength;
    navigate(`/shop${categoryID ? `?category_id=${categoryID.value}` : ""}`);
    FilterData(offset, categoryID?.value);
  };

  const FilterData = async (offset, categoryId) => {
    setIsLoading(true);

    try {
      const res = await ShopServices.allfilterdesigns({
        category_id: categoryId ? categoryId : null,
        gender_id: null,
        tag_id: null,
        search: null,
        min_price: null,
        max_price: null,
        sort_by: null,
        userType: userType,
        userId: userId,
        offset: offset || 0,
      });
      setIsLoading(false);
      setFilterData(res.data?.designs);
      setFilterTag(res.data?.tags);
      setPaginate(res.data);
      setFilterPriceRange({
        minprice: res.data.minprice,
        maxprice: res.data.maxprice,
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("category_id");
    if (Phone) GetUserWishList();
    if (email) GetDealerSelection();
    if (email) getPdfList();
    fetchFilters();
    if (!categoryId) {
      FilterData(0);
    }
  }, [location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const currentCategory = parseInt(queryParams.get("category_id"));

    setPagination((prev) => ({ ...prev, currentPage }));

    if (currentCategory) {
      const selectedCategory = categoryData.find(
        (item) => item.id === currentCategory
      );
      if (selectedCategory)
        setSelectedCategory({
          value: selectedCategory.id,
          label: selectedCategory.name,
        });
    } else {
      setSelectedCategory(null);
    }

    const offset = (currentPage - 1) * pagination.dataShowLength;
    FilterData(offset, currentCategory);
  }, [location.search, pagination.currentPage, categoryData]);

  const updatePagination = (page) => {
    const offset = (page - 1) * pagination.dataShowLength;
    FilterData(offset, selectedCategory?.value);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    navigate(`/shop?${queryParams.toString()}`);
    setPagination({ ...pagination, currentPage: page });
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

  const wishlistTip = <Tooltip id="tooltip">wishlist</Tooltip>;
  const selectionTip = <Tooltip id="tooltip">My Selections</Tooltip>;
  const pdfTip = <Tooltip id="tooltip">My PDF share</Tooltip>;
  const userTip = (
    <Tooltip id="tooltip">Login to add wishlist products</Tooltip>
  );

  const shimmerItems = Array(20).fill(null);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  return (
    <>
      <Helmet>
        <title>Impel Store - Shop</title>
      </Helmet>
      <section className="shop">
        <div className="container">
          <div className="shopping_data">
            <div className="row">
              <div className="col-md-9 col-12 md-mb-0 mb-2">
                <Select
                  placeholder="Shop by category"
                  isClearable={true}
                  isSearchable={false}
                  value={selectedCategory}
                  options={categoryData.map((data) => ({
                    value: data?.id,
                    label: data?.name,
                  }))}
                  onChange={handleSelectCategory}
                />
              </div>
              <div className="col-md-3 col-12"></div>
            </div>

            <div className="row">
              <div className="col-md-3 col-12 mt-2 mt-md-2">
                <div className="search_bar"></div>
              </div>
              <div className="col-md-3 col-12 mt-2 mt-md-2"></div>
              <div className="col-md-3 col-12 mt-2 mt-md-2"></div>
              <div className="col-md-3 col-12 mt-md-0"></div>
            </div>

            {isLoading ? (
              <>
                <div className="row">
                  {shimmerItems.map((_, index) => (
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
                <div className="row">
                  <div className="col-md-12">
                    {filterData?.length > 0 ? (
                      <>
                        <div className="row">
                          {filterData?.map((data) => {
                            return (
                              <>
                                <div className="col-lg-3 col-md-6 col-12">
                                  <motion.div
                                    className="item-product text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <Link to={`/shopdetails/${data?.id}`}>
                                      <div className="product-thumb">
                                        {data?.image ? (
                                          <>
                                            <motion.img
                                              src={data?.image}
                                              alt=""
                                              className="w-100"
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{ duration: 0.5 }}
                                              whileHover={{ scale: 1.05 }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <img
                                              src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                              alt=""
                                              className="w-100"
                                            />
                                          </>
                                        )}
                                      </div>
                                      <div className="product-info">
                                        {/* <h4>
                                          {data?.name}&nbsp;
                                          <span>({data?.code})</span>
                                        </h4> */}

                                        <div className="product-info d-grid">
                                          {data?.making_charge_discount_18k >
                                          0 ? (
                                            <>
                                              <del style={{ color: "#000" }}>
                                                ₹
                                                {numberFormat(
                                                  data?.making_charge_18k +
                                                    data?.metal_value_18k
                                                )}
                                              </del>
                                              <label>
                                                <strong className="text-success">
                                                  ₹
                                                  {numberFormat(
                                                    data?.metal_value_18k +
                                                      data?.making_charge_discount_18k
                                                  )}
                                                </strong>
                                              </label>
                                            </>
                                          ) : (
                                            <strong className="text-success">
                                              ₹
                                              {numberFormat(
                                                data?.total_amount_18k
                                              )}
                                            </strong>
                                          )}
                                        </div>

                                        {/* <label>
                                          ₹
                                          {numberFormat(data?.total_amount_18k)}
                                        </label> */}
                                      </div>
                                      {userType == 1 && (
                                        <div className="mt-1">
                                          <span
                                            style={{
                                              color: "#db9662",
                                              fontWeight: 700,
                                            }}
                                          >
                                            {data?.code}
                                          </span>
                                        </div>
                                      )}
                                    </Link>
                                    <div className="wishlist-top">
                                      {userType == 1 ? (
                                        <>
                                          {email ? (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={selectionTip}
                                            >
                                              <Link
                                                to="#"
                                                className="dealer_heart_icon"
                                                onClick={(e) => {
                                                  if (
                                                    DealerCollection?.find(
                                                      (item) =>
                                                        item?.id === data?.id
                                                    )
                                                  ) {
                                                    removeFromSelection(
                                                      e,
                                                      data
                                                    );
                                                  } else {
                                                    AddToDealerSelection(
                                                      e,
                                                      data
                                                    );
                                                  }
                                                }}
                                              >
                                                {DealerCollection?.find(
                                                  (item) =>
                                                    item?.id === data?.id
                                                ) ? (
                                                  <FaStar />
                                                ) : (
                                                  <FaRegStar />
                                                )}
                                              </Link>
                                            </OverlayTrigger>
                                          ) : (
                                            <span
                                              onClick={(e) => DealerLogin(e)}
                                            >
                                              <FaRegStar />
                                            </span>
                                          )}
                                          {email ? (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={pdfTip}
                                            >
                                              <Link
                                                to="#"
                                                className="dealer_heart_icon"
                                                onClick={(e) => {
                                                  if (
                                                    pdfItems?.find(
                                                      (item) =>
                                                        item?.id === data?.id
                                                    )
                                                  ) {
                                                    removeToPDF(e, data);
                                                  } else {
                                                    addToPDF(e, data);
                                                  }
                                                }}
                                              >
                                                {pdfItems?.find(
                                                  (item) =>
                                                    item?.id === data?.id
                                                ) ? (
                                                  <FaFilePdf />
                                                ) : (
                                                  <FaRegFilePdf />
                                                )}
                                              </Link>
                                            </OverlayTrigger>
                                          ) : (
                                            <span
                                              onClick={(e) => DealerLogin(e)}
                                            >
                                              <FaRegFilePdf />
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {Phone ? (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={wishlistTip}
                                            >
                                              <Link
                                                to="#"
                                                className=""
                                                onClick={(e) => {
                                                  if (
                                                    UsercartItems?.find(
                                                      (item) =>
                                                        item.id === data.id
                                                    )
                                                  ) {
                                                    removeFromWishList(e, data);
                                                  } else {
                                                    addToUserWishList(e, data);
                                                  }
                                                }}
                                              >
                                                {UsercartItems?.find(
                                                  (item) => item.id === data.id
                                                ) ? (
                                                  <FcLike />
                                                ) : (
                                                  <FiHeart />
                                                )}
                                              </Link>
                                            </OverlayTrigger>
                                          ) : (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={userTip}
                                            >
                                              <span
                                                className=""
                                                onClick={(e) => UserLogin(e)}
                                              >
                                                <FiHeart
                                                  style={{
                                                    fontSize: "22px",
                                                  }}
                                                />
                                              </span>
                                            </OverlayTrigger>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </motion.div>
                                </div>
                              </>
                            );
                          })}
                        </div>

                        {totalPages > 1 && (
                          <div className="paginationArea">
                            <nav aria-label="navigation">
                              <ul className="pagination">
                                <li
                                  className={`page-item ${
                                    pagination.currentPage === 1
                                      ? "disabled"
                                      : ""
                                  }`}
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
                                    </svg>{" "}
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
                                      (pageNumber >=
                                        pagination.currentPage - 1 &&
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
                      </>
                    ) : (
                      <div className="not-products">
                        <p>No products available.</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
