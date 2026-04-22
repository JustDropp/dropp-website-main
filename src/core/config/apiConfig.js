// API Configuration
export const API_CONFIG = {
    // Using Vite proxy in dev, direct URL in prod
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    ENDPOINTS: {
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
        PROFILE: '/user/profile',
        MY_PROFILE: '/user/me',
        VERIFY_EMAIL: '/user/verify-email',
        VERIFY_EMAIL_TOKEN: '/user/verify-token',
        UPDATE_PASSWORD: '/user/update-password',
        DELETE_ACCOUNT: '/user/delete',
        ANALYTICS: '/user/analytics',
        RESET_PASSWORD_REQUEST: '/user/reset-password-request',
        RESET_PASSWORD: '/user/reset-password',
        COLLECTIONS: '/c',
        COLLECTION_BY_ID: '/c/getCollectionById',
        EXPLORE: '/c/explore/collections',
        USERS: '/user/all',
        FOLLOW_USER: '/user/follow',
        FOLLOWERS: '/user/followers',
        FOLLOWING: '/user/following',
        MY_COLLECTIONS: '/c/getMyCollection',
        UPDATE_COLLECTION_VISIBILITY: '/c/updateVisibility',
        NOTIFICATIONS: '/user/notification',
        MARK_NOTIFICATION_READ: '/user/notification/markRead',
        ADD_PRODUCT: '/product/cId',
        PRODUCT_EXPLORE: '/product/explore',
        PRODUCT_BY_ID: '/product/pId',
        LIKE_PRODUCT: '/product/like',
        DELETE_PRODUCT: '/product',
        SEARCH_PRODUCTS: '/product/search', // GET /product/search?q={query}
        UPDATE_PRODUCT: '/product/pId', // PATCH /product/pId/{productId}
        PRODUCT_BY_PID: '/product/pId', // GET /product/pId/{productId}
        PRODUCT_MEDIA: '/product/media/pId', // POST /product/media/pId/{productId}
        DELETE_PRODUCT_MEDIA: '/product/media', // DELETE /product/media/{mediaId}/pId/{productId}/delete
        PIN_PRODUCT: '/product/pin', // PATCH /product/pin/{productId}
        FEATURE_PRODUCT: '/product', // POST /product/{productId}/feature
        INVITE_MEMBER: '/c/invite', // PATCH /c/invite/{collectionId}
        REVOKE_MEMBER: '/c/revokeMember', // DELETE /c/revokeMember/{collectionId} body: { memberId }
        PIN_COLLECTION: '/c/pin', // PATCH /c/pin/{collectionId}
        PROFILE_VIEWS: '/user/profile-views',
        LIKED_PRODUCTS: '/user/liked/products',
        SUBSCRIPTION_CREATE: '/subscription/create',
        SUBSCRIPTION_VERIFY: '/subscription/verify',
        SUBSCRIPTION_TRANSACTIONS: '/subscription/transactions',
        SUBSCRIPTION_CANCEL: '/subscription/cancel',
        BRAND_SIGNUP: '/brand/signup',
        BRAND_LOGIN: '/brand/login',
        BRAND_PROFILE: '/brand',
        BRAND_UPDATE: '/brand/update',
        BRAND_DELETE: '/brand/delete',
    },
    TIMEOUT: 10000,
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'dropp_auth_token',
    USER_DATA: 'dropp_user_data',
};
