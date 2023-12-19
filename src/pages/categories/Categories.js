import React, { useEffect, useState } from "react";
import categoriesService from "../../services/Home";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categories();
  }, []);

  const categories = () => {
    categoriesService
      .category()
      .then((res) => {
        setIsLoading(false);
        setAllCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="categories">
      <div className="container">
        <div className="categories_header">
          <h3>Categories</h3>
        </div>
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
          <div className="categories_data">
            <div className="row">
              {allCategories.map((data, index) => {
                return (
                  <div className="col-md-3" key={index}>
                    <Link
                      to={`/categories/${data.id}`}
                      className="text-decoration-none"
                      style={{ color: "#000" }}
                    >
                      <div className="category_data py-2">
                        <img src={data.image} className="w-100" />
                        <div className="product_details">
                          <h4>{data.name}</h4>
                          <p>{data.category_name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Categories;
