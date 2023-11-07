import classes from "./products.module.css";
import Link from "next/link";

function ProductTemplate({products, style}) {

    return (
        <Link href={`/catalog/${products["SKU"]}`}>
            <li className={classes.card} style={{width: style?.widthImg}}>
                <img src={products["Image URL"]} alt={products["Manufacturer"]} />
                <div className={classes.bottom}>
                    <div className={classes.bottom_description}>
                        <div>{products["Manufacturer"]}</div>
                        <div className={classes.type}>{products["SKU"]}</div>
                    </div>
                    <div className={classes.price}>
                        {products["Retail Price"]} UAH
                    </div>
                </div>
            </li>
        </Link>

    )
}

export default ProductTemplate