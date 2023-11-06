import { getSession } from "next-auth/client";
import ProductCard from "../../components/products/product-card"
import { useRouter } from 'next/router';

function ProductInfo() {
    const router = useRouter()
    const {productid} = router.query
    
    return <ProductCard id={productid}/>
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})
    
     if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    return {
        props: {session}
    }

}

export default ProductInfo
