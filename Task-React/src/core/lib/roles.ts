// lib/roles.ts

export type userRoleCartStreet = 'customer' | 'owner' | 'admin';

export const ROLES: Record<userRoleCartStreet, userRoleCartStreet> = {
    customer: 'customer',
    owner: 'owner',
    admin: 'admin'
};

export const ROLE_ACCESS: Record<userRoleCartStreet, string[]> = {
    customer: ['/customer', '/dashboard'],
    owner: ['/owner', '/dashboard'],
    admin: ['/admin', '/dashboard', '/customer', '/owner']
};

export const REDIRECT_URLS: Record<userRoleCartStreet, string> = {
    customer: '/customer',
    owner: '/owner/dashboard',
    admin: '/admin/dashboard'
};

export const DEFAULT_REDIRECT = '/login';

// نقش‌های معتبر برای اعتبارسنجی
export const VALID_ROLES: userRoleCartStreet[] = ['customer', 'owner', 'admin'];