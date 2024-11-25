// import React, { useEffect, useLayoutEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../components/common/Loader";
// import profileService from "../../services/Home";
// import Select from "react-select";
// import { Skeleton } from "antd";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { FaFilePdf, FaRegFilePdf } from "react-icons/fa";
// import toast from "react-hot-toast";
// import DealerPdf from "../../services/Dealer/PdfShare";
// import { useNavigation } from "../../context/NavigationContext";

// const imageURL = process.env.REACT_APP_API_KEY_IMAGE_;

// const ReadytoDispatch = () => {
//   const id = "1,4";
//   const navigate = useNavigate();
//   const location = useLocation();

//   const userType = localStorage.getItem("user_type");
//   const email = localStorage.getItem("email");

//   const [loading, setLoading] = useState(true);

//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [tagNoChange, setTagNoChange] = useState(null);

//   const [items, setItems] = useState(null);
//   const [selectedItems, setSelectedItems] = useState(null);

//   const [subItems, setSubItems] = useState(null);
//   const [selectedSubItems, setSelectedSubItems] = useState(null);

//   const [itemGroups, setItemGroups] = useState(null);

//   const [styles, setStyles] = useState(null);

//   const [sizes, setSizes] = useState(null);
//   const [selectedSizes, setSelectedSizes] = useState(null);

//   const [allPrices, setAllPrices] = useState([]);
//   const [totalItems, setTotalItems] = useState([]);

//   const [pdfItems, setPdfItems] = useState([]);

//   const handleCategory = (selectedOption) => {
//     setIsLoading(true);
//     setItemGroups(selectedOption);
//   };

//   const handleSearchItems = (e) => {
//     if (tagNoChange?.length < 0) {
//       setIsLoading(true);
//     }
//     setTagNoChange(e.target.value);
//   };

//   const handleItems = (selectedOption) => {
//     setIsLoading(true);
//     const queryParams = new URLSearchParams(location.search);

//     if (selectedOption) {
//       queryParams.set("items", selectedOption.value);
//     } else {
//       queryParams.delete("items");
//     }

//     navigate(
//       `/ready-to-dispatch/${id}${
//         queryParams ? `?${queryParams.toString()}` : ""
//       }`
//     );

//     setItems(selectedOption ? selectedOption.value : "");
//     setSelectedItems(selectedOption);
//   };

//   const handleSubItems = (selectedOption) => {
//     setIsLoading(true);
//     const queryParams = new URLSearchParams(location.search);

//     if (selectedOption) {
//       queryParams.set("sub-items", selectedOption.value);
//     } else {
//       queryParams.delete("sub-items");
//     }

//     navigate(
//       `/ready-to-dispatch/${id}${
//         queryParams ? `?${queryParams.toString()}` : ""
//       }`
//     );

//     setSubItems(selectedOption ? selectedOption.value : "");
//     setSelectedSubItems(selectedOption);
//   };

//   const handleStylesTag = (selectedOption) => {
//     setIsLoading(true);
//     setStyles(selectedOption);
//   };

//   const handleSizeTag = (selectedOption) => {
//     setIsLoading(true);
//     const queryParams = new URLSearchParams(location.search);

//     if (selectedOption) {
//       queryParams.set("sizes", selectedOption.value);
//     } else {
//       queryParams.delete("sizes");
//     }

//     navigate(
//       `/ready-to-dispatch/${id}${
//         queryParams ? `?${queryParams.toString()}` : ""
//       }`
//     );

//     setSizes(selectedOption ? selectedOption.value : "");
//     setSelectedSizes(selectedOption);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       profileService
//         .GetProductsFilterAPI({
//           PageNo: 1,
//           PageSize: 60,
//           DeviceID: 0,
//           SortBy: "",
//           SearchText: "",
//           TranType: "",
//           CommaSeperate_ItemGroupID: itemGroups?.value || "",
//           CommaSeperate_ItemID: items || "",
//           CommaSeperate_StyleID: styles?.value || "",
//           CommaSeperate_ProductID: "",
//           CommaSeperate_SubItemID: subItems || "",
//           CommaSeperate_AppItemCategoryID: "",
//           CommaSeperate_ItemSubID: "",
//           CommaSeperate_KarigarID: "",
//           CommaSeperate_BranchID: "",
//           CommaSeperate_Size: sizes || "",
//           CommaSeperate_CounterID: "",
//           MaxNetWt: 0,
//           MinNetWt: 0,
//           OnlyCartItem: false,
//           OnlyWishlistItem: false,
//           StockStatus: "",
//           DoNotShowInClientApp: 0,
//           HasTagImage: 0,
//           CommaSeperate_CompanyID: id,
//         })
//         .then((res) => {
//           setFilters(res?.Filters);
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, 1000);
//   }, [itemGroups, items, subItems, styles, sizes, id]);

//   useEffect(() => {
//     profileService
//       .GetProductsPrices()
//       .then((res) => {
//         setAllPrices(res?.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   const numberFormat = (value) =>
//     new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

