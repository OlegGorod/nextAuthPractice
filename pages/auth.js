import { getSession } from "next-auth/client";
import AuthForm from "../components/auth/auth-form";

function Auth() {
    return <AuthForm/>
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})

    if (session) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            },
            props: {session}
        }
    }

    if (!session) {
        return {
            props: {}
        }
    }
}

export default Auth