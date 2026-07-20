module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/Projects/blog-web/src/data/users.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockUsers",
    ()=>mockUsers
]);
const mockUsers = [
    {
        id: 'user-admin',
        name: 'Admin NewsX',
        email: 'admin@newsx.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin',
        bio: 'Quản trị viên hệ thống NewsX',
        role: 'admin',
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'user-editor1',
        name: 'Nguyễn Minh Tuấn',
        email: 'tuan@newsx.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=tuan',
        bio: 'Biên tập viên công nghệ | Yêu AI & Startups',
        role: 'editor',
        status: 'active',
        createdAt: '2024-02-15T00:00:00Z'
    },
    {
        id: 'user-editor2',
        name: 'Trần Thị Mai',
        email: 'mai@newsx.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=mai',
        bio: 'Nhà báo khoa học | Nghiên cứu sinh vật học',
        role: 'editor',
        status: 'active',
        createdAt: '2024-03-01T00:00:00Z'
    },
    {
        id: 'user-editor3',
        name: 'Phạm Hoàng Long',
        email: 'long@newsx.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=long',
        bio: 'Phóng viên kinh tế | Phân tích thị trường tài chính',
        role: 'editor',
        status: 'active',
        createdAt: '2024-03-10T00:00:00Z'
    },
    {
        id: 'user-reader1',
        name: 'Lê Văn Cường',
        email: 'cuong@gmail.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=cuong',
        bio: 'Đam mê công nghệ và đọc tin tức mỗi ngày',
        role: 'reader',
        status: 'active',
        createdAt: '2024-04-01T00:00:00Z'
    },
    {
        id: 'user-reader2',
        name: 'Hoàng Thị Lan',
        email: 'lan@gmail.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=lan',
        bio: 'Sinh viên năm cuối | Thích đọc tin khoa học',
        role: 'reader',
        status: 'active',
        createdAt: '2024-05-15T00:00:00Z'
    },
    {
        id: 'user-reader3',
        name: 'Đỗ Quang Huy',
        email: 'huy@gmail.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=huy',
        bio: 'Developer | Quan tâm startup ecosystem',
        role: 'reader',
        status: 'active',
        createdAt: '2024-06-01T00:00:00Z'
    },
    {
        id: 'user-pending1',
        name: 'Vũ Thị Ngọc',
        email: 'ngoc@gmail.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=ngoc',
        bio: 'Mới tham gia NewsX',
        role: 'reader',
        status: 'pending',
        createdAt: '2024-07-10T00:00:00Z'
    },
    {
        id: 'user-blocked1',
        name: 'Trần Đức Hùng',
        email: 'hung@gmail.com',
        password: '123456',
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=hung',
        bio: 'Tài khoản bị khóa',
        role: 'reader',
        status: 'blocked',
        createdAt: '2024-04-20T00:00:00Z'
    }
];
}),
"[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockTopics",
    ()=>mockTopics
]);
const mockTopics = [
    {
        slug: 'cong-nghe',
        name: 'Công nghệ',
        icon: '💻',
        description: 'AI, phần mềm, gadgets, startups và xu hướng công nghệ mới nhất',
        articleCount: 42,
        color: '#3B82F6'
    },
    {
        slug: 'khoa-hoc',
        name: 'Khoa học',
        icon: '🔬',
        description: 'Khám phá vũ trụ, y học, sinh học và các nghiên cứu đột phá',
        articleCount: 28,
        color: '#8B5CF6'
    },
    {
        slug: 'kinh-doanh',
        name: 'Kinh doanh',
        icon: '📈',
        description: 'Thị trường tài chính, startup, đầu tư và chiến lược kinh doanh',
        articleCount: 35,
        color: '#10B981'
    },
    {
        slug: 'the-thao',
        name: 'Thể thao',
        icon: '⚽',
        description: 'Bóng đá, bóng rổ, tennis và các sự kiện thể thao quốc tế',
        articleCount: 31,
        color: '#F59E0B'
    },
    {
        slug: 'giai-tri',
        name: 'Giải trí',
        icon: '🎬',
        description: 'Phim ảnh, âm nhạc, gaming và văn hóa đại chúng',
        articleCount: 25,
        color: '#EF4444'
    },
    {
        slug: 'suc-khoe',
        name: 'Sức khỏe',
        icon: '🏥',
        description: 'Y tế, dinh dưỡng, thể dục và lối sống lành mạnh',
        articleCount: 19,
        color: '#06B6D4'
    },
    {
        slug: 'the-gioi',
        name: 'Thế giới',
        icon: '🌍',
        description: 'Tin tức quốc tế, chính trị, xã hội và sự kiện toàn cầu',
        articleCount: 38,
        color: '#F97316'
    },
    {
        slug: 'giao-duc',
        name: 'Giáo dục',
        icon: '📚',
        description: 'Học tập, du học, kỹ năng và phát triển bản thân',
        articleCount: 15,
        color: '#EC4899'
    }
];
}),
"[project]/Downloads/Projects/blog-web/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ==========================================
// Simple localStorage wrapper for state persistence
// ==========================================
__turbopack_context__.s([
    "store",
    ()=>store
]);
const STORAGE_PREFIX = 'newsx_';
const store = {
    get (key, defaultValue) {
        if ("TURBOPACK compile-time truthy", 1) return defaultValue;
        //TURBOPACK unreachable
        ;
    },
    set (key, value) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    remove (key) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    clear () {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
};
}),
"[project]/Downloads/Projects/blog-web/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "formatNumber",
    ()=>formatNumber,
    "generateId",
    ()=>generateId,
    "slugify",
    ()=>slugify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}
