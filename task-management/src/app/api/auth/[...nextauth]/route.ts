import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

// Define the types for the user returned from the backend
interface User {
    id: number;
    email: string;
    name: string;
    token: string;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Send login request to backend
                    const response = await axios.post("http://localhost:3001/api/auth/login", {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    // Check if the response contains the user and token
                    if (response.data?.user && response.data?.token) {
                        const user: User = {
                            id: response.data.user.id,
                            email: response.data.user.email,
                            name: response.data.user.name,
                            token: response.data.token,
                        };
                        return user; // Return user with token
                    } else {
                        console.error("Invalid credentials or missing data in response.");
                        return null; // Handle failed login
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    return null; // Handle API call error
                }
            },
        }),
    ],
    pages: {
        signIn: "/login", // Custom login page
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                // Store user info and token in JWT
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.token = user.token; // Store the JWT token in the session
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            // Store user info and token in session
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.token = token.token; // Add token to session for API requests
            return session;
        },
    },
    session: {
        strategy: "jwt", // Use JWT session strategy
    },
});

export { handler as GET, handler as POST };
