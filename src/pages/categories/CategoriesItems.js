import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../components/common/BreadCrumb";
import { FaLongArrowAltLeft } from "react-icons/fa";
import homeService from "../../services/Home";
import categoryDetail from "../../services/Shop";
import { motion } from "framer-motion";
import noImage from "../../assets/images/No_Image_Available.jpg";

const CategoriesItems = () => {
  const paramId = useParams();
  const [category, SetCategory] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const [paginate, setPaginate] = useState();

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

  const CategoriesData = (offset = 0) => {
    categoryDetail
      .related_products({ categoryId: paramId, offset: offset })
      .then((res) => {
        setCategoriesData(res.data.designs);
        setIsLoading(false);
        setPaginate(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    Category();
    CategoriesData();
  }, [selectedCategory]);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages = Math.ceil(paginate?.total_records / 20);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLength: 20,
  });

  const paginationPage = (page) => {
    const calculatedOffset = (page - 1) * pagination?.dataShowLength;
    CategoriesData(calculatedOffset);
    setPagination({ ...pagination, currentPage: page });
    scrollup();
    setIsLoading(true);
    // if (page == 1) {
    //   navigate(`/categories/${paramId?.id}`);
    // } else {
    //   navigate(`/categories/${paramId?.id}${page ? `?page_no=${page}` : ""}`);
    // }
  };

  const paginationPrev = () => {
    if (pagination.currentPage > 1) {
      const prevPage = pagination.currentPage - 1;
      const calculatedOffset = (prevPage - 1) * pagination?.dataShowLength;
      setPagination({ ...pagination, currentPage: prevPage });
      CategoriesData(calculatedOffset);
      scrollup();
      setIsLoading(true);
      // if (prevPage == 1) {
      //   navigate(`/categories/${paramId?.id}`);
      // } else {
      //   navigate(
      //     `/categories/${paramId?.id}${prevPage ? `?page_no=${prevPage}` : ""}`
      //   );
      // }
    }
  };

  const paginationNext = () => {
    if (pagination.currentPage < totalPages) {
      const nextPage = pagination.currentPage + 1;
      const calculatedOffset = (nextPage - 1) * pagination?.dataShowLength;
      setPagination({ ...pagination, currentPage: nextPage });
      CategoriesData(calculatedOffset);
      scrollup();
      setIsLoading(true);
      // navigate(
      //   `/categories/${paramId?.id}${nextPage ? `?page_no=${nextPage}` : ""}`
      // );
    }
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  const shimmerItems = Array(20).fill(null);

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
            {isLoading ? (
              <>
                <div className="row">
                  {shimmerItems.map((_, index) => (
                    <div className="col-lg-3 col-md-6 col-12">
                      <div key={index} className="shimmer-product">
                        <div className="shimmer-image"></div>
                        <div className="shimmer-price"></div>
                        <div className="shimmer-price"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  {categoriesData.length > 0 ? (
                    <>
                      {categoriesData.map((data) => {
                        return (
                          <>
                            <div className="col-md-3 col-sm-4 col-xs-6">
                              <div className="item-product text-center">
                                <Link to={`/shopdetails/${data?.id}`}>
                                  <div className="product-thumb">
                                    {data?.image ? (
                                      <>
                                        <motion.img
                                          src={data?.image}
                                          alt={data?.name}
                                          className="w-100"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.5 }}
                                          whileHover={{ scale: 1.05 }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <motion.img
                                          src={noImage}
                                          className="w-100"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.5 }}
                                          whileHover={{ scale: 1.05 }}
                                        />
                                      </>
                                    )}
                                  </div>
                                  <div className="product-info d-grid">
                                    {data?.making_charge_discount_18k > 0 ? (
                                      <>
                                        <del style={{ color: "#000" }}>
                                          ₹
                                          {numberFormat(
                                            data?.making_charge_18k +
                                              data?.metal_value_18k
                                          )}
                                        </del>
                                        <label>
                                          <strong className="text-success">
                                            ₹
                                            {numberFormat(
                                              data?.metal_value_18k +
                                                data?.making_charge_discount_18k
                                            )}
                                          </strong>
                                        </label>
                                      </>
                                    ) : (
                                      <strong className="text-success">
                                        ₹{numberFormat(data?.total_amount_18k)}
                                      </strong>
                                    )}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div className="pt-5">
                        {totalPages > 1 && (
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
                                    onClick={paginationPrev}
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
                                          onClick={() =>
                                            paginationPage(pageNumber)
                                          }
                                        >
                                          <Link to="#" className="page-link">
                                            {pageNumber}
                                          </Link>
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
                                          <Link to="#" className="page-link">
                                            ...
                                          </Link>
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
                                    onClick={paginationNext}
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
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="categoriesData-not text-center"
                        style={{
                          fontSize: "35px",
                          fontWeight: "600",
                          marginTop: "150px",
                        }}
                      >
                        <p>
                          Unfortunately, categories data is not available at the
                          moment.
                        </p>
                      </div>
                      <div className="text-center mt-md-3">
                        <Link
                          to="/categories"
                          className="view_all_btn px-4 py-2"
                          style={{ borderRadius: "8px" }}
                        >
                          <FaLongArrowAltLeft className="mr-2" /> &nbsp;Back to
                          Categories
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CategoriesItems;