//   var finalPrice = [
//     {
//       price_24k: allPrices?.price_24k,
//     },
//     {
//       sales_wastage: allPrices?.sales_wastage_rtd,
//     },
//     {
//       sales_wastage_discount: allPrices?.sales_wastage_discount_rtd,
//     },
//   ];

//   const { setPreviousPageUrl } = useNavigation();

//   useEffect(() => {
//     setPreviousPageUrl(location.pathname + location.search);
//   }, [location, setPreviousPageUrl]);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const sortbyItems = searchParams.get("items");
//     const sortbySizes = searchParams.get("sizes");
//     const sortbySubItems = searchParams.get("sub-items");

//     if (sortbySizes && sortbySizes.length > 0) {
//       if (sortbySizes) {

//         const selectedSort = filters?.Size?.find(
//           (item) => item.RowNumber === Number(sortbySizes)
//         );

//         if (selectedSort) {
//           setSizes(Number(sortbySizes));
//           setSelectedSizes({
//             value: selectedSort?.RowNumber,
//             label: selectedSort?.Size1,
//           });
//         }
//       }
//     } else {
//       setIsLoading(true);
//       setSelectedSizes("");
//       setSizes("");
//     }

//     // if (sortbyItems && sortbyItems?.length > 0) {
//     //   if (sortbyItems) {
//     //     const selectedSort = filters?.Items?.find(
//     //       (item) => item.ItemID === Number(sortbyItems)
//     //     );

//     //     if (selectedSort) {
//     //       setItems(Number(sortbyItems));
//     //       setSelectedItems({
//     //         value: selectedSort?.ItemID,
//     //         label: selectedSort?.ItemName,
//     //       });
//     //     }
//     //   }
//     // } else {
//     //   setIsLoading(true);
//     //   setSelectedItems("");
//     //   setItems("");
//     // }

//     // if (sortbySubItems && sortbySubItems?.length > 0) {
//     //   if (sortbySubItems) {
//     //     const selectedSort = filters?.SubItems?.find(
//     //       (item) => item.SubItemID === Number(sortbySubItems)
//     //     );

//     //     if (selectedSort) {
//     //       setSubItems(Number(sortbySubItems));
//     //       setSelectedSubItems({
//     //         value: selectedSort?.SubItemID,
//     //         label: selectedSort?.SubItemName,
//     //       });
//     //     }
//     //   }
//     // } else {
//     //   setIsLoading(true);
//     //   setSelectedSubItems("");
//     //   setSubItems("");
//     // }
//   }, [location.search, filters?.length]);

//   // <-------------------- PAGINATION FUNCTION HERE START -------------------->

//   const scrollup = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const totalPages = Math.ceil(totalItems / 60);

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     dataShowLength: 60,
//   });

//   const paginationPage = (page) => {
//     getProducts(page);
//     setPagination({ ...pagination, currentPage: page });
//     scrollup();
//     setIsLoading(true);
//   };

//   const paginationPrev = () => {
//     if (pagination.currentPage > 1) {
//       const prevPage = pagination.currentPage - 1;
//       setPagination({ ...pagination, currentPage: prevPage });
//       getProducts(prevPage);
//       scrollup();
//       setIsLoading(true);
//     }
//   };

//   const paginationNext = () => {
//     if (pagination.currentPage < totalPages) {
//       const nextPage = pagination.currentPage + 1;
//       setPagination({ ...pagination, currentPage: nextPage });
//       getProducts(nextPage);
//       scrollup();
//       setIsLoading(true);
//     }
//   };

//   // <-------------------- PAGINATION FUNCTION HERE END -------------------->

//   const getProducts = (page) => {
//     profileService
//       .GetProductsAPI({
//         PageNo: page,
//         PageSize: 60,
//         DeviceID: 0,
//         SortBy: "",
//         SearchText: tagNoChange || "",
//         TranType: "",
//         CommaSeperate_ItemGroupID: itemGroups?.value || "",
//         CommaSeperate_ItemID: items || "",
//         CommaSeperate_StyleID: styles?.value || "",
//         CommaSeperate_ProductID: "",
//         CommaSeperate_CompanyID: id || "",
//         CommaSeperate_SubItemID: subItems || "",
//         CommaSeperate_AppItemCategoryID: "",
//         CommaSeperate_ItemSubID: "",
//         CommaSeperate_KarigarID: "",
//         CommaSeperate_BranchID: "",
//         CommaSeperate_Size: sizes || "",
//         CommaSeperate_CounterID: "",
//         MaxNetWt: 0,
//         MinNetWt: 0,
//         OnlyCartItem: false,
//         OnlyWishlistItem: false,
//         StockStatus: "",
//         DoNotShowInClientApp: 0,
//         HasTagImage: 0,
//       })
//       .then((res) => {
//         setProducts(res?.Tags);
//         setTotalItems(res?.TotalItems);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsLoading(true);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     getProducts(pagination?.currentPage || 1);
//   }, [
//     itemGroups,
//     items,
//     subItems,
//     styles,
//     sizes,
//     tagNoChange,
//     id,
//     pagination?.currentPage,
//   ]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   const pdfTip = <Tooltip id="tooltip">My PDF share</Tooltip>;