function formatNumber(num) {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}
function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function slugify(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
}),
"[project]/Downloads/Projects/blog-web/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/users.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [likes, setLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [shares, setShares] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topics, setTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedUser = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('currentUser', null);
        const savedUsers = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('users', __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"]);
        const savedLikes = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('likes', []);
        const savedShares = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('shares', []);
        const savedTopics = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('topics', __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"]);
        setCurrentUser(savedUser);
        setUsers(savedUsers.length > 0 ? savedUsers : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"]);
        setLikes(savedLikes);
        setShares(savedShares);
        setTopics(savedTopics.length > 0 ? savedTopics : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"]);
        setIsHydrated(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isHydrated) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('currentUser', currentUser);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('users', users);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('likes', likes);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('shares', shares);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('topics', topics);
        }
    }, [
        currentUser,
        users,
        likes,
        shares,
        topics,
        isHydrated
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((email, password)=>{
        const user = users.find((u)=>u.email === email && u.password === password);
        if (!user) return {
            success: false,
            message: 'Email hoặc mật khẩu không đúng'
        };
        if (user.status === 'pending') return {
            success: false,
            message: 'Tài khoản đang chờ duyệt'
        };
        if (user.status === 'blocked') return {
            success: false,
            message: 'Tài khoản đã bị khóa'
        };
        setCurrentUser(user);
        return {
            success: true,
            message: 'Đăng nhập thành công'
        };
    }, [
        users
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setCurrentUser(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].remove('currentUser');
    }, []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((name, email, password)=>{
        if (users.some((u)=>u.email === email)) {
            return {
                success: false,
                message: 'Email đã được sử dụng'
            };
        }
        const newUser = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])(),
            name,
            email,
            password,
            avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
            bio: '',
            role: 'reader',
            status: 'active',
            createdAt: new Date().toISOString()
        };
        setUsers((prev)=>[
                ...prev,
                newUser
            ]);
        setCurrentUser(newUser);
        return {
            success: true,
            message: 'Đăng ký thành công'
        };
    }, [
        users
    ]);
    const updateUserRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId, role)=>{
        setUsers((prev)=>prev.map((u)=>u.id === userId ? {
                    ...u,
                    role
                } : u));
        if (currentUser?.id === userId) {
            setCurrentUser((prev)=>prev ? {
                    ...prev,
                    role
                } : null);
        }
    }, [
        currentUser
    ]);
    const updateUserStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId, status)=>{
        setUsers((prev)=>prev.map((u)=>u.id === userId ? {
                    ...u,
                    status
                } : u));
    }, []);
    const deleteUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId)=>{
        setUsers((prev)=>prev.filter((u)=>u.id !== userId));
    }, []);
    const addUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((user)=>{
        setUsers((prev)=>[
                ...prev,
                user
            ]);
    }, []);
    const toggleLike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        setLikes((prev)=>prev.includes(articleId) ? prev.filter((id)=>id !== articleId) : [
                ...prev,
                articleId
            ]);
    }, []);
    const toggleShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        setShares((prev)=>prev.includes(articleId) ? prev.filter((id)=>id !== articleId) : [
                ...prev,
                articleId
            ]);
    }, []);
    const isLiked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>likes.includes(articleId), [
        likes
    ]);
    const isShared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>shares.includes(articleId), [
        shares
    ]);
    const addTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((topic)=>{
        setTopics((prev)=>[
                ...prev,
                topic
            ]);
    }, []);
    const updateTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((slug, updates)=>{
        setTopics((prev)=>prev.map((t)=>t.slug === slug ? {
                    ...t,
                    ...updates
                } : t));
    }, []);
    const deleteTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((slug)=>{
        setTopics((prev)=>prev.filter((t)=>t.slug !== slug));
    }, []);
    if (!isHydrated) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            currentUser,
            isAuthenticated: !!currentUser,
            users,
            login,
            logout,
            register,
            updateUserRole,
            updateUserStatus,
            deleteUser,
            addUser,
            likes,
            shares,
            toggleLike,
            toggleShare,
            isLiked,
            isShared,
            topics,
            addTopic,
            updateTopic,
            deleteTopic
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Projects/blog-web/src/contexts/AuthContext.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bcf2df3f._.js.map