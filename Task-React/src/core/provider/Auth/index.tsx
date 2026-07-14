// // "use client";
// // import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
// // import { getCookie, removeCookie, setCookie } from '../../../lib/cookie.js';
// // import type { userRoleCartStreet } from '../../../lib/roles.js';
// // import { REDIRECT_URLS } from '../../../lib/roles.js';

// // interface User {
// //     id: number;
// //     fullName: string;
// //     profilePicture: string | null;
// //     role: string;
// // }

// // interface AuthContextType {
// //     user: User | null;
// //     loading: boolean;
// //     error: string | null;
// //     token: string | null;
// //     accessTokenCartStreet: string | null;
// //     isAuthenticated: boolean;
// //     userRoleCartStreet: userRoleCartStreet | null;
// //     refreshUser: () => Promise<void>;
// //     logout: () => void;
// //     login: (credentials: any, selectedRole: userRoleCartStreet) => Promise<string>;
// //     setRole: (role: userRoleCartStreet) => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // const readRoleFromStorage = (): userRoleCartStreet | null => {
// //     const localRole = localStorage.getItem("userRoleCartStreet");
// //     if (localRole === 'manager' || localRole === 'resident') {
// //         return localRole as userRoleCartStreet;
// //     }

// //     const cookies = document.cookie.split('; ');
// //     for (const cookie of cookies) {
// //         const [key, value] = cookie.split('=');
// //         if (key === 'userRoleCartStreet') {
// //             if (value === 'manager' || value === 'resident') {
// //                 return value as userRoleCartStreet;
// //             }
// //         }
// //     }

// //     return null;
// // };

// // const saveRoleToStorage = (role: userRoleCartStreet) => {
// //     localStorage.setItem("userRoleCartStreet", role);

// //     const expires = new Date();
// //     expires.setDate(expires.getDate() + 30);
// //     document.cookie = `userRoleCartStreet=${role}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

// // };

// // const clearRoleFromStorage = () => {
// //     localStorage.removeItem("userRoleCartStreet");
// //     document.cookie = "userRoleCartStreet=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// // };

// // export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //     const [user, setUser] = useState<User | null>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);
// //     const [token, setToken] = useState<string | null>(null);
// //     const [accessTokenCartStreet, setaccessTokenCartStreet] = useState<string | null>(null);
// //     const [userRoleCartStreet, setuserRoleCartStreetState] = useState<userRoleCartStreet | null>(null);

// //     const decodeToken = (token: string | null): User | null => {
// //         if (!token) return null;
// //         try {
// //             const decoded = atob(token);
// //             const parsed = JSON.parse(decoded);
// //             return {
// //                 id: +parsed.Id || parsed.id || 0,
// //                 fullName: parsed.FullName || parsed.fullName || '',
// //                 profilePicture: parsed.ProfilePicture || parsed.profilePicture || null,
// //                 role: parsed.Roles?.[0] || parsed.role || '',
// //             };
// //         } catch (err) {
// //             console.error("Invalid token decode", err);
// //             return null;
// //         }
// //     };

// //     const setRole = (role: userRoleCartStreet) => {
// //         setuserRoleCartStreetState(role);
// //         saveRoleToStorage(role);
// //     };

// //     const login = async (credentials: any, selectedRole: userRoleCartStreet): Promise<string> => {
// //         setLoading(true);
// //         try {
// //             const response = await fetch('/api/auth/login', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(credentials),
// //             });

// //             const data = await response.json();
// //             const { accessTokenCartStreet } = data;

// //             if (!accessTokenCartStreet) {
// //                 throw new Error("No access token received");
// //             }

// //             setCookie('accessTokenCartStreet', accessTokenCartStreet, 30);
// //             localStorage.setItem('accessTokenCartStreet', accessTokenCartStreet);

// //             saveRoleToStorage(selectedRole);
// //             const userData = decodeToken(accessTokenCartStreet);
// //             if (userData) {
// //                 setUser(userData);
// //             }
// //             setToken(accessTokenCartStreet);
// //             setaccessTokenCartStreet(accessTokenCartStreet);
// //             setuserRoleCartStreetState(selectedRole);
// //             setError(null);

// //             return REDIRECT_URLS[selectedRole];

