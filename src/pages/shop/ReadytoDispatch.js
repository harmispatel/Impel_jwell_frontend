import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import profileService from "../../services/Home";
import Select from "react-select";

const imageURL = process.env.REACT_APP_API_KEY_IMAGE_;

const ReadytoDispatch = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [tagNoChange, setTagNoChange] = useState(null);
  const [items, setItems] = useState(null);
  const [subItems, setSubItems] = useState(null);
  const [itemGroups, setItemGroups] = useState(null);
  const [styles, setStyles] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [allPrices, setAllPrices] = useState([]);

  const handleCategory = (selectedOption) => {
    setItemGroups(selectedOption);
  };

  const handleItems = (selectedOption) => {
    setItems(selectedOption);
  };

  const handleSubItems = (selectedOption) => {
    setSubItems(selectedOption);
  };

  const handleStylesTag = (selectedOption) => {
    setStyles(selectedOption);
  };

  const handleSizeTag = (selectedOption) => {
    setSizes(selectedOption);
  };

  useEffect(() => {
    setTimeout(() => {
      profileService
        .GetProductsFilterAPI({
          PageNo: 1,
          PageSize: 100,
          DeviceID: 0,
          SortBy: "",
          SearchText: "",
          TranType: "",
          CommaSeperate_ItemGroupID: itemGroups?.value || "",
          CommaSeperate_ItemID: items?.value || "",
          CommaSeperate_StyleID: styles?.value || "",
          CommaSeperate_ProductID: "",
          CommaSeperate_SubItemID: subItems?.value || "",
          CommaSeperate_AppItemCategoryID: "",
          CommaSeperate_ItemSubID: "",
          CommaSeperate_KarigarID: "",
          CommaSeperate_BranchID: "",
          CommaSeperate_Size: sizes?.label || "",
          CommaSeperate_CounterID: "",
          MaxNetWt: 0,
          MinNetWt: 0,
          OnlyCartItem: false,
          OnlyWishlistItem: false,
          StockStatus: "",
          DoNotShowInClientApp: 0,
          HasTagImage: 0,
          CommaSeperate_CompanyID: id,
        })
        .then((res) => {
          setFilters(res?.Filters);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, [itemGroups, items, subItems, styles, sizes, id]);

  useEffect(() => {
    profileService
      .GetProductsPrices()
      .then((res) => {
        setAllPrices(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    profileService
      .GetProductsAPI({
        PageNo: 1,
        PageSize: 300,
        DeviceID: 0,
        SortBy: "",
        SearchText: tagNoChange || "",
        TranType: "",
        CommaSeperate_ItemGroupID: itemGroups?.value || "",
        CommaSeperate_ItemID: items?.value || "",
        CommaSeperate_StyleID: styles?.value || "",
        CommaSeperate_ProductID: "",
        CommaSeperate_CompanyID: id || "",
        CommaSeperate_SubItemID: subItems?.value || "",
        CommaSeperate_AppItemCategoryID: "",
        CommaSeperate_ItemSubID: "",
        CommaSeperate_KarigarID: "",
        CommaSeperate_BranchID: "",
        CommaSeperate_Size: sizes?.label || "",
        CommaSeperate_CounterID: "",
        MaxNetWt: 0,
        MinNetWt: 0,
        OnlyCartItem: false,
        OnlyWishlistItem: false,
        StockStatus: "",
        DoNotShowInClientApp: 0,
        HasTagImage: 0,
      })
      .then((res) => {
        setProducts(res?.Tags);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [itemGroups, items, subItems, styles, sizes, tagNoChange, id]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  var finalPrice = [
    {
      price_24k: allPrices?.price_24k,
    },
    {
      sales_wastage: allPrices?.sales_wastage_rtd,
    },
    {
      sales_wastage_discount: allPrices?.sales_wastage_discount_rtd,
    },
  ];

  return (
    <>
      <section className="ready-to-dispatch">
        <div className="container">
          {isLoading ? (
            <div className="animation-loading">
              <Loader />
            </div>
          ) : (
            <>
              <div className="row">
                {/* <div className="col-md-6 mb-4">
                  <div className="form-group d-flex align-items-center">
                    <label htmlFor="price" className="form-label">
                      Price:
                    </label>
                    <input
                      type="number"
                      className="form-control ms-2"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span className="mx-3">To</span>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div> */}
                <div className="col-md-3 mb-4">
                  <div className="form-group d-flex align-items-center">
                    {/* <label
                      htmlFor="price"
                      className="form-label"
                      style={{ width: "70px" }}
                    >
                      Tag No:
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search with tag no"
                      value={tagNoChange}
                      onChange={(e) => setTagNoChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <Select
                    placeholder="Select Sizes"
                    isClearable
                    isSearchable={false}
                    value={sizes}
                    onChange={handleSizeTag}
                    options={filters?.Size?.map((data) => ({
                      label: data?.Size1,
                      value: data?.RowNumber,
                    }))}
                  />
                </div>

                {/* Category Wise Filter */}
                <div className="col-md-3">
                  <Select
                    placeholder="Select Category"
                    isClearable
                    isSearchable={false}
                    value={itemGroups}
                    onChange={handleCategory}
                    options={filters?.ItemGroups?.map((data) => ({
                      label: data?.GroupName,
                      value: data?.ItemGroupID,
                    }))}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    placeholder="Select Item"
                    isClearable
                    isSearchable={false}
                    value={items}
                    onChange={handleItems}
                    options={filters?.Items?.map((data) => ({
                      label: data?.ItemName,
                      value: data?.ItemID,
                    }))}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    placeholder="Select Sub Item"
                    isClearable
                    isSearchable={false}
                    value={subItems}
                    onChange={handleSubItems}
                    options={filters?.SubItems?.map((data) => ({
                      label: data?.SubItemName,
                      value: data?.SubItemID,
                    }))}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    placeholder="Select Style"
                    isClearable
                    isSearchable={false}
                    value={styles}
                    onChange={handleStylesTag}
                    options={filters?.Styles?.map((data) => ({
                      label: data?.StyleName,
                      value: data?.StyleID,
                    }))}
                  />
                </div>
              </div>
              <div className="row mt-4">
                {products?.length > 0 ? (
                  <>
                    {products?.map((data, index) => {
                      var sales_wastage_of_category =
                        finalPrice[1]?.sales_wastage[data?.SubItemID] || 0;

                      var sales_wastage_discount_of_category =
                        finalPrice[2]?.sales_wastage_discount[
                          data?.SubItemID
                        ] || 0;

                      var labour_charge =
                        (finalPrice[0]?.price_24k[data?.SubItemID] *
                          sales_wastage_of_category) /
                          100 || 0;

                      if (labour_charge > 0) {
                        labour_charge = labour_charge * data?.NetWt || 0;
                      }

                      const labour_charge_discount =
                        sales_wastage_discount_of_category > 0
                          ? labour_charge -
                            (labour_charge *
                              sales_wastage_discount_of_category) /
                              100
                          : 0;

                      var metal_value =
                        finalPrice[0]?.price_24k[data?.SubItemID] *
                          (data?.Touch / 100) *
                          data?.NetWt || 0;

                      return (
                        <>
                          <div
                            className="col-md-3 col-sm-4 col-xs-6"
                            key={index}
                          >
                            <div className="item-product text-center">
                              <Link
                                to={`/ready-to-dispatch/${id}/${data?.TagNo}`}
                              >
                                <div className="product-thumb">
                                  {data?.Images[0]?.ImageName ? (
                                    <>
                                      <img
                                        src={`${imageURL}${data?.Images[0]?.ImageName}`}
                                        alt=""
                                        className="w-100"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                        alt=""
                                        className="w-100"
                                      />
                                    </>
                                  )}
                                </div>
                              </Link>
                              <div className="product-info d-grid">
                                {labour_charge_discount > 0 ? (
                                  <>
                                    <del>
                                      ₹
                                      {numberFormat(
                                        labour_charge + metal_value
                                      )}
                                    </del>
                                    <label>
                                      <strong className="text-success">
                                        ₹
                                        {numberFormat(
                                          metal_value + labour_charge_discount
                                        )}
                                      </strong>
                                    </label>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <strong className="text-success">
                                      ₹
                                      {numberFormat(
                                        metal_value + labour_charge
                                      )}
                                    </strong>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="not-products">
                          <p>No products available.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ReadytoDispatch;
