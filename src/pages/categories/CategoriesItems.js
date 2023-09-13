import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import homeService from "../../services/Home";
import categoryDetail from "../../services/Shop";
import BreadCrumb from "../../components/common/BreadCrumb";

const CategoriesItems = () => {
  const paramId = useParams();

  const [category, SetCategory] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(0);
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
      .related_products({ categoryId: selectedCategory })
      .then((res) => {
        setCategoriesData(res.data);
      })
      .catch((err) => {
        console.log(err);
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
                        return (
                          <li className="nav-item" key={index}>
                            <button
                              className={
                                selectedCategory === item.id
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              id="novelty-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#novelty"
                              type="button"
                              onClick={() => handleDifferentFunction(item.id)}
                              defaultValue={selectedCategory}
                              role="tab"
                              aria-controls="novelty"
                              aria-selected="true"
                            >
                              {item.name}
                            </button>
                          </li>
                        );
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
                <p>categoriesData is not an available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CategoriesItems;
