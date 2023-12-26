import React from "react";

const SubCategory = (props) => {
  return (
    <div>
      <ul>
        {props.data.map((data) => (
          <li key={data.id}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id={`exampleRadios${data.id}`}
                onChange={() => props.onChange(data.id)}
                value={data.id}
              />
              <label
                className="form-check-label"
                htmlFor={`exampleRadios${data.id}`}
              >
                {data.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategory;
