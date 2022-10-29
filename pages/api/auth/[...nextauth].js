import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { addCreator } from "../../../services/creatorService"

export default NextAuth({
    providers: [
        // OAuth authentication providers
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            token.userRole = "admin"
            return token
        },
        async session({ session, user, token }) {
            return session
        },

        async signIn({ user, account, profile, email, credentials }) {
            try {
                console.log("sign in callback: ", user);
                const response = await addCreator({ name: user.name, email: user.email, image: user.image });
                console.log(response.data);
                return true
            } catch (e) {
                return false;
            }
        },

    },
    //SQL or MongoDB database (or leave empty)
    // database: process.env.DATABASE_URL,
})