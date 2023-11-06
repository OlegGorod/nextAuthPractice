import ProductCard from "../../components/products/product-card"
import { useRouter } from 'next/router';

function ProductInfo() {
    const router = useRouter()
    const {productid} = router.query
    
    return <ProductCard id={productid}/>
}

export default ProductInfo
