// core/provider/ProtectedRoute/index.tsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../lib/cookie.js";
import { REDIRECT_URLS, ROLE_ACCESS, VALID_ROLES, type userRoleCartStreet } from "../../lib/roles.js";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const PUBLIC_PATHS = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

// نرمال‌سازی نقش
const normalizeRole = (role: string | null): userRoleCartStreet | null => {
  if (!role) return null;
  const lowerRole = role.toLowerCase();

  if (VALID_ROLES.includes(lowerRole as userRoleCartStreet)) {
    return lowerRole as userRoleCartStreet;
  }

  return null;
};

// دریافت نقش از storage
const getuserRoleCartStreetFromStorage = (): userRoleCartStreet | null => {
  // ابتدا از localStorage
  const localRole = localStorage.getItem("userRoleCartStreet");
  if (localRole) {
    const normalized = normalizeRole(localRole);
    if (normalized) return normalized;
  }

  // سپس از cookie
  const match: any = document.cookie.match(/userRoleCartStreet=([^;]+)/);
  if (match) {
    const normalized = normalizeRole(match[1]);
    if (normalized) return normalized;
  }

  return null;
};

// بررسی دسترسی به مسیر
const hasAccessToRoute = (role: userRoleCartStreet, pathname: string): boolean => {
  const allowedPrefixes = ROLE_ACCESS[role];
  const lowerPathname = pathname.toLowerCase();

  return allowedPrefixes.some((prefix) =>
    lowerPathname.startsWith(prefix.toLowerCase())
  );
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const lowerPathname = pathname.toLowerCase();

  // بررسی مسیرهای عمومی
  const isPublicPath = PUBLIC_PATHS.some(path =>
    lowerPathname.includes(path.toLowerCase())
  );

  const token = getCookie("accessTokenCartStreet");
  const userRoleCartStreet = getuserRoleCartStreetFromStorage();
  console.log(userRoleCartStreet , token)
  // مسیرهای callback بدون نیاز به احراز هویت
  if (lowerPathname.includes("callback") || lowerPathname.includes("oauth")) {
    return <>{children}</>;
  }

  // اگر مسیر عمومی است
  if (isPublicPath) {
    // اگر کاربر لاگین است و به صفحه لاگین یا ثبت‌نام رفته، هدایت شود
    if (token && userRoleCartStreet && (pathname === "/login" || pathname === "/signup")) {
      const redirectPath = REDIRECT_URLS[userRoleCartStreet] || `/${userRoleCartStreet}`;
      return <Navigate to={redirectPath} replace />;
    }
    return <>{children}</>;
  }

  // بررسی وجود توکن
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // بررسی وجود نقش
  if (!userRoleCartStreet) {
    return <Navigate to="/login" replace />;
  }

  // بررسی دسترسی به مسیر
  if (!hasAccessToRoute(userRoleCartStreet, pathname)) {
    // اگر مسیر نامعتبر است، به داشبورد مربوطه هدایت شود
    const redirectPath = REDIRECT_URLS[userRoleCartStreet] || `/${userRoleCartStreet}`;
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { getCookie } from "../../../lib/cookie.js";
// import type { userRoleCartStreet } from "../../../lib/roles.js";
// import { ROLE_ACCESS } from "../../../lib/roles.js";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const PUBLIC_PATHS = ['/login', '/admin/login', "/select-role", "/manage-register", "/manager/regulations" , "/payment-callback"];

// const normalizeRole = (role: string | null): userRoleCartStreet | null => {
//   if (!role) return null;
//   const lowerRole = role.toLowerCase();
//   if (lowerRole === 'manager' || lowerRole === 'resident' || lowerRole === 'admin') {
//     return lowerRole as userRoleCartStreet;
//   }
//   return null;
// };

// const getuserRoleCartStreetFromStorage = (): userRoleCartStreet | null => {
//   const localRole = localStorage.getItem("userRoleCartStreet");
//   if (localRole) {
//     const normalized = normalizeRole(localRole);
//     if (normalized) return normalized;
//   }

//   const match: any = document.cookie.match(/userRoleCartStreet=([^;]+)/);
//   if (match) {
//     const normalized = normalizeRole(match[1]);
//     if (normalized) return normalized;
//   }

//   return null;
// };

// const hasAccessToRoute = (role: userRoleCartStreet, pathname: string): boolean => {
//   const allowedPrefixes = ROLE_ACCESS[role];
//   const lowerPathname = pathname.toLowerCase();
//   return allowedPrefixes.some((prefix) =>
//     lowerPathname.startsWith(prefix.toLowerCase()),
//   );
// };

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const location = useLocation();
//   const pathname = location.pathname;
//   const lowerPathname = pathname.toLowerCase();

//   const isPublicPath = PUBLIC_PATHS.includes(lowerPathname);

//   const token = getCookie("accessTokenCartStreet");

//   const userRoleCartStreet = getuserRoleCartStreetFromStorage();

//   if (isPublicPath) {
//     if (
//       token &&
//       userRoleCartStreet &&
//       (pathname === "/login" || pathname === "/register" || "/select-role" || "/manage-register" || "/payment/callback")
//     ) {
//       const redirectPath = userRoleCartStreet === "manager" ? "/manager" : `/${userRoleCartStreet}`;
//       return <Navigate to={redirectPath} replace />;
//     }
//     return <>{children}</>;
//   }

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!userRoleCartStreet) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!hasAccessToRoute(userRoleCartStreet, pathname)) {
//     let redirectPath = `/${userRoleCartStreet}`;

//     if (lowerPathname.startsWith("/manager")) {
//       redirectPath = "/manager";
//     } else if (lowerPathname.startsWith("/resident")) {
//       redirectPath = "/resident";
//     }

//     return <Navigate to={redirectPath} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

// // ProtectedRoute.tsx
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { getCookie } from '../../../lib/cookie.js';

// const PUBLIC_PATHS = ['/login', '/register'];

// export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const location = useLocation();
//     const pathname = location.pathname;

//     const token = getCookie('accessTokenCartStreet') || localStorage.getItem('accessTokenCartStreet');
//     const userRoleCartStreet = localStorage.getItem('userRoleCartStreet') || getCookie('userRoleCartStreet');

//     const isPublicPath = PUBLIC_PATHS.includes(pathname);

//     // مسیر عمومی
//     if (isPublicPath) {
//         // اگه توکن داره و میخواد بره لاگین/رجیستر، هدایت به صفحه اصلی
//         if (token && userRoleCartStreet && (pathname === '/login' || pathname === '/register')) {
//             const redirectPath = userRoleCartStreet === 'manager' ? '/' : `/${userRoleCartStreet}`;
//             return <Navigate to={redirectPath} replace />;
//         }
//         return <>{children}</>;
//     }

//     // مسیر خصوصی - نیاز به لاگین
//     if (!token) {
//         return <Navigate to="/login" state={{ from: pathname }} replace />;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;
