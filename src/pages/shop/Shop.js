import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { FaFilePdf, FaRegFilePdf, FaRegStar, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ShopServices from "../../services/Shop";
import FilterServices from "../../services/Filter";
import DealerWishlist from "../../services/Dealer/Collection";
import DealerPdf from "../../services/Dealer/PdfShare";
import UserWishlist from "../../services/Auth";
import { WishlistSystem } from "../../context/WishListContext";
import Loader from "../../components/common/Loader";
import { useNavigation } from "../../context/NavigationContext";

const Shop = () => {
  const { dispatch: wishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: removeWishlistDispatch } = useContext(WishlistSystem);

  const location = useLocation();
  const navigate = useNavigate();

  const { setPreviousPageUrl } = useNavigation();

  useEffect(() => {
    setPreviousPageUrl(location.pathname + location.search);
  }, [location, setPreviousPageUrl]);

  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [searchInput, setSearchInput] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [genderData, setGenderData] = useState([]);
  const [gender, setGender] = useState();
  const [selectedGender, setSelectedGender] = useState(null);

  const [filterTag, setFilterTag] = useState([]);
  const [tag, setTag] = useState();
  const [selectedTag, setSelectedTag] = useState(null);

  const [PriceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });

  const [FilterPriceRange, setFilterPriceRange] = useState({
    minprice: 0,
    maxprice: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [filterData, setFilterData] = useState([]);
  const [paginate, setPaginate] = useState();

  const [collection_status, setCollectionStatus] = useState(false);
  const [DealerCollection, setDealerCollection] = useState([]);

  const [userWishlist, setUserWishlist] = useState(false);
  const [goldColor, setGoldColor] = useState("yellow_gold");
  const [goldType, setGoldType] = useState("18k");
  const [UsercartItems, setUserCartItems] = useState([]);
  const [pdfItems, setPdfItems] = useState([]);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // sort by searching
  const searchbar = (e) => {
    setSearchInput(e.target.value);
  };

  // sort by dropdown functions
  const [options] = useState([
    { value: "new_added", label: "New Added" },
    { value: "low_to_high", label: "Price: low to high" },
    { value: "high_to_low", label: "Price: high to low" },
    { value: "highest_selling", label: "Top Seller" },
  ]);

  const handleSelectChange = (selectedSort) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    if (selectedSort) {
      queryParams.set("sort_by", selectedSort.value);
    } else {
      queryParams.delete("sort_by");
    }

    navigate(`/shop?${queryParams.toString()}`);
    setSelectedOption(selectedSort);
  };

  // 4 Filter APIS call
  const CategoryFilter = () => {
    FilterServices.categoryFilter()
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const GenderFilter = () => {
    FilterServices.genderFilter()
      .then((res) => {
        setGenderData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectCategory = (categoryId) => {
    setIsLoading(true);

    setSearchInput("");

    setSelectedOption("");

    setGender(null);
    setSelectedGender(null);

    setTag(null);
    setSelectedTag(null);

    setPriceRange("");
    navigate(`/shop${categoryId ? `?category_id=${categoryId.value}` : ""}`);

    setCategory(categoryId ? categoryId.value : null);
    setSelectedCategory(categoryId);
  };

  const handleSelectGender = (genderId) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);
    if (genderId) {
      queryParams.set("gender_id", genderId.value);
    } else {
      queryParams.delete("gender_id");
    }

    navigate(`/shop?${queryParams.toString()}`);

    setGender(genderId ? genderId?.value : null);
    setSelectedGender(genderId);
  };

  const handleSelectTag = (selectedTags) => {
    setIsLoading(true);

    const queryParams = new URLSearchParams(location.search);

    const selectedTagId = selectedTags ? parseFloat(selectedTags.value) : null;
    if (selectedTagId !== null) {
      queryParams.set("tag_id", selectedTagId);
    } else {
      queryParams.delete("tag_id");
    }

    navigate(`/shop?${queryParams.toString()}`);

    setTag(selectedTagId);
    setSelectedTag(selectedTags);
  };

  const handleSliderChange = (e) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    queryParams.set("min_price", e[0]);
    queryParams.set("max_price", e[1]);

    navigate(`/shop?${queryParams.toString()}`);

    setPriceRange({ minprice: e[0], maxprice: e[1] });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortbyId = searchParams.get("sort_by");
    const categoryId = searchParams.get("category_id");
    const genderId = searchParams.get("gender_id");
    const tagIds = searchParams.getAll("tag_id");
    const lowPrice = searchParams.getAll("min_price");
    const highPrice = searchParams.getAll("max_price");

    if (lowPrice !== null || highPrice !== null) {
      const selectedPrice = {
        minprice:
          lowPrice !== null ? parseFloat(lowPrice) : FilterPriceRange.minprice,
        maxprice:
          highPrice !== null
            ? parseFloat(highPrice)
            : FilterPriceRange.maxprice,
      };
      setPriceRange(selectedPrice);
    } else {
      setIsLoading(true);
      setPriceRange({ minprice: null, maxprice: null });
    }

    if (sortbyId && sortbyId.length > 0) {
      if (sortbyId) {
        const selectedSort = options.find((item) => item.value === sortbyId);

        if (selectedSort) {
          setSelectedOption(selectedSort);
        }
      }
    } else {
      setIsLoading(true);
      setSelectedOption(null);
    }

    if (categoryId && categoryId.length > 0) {
      if (categoryId) {
        const Category_ids = categoryData?.find(
          (item) => item.id === Number(categoryId)
        );

        if (Category_ids) {
          setCategory(Number(categoryId));
          setSelectedCategory({
            value: Category_ids.id,
            label: Category_ids.name,
          });
        }
      }
    } else {
      setIsLoading(true);
      setCategory(null);
      setSelectedCategory("");
    }

    if (genderId && genderId.length > 0) {
      if (genderId) {
        const Gender_ids = genderData?.find(
          (item) => item.id === Number(genderId)
        );

        if (Gender_ids) {
          setGender(Number(genderId));
          setSelectedGender({
            value: Gender_ids.id,
            label: Gender_ids.name,
          });
        }
      }
    } else {
      setIsLoading(true);
      setGender(null);
      setSelectedGender("");
    }

    if (tagIds && tagIds.length > 0) {
      setIsLoading(true);

      try {
        const parsedTagIds = tagIds[0].split(",").map((id) => parseFloat(id));
        setTag(parsedTagIds[0]);

        if (parsedTagIds && parsedTagIds.length > 0) {
          const selectedTagID = filterTag?.find(
            (item) => item.id === parsedTagIds[0]
          );

          if (selectedTagID) {
            setSelectedTag({
              value: selectedTagID?.id,
              label: selectedTagID?.name,
            });
          } else {
            console.error("Tag not found with ID:", parsedTagIds[0]);
          }
        }
      } catch (error) {
        console.error("Error parsing tag IDs:", error);
        setTag(null);
      }
    } else {
      setIsLoading(true);
      setTag(null);
      setSelectedTag("");
    }
  }, [location.search, filterTag?.length]);

  const FilterData = (offset = 0) => {
    ShopServices.allfilterdesigns({
      category_id: category,
      gender_id: gender,
      tag_id: tag,
      search: searchInput,
      min_price: PriceRange?.minprice,
      max_price: PriceRange?.maxprice,
      sort_by: selectedOption?.value,
      userType: userType,
      userId: userId,
      offset: offset,
    })
      .then((res) => {
        setIsLoading(false);
        setFilterData(res.data?.designs);
        setFilterTag(res.data?.tags);
        setPaginate(res.data);
        setFilterPriceRange({
          minprice: res.data.minprice,
          maxprice: res.data.maxprice,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  };

  useEffect(() => {
    if (Phone) {
      GetUserWishList();
    }

    if (email) {
      GetDealerSelection();
    }

    CategoryFilter();
    GenderFilter();
  }, []);

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
        gold_color: goldColor,
        gold_type: goldType,
        design_name: product?.name,
      })
        .then((res) => {
          if (res.success === true) {
            setUserWishlist(true);
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
      gold_color: goldColor,
      gold_type: goldType,
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
            setCollectionStatus(true);
            toast.success("Design has been Added to Your Collection.");
            FilterData();
            GetDealerSelection();
            resetPagination();
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

  useLayoutEffect(() => {
    getPdfList();
  }, []);

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

  // PAGINATION FUNCTION
  const totalPages = Math.ceil(paginate?.total_records / 40);

  const [pagination, setPagination] = useState({});

  const resetPagination = () => {
    setPagination({
      currentPage: 1,
      dataShowLength: 40,
    });
  };

  const paginationPage = (page) => {
    const newOffset = (page - 1) * pagination.dataShowLength;
    FilterData(newOffset);
    setPagination({ ...pagination, currentPage: page });
    scrollup();
    setIsLoading(true);
  };

  const paginationPrev = (e) => {
    e.preventDefault();
    if (pagination.currentPage > 1) {
      const prevPage = pagination.currentPage - 1;
      const newOffset = (prevPage - 1) * pagination.dataShowLength;
      FilterData(newOffset);
      setPagination({ ...pagination, currentPage: prevPage });
      scrollup();
      setIsLoading(true);
    }
  };

  const paginationNext = (e) => {
    e.preventDefault();
    if (pagination.currentPage < totalPages) {
      const nextPage = pagination.currentPage + 1;
      const newOffset = (nextPage - 1) * pagination.dataShowLength;
      FilterData(newOffset);
      setPagination({ ...pagination, currentPage: nextPage });
      scrollup();
      setIsLoading(true);
    }
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

  useEffect(() => {
    resetPagination();
    FilterData(0);
  }, [category, tag, gender, searchInput, PriceRange, selectedOption]);

  const wishlistTip = <Tooltip id="tooltip">wishlist</Tooltip>;
  const selectionTip = <Tooltip id="tooltip">My Selections</Tooltip>;
  const pdfTip = <Tooltip id="tooltip">My PDF share</Tooltip>;
  const userTip = (
    <Tooltip id="tooltip">Login to add wishlist products</Tooltip>
  );

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
              <div className="col-md-3 col-12">
                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  isClearable={true}
                  isSearchable={false}
                  options={options}
                  placeholder="Sort By"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-12 mt-2 mt-md-2">
                <div className="search_bar">
                  <input
                    className="form-control"
                    placeholder="Search by design code"
                    onChange={(e) => searchbar(e)}
                    type="search"
                    isClearable={true}
                  />
                  {searchInput && searchInput.length >= 1 ? null : (
                    <BsSearch className="search-icon cursor-pointer" />
                  )}
                </div>
              </div>
              <div className="col-md-3 col-12 mt-2 mt-md-2">
                <Select
                  placeholder="Shop by Gender"
                  isClearable
                  isSearchable={false}
                  value={selectedGender}
                  options={genderData?.map((data) => ({
                    value: data?.id,
                    label: data?.name,
                  }))}
                  onChange={handleSelectGender}
                />
              </div>
              <div className="col-md-3 col-12 mt-2 mt-md-2">
                <Select
                  placeholder="Shop by Tag"
                  isClearable
                  isSearchable={false}
                  value={selectedTag}
                  options={filterTag?.map((data) => ({
                    value: data?.id,
                    label: data?.name,
                  }))}
                  onChange={handleSelectTag}
                />
              </div>
              <div className="col-md-3 col-12 mt-md-0">
                <Accordion className="accordian">
                  <Accordion.Item eventKey="3" className="my-2">
                    <Accordion.Header>Shop by price</Accordion.Header>
                    <Accordion.Body className="p-4 mb-2">
                      <div className="d-flex justify-content-between">
                        <p>
                          From :
                          <strong>
                            ₹
                            {PriceRange?.minprice
                              ? PriceRange?.minprice
                              : FilterPriceRange.minprice}
                          </strong>
                        </p>
                        <p>
                          To :
                          <strong>
                            ₹
                            {PriceRange?.maxprice
                              ? PriceRange?.maxprice
                              : FilterPriceRange.maxprice}
                          </strong>
                        </p>
                      </div>
                      <Slider
                        range
                        allowCross={false}
                        min={FilterPriceRange.minprice}
                        max={FilterPriceRange.maxprice}
                        marks={{
                          [FilterPriceRange?.minprice]: "Min",
                          [FilterPriceRange?.maxprice]: "Max",
                        }}
                        onAfterChange={handleSliderChange}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-md-12">
                {isLoading ? (
                  <div className="animation-loading">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {filterData?.length > 0 ? (
                      <>
                        <div className="row">
                          {filterData?.map((data) => {
                            return (
                              <>
                                <div className="col-md-3 col-sm-4 col-xs-6">
                                  <div className="item-product text-center">
                                    <Link
                                      to={`/shopdetails/${data?.id}`}
                                      onClick={() =>
                                        setPreviousPageUrl(
                                          location.pathname + location.search
                                        )
                                      }
                                    >
                                      <div className="product-thumb">
                                        {data?.image ? (
                                          <>
                                            <img
                                              src={data?.image}
                                              alt={data?.name}
                                              className="w-100"
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

                                        <label>
                                          ₹
                                          {numberFormat(data?.total_amount_18k)}
                                        </label>
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
                                          <div className="mt-3">
                                            <div>
                                              {email ? (
                                                <OverlayTrigger
                                                  placement="top"
                                                  overlay={selectionTip}
                                                >
                                                  <Link
                                                    to="#"
                                                    className=""
                                                    onClick={(e) => {
                                                      if (
                                                        DealerCollection?.find(
                                                          (item) =>
                                                            item?.id ===
                                                            data?.id
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
                                                  onClick={(e) =>
                                                    DealerLogin(e)
                                                  }
                                                >
                                                  <FaRegStar />
                                                </span>
                                              )}
                                            </div>
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
                                                            item?.id ===
                                                            data?.id
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
                                                  onClick={(e) =>
                                                    DealerLogin(e)
                                                  }
                                                >
                                                  <FaRegFilePdf />
                                                </span>
                                              )}
                                            </div>
                                          </div>
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
                                                  style={{ fontSize: "22px" }}
                                                />
                                              </span>
                                            </OverlayTrigger>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>

                        {totalPages > 1 && (
                          <div className="pt-5">
                            <div className="paginationArea">
                              <nav aria-label="navigation">
                                <ul className="pagination">
                                  {/* Previous Page Button */}
                                  <li
                                    className={`page-item ${
                                      pagination.currentPage === 1
                                        ? "disabled"
                                        : ""
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
                                      onClick={(e) => paginationPrev(e)}
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
                                        (pageNumber >=
                                          pagination.currentPage - 1 &&
                                          pageNumber <=
                                            pagination.currentPage + 1)
                                      ) {
                                        return (
                                          <li
                                            key={pageNumber}
                                            className={`page-item ${
                                              isCurrentPage ? "active" : ""
                                            }`}
                                          >
                                            <button
                                              className="page-link"
                                              onClick={() =>
                                                paginationPage(pageNumber)
                                              }
                                            >
                                              {pageNumber}
                                            </button>
                                          </li>
                                        );
                                      }

                                      // Display ellipses
                                      if (
                                        index === 1 ||
                                        index === totalPages - 2
                                      ) {
                                        return (
                                          <li
                                            key={pageNumber}
                                            className="page-item disabled"
                                          >
                                            <button className="page-link">
                                              ...
                                            </button>
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
                                      onClick={(e) => paginationNext(e)}
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
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="not-products">
                        <p>No products available.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
