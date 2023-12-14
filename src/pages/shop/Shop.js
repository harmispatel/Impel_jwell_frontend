import React, { useContext, useEffect, useState } from "react";
import { BsHeart, BsSearch } from "react-icons/bs";
import SidebarFilter from "../../components/common/SidebarFilter";
import ReactLoading from "react-loading";
import ShopServices from "../../services/Shop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DealerWishlist from "../../services/Dealer/Collection";
import UserWishlist from "../../services/Auth";
import UserCartService from "../../services/Cart";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { WishlistSystem } from "../../context/WishListContext";
import { FaRegStar, FaStar } from "react-icons/fa";

const Shop = ({ product }) => {
  const { dispatch: wishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: wishlistRemoveDispatch } = useContext(WishlistSystem);

  const location = useLocation();
  const navigate = useNavigate();

  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [searchInput, setSearchInput] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [tag, setTag] = useState([]);
  const [PriceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [collection_status, setCollectionStatus] = useState(false);
  const [DealerCollection, setDealerCollection] = useState([]);

  const [userWishlist, setUserWishlist] = useState(false);
  const [goldColor, setGoldColor] = useState("yellow_gold");
  const [goldType, setGoldType] = useState("18k");
  const [UsercartItems, setUserCartItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLength: 50,
  });

  const totalPage = Math.ceil(allData.length / pagination.dataShowLength);

  const paginationPage = (page) => {
    setPagination({ ...pagination, currentPage: page });
    scrollup();
  };
  const paginationArea = () => {
    const items = [];
    let threePoints = true;
    for (let number = 1; number <= totalPage; number++) {
      if (
        number <= 1 ||
        number >= totalPage ||
        (number >= pagination.currentPage - 1 &&
          number <= pagination.currentPage + 1)
      ) {
        items.push(
          <li
            key={number}
            className={`page-item ${
              pagination.currentPage === number ? "active" : ""
            }`}
            onClick={() => {
              paginationPage(number);
            }}
          >
            <a className="page-link">{number}</a>
          </li>
        );
      } else {
        if (threePoints === true) {
          items.push(
            <li key={number} className="page-item threePoints">
              <a className="page-link">...</a>
            </li>
          );
          threePoints = false;
        }
      }
    }
    return items;
  };

  const paginationPrev = () => {
    if (pagination.currentPage > 1) {
      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
      scrollup();
    } else {
      setPagination({ ...pagination, currentPage: 1 });
      scrollup();
    }
  };

  const paginationNext = () => {
    if (pagination.currentPage < totalPage) {
      setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
      scrollup();
    } else {
      setPagination({ ...pagination, currentPage: totalPage });
      scrollup();
    }
  };

  const scrollup = () => {
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let tagIds = searchParams.getAll("tag_id");
    setIsLoading(true);
    tagIds =
      Array.isArray(tagIds) && tagIds?.length > 0
        ? tagIds[0].split(",")
        : tagIds
        ? tagIds
        : [];
    tagIds = tagIds.map((i) => parseFloat(i));
    setTag(tagIds);
  }, [location.search]);

  useEffect(() => {
    if (
      category.length > 0 ||
      tag?.length > 0 ||
      gender.length > 0 ||
      searchInput.length > 0 ||
      PriceRange.minprice !== null ||
      selectedOption.length > 0
    ) {
      FilterData();
    }
  }, [category, tag?.length, gender, searchInput, PriceRange, selectedOption]);

  // sort by searching
  const searchbar = (e) => {
    setIsLoading(true);
    setSearchInput(e.target.value);
  };

  // sort by filters
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    const sortfield = event.target.value;
    let sorted = [...allData];
    switch (sortfield) {
      case "new_added":
      case "low_to_high":
      case "high_to_low":
      case "highest_selling":
      case "clear_all":
        setIsLoading(true);
        break;
      default:
        break;
    }
    setFilterData(sorted);
  };

  // side filter 4 functions
  const handleCategory = (e) => {
    setIsLoading(true);
    const selectedCategory = e.target.value;
    if (e.target.checked) {
      setCategory([selectedCategory]);
      scrollup();
    } else {
      setCategory([]);
      AllData();
      scrollup();
    }
  };
  const handleGender = (e) => {
    setIsLoading(true);
    const selectedGender = e.target.value;
    if (e.target.checked) {
      setGender([selectedGender]);
      scrollup();
    } else {
      setGender([]);
      AllData();
      scrollup();
    }
  };

  // const handleTag = (e) => {
  //   setIsLoading(true);
  //   const selectedTag = e.target.value;
  //   if (e.target.checked) {
  //     setTag([selectedTag]);
  //     scrollup();
  //   } else {
  //     setTag([]);
  //     AllData();
  //     scrollup();
  //   }
  // };

  const handleTag = (e) => {
    setIsLoading(true);
    const selectedTagId = parseFloat(e.target.value);
    if (e.target.checked) {
      setTag([...tag, selectedTagId]);
      const updatedTagIds = [...tag, selectedTagId];
      navigate(`/shop?tag_id=${updatedTagIds}`);
      scrollup();
    } else {
      const updatedTags = tag.filter((item) => item !== selectedTagId);
      setTag(updatedTags);
      if (updatedTags?.length > 0) {
        navigate(`/shop?tag_id=${updatedTags}`);
      } else {
        navigate(`/shop`);
      }
      if (updatedTags?.length === 0) {
        AllData();
        scrollup();
      }
    }
  };

  const handleSliderChange = (e) => {
    setIsLoading(true);
    setPriceRange({ minprice: e[0], maxprice: e[1] });
    scrollup();
  };

  const AllData = () => {
    const userData = {
      userType: userType,
      userId: userId,
    };
    ShopServices.alldesigns(userData)
      .then((res) => {
        setIsLoading(false);
        setAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const FilterData = () => {
    const userData = {
      categoryIds: category,
      GenderIds: gender,
      TagIds: tag,
      search: searchInput,
      MinPrice: PriceRange?.minprice,
      MaxPrice: PriceRange?.maxprice,
      sort_by: selectedOption,
      userType: userType,
    };

    ShopServices.allfilterdesigns(userData)
      .then((res) => {
        setIsLoading(false);
        setFilterData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // user wishlist API
  const GetCartList = async () => {
    UserWishlist.userWishlist({ phone: Phone })
      .then((res) => {
        setUserCartItems(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // // user cart API
  // const GetUserCartList = async () => {
  //   UserCartService.CartList({ phone: Phone })
  //     .then((res) => {
  //       setCartItems(res.data.cart_items);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Dealer wishlist API
  const collectionCheck = () => {
    DealerWishlist.ListCollection({ email: email })
      .then((res) => {
        setDealerCollection(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    AllData();
    collectionCheck();
    // GetUserCartList();
    GetCartList();
  }, []);

  // user wishlist products add
  const addToUserWishList = async (product) => {
    const payload = { id: product.id };
    if (!UsercartItems.some((item) => item.id === product.id)) {
      UserWishlist.addtoWishlist({
        phone: Phone,
        design_id: product.id,
        gold_color: goldColor,
        gold_type: goldType,
      })
        .then((res) => {
          if (res.success === true) {
            setUserWishlist(true);
            toast.success("Design has been Added to Your Wishlist");
            GetCartList();
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
  const removeFromWishList = (product) => {
    const payload = { id: product.id };
    UserWishlist.removetoWishlist({
      phone: Phone,
      design_id: product.id,
      gold_color: goldColor,
      gold_type: goldType,
    })
      .then((res) => {
        if (res.success === true) {
          toast.success("Design has been Removed from Your Wishlist.");
          GetCartList();
          wishlistRemoveDispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealer Wishlist products add
  const AddToDealerWishlist = async (product) => {
    if (!DealerCollection.some((item) => item.id === product?.id)) {
      DealerWishlist.addtoDealerWishlist({
        email: email,
        design_id: product?.id,
      })
        .then((res) => {
          if (res.success === true) {
            setCollectionStatus(true);
            toast.success("Design has been Added to Your Collection.");
            AllData();
            collectionCheck();
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const removefromdealerwishlist = (product) => {
    DealerWishlist.removetoWishlist({
      email: localStorage.getItem("email"),
      design_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message);
          AllData();
          collectionCheck();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="shop">
      <div className="container">
        <div className="shopping_data">
          <div className="filters">
            <div className="row">
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-2">
                    <div className="csm_sort_btn">
                      <input
                        type="radio"
                        id="new_added"
                        className="d-none"
                        name="attr_option[0]"
                        checked={selectedOption === "new_added"}
                        onChange={handleRadioChange}
                        value="new_added"
                      />
                      <label htmlFor="new_added" className="">
                        New Added
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="csm_sort_btn">
                      <input
                        type="radio"
                        id="low_to_high"
                        value="low_to_high"
                        name="attr_option[0]"
                        checked={selectedOption === "low_to_high"}
                        onChange={handleRadioChange}
                        className="d-none"
                      />
                      <label htmlFor="low_to_high">Price : low to high</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="csm_sort_btn">
                      <input
                        type="radio"
                        id="high_to_low"
                        className="d-none"
                        value="high_to_low"
                        name="attr_option[0]"
                        checked={selectedOption === "high_to_low"}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="high_to_low">Price : high to low</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="csm_sort_btn">
                      <input
                        type="radio"
                        id="highest_selling"
                        value="highest_selling"
                        name="attr_option[0]"
                        checked={selectedOption === "highest_selling"}
                        onChange={handleRadioChange}
                        className="d-none"
                      />
                      <label htmlFor="highest_selling">Top Seller</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="csm_sort_btn">
                      <input
                        type="radio"
                        id="clear_all"
                        className="d-none"
                        value="clear_all"
                        name="attr_option[0]"
                        checked={selectedOption === "clear_all"}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="clear_all">Clear All</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-3">
              <div className="search_bar">
                <input
                  className="form-control"
                  placeholder="Please enter a design code"
                  onChange={(e) => searchbar(e)}
                  type="search"
                />
                {searchInput.length === 0 && (
                  <BsSearch className="search-icon" />
                )}
              </div>
              <div className="sidebar">
                <SidebarFilter
                  Categoryheader="Shop by category"
                  Genderheader="Shop by Gender"
                  Tagheader="Shop by Tag"
                  Priceheader="Shop by Price"
                  minprice={PriceRange.minprice}
                  maxprice={PriceRange.maxprice}
                  onCategoryChange={(e) => handleCategory(e)}
                  onGenderChange={(e) => handleGender(e)}
                  onTagChange={(e) => handleTag(e)}
                  onHandleSliderChange={(e) => handleSliderChange(e)}
                  tag={tag}
                />
              </div>
            </div>
            <div className="col-md-9">
              {isLoading ? (
                <div className="h-100 d-flex justify-content-center">
                  <ReactLoading
                    type={"spinningBubbles"}
                    color={"#053961"}
                    height={"20%"}
                    width={"10%"}
                    className="loader"
                  />
                </div>
              ) : (
                <>
                  {searchInput.length === 0 &&
                  selectedOption.length === 0 &&
                  category.length === 0 &&
                  gender.length === 0 &&
                  tag.length === 0 &&
                  PriceRange.minprice === null ? (
                    <>
                      {allData?.length > 0 ? (
                        <>
                          <div className="row">
                            {allData
                              ?.slice(
                                (pagination.currentPage - 1) *
                                  pagination.dataShowLength,
                                pagination.dataShowLength *
                                  pagination.currentPage
                              )
                              .map((product) => {
                                return (
                                  <div key={product.id} className="col-md-4">
                                    <Link
                                      to={`/shopdetails/${product.id}`}
                                      className="product_data"
                                      target="_blank"
                                    >
                                      {product?.image ? (
                                        <img
                                          src={product?.image}
                                          alt={product?.name}
                                          className="w-100"
                                        />
                                      ) : (
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                                          alt=""
                                          className="w-100"
                                        />
                                      )}

                                      <div className="edit">
                                        <div>
                                          {userType == 1 ? (
                                            <>
                                              {email ? (
                                                <Link
                                                  to="#"
                                                  data-tooltip-id="my-tooltip-12"
                                                  onClick={() => {
                                                    if (
                                                      DealerCollection?.find(
                                                        (item) =>
                                                          item.id === product.id
                                                      )
                                                    ) {
                                                      removefromdealerwishlist(
                                                        product
                                                      );
                                                    } else {
                                                      AddToDealerWishlist(
                                                        product
                                                      );
                                                    }
                                                  }}
                                                >
                                                  {DealerCollection?.find(
                                                    (item) =>
                                                      item.id === product.id
                                                  ) ? (
                                                    <FaStar />
                                                  ) : (
                                                    <FaRegStar />
                                                  )}
                                                </Link>
                                              ) : (
                                                <Link
                                                  to="/Dealer_login"
                                                  data-tooltip-id="my-tooltip-12"
                                                >
                                                  <FaRegStar />
                                                </Link>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {Phone ? (
                                                <Link
                                                  to="#"
                                                  data-tooltip-id="my-tooltip-9"
                                                  onClick={() => {
                                                    if (
                                                      UsercartItems?.find(
                                                        (item) =>
                                                          item.id === product.id
                                                      )
                                                    ) {
                                                      removeFromWishList(
                                                        product
                                                      );
                                                    } else {
                                                      addToUserWishList(
                                                        product
                                                      );
                                                    }
                                                  }}
                                                >
                                                  {UsercartItems?.find(
                                                    (item) =>
                                                      item.id === product.id
                                                  ) ? (
                                                    <FcLike />
                                                  ) : (
                                                    <BsHeart />
                                                  )}
                                                </Link>
                                              ) : (
                                                <Link
                                                  to="/login"
                                                  data-tooltip-id="my-tooltip-9"
                                                >
                                                  <BsHeart />
                                                </Link>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="product_details">
                                            <h4>{product?.name}</h4>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="product_details text-end">
                                            <p>{product?.code}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product_details">
                                        <h5>
                                          ₹
                                          {product?.total_price_18k?.toLocaleString(
                                            "en-US"
                                          )}
                                        </h5>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                          </div>
                        </>
                      ) : (
                        <div className="not-products">
                          <p>No products available.</p>
                        </div>
                      )}
                      <div className="paginationArea">
                        <nav aria-label="navigation" className="">
                          <ul className="pagination">
                            <li className="page-item previous">
                              <a
                                className="page-link"
                                onClick={() => {
                                  paginationPrev();
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-chevron-left"
                                >
                                  <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                <span>Prev</span>
                              </a>
                            </li>

                            {paginationArea()}

                            <li className="page-item next">
                              <a
                                onClick={() => {
                                  paginationNext();
                                }}
                                className="page-link"
                              >
                                <span>Next</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-chevron-right"
                                >
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </>
                  ) : (
                    <>
                      {filterData?.length > 0 ? (
                        <>
                          <div className="row">
                            {filterData?.map((data) => {
                              return (
                                <div className="col-md-4">
                                  <Link
                                    to={`/shopdetails/${data.id}`}
                                    className="product_data"
                                    target="_blank"
                                  >
                                    {data.image ? (
                                      <img
                                        src={data.image}
                                        key={data.id}
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
                                    <div className="edit">
                                      <div>
                                        {userType == 1 ? (
                                          <>
                                            {email ? (
                                              <Link
                                                to="#"
                                                data-tooltip-id="my-tooltip-12"
                                                onClick={() => {
                                                  if (
                                                    DealerCollection?.find(
                                                      (item) =>
                                                        item?.id === data?.id
                                                    )
                                                  ) {
                                                    removefromdealerwishlist(
                                                      data
                                                    );
                                                  } else {
                                                    AddToDealerWishlist(data);
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
                                            ) : (
                                              <Link
                                                to="/Dealer_login"
                                                data-tooltip-id="my-tooltip-12"
                                              >
                                                <FaRegStar />
                                              </Link>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {Phone ? (
                                              <Link
                                                to="#"
                                                data-tooltip-id="my-tooltip-9"
                                                onClick={() => {
                                                  if (
                                                    UsercartItems?.find(
                                                      (item) =>
                                                        item.id === data.id
                                                    )
                                                  ) {
                                                    removeFromWishList(data);
                                                  } else {
                                                    addToUserWishList(data);
                                                  }
                                                }}
                                              >
                                                {UsercartItems?.find(
                                                  (item) => item.id === data.id
                                                ) ? (
                                                  <FcLike />
                                                ) : (
                                                  <BsHeart />
                                                )}
                                              </Link>
                                            ) : (
                                              <Link
                                                to="/login"
                                                data-tooltip-id="my-tooltip-9"
                                              >
                                                <BsHeart />
                                              </Link>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="product_details">
                                          <h4>{data?.name}</h4>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="product_details text-end">
                                          <p>{data?.code}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="product_details">
                                      <h5>
                                        ₹
                                        {data?.total_price_18k?.toLocaleString(
                                          "en-US"
                                        )}
                                      </h5>
                                    </div>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="not-products">
                          <p>
                            No products available based on the selected filters.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              <ReactTooltip id="my-tooltip-7" place="top" content="cart" />
              <ReactTooltip
                id="my-tooltip-9"
                place="bottom"
                content="wishlist"
              />
              <ReactTooltip
                id="my-tooltip-12"
                place="bottom"
                content="My Collections"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
