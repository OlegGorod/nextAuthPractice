import React, { useEffect, useState } from "react";
import classes from "./products.module.css";
import Spinner from "../spinner/spinner";
import ProductTemplate from "./productTemplate";

function Products() {
  const [validImages, setValidImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const checkImageAvailability = async () => {
      const validImagePromises = products.map(async (item) => {
        const img = new Image();
        img.src = item["Image URL"];

        return new Promise((resolve) => {
          img.onload = () => resolve(item);
          img.onerror = () => resolve(null);
        });
      });

      const validImages = await Promise.all(validImagePromises);
      setValidImages(validImages.filter((item) => item !== null));
    };

    setIsLoading(false);

    checkImageAvailability();
  }, [products]);


  return (
    <section className={classes.catalog}>
      <h2>Our Product</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={classes.container}>
          {validImages.map((item) => (
            <ProductTemplate products={item} key={item[["SKU"]]}/>
          ))}
        </ul>
      )}
    </section>
    
  );
}

export default Products;

