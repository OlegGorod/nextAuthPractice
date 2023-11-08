import { useState, useEffect } from "react";
import classes from "./item.module.css";
import productsClasses from "./products.module.css";
import Spinner from "../spinner/spinner";
import ProductTemplate from "./productTemplate";
import ErrorMessage from "../errorMessage/errorMessage";
import Custom404 from "../../pages/404";

function ProductCard({ id }) {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`Product not found. ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setProduct(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error("You have problem", error);
      });
  }, [id]);

  useEffect(() => {
    if (product && Object.values(product).length > 0) {
      const typeOfProduct = product["Manufacturer"];
      fetch(`/api/products/type/${typeOfProduct}`)
        .then((response) => {
          if (!response.ok) {
            console.error(`Product not found. ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setSimilarProducts(data);
        })
        .catch(() => console.log("Error on server"));
    }
  }, [product]);

  const problem = isError ? <Custom404 /> : null;
  const spinner = isLoading ? <Spinner /> : null;

  return (
    <div>
      <h2>Product</h2>
      {spinner || problem || (
        <section className={classes.product}>
          <div className={classes.image}>
            <img src={product["Image URL"]} alt={product["Manufacturer"]} />
          </div>
          <div className={classes.description}>
            <div className={classes.router}>{product["Manufacturer"]}</div>
            <div className={classes.type}>{product["SKU"]}</div>
            <div className={classes.quantity}>
              Total stock: {product["Total Stock"]}
            </div>
            <div className={classes.price}>{product["Retail Price"]} UAH</div>
            <div className={classes.details}>{product["Description"]}</div>
          </div>
        </section>
      )}

      {similarProducts.length > 1 && (
        <SimilarProducts similarProducts={similarProducts} />
      )}
    </div>
  );
}

export default ProductCard;

function SimilarProducts({ similarProducts }) {
  const stylingSimilarCard = {
    widthImg: "23%",
  };

  return (
    <section className={classes.similar}>
      <h3>Similar products</h3>
      <ul className={productsClasses.container}>
        {similarProducts?.slice(0, 3).map((products) => (
          <ProductTemplate products={products} style={stylingSimilarCard} key={products['SKU']} />
        ))}
      </ul>
    </section>
  );
}
