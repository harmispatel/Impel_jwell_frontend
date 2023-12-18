// import React, { useEffect, useState } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import FilterServices from "../../services/Filter";
// import ShopServices from "../../services/Shop";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// const SidebarFilter = (props) => {
//   const userType = localStorage.getItem("user_type");
//   const [categoryData, setCategoryData] = useState([]);
//   const [genderData, setGenderData] = useState([]);
//   const [TagData, setTagData] = useState([]);
//   const [PriceRange, setPriceRange] = useState({
//     minprice: 0,
//     maxprice: 0,
//   });

//   useEffect(() => {
//     CategoryFilter();
//     GenderFilter();
//     TagFilter();
//     priceRange();
//   }, []);

//   const CategoryFilter = () => {
//     FilterServices.categoryFilter()
//       .then((res) => {
//         setCategoryData(res.data);
//       })
//       .catch((error) => console.log("Error in category filter"));
//   };

//   const GenderFilter = () => {
//     FilterServices.genderFilter()
//       .then((res) => {
//         setGenderData(res.data);
//       })
//       .catch((error) => console.log("Error in gender filter"));
//   };

//   const TagFilter = () => {
//     FilterServices.TagFilter()
//       .then((res) => {
//         setTagData(res.data);
//       })
//       .catch((error) => console.log("Error in tag filter"));
//   };

//   const priceRange = () => {
//     ShopServices.alldesigns()
//       .then((res) => {
//         setPriceRange({ minprice: res.minprice, maxprice: res.maxprice });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       {userType !== "1" ? (
//         <button className="btn dispatch_btn w-100 mb-2 p-2">
//           Ready To Dispatch
//         </button>
//       ) : (
//         ""
//       )}

