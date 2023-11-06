import React, { useEffect, useState } from "react";
import classes from "./products.module.css";
import Link from "next/link";


function Products() {
  const [validImages, setValidImages] = useState([]);
  const [products, setProducts] = useState([])  
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

    checkImageAvailability();
  }, [products]);

  return (
    <section className={classes.catalog}>
      <h2>Our Product</h2>
      <ul className={classes.container}>
        {validImages.map((item) => (
          <Link href={`/catalog/${item['SKU']}`}>
            <li className={classes.card} key={item['SKU']}>
              <img src={item["Image URL"]} alt={item["Manufacturer"]} />
              <div className={classes.bottom}>
                <div className={classes.bottom_description}>
                  <div>{item["Manufacturer"]}</div>
                  <div className={classes.type}>{item["SKU"]}</div>
                </div>
                <div className={classes.price}>{item["Retail Price"]} UAH</div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Products;
