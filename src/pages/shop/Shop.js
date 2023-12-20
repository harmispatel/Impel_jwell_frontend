import React, { useContext, useEffect, useState } from "react";
import { BsHeart, BsSearch } from "react-icons/bs";
import ReactLoading from "react-loading";
import ShopServices from "../../services/Shop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DealerWishlist from "../../services/Dealer/Collection";
import UserWishlist from "../../services/Auth";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { WishlistSystem } from "../../context/WishListContext";
import { FaRegStar, FaStar } from "react-icons/fa";
import FilterServices from "../../services/Filter";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Accordion from "react-bootstrap/Accordion";

const Shop = ({ product }) => {
  const { dispatch: wishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: wishlistRemoveDispatch } = useContext(WishlistSystem);

  const navigate = useNavigate();
  const location = useLocation();

  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [searchInput, setSearchInput] = useState([]);

  const [selectedOption, setSelectedOption] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [genderData, setGenderData] = useState([]);
  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  const [tagData, setTagData] = useState([]);
  const [tag, setTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const [PriceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterTag, setFilterTag] = useState([]);

  const [collection_status, setCollectionStatus] = useState(false);
  const [DealerCollection, setDealerCollection] = useState([]);

  const [userWishlist, setUserWishlist] = useState(false);
  const [goldColor, setGoldColor] = useState("yellow_gold");
  const [goldType, setGoldType] = useState("18k");
  const [UsercartItems, setUserCartItems] = useState([]);

  // Pagination function
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

  // 4 Filter APIS call
  const CategoryFilter = () => {
    FilterServices.categoryFilter()
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((error) => console.log("Error in category filter"));
  };

  const GenderFilter = () => {
    FilterServices.genderFilter()
      .then((res) => {
        setGenderData(res.data);
      })
      .catch((error) => console.log("Error in gender filter"));
  };

  const TagFilter = () => {
    FilterServices.TagFilter()
      .then((res) => {
        setTagData(res.data);
      })
      .catch((error) => console.log("Error in tag filter"));
  };

  useEffect(() => {
    CategoryFilter();
    GenderFilter();
    TagFilter();
    AllData();
    collectionCheck();
    GetCartList();
  }, [userType, userId]);

  // sort by searching
  const searchbar = (e) => {
    setIsLoading(true);
    setSearchInput(e.target.value);
  };

  // sort by dropdown functions
  const options = [
    { value: "new_added", label: "New Added" },
    { value: "low_to_high", label: "Price,low to high" },
    { value: "high_to_low", label: "Price,high to low" },
    { value: "highest_selling", label: "Top Seller" },
  ];

  const handleSelectChange = (selectedSort) => {
    setIsLoading(true);
    setSelectedOption(selectedSort);
  };

  const handleSelectCategory = (selectedCategory) => {
    setIsLoading(true);
    setCategory(selectedCategory ? [selectedCategory.value] : []);
    setSelectedCategory(selectedCategory);
    console.log(filterTag);
  };

  const handleSelectGender = (selectedGender) => {
    setIsLoading(true);
    setGender(selectedGender ? [selectedGender.value] : []);
    setSelectedGender(selectedGender);
  };

  const handleSelectTag = (selectedTags) => {
    setIsLoading(true);
    setTag(selectedTags ? [selectedTags.value] : []);
    setSelectedTag(selectedTags);
  };

  const handleSliderChange = (e) => {
    setIsLoading(true);
    setPriceRange({ minprice: e[0], maxprice: e[1] });
    scrollup();
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
    FilterData();
  }, [category, tag, gender, searchInput, PriceRange, selectedOption]);

  const FilterData = () => {
    if (
      category !== null ||
      tag !== null ||
      gender !== null ||
      searchInput.length > 0 ||
      PriceRange.minprice !== null ||
      selectedOption !== null
    ) {
      const userData = {
        categoryIds: category,
        GenderIds: gender,
        TagIds: tag,
        search: searchInput,
        MinPrice: PriceRange?.minprice,
        MaxPrice: PriceRange?.maxprice,
        sort_by: selectedOption?.value,
        userType: userType,
      };

      ShopServices.allfilterdesigns(userData)
        .then((res) => {
          setIsLoading(false);
          setFilterData(res.data?.designs);
          setFilterTag(res.data?.tags);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
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
        setPriceRange({ minprice: res.minprice, maxprice: res.maxprice });
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

  // user wishlist products add
  const addToUserWishList = async (product) => {
    const payload = { id: product.id };
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

  // user wishlist products remove
  const removeFromWishList = (product) => {
    const payload = { id: product.id };
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

  // Dealer Wishlist products remove
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
          <div className="row">
            <div className="col-md-10 col-7">
              <div className="search_bar">
                <input
                  className="form-control"
                  placeholder="Search by design code"
                  onChange={(e) => searchbar(e)}
                  type="search"
                />
                {searchInput.length === 0 && (
                  <BsSearch className="search-icon" />
                )}
              </div>
            </div>
            <div className="col-md-2 col-5">
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

          <div className="">
            <div className="row">
              <div className="col-md-3 col-12 mt-2 mt-md-2">
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
              <div className="col-md-3 col-6 mt-2 mt-md-2">
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
              <div className="col-md-3 col-6 mt-2 mt-md-2">
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
                <div className="sidebar">
                  <Accordion>
                    <Accordion.Item eventKey="3" className="my-2">
                      <Accordion.Header>Shop by Price</Accordion.Header>
                      <Accordion.Body className="p-4 mb-2">
                        <div className="d-flex justify-content-between">
                          <p>
                            From: <strong>₹ {PriceRange.minprice}</strong>
                          </p>
                          <p>
                            To: <strong>₹ {PriceRange.maxprice}</strong>
                          </p>
                        </div>
                        <Slider
                          range
                          allowCross={false}
                          min={PriceRange.minprice}
                          max={PriceRange.maxprice}
                          marks={{
                            [PriceRange.minprice]: "Min",
                            [PriceRange.maxprice]: "Max",
                          }}
                          onAfterChange={handleSliderChange}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
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
                  selectedOption === null &&
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
                                  <div key={product.id} className="col-md-3">
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
                                <div className="col-md-3">
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
