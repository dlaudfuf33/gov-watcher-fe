// import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// // import { login, reissueToken } from "@/api/authAPI";
// import { jwtDecode } from "jwt-decode";
// import type { JWT } from "next-auth/jwt";

// interface ExtendedToken extends JWT {
//   accessToken: string;
//   refreshToken: string;
//   access_exp: number;
//   refresh_exp: number;
//   role?: string;
//   error?: string;
// }

// interface ExtendedSession extends Session {
//   accessToken?: string;
//   refreshToken?: string;
//   access_exp?: number;
//   refresh_exp?: number;
//   role?: string;
//   error?: string;
// }

// let refreshPromise: Promise<ExtendedToken> | null = null;
// let lastRefreshTime = 0;
// const REFRESH_COOLDOWN = 1000;

// const refreshAccessToken = async (
//   token: ExtendedToken
// ): Promise<ExtendedToken> => {
//   if (Date.now() - lastRefreshTime < REFRESH_COOLDOWN) return token;
//   if (refreshPromise) return await refreshPromise;

//   lastRefreshTime = Date.now();
//   refreshPromise = (async () => {
//     try {
//       const { accessToken, refreshToken } = await reissueToken(
//         token.refreshToken
//       );

//       return {
//         ...token,
//         accessToken,
//         refreshToken,
//         access_exp: jwtDecode<{ exp: number }>(accessToken).exp * 1000,
//         refresh_exp: jwtDecode<{ exp: number }>(refreshToken).exp * 1000,
//       };
//     } catch {
//       return {
//         ...token,
//         error: "RefreshAccessTokenError",
//       };
//     }
//   })();

//   const result = await refreshPromise;
//   refreshPromise = null;
//   return result;
// };

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "이메일", type: "email" },
//         password: { label: "비밀번호", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials?.email || !credentials?.password) return null;
//         try {
//           const response = await login({
//             email: credentials.email,
//             password: credentials.password,
//           });

//           const { accessToken, refreshToken } = response;
//           const role = jwtDecode<{ role: string }>(accessToken).role;

//           return {
//             id: credentials.email,
//             email: credentials.email,
//             accessToken,
//             refreshToken,
//             role,
//           };
//         } catch {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           accessToken: (user as any).accessToken,
//           refreshToken: (user as any).refreshToken,
//           role: (user as any).role,
//           access_exp:
//             jwtDecode<{ exp: number }>((user as any).accessToken).exp * 1000,
//           refresh_exp:
//             jwtDecode<{ exp: number }>((user as any).refreshToken).exp * 1000,
//         };
//       }

//       if (Date.now() < (token as ExtendedToken).access_exp) {
//         return token;
//       }

//       return await refreshAccessToken(token as ExtendedToken);
//     },
//     async session({ session, token }) {
//       const typedToken = token as ExtendedToken;
//       const s = session as ExtendedSession;

//       s.accessToken = typedToken.accessToken;
//       s.refreshToken = typedToken.refreshToken;
//       s.access_exp = typedToken.access_exp;
//       s.refresh_exp = typedToken.refresh_exp;
//       s.role = typedToken.role;
//       s.error = typedToken.error;

//       return s;
//     },
//     async redirect({ baseUrl }) {
//       return baseUrl;
//     },
//   },
//   pages: {
//     signIn: "/service/login",
//   },
// };

// export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
