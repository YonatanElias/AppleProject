import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import "./iphone.css";

function Iphone() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  console.log(product);

  return (
    <div className="iphone-container">
      {product.map((item) => {
      

        let productPage = "/iphone/" + item.product_id;
        let productlist = (
          <div className="iphone-row">
            <div className="iphone-text">
              <h1>{item.product_name}</h1>
              <p className="brief">{item.product_brief_description}</p>
              <p className="price">Starting at {item.starting_price}</p>
              <p className="priceRange">{item.price_range}</p>

              <div className="links-wrapper">
                <ul>
                  <li>
                    <Link to={productPage}>Learn more</Link>
                  </li>
                  <li>
                    <Link to={productPage}>Buy</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="iphone-image">
              <img src={item.product_img} alt={item.product_name} />
            </div>
          </div>
        );
        return productlist;
      })}
    </div>
  );
}

export default Iphone;
