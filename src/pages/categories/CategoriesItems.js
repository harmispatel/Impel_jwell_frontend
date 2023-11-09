import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import homeService from "../../services/Home";
import categoryDetail from "../../services/Shop";
import BreadCrumb from "../../components/common/BreadCrumb";
import ReactLoading from "react-loading";

const CategoriesItems = () => {
  const paramId = useParams();

  const [category, SetCategory] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  const Category = () => {
    homeService
      .category()
      .then((res) => {
        SetCategory(res.data);
        if (selectedCategory === 0) {
          res.data.map((i) => {
            if (i.id === Number(paramId.id)) {
              setselectedCategory(i.child_categories[0].id);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CategoriesData = () => {
    categoryDetail
      .related_products({ categoryId: paramId })
      .then((res) => {
        setCategoriesData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleDifferentFunction = (selectedId) => {
    setselectedCategory(selectedId);
  };

  useEffect(() => {
    Category();
    CategoriesData();
  }, [selectedCategory]);

  return (
    <section className="categories">
      <div className="container">
        <div className="subcategory_filter">
          {category.map((data, index) => {
            return (
              <>
                {data.id === Number(paramId.id) && (
                  <section className="sec_main product_sec" key={index}>
                    <BreadCrumb
                      firstName="Home"
                      firstUrl="/"
                      secondName="Categories"
                      secondUrl="/categories"
                      thirdName={data.name}
                    />
                    <ul className="nav nav-tabs">
                      {data.child_categories.map((item, index) => {
                        return <></>;
                      })}
                    </ul>
                  </section>
                )}
              </>
            );
          })}
        </div>
        <div>
          <div className="categories_data">
            <div className="row">
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
                  {categoriesData.length > 0 ? (
                    categoriesData.map((data) => {
                      return (
                        <div className="col-md-4" key={data.id}>
                          <Link
                            to={`/shopdetails/${data.id}`}
                            className="text-decoration-none"
                            style={{ color: "#000" }}
                          >
                            <div className="category_data py-2">
                              <img src={data.image} alt="" className="w-100" />
                              <div className="product_details">
                                <h4>{data.name}</h4>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="categoriesData-not">
                      <p>Categories data is not an available</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CategoriesItems;
