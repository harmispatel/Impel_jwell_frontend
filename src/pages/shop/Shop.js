import React, { useEffect, useState } from "react";
import {
  BsHandbag,
  BsHeart,
  BsSearch,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import Select from "react-select";
import SidebarFilter from "../../components/common/SidebarFilter";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopServices from "../../services/Shop";
import { Link, useNavigate } from "react-router-dom";
import DealerWishlist from "../../services/Dealer/Collection";
import UserCartService from "../../services/Cart";
import UserWishlist from "../../services/Auth";
import Userservice from "../../services/Cart";
import { FcLike } from "react-icons/fc";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const Shop = ({ product }) => {
  const [searchInput, setSearchInput] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [tag, setTag] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(9);
  const [PriceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });
  const [checkList, setCheckList] = useState([]);
  const [collection_status, setCollectionStatus] = useState(false);
  const [userWishlist, setUserWishlist] = useState(false);
  const [UsercartItems, setUserCartItems] = useState([]);
  const [DealercartItems, setDealerCartItems] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cartItems")) || []
  );
  const [productQuantity, setProductQuantity] = useState(1);
  const userType = localStorage.getItem("user_type");
  const DealerEmail = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const Verification = JSON.parse(localStorage.getItem("verification"));
  const navigate = useNavigate();

  // const options = [
  //   { value: "new_added", label: "New Added" },
  //   { value: "low_to_high", label: "Price,low to high" },
  //   { value: "high_to_low", label: "Price,high to low" },
  //   { value: "highest_selling", label: "Top Seller" },
  // ];
  // const handleSelectChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  // };
  // const handleAddToCart = (product) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id);

  //   if (existingItem) {
  //     const updatedCart = cartItems.map((item) =>
  //       item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //     );
  //     toast.error("already added");

  //     setCartItems(updatedCart);
  //     sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //   } else {
  //     const updatedCart = [...cartItems, { ...product, quantity: 1 }];
  //     setCartItems(updatedCart);
  //     sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //   }
  // };

  // const isDealerProductInWishlist = (product) => {
  //   return checkList.some((item) => item.id === product.id);
  // };

  const handleCategory = (e) => {
    setIsLoading(true);
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter((item) => item !== e.target.value));
    }
  };

  const handleTag = (e) => {
    setIsLoading(true);
    if (e.target.checked) {
      setTag([...tag, e.target.value]);
    } else {
      setTag(tag.filter((item) => item !== e.target.value));
    }
  };

  const handleGender = (e) => {
    setIsLoading(true);
    if (e.target.checked) {
      setGender([...gender, e.target.value]);
    } else {
      setGender(gender.filter((item) => item !== e.target.value));
    }
  };

  const handleSliderChange = (e) => {
    setIsLoading(true);
    setPriceRange({ minprice: e[0], maxprice: e[1] });
  };

  const AllData = () => {
    ShopServices.alldesigns()
      .then((res) => {
        setIsLoading(false);
        setAllData(res.data);
        setDisplayedItems(res.data.slice(0, loadMore));
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
      sort_by: selectedOption,
      MinPrice: PriceRange?.minprice,
      MaxPrice: PriceRange?.maxprice,
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
    DealerWishlist.ListCollection({ email: DealerEmail })
      .then((res) => {
        setCheckList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetCarList = async () => {
    UserWishlist.userWishlist({ phone: phone })
      .then((res) => {
        setUserCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DealerList = async () => {
    DealerWishlist.ListCollection({ email: DealerEmail })
      .then((res) => {
        setDealerCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    AllData();
    GetCarList();
    DealerList();
    collectionCheck();
  }, []);

  const FetchMoreData = async () => {
    setTimeout(() => {
      setDisplayedItems((prevItems) => [
        ...prevItems,
        ...allData.slice(loadMore, loadMore + 9),
      ]);
      setLoadMore(loadMore + 9);
    }, 200);
  };

  const GetUserCartList = async () => {
    UserCartService.CartList({ phone: phone })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for user add to cart function
  const handleAddToCart = (product) => {
    if (Verification === 3) {
      const CartData = {
        phone: phone,
        design_name: product?.name,
        design_id: product?.id,
        quantity: productQuantity,
      };

      UserCartService.AddtoCart(CartData)
        .then((res) => {
          if (res.status === true) {
            toast(res.message);
            GetUserCartList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please verify your information to access add to cart");
      setShowEdit(true);
    }
  };

  // for dealer wishlist products
  const addToWishList = async (product) => {
    const productId = product.id;

    DealerWishlist.addtoWishlist({ email: DealerEmail, design_id: productId })
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          setCollectionStatus(true);
          toast.success("Design has been Added to Your Collection.");

          AllData();
          GetCarList();
          FilterData();
          DealerList();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeFromWishList = (product) => {
    DealerWishlist.removetoWishlist({ email: DealerEmail, design_id: product })
      .then((res) => {
        if (res.success === true) {
          toast.success("Design has been removed from Your Collection.");
          collectionCheck();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for user wishlist products
  const addToUserWishList = async (product) => {
    UserWishlist.addtoWishlist({
      phone: localStorage.getItem("phone"),
      design_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          setUserWishlist(true);
          toast.success("Design has been Added to Your Favorite List ");

          AllData();
          DealerList();
          GetCarList();
          FilterData();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removefromuserwishlist = (product) => {
    Userservice.removetoWishlist({ phone: phone, design_id: product })
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          GetCarList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // for sort_by filters
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    const sortfield = event.target.value;
    console.log(sortfield);
    let sorted = [...allData];
    console.log(sorted);
    switch (sortfield) {
      case "new_added":
        break;
      case "low_to_high":
        break;
      case "high_to_low":
        break;
      case "highest_selling":
        break;
      case "clear_all":
        break;
      default:
        break;
    }
    setFilterData(sorted);
  };

  console.log(Verification);
  useEffect(() => {
    GetCarList();
    DealerList();
  }, []);
  useEffect(() => {
    FilterData(userType);
  }, [category, tag, gender, searchInput, selectedOption, PriceRange]);

  // for model
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };
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
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="search"
                  />
                  {searchInput.length === 0 && (
                    <BsSearch className="search-icon" />
                  )}
                </div>
              </div>
              {/* <div className="col-md-3">
                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  isClearable={true}
                  options={options}
                  placeholder="Sort By"
                />
              </div> */}
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
                        class="d-none"
                        value="highest_selling"
                        name="attr_option[0]"
                        checked={selectedOption === "highest_selling"}
                        onChange={handleRadioChange}
                      />
                      <label for="highest_selling">Top Seller</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div class="csm_sort_btn">
                      <input
                        type="radio"
                        id="clear_all"
                        class="d-none clear_all_checked"
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
                />
              </div>
            </div>
            <div className="col-md-9">
              {isLoading ? (
                <div className="h-100 d-flex justify-content-center">
                  <ReactLoading
                    type={"spinningBubbles"}
                    color={"#053961"}
                    delay={"2"}
                    height={"20%"}
                    width={"10%"}
                    className="loader"
                  />
                </div>
              ) : (
                <>
                  {category.length === 0 &&
                  gender.length === 0 &&
                  searchInput.length === 0 &&
                  PriceRange.minprice === null &&
                  selectedOption === null ? (
                    <InfiniteScroll
                      dataLength={displayedItems.length}
                      next={FetchMoreData}
                      hasMore={true}
                      style={{ overflow: "hidden" }}
                      loader={pageLoading ? <h4>Loading...</h4> : null}
                    >
                      <div className="row">
                        {displayedItems.map((product) => {
                          return (
                            <div key={product.id} className="col-md-4">
                              <Link
                                to={`/shopdetails/${product.id}`}
                                className="product_data"
                              >
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt=""
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
                                    {phone ? (
                                      <Link
                                        to="#"
                                        onClick={() => handleAddToCart(product)}
                                        data-tooltip-id="my-tooltip-7"
                                      >
                                        <BsHandbag />
                                      </Link>
                                    ) : (
                                      <Link
                                        to="/login"
                                        data-tooltip-id="my-tooltip-7"
                                      >
                                        <BsHandbag />
                                      </Link>
                                    )}
                                  </div>
                                  <div>
                                    {userType == 1 ? (
                                      <>
                                        {DealerEmail ? (
                                          <Link
                                            to="#"
                                            data-tooltip-id="my-tooltip-12"
                                            onClick={() => {
                                              const isDealerProductInWishlist =
                                                DealercartItems.some(
                                                  (item) =>
                                                    item.id === product.id
                                                );
                                              if (isDealerProductInWishlist) {
                                                removeFromWishList(product.id);
                                              } else {
                                                addToWishList(product);
                                              }
                                            }}
                                          >
                                            {DealercartItems.some(
                                              (item) => item.id === product.id
                                            ) ? (
                                              <BsStarFill />
                                            ) : (
                                              <BsStar />
                                            )}
                                          </Link>
                                        ) : (
                                          <Link
                                            to="/Dealer_login"
                                            data-tooltip-id="my-tooltip-12"
                                          >
                                            <BsStar />
                                          </Link>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {phone ? (
                                          <Link
                                            to="#"
                                            data-tooltip-id="wishlist-icon"
                                            onClick={() =>
                                              addToUserWishList(product)
                                            }
                                          >
                                            {UsercartItems?.find(
                                              (item) => item.id === product.id
                                            ) ? (
                                              <FcLike />
                                            ) : (
                                              <BsHeart />
                                            )}
                                          </Link>
                                        ) : (
                                          <Link
                                            to="/login"
                                            data-tooltip-id="wishlist-icon"
                                          >
                                            <BsHeart />
                                          </Link>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="product_details">
                                  <h4>{product.name}</h4>
                                  <p>Minola Golden Necklace</p>
                                  <h5>
                                    ₹{product.price.toLocaleString("en-US")}
                                  </h5>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </InfiniteScroll>
                  ) : (
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
                                    {phone ? (
                                      <Link
                                        to="#"
                                        onClick={() => handleAddToCart(product)}
                                        data-tooltip-id="my-tooltip-7"
                                      >
                                        <BsHandbag />
                                      </Link>
                                    ) : (
                                      <Link
                                        to="/login"
                                        data-tooltip-id="my-tooltip-7"
                                      >
                                        <BsHandbag />
                                      </Link>
                                    )}
                                  </div>
                                  <div>
                                    {userType == 1 ? (
                                      <>
                                        {DealerEmail ? (
                                          <Link
                                            to="#"
                                            data-tooltip-id="my-tooltip-12"
                                            onClick={() => {
                                              const isDealerProductInWishlist =
                                                DealercartItems.some(
                                                  (item) =>
                                                    item.id === product.id
                                                );
                                              if (isDealerProductInWishlist) {
                                                removeFromWishList(product.id);
                                              } else {
                                                addToWishList(product);
                                              }
                                            }}
                                          >
                                            {DealercartItems.some(
                                              (item) => item.id === product.id
                                            ) ? (
                                              <BsStarFill />
                                            ) : (
                                              <BsStar />
                                            )}
                                          </Link>
                                        ) : (
                                          <Link
                                            to="/Dealer_login"
                                            data-tooltip-id="my-tooltip-12"
                                          >
                                            <BsStar />
                                          </Link>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {phone ? (
                                          <Link
                                            to="#"
                                            data-tooltip-id="wishlist-icon"
                                            onClick={() => {
                                              const isUserWishlistProducts =
                                                UsercartItems.some(
                                                  (item) =>
                                                    item.id === product.id
                                                );
                                              if (isUserWishlistProducts) {
                                                removefromuserwishlist(
                                                  product.id
                                                );
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
                                            data-tooltip-id="wishlist-icon"
                                          >
                                            <BsHeart />
                                          </Link>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="product_details">
                                  <h4>{data.name}</h4>
                                  <p>Minola Golden Necklace</p>
                                  <h5>₹{data.price.toLocaleString("en-US")}</h5>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
              <ReactTooltip id="my-tooltip-7" place="top" content="cart" />
              <ReactTooltip
                id="wishlist-icon"
                place="bottom"
                content="wishlist"
              />
              <ReactTooltip
                id="my-tooltip-12"
                place="bottom"
                content="My Collections"
              />
              <Modal
                className="form_intent"
                centered
                show={showEdit}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <span>
                    Prior to place your order, you need to provide your other
                    information. Please update your profile, we will validate
                    your profile in next 48 hours and then you can place your
                    order.
                  </span>
                </Modal.Body>
                <div className="text-center pb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => navigate("/profile")}
                  >
                    Registration
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
