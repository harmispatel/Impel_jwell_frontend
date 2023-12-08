import React, { useContext, useEffect, useState } from "react";
import { BsHeart, BsSearch } from "react-icons/bs";
import SidebarFilter from "../../components/common/SidebarFilter";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopServices from "../../services/Shop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DealerWishlist from "../../services/Dealer/Collection";
import UserWishlist from "../../services/Auth";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import UserCartService from "../../services/Cart";
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
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [tag, setTag] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(20);
  const [PriceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });
  const [checkList, setCheckList] = useState([]);
  const [collection_status, setCollectionStatus] = useState(false);
  const [userWishlist, setUserWishlist] = useState(false);
  const [UsercartItems, setUserCartItems] = useState([]);
  const [DealercartItems, setDealerCartItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

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
      tag.length > 0 ||
      gender.length > 0 ||
      searchInput.length > 0 ||
      PriceRange.minprice !== null ||
      selectedOption.length > 0
    ) {
      FilterData();
    }
  }, [category, tag?.length, gender, searchInput, PriceRange, selectedOption]);

  // sort by searching
  const serchbar = (e) => {
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
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter((item) => item !== e.target.value));
      if (category.filter((item) => item !== e.target.value)?.length === 0) {
        AllData();
      }
    }
  };
  const handleGender = (e) => {
    setIsLoading(true);
    if (e.target.checked) {
      setGender([...gender, e.target.value]);
    } else {
      setGender(gender.filter((item) => item !== e.target.value));
      AllData();
    }
  };

  const handleTag = (e) => {
    setIsLoading(true);
    const selectedTagId = parseFloat(e.target.value);
    if (e.target.checked) {
      setTag([...tag, selectedTagId]);
      const updatedTagIds = [...tag, selectedTagId];
      navigate(`/shop?tag_id=${updatedTagIds}`);
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
      }
    }
  };

  const handleSliderChange = (e) => {
    setIsLoading(true);
    setPriceRange({ minprice: e[0], maxprice: e[1] });
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
        setDisplayedItems(res.data?.slice(0, loadMore));
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

  const collectionCheck = () => {
    DealerWishlist.ListCollection({ email: email })
      .then((res) => {
        setCheckList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetCartList = async () => {
    UserWishlist.userWishlist({ phone: Phone })
      .then((res) => {
        setUserCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DealerList = async () => {
    DealerWishlist.ListCollection({ email: email })
      .then((res) => {
        setDealerCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetUserCartList = async () => {
    UserCartService.CartList({ phone: Phone })
      .then((res) => {
        setCartItems(res.data.cart_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    AllData();
    collectionCheck();
    GetUserCartList();
    GetCartList();
    DealerList();
  }, []);

  const FetchMoreData = async () => {
    setTimeout(() => {
      setDisplayedItems((prevItems) => [
        ...prevItems,
        ...allData.slice(loadMore, loadMore + 20),
      ]);
      setLoadMore(loadMore + 20);
    }, 200);
  };

  // user wishlist products add
  const addToUserWishList = async (product) => {
    const payload = { id: product.id };
    if (!UsercartItems.some((item) => item.id === product.id)) {
      UserWishlist.addtoWishlist({
        phone: Phone,
        design_id: product.id,
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
  const addToDealerWishList = async (product) => {
    if (!DealercartItems.some((item) => item.id === product.id)) {
      DealerWishlist.addtoDealerWishlist({
        email: email,
        design_id: product.id,
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

  // user add to cart function
  // const handleAddToCart = (product) => {
  //   if (!cartItems.some((item) => item.design_id === product.id)) {
  //     if (Verification == 3) {
  //       const CartData = {
  //         phone: Phone,
  //         design_name: product.name,
  //         design_id: product.id,
  //       };

  //       UserCartService.AddtoCart(CartData)
  //         .then((res) => {
  //           if (res.status === true) {
  //             GetUserCartList();
  //             localStorage.setItem("total_quantity", res.data.total_quantity);
  //             toast.success(res.message);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       setShowEdit(true);
  //     }
  //   } else {
  //   }
  // };

  return (
    <section className="shop">
      <div className="container">
        <div className="shopping_data">
          <div className="filters">
            <div className="row">
              <div className="col-md-12">
                <div className="search_bar">
                  <input
                    className="form-control"
                    placeholder="Search any product"
                    onChange={(e) => serchbar(e)}
                    type="search"
                  />
                  {searchInput.length === 0 && (
                    <BsSearch className="search-icon" />
                  )}
                </div>
              </div>
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
                      <label for="new_added" className="">
                        New Added
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="csm_sort_btn">
                      <input
                        type="radio"
                        id="low_to_high"
                        value="low_to_high"
                        name="attr_option[0]"
                        checked={selectedOption === "low_to_high"}
                        onChange={handleRadioChange}
                        class="d-none"
                      />
                      <label for="low_to_high">Price : low to high</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="csm_sort_btn">
                      <input
                        type="radio"
                        id="high_to_low"
                        class="d-none"
                        value="high_to_low"
                        name="attr_option[0]"
                        checked={selectedOption === "high_to_low"}
                        onChange={handleRadioChange}
                      />
                      <label for="high_to_low">Price : high to low</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="csm_sort_btn">
                      <input
                        type="radio"
                        id="highest_selling"
                        value="highest_selling"
                        name="attr_option[0]"
                        checked={selectedOption === "highest_selling"}
                        onChange={handleRadioChange}
                        class="d-none"
                      />
                      <label for="highest_selling">Top Seller</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="csm_sort_btn">
                      <input
                        type="radio"
                        id="clear_all"
                        class="d-none"
                        value="clear_all"
                        name="attr_option[0]"
                        checked={selectedOption === "clear_all"}
                        onChange={handleRadioChange}
                      />
                      <label for="clear_all">Clear All</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-3">
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
                    <InfiniteScroll
                      dataLength={displayedItems.length}
                      next={FetchMoreData}
                      hasMore={true}
                      style={{ overflow: "hidden" }}
                      loader={pageLoading ? <h4>Loading...</h4> : null}
                    >
                      {displayedItems?.length > 0 ? (
                        <>
                          <div className="row">
                            {displayedItems?.map((product) => {
                              return (
                                <div key={product.id} className="col-md-4">
                                  <Link
                                    to={`/shopdetails/${product.id}`}
                                    className="product_data"
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
                                      {/* <div>
                                        {Phone ? (
                                          <>
                                            <Link
                                              to="#"
                                              data-tooltip-id="my-tooltip-7"
                                              onClick={() =>
                                                handleAddToCart(product)
                                              }
                                            >
                                              {cartItems.find(
                                                (item) =>
                                                  item.design_id === product.id
                                              ) ? (
                                                <Link
                                                  to="/cart"
                                                  className="mt-2"
                                                >
                                                  <BsFillCartCheckFill />
                                                </Link>
                                              ) : (
                                                <BsHandbag />
                                              )}
                                            </Link>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div> */}

                                      <div>
                                        {userType == 1 ? (
                                          <>
                                            {email ? (
                                              <Link
                                                to="#"
                                                data-tooltip-id="my-tooltip-12"
                                                onClick={() => {
                                                  if (
                                                    DealercartItems?.find(
                                                      (item) =>
                                                        item.id === product.id
                                                    )
                                                  ) {
                                                    removefromdealerwishlist(
                                                      product
                                                    );
                                                  } else {
                                                    addToDealerWishList(
                                                      product
                                                    );
                                                  }
                                                }}
                                              >
                                                {DealercartItems?.find(
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
                                                    removeFromWishList(product);
                                                  } else {
                                                    addToUserWishList(product);
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

                                    <div className="product_details">
                                      <h4>{product?.name}</h4>
                                      <p>{product?.category_name}</p>
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
                    </InfiniteScroll>
                  ) : (
                    <>
                      {filterData.length > 0 ? (
                        <>
                          <div className="row">
                            {filterData.map((data) => {
                              return (
                                <div className="col-md-4">
                                  <Link
                                    to={`/shopdetails/${data.id}`}
                                    className="product_data"
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
                                      {/* <div>
                                        {Phone ? (
                                          <Link
                                            to="#"
                                            data-tooltip-id="my-tooltip-7"
                                            onClick={() =>
                                              handleAddToCart(data)
                                            }
                                          >
                                            {cartItems.find(
                                              (item) =>
                                                item.design_id === data.id
                                            ) ? (
                                              <Link to="/cart" className="mt-2">
                                                <BsFillCartCheckFill />
                                              </Link>
                                            ) : (
                                              <BsHandbag />
                                            )}
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                      </div> */}
                                      <div>
                                        {userType == 1 ? (
                                          <>
                                            {email ? (
                                              <Link
                                                to="#"
                                                data-tooltip-id="my-tooltip-12"
                                                onClick={() => {
                                                  if (
                                                    DealercartItems?.find(
                                                      (item) =>
                                                        item?.id === data?.id
                                                    )
                                                  ) {
                                                    removefromdealerwishlist(
                                                      data
                                                    );
                                                  } else {
                                                    addToDealerWishList(data);
                                                  }
                                                }}
                                              >
                                                {DealercartItems.find(
                                                  (item) =>
                                                    item?.id === data?.id
                                                ) ? (
                                                  <FaRegStar />
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

                                    <div className="product_details">
                                      <h4>{data?.name}</h4>
                                      <p>{data?.category_name}</p>
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
