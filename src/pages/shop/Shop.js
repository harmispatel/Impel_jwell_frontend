import React, { useEffect, useState } from "react";
import { BsHandbag, BsHeart, BsSearch } from "react-icons/bs";
import ShopServices from "../../services/Shop";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Select from "react-select";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from "react-infinite-scroll-component";
import SidebarFilter from "../../components/common/SidebarFilter";

const Shop = () => {

  const [category, setCategory] = useState([]);
  const [metal, setMetal] = useState([]);
  const [gender, setGender] = useState([]);
  const [tag, setTag] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState(allData.slice(0, 20));
  const [hasMore, setHasMore] = useState(allData.length > 20);
  const [page, setPage] = useState(2);
  const [pageLoading, setPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem('cartItems')) || []
  );

  useEffect(() => {
    FilterData();
  }, [category, metal,tag,gender, searchInput, selectedOption]);

  const AllData = () => {
    ShopServices.alldesigns()
      .then((res) => {
        setIsLoading(false);
        setAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleCategory = (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter((item) => item !== e.target.value));
    }
  };

  const handleTag = (e) => {
    if (e.target.checked) {
      setTag([...tag, e.target.value]);
    } else {
      setTag(tag.filter((item) => item !== e.target.value));
    }
  };

  const handleGender = (e) => {
    if (e.target.checked) {
      setGender([...gender, e.target.value]);
    } else {
      setGender(gender.filter((item) => item !== e.target.value));
    }
  };

  const FilterData = () => {
    const userData = {
      categoryIds: category,
      GenderIds:gender,
      TagIds:tag,
      MetalIds: metal,
      search: searchInput,
      sort_by: selectedOption?.value
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

  const FetchMoreData = async () => {
    if (pageLoading) return;
    setPageLoading(true);

    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => ({
        id: data.length + index, // Replace with your actual id logic
        image: 'https://example.com/image-url.jpg', // Replace with your image logic
        name: `Product ${data.length + index}`,
        price: Math.floor(Math.random() * 1000), // Replace with your price logic
      }));

      // Update state with new data
      setData(prevData => [...prevData, ...newData]);

      // Update page and hasMore
      setPage(prevPage => prevPage + 1);
      setHasMore(page < 5); // Stop loading after 4 pages

      setPageLoading(false); // Hide loader
    }, 1000);
  }

  const options = [
    { value: "new_added", label: "New Added" },
    { value: "low_to_high", label: "Price,low to high" },
    { value: "high_to_low", label: "Price,high to low" },
    { value: "best_seller", label: "Top Seller" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      toast.error('already added');

      setCartItems(updatedCart);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    AllData();
    FetchMoreData()
  }, []);

  return (
    <section className="shop">
      <div className="container">
        <div className="shopping_data">
          <div className="filters">
            <div className="row">
              <div className="col-md-9">
                <div className="search_bar">
                  <input
                    className="form-control"
                    placeholder="Search any product"
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="search"
                  />
                  <BsSearch className="search-icon" />
                </div>
              </div>
              <div className="col-md-3">
                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  isClearable={true}
                  options={options}
                  placeholder="Sort By"
                />
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
                  Priceheader = "Shop by Price"
                  onCategoryChange={(e) => handleCategory(e)}
                  onGenderChange={(e) => handleGender(e)}
                  onTagChange={(e)=>handleTag(e)}
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
                <div className="row">
                  {category.length === 0 &&
                    gender.length === 0 &&
                    metal.length === 0 &&
                    searchInput.length === 0 &&
                    selectedOption === null ? (
                    <div id="scrollableDiv" style={{ height: '400px', overflow: 'auto' }}>
                      <InfiniteScroll
                        dataLength={data.length}
                        next={FetchMoreData}
                        hasMore={hasMore}
                        loader={pageLoading ? <h4>Loading...</h4> : null}

                      >
                        {data.map(product => (
                          <div key={product.id} className="col-md-4">
                            <Link to={`/shopdetails/${product.id}`} className="product_data">
                              {product.image ? (
                                <img src={product.image} alt="" className="w-100" />
                              ) : (
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                                  alt=""
                                  className="w-100"
                                />
                              )}
                              <div className="edit">
                                <div>
                                  <Link to="#" onClick={() => handleAddToCart(product)}>
                                    <BsHandbag />
                                  </Link>
                                </div>
                                <div>
                                  <Link to="#">
                                    <BsHeart />
                                  </Link>
                                </div>
                              </div>
                              <div className="product_details">
                                <h4>{product.name}</h4>
                                <p>Minola Golden Necklace</p>
                                <h5>₹{product.price.toLocaleString("en-US")}</h5>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </InfiniteScroll>
                    </div>
                  ) : (
                    <>
                      {filterData.map((data) => {
                        return (
                          <div className="col-md-4">
                            <Link
                              to={`/shopdetails/${data.id}`}
                              className="product_data"
                            >
                              {data.image ? (
                                <img src={data.image} alt="" className="w-100" />
                              ) : (
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                  alt=""
                                  className="w-100"
                                />
                              )}
                              <div className="edit">
                                <div>
                                  <Link to="#" onClick={() => handleAddToCart(data)}>
                                    <BsHandbag />
                                  </Link>
                                </div>
                                <div>
                                  <Link to="#">
                                    <BsHeart />
                                  </Link>
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
};
export default Shop;
