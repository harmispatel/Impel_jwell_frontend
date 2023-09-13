import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productDetail from "../../services/Shop";
import BreadCrumb from "../../components/common/BreadCrumb";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import Magnifier from "react-image-magnify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsFillBagPlusFill, BsFillEyeFill } from "react-icons/bs";

const ShopDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [img,setImg] = useState()
  const [productImages, setProduuctImages] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cartItems")) || []
  );
  const data = {categoryId: product?.category_id?.id};

  const productData = async () => {
    const data = {
      id: id,
    };
    await productDetail
      .product_detail(data)
      .then((res) => {
        setTimeout(() => {
          setProduct(res.data);
          setImg(res.data.image);
          setProduuctImages(res.data.multiple_image);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);
  
  const Relatedproduct = async () => {
    try {
      const response = await productDetail.related_products(data);
      console.log(response.data); // Log the API response
      setRelatedProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productData();
    Relatedproduct();
  }, []);

  const handleAddToCart = (product) => {

    const existingItem = cartItems.find((item) => item?.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + productQuantity } : item
      );
      setCartItems(updatedCart);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: productQuantity }];
      setCartItems(updatedCart);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  return (
    <section className="shop_details">
      <div className="container">
        <div className="Shop_product">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <BreadCrumb
                firstName="Home"
                firstUrl="/"
                secondName="Shop"
                secondUrl="/shop"
                thirdName="Shopdetails"
              />
              <div className="row">
                <div className="col-md-6">
                  <div>
                    {productImages.length === 0 ? (
                      <img
                        src={img}
                        alt=""
                        className="w-100"
                      />
                    ) : (
                      <Carousel
                        infiniteLoop
                        useKeyboardArrows
                        autoPlay
                        interval={3000}
                      >
                        {productImages.map((image, index) => (
                          <div key={index}>
                            <img src={image} alt={`Product Image ${index}`} />
                          </div>
                        ))}
                      </Carousel>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <h3>{product?.name}</h3>
                    <p>{product?.category}</p>
                    <p>₹{product?.price.toLocaleString("en-US")}</p>
                    <h5>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      two.
                    </h5>
                    <div className="buttons pt-4 d-flex">
                      <div className="quantity">
                        {productQuantity === 0 ? (
                          <button className="btn" onClick={() => setProductQuantity(productQuantity - 1)} disabled>
                            -
                          </button>
                        ) : (
                          <button className="btn" onClick={() =>setProductQuantity(productQuantity - 1)}>
                            -
                          </button>
                        )}

                        <input
                          className="form-control"
                          type="text"
                          value={productQuantity}
                          min={1}
                        />
                        <button
                          className="btn"
                          onClick={() =>
                            setProductQuantity(productQuantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="add_cart align-items-center">
                        {cartItems.find((item) => item.id === product?.id) ? (
                          <Link className="btn btn-outline-dark" to="/cart">
                            Go To Cart
                          </Link>
                        ) : (
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="related_items">
                <h3>Related Products</h3>
                <div className="related_product">
                  {relatedProduct.map((data) => {
                    return (
                      <Link
                        to={`/shopdetails/${data.id}`}
                        className="product_data"
                      >
                        {data.image ? (
                          <img src={data.image} className="w-100" />
                        ) : (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                            className="w-100"
                          />
                        )}
                        <div class="edit">
                          <div>
                            <a href="#">
                              <BsFillBagPlusFill />
                            </a>
                          </div>
                          <div>
                            <a href="#">
                              <BsFillEyeFill />
                            </a>
                          </div>
                        </div>
                        <div className="product_details">
                          <h4>{data.name}</h4>
                          <p>Minola Golden Necklace</p>
                          <h5>${data.price}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopDetails;