//   const DealerLogin = (e) => {
//     e.preventDefault();
//     localStorage.setItem("redirectPath", location.pathname);
//     navigate("/dealer-login");
//   };

//   // Dealder List PDF creation
//   const getPdfList = async () => {
//     DealerPdf.readyPdfList({ email: email })
//       .then((res) => {
//         setPdfItems(res?.data?.ready_pdfs_list);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useLayoutEffect(() => {
//     getPdfList();
//   }, []);

//   // Dealder add product for PDF creation
//   const addToPDF = async (e, product, allPrices) => {
//     e.preventDefault();
//     if (!pdfItems.some((item) => item.Barcode === product.Barcode)) {
//       DealerPdf.readytAddToPdf({
//         email: email,
//         company_id: 4,
//         item_group_id: 44,
//         item_id: product?.ItemGroupID,
//         sub_item_id: product?.ItemSubID,
//         style_id: product?.StyleID,
//         barcode: product?.Barcode,
//         tag_no: product?.TagNo,
//         group_name: product?.GroupName,
//         name: product?.ItemName,
//         size: "",
//         gross_weight: product?.GrossWt,
//         net_weight: product?.NetAmt,
//         metal_value: allPrices?.metal_value,
//         making_charge: allPrices?.labour_charge,
//         making_charge_discount: allPrices?.labour_charge_discount,
//         total_amount: allPrices?.total_prices,
//       })
//         .then((res) => {
//           getPdfList();
//           toast.success(res.message);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//     }
//   };

//   // Dealder remove product for PDF creation
//   const removeToPDF = (e, product) => {
//     e.preventDefault();
//     DealerPdf.readyRemovePdf({
//       ready_pdf_id: product.id,
//     })
//       .then((res) => {
//         if (res.success === true) {
//           getPdfList();
//           toast.success(res.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <section className="ready-to-dispatch">
//         <div className="container">
//           {isLoading ? (
//             <div className="animation-loading">
//               <Loader />
//             </div>
//           ) : (
//             <>
//               <div className="row">
//                 <div className="col-md-3 mb-2 mb-md-4">
//                   <div className="form-group d-flex align-items-center">
//                     <input
//                       type="search"
//                       className="form-control"
//                       placeholder="Search with tag no"
//                       onChange={(e) => handleSearchItems(e)}
//                       isClearable={true}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-3 mb-2 mb-md-4">
//                   <Select
//                     placeholder="Select Sizes"
//                     isClearable
//                     isSearchable={false}
//                     value={selectedSizes}
//                     onChange={handleSizeTag}
//                     options={filters?.Size?.map((data) => ({
//                       label: data?.Size1,
//                       value: data?.RowNumber,
//                     }))}
//                   />
//                 </div>

//                 {/* Category Wise Filter */}
//                 {/* <div className="col-md-3">
//                   <Select
//                     placeholder="Select Category"
//                     isClearable
//                     isSearchable={false}
//                     value={itemGroups}
//                     onChange={handleCategory}
//                     options={filters?.ItemGroups?.map((data) => ({
//                       label: data?.GroupName,
//                       value: data?.ItemGroupID,
//                     }))}
//                   />
//                 </div> */}
//                 <div className="col-md-3 my-2 my-md-0">
//                   <Select
//                     placeholder="Select Item"
//                     isClearable
//                     isSearchable={false}
//                     value={selectedItems}
//                     onChange={handleItems}
//                     options={filters?.Items?.map((data) => ({
//                       label: data?.ItemName,
//                       value: data?.ItemID,
//                     }))}
//                   />
//                 </div>
//                 <div className="col-md-3 mb-2 mb-md-0">
//                   <Select
//                     placeholder="Select Sub Item"
//                     isClearable
//                     isSearchable={false}
//                     value={selectedSubItems}
//                     onChange={handleSubItems}
//                     options={filters?.SubItems?.map((data) => ({
//                       label: data?.SubItemName,
//                       value: data?.SubItemID,
//                     }))}
//                   />
//                 </div>
//                 {/* <div className="col-md-3">
//                   <Select
//                     placeholder="Select Style"
//                     isClearable
//                     isSearchable={false}
//                     value={styles}
//                     onChange={handleStylesTag}
//                     options={filters?.Styles?.map((data) => ({
//                       label: data?.StyleName,
//                       value: data?.StyleID,
//                     }))}
//                   />
//                 </div> */}
//               </div>
//               <div className="row mt-4">
//                 {products?.length > 0 ? (
//                   <>
//                     {products?.map((data, index) => {
//                       var sales_wastage_of_category =
//                         finalPrice[1]?.sales_wastage[data?.SubItemID] || 0;

//                       var sales_wastage_discount_of_category =
//                         finalPrice[2]?.sales_wastage_discount[
//                           data?.SubItemID
//                         ] || 0;

//                       var labour_charge =
//                         (finalPrice[0]?.price_24k[data?.SubItemID] *
//                           sales_wastage_of_category) /
//                           100 || 0;

//                       if (labour_charge > 0) {
//                         labour_charge = labour_charge * data?.NetWt || 0;
//                       }