//       <Accordion>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>{props.Categoryheader}</Accordion.Header>
//           <Accordion.Body>
//             <ul>
//               {categoryData.map((data, index) => {
//                 return (
//                   <li>
//                     <input
//                       type="checkbox"
//                       key={index}
//                       value={data.id}
//                       id={`Categorydata${index}`}
//                       onChange={props.onCategoryChange}
//                     />
//                     <label
//                       className="form-check-label ms-2"
//                       style={{ cursor: "pointer" }}
//                       htmlFor={`Categorydata${index}`}
//                     >
//                       {data.name}
//                     </label>
//                   </li>
//                 );
//               })}
//             </ul>
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="1" className="my-2">
//           <Accordion.Header>{props.Genderheader}</Accordion.Header>
//           <Accordion.Body>
//             <ul>
//               {genderData.map((data, index) => {
//                 return (
//                   <li>
//                     <input
//                       type="checkbox"
//                       key={index}
//                       value={data.id}
//                       id={`Genderdata${index}`}
//                       onChange={props.onGenderChange}
//                     />
//                     <label
//                       className="form-check-label ms-2"
//                       style={{ cursor: "pointer" }}
//                       htmlFor={`Genderdata${index}`}
//                     >
//                       {data.name}
//                     </label>
//                   </li>
//                 );
//               })}
//             </ul>
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="2" className="my-2">
//           <Accordion.Header>{props.Tagheader}</Accordion.Header>
//           <Accordion.Body>
//             <ul>
//               {TagData.map((data, index) => {
//                 return (
//                   <li>
//                     <input
//                       type="checkbox"
//                       key={index}
//                       value={data.id}
//                       id={`Tagdata${index}`}
//                       onChange={props.onTagChange}
//                       checked={props?.tag?.includes(data.id) ? true : false}
//                     />
//                     <label
//                       className="form-check-label ms-2"
//                       style={{ cursor: "pointer" }}
//                       htmlFor={`Tagdata${index}`}
//                     >
//                       {data.name}
//                     </label>
//                   </li>
//                 );
//               })}
//             </ul>
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="3" className="my-2">
//           <Accordion.Header>{props.Priceheader}</Accordion.Header>
//           <Accordion.Body className="p-4 mb-2">
//             <div className="d-flex justify-content-between">
//               <p>
//                 From:{" "}
//                 <strong>
//                   ₹ {props.minprice ? props.minprice : PriceRange.minprice}
//                 </strong>
//               </p>
//               <p>
//                 To:{" "}
//                 <strong>
//                   ₹ {props.maxprice ? props.maxprice : PriceRange.maxprice}
//                 </strong>
//               </p>
//             </div>
//             <Slider
//               range
//               allowCross={false}
//               min={PriceRange.minprice}
//               max={PriceRange.maxprice}
//               marks={{
//                 [PriceRange?.minprice]: "Min",
//                 [PriceRange?.maxprice]: "Max",
//               }}
//               onAfterChange={props.onHandleSliderChange}
//             />
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//     </>
//   );
// };
// export default SidebarFilter;
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import FilterServices from "../../services/Filter";
import ShopServices from "../../services/Shop";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SidebarFilter = (props) => {
  const userType = localStorage.getItem("user_type");
  const [categoryData, setCategoryData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [TagData, setTagData] = useState([]);
  const [PriceRange, setPriceRange] = useState({
    minprice: 0,
    maxprice: 0,
  });

  useEffect(() => {
    CategoryFilter();
    GenderFilter();
    TagFilter();
    priceRange();
  }, []);

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

  const priceRange = () => {
    ShopServices.alldesigns()
      .then((res) => {
        setPriceRange({ minprice: res.minprice, maxprice: res.maxprice });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {selectedCategory && (
        <div className="selected-category">
          Selected Category: {selectedCategory}
        </div>
      )}

      <Accordion>
        {/* <Accordion.Item eventKey="0">
          <Accordion.Header>{props.Categoryheader}</Accordion.Header>

          <Accordion.Body>
            <ul>
              {categoryData?.map((data, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    name="categoryData"
                    value={data.id}
                    id={`Categorydata${index}`}
                    onChange={(e) => {
                      props.onCategoryChange(e);
                      setSelectedCategory(data.name); // Update selected category
                    }}
                  />
                  <label
                    className="form-check-label ms-2"
                    style={{ cursor: "pointer" }}
                    htmlFor={`Categorydata${index}`}
                  >
                    {data.name}
                  </label>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="my-2">
          <Accordion.Header>{props.Genderheader}</Accordion.Header>
          <Accordion.Body>
            <ul>
              {genderData.map((data, index) => {
                return (
                  <li>
                    <input
                      type="radio"
                      name="genderData"
                      key={index}
                      value={data.id}
                      id={`Genderdata${index}`}
                      onChange={props.onGenderChange}
                    />
                    <label
                      className="form-check-label ms-2"
                      style={{ cursor: "pointer" }}
                      htmlFor={`Genderdata${index}`}
                    >
                      {data.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="my-2">
          <Accordion.Header>{props.Tagheader}</Accordion.Header>
          <Accordion.Body>
            <ul>
              {TagData.map((data, index) => {
                return (
                  <li>
                    <input
                      type="checkbox"
                      key={index}
                      value={data.id}
                      id={`Tagdata${index}`}
                      onChange={props.onTagChange}
                      checked={props?.tag?.includes(data.id) ? true : false}
                    />
                    <label
                      className="form-check-label ms-2"
                      style={{ cursor: "pointer" }}
                      htmlFor={`Tagdata${index}`}
                    >
                      {data.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </Accordion.Body>
        </Accordion.Item> */}
        <Accordion.Item eventKey="3" className="my-2">
          <Accordion.Header>{props.Priceheader}</Accordion.Header>
          <Accordion.Body className="p-4 mb-2">
            <div className="d-flex justify-content-between">
              <p>
                From:{" "}
                <strong>
                  ₹ {props.minprice ? props.minprice : PriceRange.minprice}
                </strong>
              </p>
              <p>
                To:{" "}
                <strong>
                  ₹ {props.maxprice ? props.maxprice : PriceRange.maxprice}
                </strong>
              </p>
            </div>
            <Slider
              range
              allowCross={false}
              min={PriceRange.minprice}
              max={PriceRange.maxprice}
              marks={{
                [PriceRange?.minprice]: "Min",
                [PriceRange?.maxprice]: "Max",
              }}
              onAfterChange={props.onHandleSliderChange}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
export default SidebarFilter;