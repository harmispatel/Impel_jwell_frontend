import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ShopServices from "../../services/Shop";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SidebarFilter = (props) => {
  const [PriceRange, setPriceRange] = useState({
    minprice: 0,
    maxprice: 0,
  });

  useEffect(() => {
    priceRange();
  }, []);

  const priceRange = () => {
    ShopServices.allfilterdesigns()
      .then((res) => {
        setPriceRange({
          minprice: res.data.minprice,
          maxprice: res.data.maxprice,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Accordion>
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