// //         } catch (err: any) {
// //             setError(err.message || "Login failed");
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const refreshUser = async () => {
// //         setLoading(true);
// //         try {
// //             const access = getCookie("accessTokenCartStreet");

// //             setToken(access);
// //             setaccessTokenCartStreet(access);

// //             const storedRole = readRoleFromStorage();
// //             setuserRoleCartStreetState(storedRole);

// //             const userData = decodeToken(access);
// //             if (!userData) throw new Error("Invalid token");

// //             setUser(userData);
// //             setError(null);
// //         } catch (err: any) {
// //             setUser(null);
// //             setError(err.message || "Unknown error");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const logout = useCallback(() => {
// //         removeCookie("accessTokenCartStreet");
// //         removeCookie("refreshToken");
// //         removeCookie("userRoleCartStreet");

// //         localStorage.removeItem("accessTokenCartStreet");
// //         localStorage.removeItem("userRoleCartStreet");

// //         setUser(null);
// //         setToken(null);
// //         setaccessTokenCartStreet(null);
// //         setuserRoleCartStreetState(null);
// //         setError(null);
// //     }, []);

// //     useEffect(() => {
// //         const initializeAuth = async () => {
// //             setLoading(true);

// //             try {
// //                 const access = getCookie("accessTokenCartStreet");

// //                 setToken(access);
// //                 setaccessTokenCartStreet(access);

// //                 const storedRole = readRoleFromStorage();
// //                 setuserRoleCartStreetState(storedRole);

// //                 if (access) {
// //                     const userData = decodeToken(access);
// //                     if (userData) {
// //                         setUser(userData);
// //                     }
// //                 }

// //                 setError(null);

// //             } catch (err: any) {
// //                 setUser(null);
// //                 setError(err.message || "Unknown error");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         initializeAuth();
// //     }, []);

// //     return (
// //         <AuthContext.Provider
// //             value={{
// //                 user,
// //                 token,
// //                 accessTokenCartStreet,
// //                 loading,
// //                 error,
// //                 isAuthenticated: !!user && !!token,
// //                 userRoleCartStreet,
// //                 refreshUser,
// //                 logout,
// //                 login,
// //                 setRole
// //             }}
// //         >
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// // export const useAuth = () => {
// //     const context = useContext(AuthContext);
// //     if (!context) {
// //         throw new Error('useAuth must be used within AuthProvider');
// //     }
// //     return context;
// // };
// // core/provider/Auth/index.tsx

// "use client";
// import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
// import { getCookie, removeCookie, setCookie } from '../../../lib/cookie.js';
// import type { userRoleCartStreet } from '../../../lib/roles.js';
// import { REDIRECT_URLS, VALID_ROLES } from '../../../lib/roles.js';

// interface User {
//     id: number;
//     fullName: string;
//     email: string;
//     profilePicture: string | null;
//     role: userRoleCartStreet;
// }

// interface AuthContextType {
//     user: User | null;
//     loading: boolean;
//     error: string | null;
//     token: string | null;
//     accessTokenCartStreet: string | null;
//     isAuthenticated: boolean;
//     userRoleCartStreet: userRoleCartStreet | null;
//     refreshUser: () => Promise<void>;
//     logout: () => void;
//     login: (credentials: any, selectedRole: userRoleCartStreet) => Promise<string>;
//     setRole: (role: userRoleCartStreet) => void;
//     updateUser: (userData: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // خواندن نقش از storage
// const readRoleFromStorage = (): userRoleCartStreet | null => {
//     // از localStorage
//     const localRole = localStorage.getItem("userRoleCartStreet");
//     if (localRole && VALID_ROLES.includes(localRole as userRoleCartStreet)) {
//         return localRole as userRoleCartStreet;
//     }

//     // از cookie
//     const cookies = document.cookie.split('; ');
//     for (const cookie of cookies) {
//         const [key, value] = cookie.split('=');
//         if (key === 'userRoleCartStreet') {
//             if (VALID_ROLES.includes(value as userRoleCartStreet)) {
//                 return value as userRoleCartStreet;
//             }
//         }
//     }

//     return null;
// };

// // ذخیره نقش در storage
// const saveRoleToStorage = (role: userRoleCartStreet) => {
//     localStorage.setItem("userRoleCartStreet", role);

//     const expires = new Date();
//     expires.setDate(expires.getDate() + 30);
//     document.cookie = `userRoleCartStreet=${role}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
// };

// // پاک کردن نقش از storage
// const clearRoleFromStorage = () => {
//     localStorage.removeItem("userRoleCartStreet");
//     document.cookie = "userRoleCartStreet=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// };

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [accessTokenCartStreet, setaccessTokenCartStreet] = useState<string | null>(null);
//     const [userRoleCartStreet, setuserRoleCartStreetState] = useState<userRoleCartStreet | null>(null);

//     // دیکد کردن توکن JWT
//     const decodeToken = (token: string | null): User | null => {
//         if (!token) return null;
//         try {
//             // توجه: در پروژه واقعی از کتابخانه jwt-decode استفاده کنید
//             const parts: any = token.split('.');
//             if (parts.length !== 3) return null;

//             const payload = JSON.parse(atob(parts[1]));

//             return {
//                 id: payload.sub || payload.id || payload.userId || 0,
//                 fullName: payload.fullName || payload.name || '',
//                 email: payload.email || '',
//                 profilePicture: payload.profilePicture || payload.avatar || null,
//                 role: payload.role || payload.Role || 'customer',
//             };
//         } catch (err) {
//             console.error("Invalid token decode", err);
//             return null;
//         }
//     };

//     // تنظیم نقش
//     const setRole = (role: userRoleCartStreet) => {
//         if (!VALID_ROLES.includes(role)) {
//             console.error(`Invalid role: ${role}`);
//             return;
//         }
//         setuserRoleCartStreetState(role);
//         saveRoleToStorage(role);
//     };

//     // ورود
//     const login = async (credentials: any, selectedRole: userRoleCartStreet): Promise<string> => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(credentials),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Login failed");
//             }

//             const data = await response.json();
//             const { accessTokenCartStreet, refreshToken, user: userData } = data;

//             if (!accessTokenCartStreet) {
//                 throw new Error("No access token received");
//             }

//             // ذخیره توکن‌ها
//             setCookie('accessTokenCartStreet', accessTokenCartStreet, 30);
//             if (refreshToken) {
//                 setCookie('refreshToken', refreshToken, 30);
//             }
//             localStorage.setItem('accessTokenCartStreet', accessTokenCartStreet);

//             // ذخیره نقش
//             const role = selectedRole || userData?.role || 'customer';
//             saveRoleToStorage(role);

//             // تنظیم کاربر
//             const decodedUser = userData || decodeToken(accessTokenCartStreet);
//             if (decodedUser) {
//                 setUser({
//                     id: decodedUser.id || 0,
//                     fullName: decodedUser.fullName || decodedUser.name || '',
//                     email: decodedUser.email || '',
//                     profilePicture: decodedUser.profilePicture || decodedUser.avatar || null,
//                     role: role as userRoleCartStreet,
//                 });
//             }

//             setToken(accessTokenCartStreet);
//             setaccessTokenCartStreet(accessTokenCartStreet);
//             setuserRoleCartStreetState(role as userRoleCartStreet);

//             return REDIRECT_URLS[role as userRoleCartStreet] || `/${role}`;

//         } catch (err: any) {
//             setError(err.message || "Login failed");
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // به‌روزرسانی کاربر
//     const refreshUser = async () => {
//         setLoading(true);
//         try {
//             const access = getCookie("accessTokenCartStreet");
//             const storedRole = readRoleFromStorage();

//             setToken(access);
//             setaccessTokenCartStreet(access);
//             setuserRoleCartStreetState(storedRole);

//             if (access) {
//                 const userData = decodeToken(access);
//                 if (userData) {
//                     // ترکیب با نقش ذخیره‌شده
//                     setUser({
//                         ...userData,
//                         role: storedRole || userData.role || 'customer',
//                     });
//                 } else {
//                     throw new Error("Invalid token");
//                 }
//             } else {
//                 setUser(null);
//             }

//             setError(null);
//         } catch (err: any) {
//             setUser(null);
//             setError(err.message || "Unknown error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // به‌روزرسانی اطلاعات کاربر
//     const updateUser = useCallback((userData: Partial<User>) => {
//         if (user) {
//             setUser({ ...user, ...userData });
//         }
//     }, [user]);

//     // خروج
//     const logout = useCallback(() => {
//         removeCookie("accessTokenCartStreet");
//         removeCookie("refreshToken");
//         removeCookie("userRoleCartStreet");

//         localStorage.removeItem("accessTokenCartStreet");
//         localStorage.removeItem("userRoleCartStreet");
//         localStorage.removeItem("user");

//         setUser(null);
//         setToken(null);
//         setaccessTokenCartStreet(null);
//         setuserRoleCartStreetState(null);
//         setError(null);
//     }, []);

//     // مقداردهی اولیه
//     useEffect(() => {
//         const initializeAuth = async () => {
//             setLoading(true);
//             try {
//                 const access = getCookie("accessTokenCartStreet");
//                 const storedRole = readRoleFromStorage();

//                 setToken(access);
//                 setaccessTokenCartStreet(access);
//                 setuserRoleCartStreetState(storedRole);

//                 if (access) {
//                     const userData = decodeToken(access);
//                     if (userData) {
//                         setUser({
//                             ...userData,
//                             role: storedRole || userData.role || 'customer',
//                         });
//                     }
//                 }

//                 setError(null);
//             } catch (err: any) {
//                 setUser(null);
//                 setError(err.message || "Unknown error");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         initializeAuth();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 token,
//                 accessTokenCartStreet,
//                 loading,
//                 error,
//                 isAuthenticated: !!user && !!token,
//                 userRoleCartStreet,
//                 refreshUser,
//                 logout,
//                 login,
//                 setRole,
//                 updateUser,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Hook استفاده از Auth
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };