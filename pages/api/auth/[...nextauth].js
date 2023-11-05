import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({ email: credentials.email })

                if (!user) {
                    client.close()
                    throw new Error('No user is found')
                }

                const passwordIsValid = await verifyPassword(credentials.password, user.password)
                if (!passwordIsValid) {
                    client.close();
                    throw new Error('Your password is invalid. Could not log in.')
                }

                return {email: user.email}
            }
        })
    ]
})