//                       const labour_charge_discount =
//                         sales_wastage_discount_of_category > 0
//                           ? labour_charge -
//                             (labour_charge *
//                               sales_wastage_discount_of_category) /
//                               100
//                           : 0;

//                       var metal_value =
//                         finalPrice[0]?.price_24k[data?.SubItemID] *
//                           (data?.Touch / 100) *
//                           data?.NetWt || 0;

//                       const allPrices = {
//                         total_prices:
//                           labour_charge_discount > 0
//                             ? metal_value + labour_charge_discount
//                             : metal_value + labour_charge,
//                         labour_charge_discount: numberFormat(
//                           labour_charge_discount
//                         ),
//                         metal_value: numberFormat(metal_value),
//                         labour_charge: numberFormat(labour_charge),
//                       };

//                       return (
//                         <>
//                           <div
//                             className="col-md-3 col-sm-4 col-xs-6"
//                             key={index}
//                           >
//                             <div className="item-product text-center">
//                               <Link
//                                 to={`/ready-to-dispatch/${id}/${data?.TagNo}`}
//                                 onClick={() =>
//                                   setPreviousPageUrl(
//                                     location.pathname + location.search
//                                   )
//                                 }
//                               >
//                                 <div className="product-thumb">
//                                   {loading ? (
//                                     <Skeleton.Image
//                                       active
//                                       style={{ width: "100%" }}
//                                     />
//                                   ) : data?.Images[0]?.ImageName ? (
//                                     <img
//                                       src={`${imageURL}${data?.Images[0]?.ImageName}`}
//                                       alt=""
//                                       className="w-100"
//                                     />
//                                   ) : (
//                                     <img
//                                       src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
//                                       alt=""
//                                       className="w-100"
//                                     />
//                                   )}
//                                 </div>
//                               </Link>
//                               <div className="wishlist-top">
//                                 {userType == 1 && (
//                                   <>
//                                     <div className="mt-2">
//                                       {email ? (
//                                         <OverlayTrigger
//                                           placement="top"
//                                           overlay={pdfTip}
//                                         >
//                                           <Link
//                                             to="#"
//                                             className=""
//                                             onClick={(e) => {
//                                               if (
//                                                 pdfItems?.find(
//                                                   (item) =>
//                                                     item?.Barcode ===
//                                                     data?.Barcode
//                                                 )
//                                               ) {
//                                                 removeToPDF(e, data);
//                                               } else {
//                                                 addToPDF(e, data, allPrices);
//                                               }
//                                             }}
//                                           >
//                                             {pdfItems?.find(
//                                               (item) =>
//                                                 item?.Barcode === data?.Barcode
//                                             ) ? (
//                                               <FaFilePdf />
//                                             ) : (
//                                               <FaRegFilePdf />
//                                             )}
//                                           </Link>
//                                         </OverlayTrigger>
//                                       ) : (
//                                         <span onClick={(e) => DealerLogin(e)}>
//                                           <FaRegFilePdf />
//                                         </span>
//                                       )}
//                                     </div>
//                                   </>
//                                 )}
//                               </div>

//                               <div className="product-info d-grid">
//                                 {labour_charge_discount > 0 ? (
//                                   <>
//                                     <del>
//                                       ₹
//                                       {numberFormat(
//                                         labour_charge + metal_value
//                                       )}
//                                     </del>
//                                     <label>
//                                       <strong className="text-success">
//                                         ₹
//                                         {numberFormat(
//                                           metal_value + labour_charge_discount
//                                         )}
//                                       </strong>
//                                     </label>
//                                   </>
//                                 ) : (
//                                   <strong className="text-success">
//                                     ₹{numberFormat(metal_value + labour_charge)}
//                                   </strong>
//                                 )}
//                               </div>
//                               {userType == 1 && (
//                                 <div className="mt-2">
//                                   <span
//                                     style={{
//                                       color: "#db9662",
//                                       fontWeight: 700,
//                                     }}
//                                   >
//                                     {data?.TagNo}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </>
//                       );
//                     })}

//                     {/* PAGINATION */}
//                     <div className="pt-5">
//                       {totalPages > 1 && (
//                         <div className="paginationArea">
//                           <nav aria-label="navigation">
//                             <ul className="pagination">
//                               {/* Previous Page Button */}
//                               <li
//                                 className={`page-item ${
//                                   pagination.currentPage === 1 ? "disabled" : ""
//                                 }`}
//                                 style={{
//                                   display:
//                                     pagination.currentPage === 1
//                                       ? "none"
//                                       : "block",
//                                 }}
//                               >
//                                 <Link
//                                   to="#"
//                                   className="page-link"
//                                   onClick={paginationPrev}
//                                 >
//                                   <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <polyline points="15 18 9 12 15 6"></polyline>
//                                   </svg>
//                                   Prev
//                                 </Link>
//                               </li>

//                               {/* Display pages with ellipses */}
//                               {Array.from({ length: totalPages }).map(
//                                 (_, index) => {
//                                   const pageNumber = index + 1;
//                                   const isCurrentPage =
//                                     pagination.currentPage === pageNumber;

