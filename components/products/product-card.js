import { useState, useEffect, Fragment } from 'react'
import classes from './item.module.css'
import Spinner from '../spinner/spinner';

function ProductCard({ id }) {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false)
                setProduct(data)
            })
            .catch((error) => console.error("You have problem", error));
    }, [id]);

    console.log(isLoading)
    return (
        <div>
            <h2>Product</h2>
            {isLoading ? <Spinner /> : <section className={classes.product}>
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
            </section>}
        </div>
    );
}

export default ProductCard;
