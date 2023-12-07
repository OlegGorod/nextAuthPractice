import { getSession } from "next-auth/client";
import Products from "../../components/products/products";

function Catalog() {
    return <Products/>
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

export default Catalog