import { useState, useEffect, Fragment } from 'react'
import classes from './item.module.css'

function ProductCard({ id }) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("You have problem", error));
    }, [id]);


    return (
        <div>
            <h2>Product</h2>
            <section className={classes.product}>
                <div className={classes.image}>
                    <img src={product['Image URL']} alt={product['Manufacturer']} />
                </div>
                <div className={classes.description}>
                    <div className={classes.router}>{product['Manufacturer']}</div>
                    <div className={classes.type}>{product['SKU']}</div>
                    <div className={classes.quantity}>Total stock: {product['Total Stock']}</div>
                    <div className={classes.price}>{product['Retail Price']} UAH</div>
                    <div className={classes.details}>{product['Description']}</div>
                </div>
            </section>
        </div>
    );
}

export default ProductCard;
