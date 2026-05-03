import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./single.css";

function SingleProduct() {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  console.log("params:", id);
  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.filter(
          (data) => data.product_id === Number(id),
        );
        console.log(foundProduct);
        setProduct(foundProduct);
      });
  }, [id]);

  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          {product.map((product) => {
            let id = product.product_url;
            let title = product.product_name;
            let img = product.product_img;
            let Brief = product.product_brief_description;
            let StartPrice = product.starting_price;
            let PriceRange = product.price_range;
            let details = product.product_description;

            let productDiv = (
              <div key={id} className="bottom-100">
                <div className="row justify-content-center text-center bottom-50">
                  <div className="col-12">
                    <br />
                    <div className="title-wraper bold">{title}</div>
                    <div className="brief-description brief">{Brief}</div>
                  </div>
                </div>

                <div className="row justify-content-center text-center product-holder h-100">
                  <div className="col-sm-12 col-md-6 my-auto">
                    <div className="price">{`Starting at ${StartPrice}`}</div>{" "}
                    <br />
                    <div className="priceRange">{PriceRange}</div>
                    <div className="product-details">{details}</div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="iphone-image">
                      <img src={img} alt={title} />
                    </div>
                  </div>
                </div>
              </div>
            );

            return productDiv;
          })}
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;