//                                   // Display first and last pages
//                                   if (
//                                     pageNumber === 1 ||
//                                     pageNumber === totalPages ||
//                                     (pageNumber >= pagination.currentPage - 1 &&
//                                       pageNumber <= pagination.currentPage + 1)
//                                   ) {
//                                     return (
//                                       <li
//                                         key={pageNumber}
//                                         className={`page-item ${
//                                           isCurrentPage ? "active" : ""
//                                         }`}
//                                         onClick={() =>
//                                           paginationPage(pageNumber)
//                                         }
//                                       >
//                                         <Link to="#" className="page-link">
//                                           {pageNumber}
//                                         </Link>
//                                       </li>
//                                     );
//                                   }

//                                   // Display ellipses
//                                   if (index === 1 || index === totalPages - 2) {
//                                     return (
//                                       <li
//                                         key={pageNumber}
//                                         className="page-item disabled"
//                                       >
//                                         <Link to="#" className="page-link">
//                                           ...
//                                         </Link>
//                                       </li>
//                                     );
//                                   }

//                                   return null;
//                                 }
//                               )}

//                               {/* Next Page Button */}
//                               <li
//                                 className={`page-item ${
//                                   pagination.currentPage === totalPages
//                                     ? "disabled"
//                                     : ""
//                                 }`}
//                                 style={{
//                                   display:
//                                     pagination.currentPage === totalPages
//                                       ? "none"
//                                       : "block",
//                                 }}
//                               >
//                                 <Link
//                                   to="#"
//                                   className="page-link"
//                                   onClick={paginationNext}
//                                 >
//                                   Next
//                                   <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <polyline points="9 18 15 12 9 6"></polyline>
//                                   </svg>
//                                 </Link>
//                               </li>
//                             </ul>
//                           </nav>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div class="row">
//                       <div class="col-md-12">
//                         <div class="not-products">
//                           <p>No products available.</p>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default ReadytoDispatch;

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { FaFilePdf, FaRegFilePdf, FaRegStar, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ShopServices from "../../services/Shop";
import FilterServices from "../../services/Filter";
import DealerWishlist from "../../services/Dealer/Collection";
import DealerPdf from "../../services/Dealer/PdfShare";
import UserWishlist from "../../services/Auth";
import { WishlistSystem } from "../../context/WishListContext";
import Loader from "../../components/common/Loader";
import { useNavigation } from "../../context/NavigationContext";

const Shop = () => {
  const { dispatch: wishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: removeWishlistDispatch } = useContext(WishlistSystem);

  const location = useLocation();
  const navigate = useNavigate();

  const { setPreviousPageUrl } = useNavigation();

  useEffect(() => {
    setPreviousPageUrl(location.pathname + location.search);
  }, [location, setPreviousPageUrl]);

  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [searchInput, setSearchInput] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [genderData, setGenderData] = useState([]);
  const [gender, setGender] = useState();
  const [selectedGender, setSelectedGender] = useState(null);

  const [filterTag, setFilterTag] = useState([]);
  const [tag, setTag] = useState();
  const [selectedTag, setSelectedTag] = useState(null);

  const [PriceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });

  const [FilterPriceRange, setFilterPriceRange] = useState({
    minprice: 0,
    maxprice: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [filterData, setFilterData] = useState([]);
  const [paginate, setPaginate] = useState();

  const [collection_status, setCollectionStatus] = useState(false);
  const [DealerCollection, setDealerCollection] = useState([]);

  const [userWishlist, setUserWishlist] = useState(false);
  const [goldColor, setGoldColor] = useState("yellow_gold");
  const [goldType, setGoldType] = useState("18k");
  const [UsercartItems, setUserCartItems] = useState([]);
  const [pdfItems, setPdfItems] = useState([]);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // sort by searching
  const searchbar = (e) => {
    setSearchInput(e.target.value);
  };

  // sort by dropdown functions
  const [options] = useState([
    { value: "new_added", label: "New Added" },
    { value: "low_to_high", label: "Price: low to high" },
    { value: "high_to_low", label: "Price: high to low" },
    { value: "highest_selling", label: "Top Seller" },
  ]);

  const handleSelectChange = (selectedSort) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    if (selectedSort) {
      queryParams.set("sort_by", selectedSort.value);
    } else {
      queryParams.delete("sort_by");
    }

    navigate(`/shop?${queryParams.toString()}`);
    setSelectedOption(selectedSort);
  };

  // 4 Filter APIS call
  const CategoryFilter = () => {
    FilterServices.categoryFilter()
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const GenderFilter = () => {
    FilterServices.genderFilter()
      .then((res) => {
        setGenderData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectCategory = (categoryId) => {
    setIsLoading(true);

    setSearchInput("");

    setSelectedOption("");

    setGender(null);
    setSelectedGender(null);

    setTag(null);
    setSelectedTag(null);

    setPriceRange("");
    navigate(`/shop${categoryId ? `?category_id=${categoryId.value}` : ""}`);

    setCategory(categoryId ? categoryId.value : null);
    setSelectedCategory(categoryId);
  };

  const handleSelectGender = (genderId) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);
    if (genderId) {
      queryParams.set("gender_id", genderId.value);
    } else {
      queryParams.delete("gender_id");
    }

    navigate(`/shop?${queryParams.toString()}`);

    setGender(genderId ? genderId?.value : null);
    setSelectedGender(genderId);
  };

  const handleSelectTag = (selectedTags) => {
    setIsLoading(true);

    const queryParams = new URLSearchParams(location.search);

    const selectedTagId = selectedTags ? parseFloat(selectedTags.value) : null;
    if (selectedTagId !== null) {
      queryParams.set("tag_id", selectedTagId);
    } else {
      queryParams.delete("tag_id");
    }

    navigate(`/shop?${queryParams.toString()}`);

    setTag(selectedTagId);
    setSelectedTag(selectedTags);
  };

  const handleSliderChange = (e) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(location.search);

    queryParams.set("min_price", e[0]);
    queryParams.set("max_price", e[1]);

    navigate(`/shop?${queryParams.toString()}`);

    setPriceRange({ minprice: e[0], maxprice: e[1] });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortbyId = searchParams.get("sort_by");
    const categoryId = searchParams.get("category_id");
    const genderId = searchParams.get("gender_id");
    const tagIds = searchParams.getAll("tag_id");
    const lowPrice = searchParams.getAll("min_price");
    const highPrice = searchParams.getAll("max_price");

    if (lowPrice !== null || highPrice !== null) {
      const selectedPrice = {
        minprice:
          lowPrice !== null ? parseFloat(lowPrice) : FilterPriceRange.minprice,
        maxprice:
          highPrice !== null
            ? parseFloat(highPrice)
            : FilterPriceRange.maxprice,
      };
      setPriceRange(selectedPrice);
    } else {
      setIsLoading(true);
      setPriceRange({ minprice: null, maxprice: null });
    }

    if (sortbyId && sortbyId.length > 0) {
      if (sortbyId) {
        const selectedSort = options.find((item) => item.value === sortbyId);

        if (selectedSort) {
          setSelectedOption(selectedSort);
        }
      }
    } else {
      setIsLoading(true);
      setSelectedOption(null);
    }

    if (categoryId && categoryId.length > 0) {
      if (categoryId) {
        const Category_ids = categoryData?.find(
          (item) => item.id === Number(categoryId)
        );

        if (Category_ids) {
          setCategory(Number(categoryId));
          setSelectedCategory({
            value: Category_ids.id,
            label: Category_ids.name,
          });
        }
      }
    } else {
      setIsLoading(true);
      setCategory(null);
      setSelectedCategory("");
    }

    if (genderId && genderId.length > 0) {
      if (genderId) {
        const Gender_ids = genderData?.find(
          (item) => item.id === Number(genderId)
        );

        if (Gender_ids) {
          setGender(Number(genderId));
          setSelectedGender({
            value: Gender_ids.id,
            label: Gender_ids.name,
          });
        }
      }
    } else {
      setIsLoading(true);
      setGender(null);
      setSelectedGender("");
    }

    if (tagIds && tagIds.length > 0) {
      setIsLoading(true);

      try {
        const parsedTagIds = tagIds[0].split(",").map((id) => parseFloat(id));
        setTag(parsedTagIds[0]);

        if (parsedTagIds && parsedTagIds.length > 0) {
          const selectedTagID = filterTag?.find(
            (item) => item.id === parsedTagIds[0]
          );

          if (selectedTagID) {
            setSelectedTag({
              value: selectedTagID?.id,
              label: selectedTagID?.name,
            });
          } else {
            console.error("Tag not found with ID:", parsedTagIds[0]);
          }
        }
      } catch (error) {
        console.error("Error parsing tag IDs:", error);
        setTag(null);
      }
    } else {
      setIsLoading(true);
      setTag(null);
      setSelectedTag("");
    }
  }, [location.search, filterTag?.length]);

  const FilterData = (offset = 0) => {
    ShopServices.allfilterdesigns({
      category_id: category,
      gender_id: gender,
      tag_id: tag,
      search: searchInput,
      min_price: PriceRange?.minprice,
      max_price: PriceRange?.maxprice,
      sort_by: selectedOption?.value,
      userType: userType,
      userId: userId,
      offset: offset,
    })
      .then((res) => {
        setIsLoading(false);
        setFilterData(res.data?.designs);
        setFilterTag(res.data?.tags);
        setPaginate(res.data);
        setFilterPriceRange({
          minprice: res.data.minprice,
          maxprice: res.data.maxprice,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  };

  useEffect(() => {
    if (Phone) {
      GetUserWishList();
    }

    if (email) {
      GetDealerSelection();
    }

    CategoryFilter();
    GenderFilter();
  }, []);

  // user wishlist API
  const GetUserWishList = async () => {
    UserWishlist.userWishlist({ phone: Phone })
      .then((res) => {
        setUserCartItems(res?.data?.wishlist_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // user wishlist products add
  const addToUserWishList = async (e, product) => {
    e.preventDefault();
    const payload = { id: product?.id };
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
            GetUserWishList();
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
  const removeFromWishList = (e, product) => {
    e.preventDefault();
    const payload = product;
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
          GetUserWishList();
          removeWishlistDispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealer wishlist API
  const GetDealerSelection = () => {
    DealerWishlist.ListCollection({ email: email })
      .then((res) => {
        setDealerCollection(res.data?.wishlist_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealer Wishlist products add
  const AddToDealerSelection = async (e, product) => {
    e.preventDefault();
    if (!DealerCollection?.some((item) => item.id === product?.id)) {
      DealerWishlist.addtoDealerWishlist({
        email: email,
        design_id: product?.id,
      })
        .then((res) => {
          if (res.success === true) {
            setCollectionStatus(true);
            toast.success("Design has been Added to Your Collection.");
            FilterData();
            GetDealerSelection();
            resetPagination();
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
  const removeFromSelection = (e, product) => {
    e.preventDefault();
    DealerWishlist.removetodealerWishlist({
      email: localStorage.getItem("email"),
      design_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message);
          FilterData();
          GetDealerSelection();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Dealder List PDF creation
  const getPdfList = async () => {
    DealerPdf.pdfList({ email: email })
      .then((res) => {
        setPdfItems(res?.data?.pdf_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    getPdfList();
  }, []);

  // Dealder add product for PDF creation
  const addToPDF = async (e, product) => {
    e.preventDefault();
    if (!pdfItems.some((item) => item.id === product.id)) {
      DealerPdf.addToPdf({
        email: email,
        design_id: product.id,
      })
        .then((res) => {
          getPdfList();
          toast.success(res.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  // Dealder remove product for PDF creation
  const removeToPDF = (e, product) => {
    e.preventDefault();
    DealerPdf.removePdf({
      email: email,
      design_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          getPdfList();
          toast.success(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // PAGINATION FUNCTION
  const totalPages = Math.ceil(paginate?.total_records / 40);

  const [pagination, setPagination] = useState({});

  const resetPagination = () => {
    setPagination({
      currentPage: 1,
      dataShowLength: 40,
    });
  };

  const paginationPage = (page) => {
    const newOffset = (page - 1) * pagination.dataShowLength;
    FilterData(newOffset);
    setPagination({ ...pagination, currentPage: page });
    scrollup();
    setIsLoading(true);
  };

  const paginationPrev = (e) => {
    e.preventDefault();
    if (pagination.currentPage > 1) {
      const prevPage = pagination.currentPage - 1;
      const newOffset = (prevPage - 1) * pagination.dataShowLength;
      FilterData(newOffset);
      setPagination({ ...pagination, currentPage: prevPage });
      scrollup();
      setIsLoading(true);
    }
  };

  const paginationNext = (e) => {
    e.preventDefault();
    if (pagination.currentPage < totalPages) {
      const nextPage = pagination.currentPage + 1;
      const newOffset = (nextPage - 1) * pagination.dataShowLength;
      FilterData(newOffset);
      setPagination({ ...pagination, currentPage: nextPage });
      scrollup();
      setIsLoading(true);
    }
  };

  const UserLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  const DealerLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/dealer-login");
  };

  useEffect(() => {
    resetPagination();
    FilterData(0);
  }, [category, tag, gender, searchInput, PriceRange, selectedOption]);

  const wishlistTip = <Tooltip id="tooltip">wishlist</Tooltip>;
  const selectionTip = <Tooltip id="tooltip">My Selections</Tooltip>;
  const pdfTip = <Tooltip id="tooltip">My PDF share</Tooltip>;
  const userTip = (
    <Tooltip id="tooltip">Login to add wishlist products</Tooltip>
  );

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  return (
    <>
      <Helmet>
        <title>Impel Store - Shop</title>
      </Helmet>
      <section className="shop">
        <div className="container">
          <div className="shopping_data">
            <div className="row">
              <div className="col-md-9 col-12 md-mb-0 mb-2">
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
              <div className="col-md-3 col-12">
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

            <div className="row">
              <div className="col-md-3 col-12 mt-2 mt-md-2">
                <div className="search_bar">
                  <input
                    className="form-control"
                    placeholder="Search by design code"
                    onChange={(e) => searchbar(e)}
                    type="search"
                    isClearable={true}
                  />
                  {searchInput && searchInput.length >= 1 ? null : (
                    <BsSearch className="search-icon cursor-pointer" />
                  )}
                </div>
              </div>
              <div className="col-md-3 col-12 mt-2 mt-md-2">
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
              <div className="col-md-3 col-12 mt-2 mt-md-2">
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
                <Accordion className="accordian">
                  <Accordion.Item eventKey="3" className="my-2">
                    <Accordion.Header>Shop by price</Accordion.Header>
                    <Accordion.Body className="p-4 mb-2">
                      <div className="d-flex justify-content-between">
                        <p>
                          From :
                          <strong>
                            ₹
                            {PriceRange?.minprice
                              ? PriceRange?.minprice
                              : FilterPriceRange.minprice}
                          </strong>
                        </p>
                        <p>
                          To :
                          <strong>
                            ₹
                            {PriceRange?.maxprice
                              ? PriceRange?.maxprice
                              : FilterPriceRange.maxprice}
                          </strong>
                        </p>
                      </div>
                      <Slider
                        range
                        allowCross={false}
                        min={FilterPriceRange.minprice}
                        max={FilterPriceRange.maxprice}
                        marks={{
                          [FilterPriceRange?.minprice]: "Min",
                          [FilterPriceRange?.maxprice]: "Max",
                        }}
                        onAfterChange={handleSliderChange}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-md-12">
                {isLoading ? (
                  <div className="animation-loading">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {filterData?.length > 0 ? (
                      <>
                        <div className="row">
                          {filterData?.map((data) => {
                            return (
                              <>
                                <div className="col-md-3 col-sm-4 col-xs-6">
                                  <div className="item-product text-center">
                                    <Link
                                      to={`/shopdetails/${data?.id}`}
                                      onClick={() =>
                                        setPreviousPageUrl(
                                          location.pathname + location.search
                                        )
                                      }
                                    >
                                      <div className="product-thumb">
                                        {data?.image ? (
                                          <>
                                            <img
                                              src={data?.image}
                                              alt={data?.name}
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
                                      <div className="product-info">
                                        {/* <h4>
                                          {data?.name}&nbsp;
                                          <span>({data?.code})</span>
                                        </h4> */}

                                        <div className="product-info d-grid">
                                          {data?.making_charge_discount_18k >
                                          0 ? (
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
                                              ₹
                                              {numberFormat(
                                                data?.total_amount_18k
                                              )}
                                            </strong>
                                          )}
                                        </div>

                                        {/* <label>
                                          ₹
                                          {numberFormat(data?.total_amount_18k)}
                                        </label> */}
                                      </div>
                                      {userType == 1 && (
                                        <div className="mt-1">
                                          <span
                                            style={{
                                              color: "#db9662",
                                              fontWeight: 700,
                                            }}
                                          >
                                            {data?.code}
                                          </span>
                                        </div>
                                      )}
                                    </Link>
                                    <div className="wishlist-top">
                                      {userType == 1 ? (
                                        <>
                                          {email ? (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={selectionTip}
                                            >
                                              <Link
                                                to="#"
                                                className="dealer_heart_icon"
                                                onClick={(e) => {
                                                  if (
                                                    DealerCollection?.find(
                                                      (item) =>
                                                        item?.id === data?.id
                                                    )
                                                  ) {
                                                    removeFromSelection(
                                                      e,
                                                      data
                                                    );
                                                  } else {
                                                    AddToDealerSelection(
                                                      e,
                                                      data
                                                    );
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
                                            </OverlayTrigger>
                                          ) : (
                                            <span
                                              onClick={(e) => DealerLogin(e)}
                                            >
                                              <FaRegStar />
                                            </span>
                                          )}
                                          {email ? (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={pdfTip}
                                            >
                                              <Link
                                                to="#"
                                                className="dealer_heart_icon"
                                                onClick={(e) => {
                                                  if (
                                                    pdfItems?.find(
                                                      (item) =>
                                                        item?.id === data?.id
                                                    )
                                                  ) {
                                                    removeToPDF(e, data);
                                                  } else {
                                                    addToPDF(e, data);
                                                  }
                                                }}
                                              >
                                                {pdfItems?.find(
                                                  (item) =>
                                                    item?.id === data?.id
                                                ) ? (
                                                  <FaFilePdf />
                                                ) : (
                                                  <FaRegFilePdf />
                                                )}
                                              </Link>
                                            </OverlayTrigger>
                                          ) : (
                                            <span
                                              onClick={(e) => DealerLogin(e)}
                                            >
                                              <FaRegFilePdf />
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {Phone ? (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={wishlistTip}
                                            >
                                              <Link
                                                to="#"
                                                className=""
                                                onClick={(e) => {
                                                  if (
                                                    UsercartItems?.find(
                                                      (item) =>
                                                        item.id === data.id
                                                    )
                                                  ) {
                                                    removeFromWishList(e, data);
                                                  } else {
                                                    addToUserWishList(e, data);
                                                  }
                                                }}
                                              >
                                                {UsercartItems?.find(
                                                  (item) => item.id === data.id
                                                ) ? (
                                                  <FcLike />
                                                ) : (
                                                  <FiHeart />
                                                )}
                                              </Link>
                                            </OverlayTrigger>
                                          ) : (
                                            <OverlayTrigger
                                              placement="top"
                                              overlay={userTip}
                                            >
                                              <span
                                                className=""
                                                onClick={(e) => UserLogin(e)}
                                              >
                                                <FiHeart
                                                  style={{ fontSize: "22px" }}
                                                />
                                              </span>
                                            </OverlayTrigger>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>

                        {totalPages > 1 && (
                          <div className="pt-5">
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
                                      onClick={(e) => paginationPrev(e)}
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
                                          >
                                            <button
                                              className="page-link"
                                              onClick={() =>
                                                paginationPage(pageNumber)
                                              }
                                            >
                                              {pageNumber}
                                            </button>
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
                                            <button className="page-link">
                                              ...
                                            </button>
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
                                      onClick={(e) => paginationNext(e)}
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
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="not-products">
                        <p>No products available.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
