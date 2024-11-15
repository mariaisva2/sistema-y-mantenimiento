import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { AuthService } from "@/app/infractrusture/service/auth.service";

import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    token?: string;
}

interface AuthUser {
    id: string;
    email: string;
    token: string;
}

export interface CustomSession extends Session {
    user: {
        id?: string;
        token?: string;
        email?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
        },
        authorize: async (credentials) => {
            if (!credentials?.email  || !credentials?.password) {
                console.error("Credenciales faltantes")
                return null;
        }
            const loginRequest: ILoginRequest = {
                email: credentials.email,
                password: credentials.password,
            }

            try {
                const authService = new AuthService();
                const response = await authService.login(loginRequest);
                if (!response.data.access_token) {
                    console.error("El token de acceso no está presente en la respuesta del login");
                }
                const user = response.data.user;
                if (!user || !response.data.access_token) {
                    console.error("Datos de usuario o token de acceso faltantes en authorize");
                }
                
                return {
                    id: (user.id).toString(),
                    email: user.email,
                    token: response.data.access_token,
                } as AuthUser
            } catch (error) {
                console.log(error);
                return Promise.reject(new Error(JSON.stringify(error)))
            }
        },
}),
    ],
    session: {
        strategy: "jwt", 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                if (!authUser.token) {
                    console.error("El token de usuario es undefined o null");
                }
                token.id = authUser.id;
                token.token = authUser.token;
                token.email= authUser.email;
            }
            return token;
        },
        async session({session, token}){
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.token = (token as AuthToken).token;
            return customSession;
    },
}
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);