(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenSquare$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as PenSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { currentUser, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const navItems = [
        {
            href: '/',
            label: 'Trang chủ',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
        },
        {
            href: '/trending',
            label: 'Xu hướng',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
        },
        {
            href: '/topics',
            label: 'Chủ đề',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"]
        },
        {
            href: '/profile',
            label: 'Trang cá nhân',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
        }
    ];
    const handleLogout = ()=>{
        logout();
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed left-0 top-0 h-screen w-[275px] flex flex-col justify-between p-4 border-r max-lg:hidden z-40",
        style: {
            background: '#000',
            borderColor: '#2F3336'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2.5 px-3 py-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                style: {
                                    background: 'linear-gradient(135deg, #F97316, #EA580C)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                    className: "w-6 h-6 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl font-bold",
                                style: {
                                    color: '#E7E9EA'
                                },
                                children: [
                                    "News",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#F97316'
                                        },
                                        children: "X"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-1",
                        children: [
                            navItems.map((item)=>{
                                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileHover: {
                                            scale: 1.02,
                                            x: 4
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        className: "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors relative",
                                        style: {
                                            background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                                            color: isActive ? '#F97316' : '#E7E9EA'
                                        },
                                        children: [
                                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                layoutId: "sidebar-active",
                                                className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full",
                                                style: {
                                                    background: '#F97316'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                                lineNumber: 69,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] ".concat(isActive ? 'font-bold' : 'font-medium'),
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this)
                                }, item.href, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this);
                            }),
                            currentUser && (currentUser.role === 'editor' || currentUser.role === 'admin') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/article/create",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    whileHover: {
                                        scale: 1.02,
                                        x: 4
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    className: "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                                    style: {
                                        background: pathname === '/article/create' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                        color: pathname === '/article/create' ? '#3B82F6' : '#E7E9EA'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenSquare$3e$__["PenSquare"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[15px] font-medium",
                                            children: "Viết bài"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    whileHover: {
                                        scale: 1.02,
                                        x: 4
                                    },
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    className: "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                                    style: {
                                        background: pathname.startsWith('/admin') ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                        color: pathname.startsWith('/admin') ? '#8B5CF6' : '#E7E9EA'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[15px] font-medium",
                                            children: "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            currentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t pt-3",
                style: {
                    borderColor: '#2F3336'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer",
                    style: {
                        color: '#E7E9EA'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: currentUser.avatar,
                            alt: currentUser.name,
                            className: "w-10 h-10 rounded-full",
                            style: {
                                background: '#2F3336'
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold truncate",
                                    children: currentUser.name
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs truncate",
                                    style: {
                                        color: '#71767B'
                                    },
                                    children: currentUser.role === 'admin' ? '🛡️ Admin' : currentUser.role === 'editor' ? '✍️ Editor' : '👤 Reader'
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "p-2 rounded-lg transition-colors hover:bg-white/5",
                            style: {
                                color: '#71767B'
                            },
                            title: "Đăng xuất",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "SpWLcJ4nOSSf8qqWAm9fsbF92Kw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projects/blog-web/src/data/articles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockArticles",
    ()=>mockArticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/users.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-client] (ecmascript)");
;
;
const editors = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].filter((u)=>u.role === 'editor' || u.role === 'admin');
const mockArticles = [
    {
        id: 'art-1',
        title: 'GPT-5 ra mắt: Bước ngoặt mới trong trí tuệ nhân tạo',
        excerpt: 'OpenAI chính thức giới thiệu GPT-5 với khả năng suy luận nâng cao, đa phương thức và hiểu ngữ cảnh sâu hơn bao giờ hết.',
        content: '<h2>GPT-5 đã chính thức ra mắt</h2>\n<p>OpenAI vừa công bố phiên bản mới nhất của mô hình ngôn ngữ lớn - GPT-5, đánh dấu một bước tiến vượt bậc trong lĩnh vực trí tuệ nhân tạo. Với kiến trúc hoàn toàn mới, GPT-5 không chỉ cải thiện đáng kể về khả năng suy luận mà còn mang đến trải nghiệm đa phương thức chưa từng có.</p>\n<h3>Những điểm nổi bật</h3>\n<ul>\n<li><strong>Suy luận chuỗi tư duy</strong>: GPT-5 có thể giải quyết các bài toán phức tạp bằng cách chia nhỏ vấn đề thành các bước logic.</li>\n<li><strong>Đa phương thức nâng cao</strong>: Xử lý đồng thời văn bản, hình ảnh, âm thanh và video với độ chính xác cao.</li>\n<li><strong>Context window 1 triệu token</strong>: Cho phép xử lý tài liệu dài và dự án phức tạp.</li>\n<li><strong>Giảm 90% hallucination</strong>: Đáng tin cậy hơn nhiều so với các phiên bản trước.</li>\n</ul>\n<h3>Tác động đến ngành công nghiệp</h3>\n<p>Các chuyên gia nhận định GPT-5 sẽ tạo ra làn sóng mới trong việc ứng dụng AI vào doanh nghiệp. Từ tự động hóa quy trình, phân tích dữ liệu đến sáng tạo nội dung - tất cả sẽ được nâng lên tầm cao mới.</p>\n<p>"Đây không chỉ là một bản nâng cấp, mà là sự chuyển đổi paradigm trong cách chúng ta tương tác với AI," - Sam Altman, CEO OpenAI chia sẻ tại sự kiện ra mắt.</p>\n<h3>Giá cả và khả năng truy cập</h3>\n<p>GPT-5 sẽ được triển khai qua API với mức giá cạnh tranh. Phiên bản miễn phí cũng sẽ được cập nhật với một số tính năng cơ bản của GPT-5 trong những tuần tới.</p>',
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-17T06:00:00Z',
        likesCount: 1247,
        commentsCount: 89,
        sharesCount: 234
    },
    {
        id: 'art-2',
        title: 'Phát hiện hành tinh có nước lỏng cách Trái Đất 40 năm ánh sáng',
        excerpt: 'Kính thiên văn James Webb xác nhận sự tồn tại của nước lỏng trên bề mặt một hành tinh ngoài hệ Mặt Trời, mở ra hy vọng tìm kiếm sự sống ngoài Trái Đất.',
        content: '<h2>Khám phá đột phá về sự sống ngoài Trái Đất</h2>\n<p>NASA vừa công bố một phát hiện lịch sử: kính thiên văn không gian James Webb đã xác nhận sự tồn tại của nước lỏng trên bề mặt hành tinh TRAPPIST-1e, cách Trái Đất khoảng 40 năm ánh sáng.</p>\n<h3>Chi tiết phát hiện</h3>\n<p>Thông qua phân tích quang phổ khí quyển, các nhà khoa học đã phát hiện dấu hiệu rõ ràng của hơi nước, oxy phân tử và thậm chí là methane - một chất có thể được tạo ra bởi các sinh vật sống.</p>\n<blockquote><p>"Đây là lần đầu tiên chúng ta có bằng chứng trực tiếp về nước lỏng trên một hành tinh khác. Điều này thay đổi hoàn toàn cách chúng ta nhìn nhận vũ trụ." - TS. Sarah Chen, trưởng nhóm nghiên cứu</p></blockquote>\n<h3>Ý nghĩa của phát hiện</h3>\n<p>Nước lỏng là điều kiện thiết yếu cho sự sống như chúng ta biết. Phát hiện này không chỉ mở ra khả năng tồn tại sự sống ngoài Trái Đất mà còn thúc đẩy các chương trình thám hiểm không gian mới.</p>',
        coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][1],
        createdAt: '2024-07-17T04:30:00Z',
        likesCount: 2103,
        commentsCount: 156,
        sharesCount: 567
    },
    {
        id: 'art-3',
        title: 'VinFast chính thức niêm yết tại sàn chứng khoán Tokyo',
        excerpt: 'Hãng xe điện Việt Nam VinFast trở thành công ty Đông Nam Á đầu tiên niêm yết kép tại cả NASDAQ và sàn chứng khoán Tokyo.',
        content: "<h2>Bước đi chiến lược của VinFast</h2>\n<p>VinFast Auto Ltd. vừa hoàn tất thủ tục niêm yết tại sàn chứng khoán Tokyo (TSE), đánh dấu cột mốc lịch sử cho ngành công nghiệp ô tô Việt Nam và khu vực Đông Nam Á.</p>\n<h3>Tại sao chọn Tokyo?</h3>\n<p>Nhật Bản là thị trường ô tô lớn thứ 3 thế giới và là nơi có hệ sinh thái cung ứng linh kiện hàng đầu. Việc niêm yết tại TSE giúp VinFast tiếp cận nguồn vốn dồi dào và xây dựng quan hệ đối tác chiến lược với các nhà cung cấp Nhật Bản.</p>\n<h3>Kết quả phiên giao dịch đầu tiên</h3>\n<p>Cổ phiếu VinFast mở cửa với mức giá tương đương 15.2 USD, tăng 12% so với giá chào sàn. Khối lượng giao dịch đạt kỷ lục cho một cổ phiếu nước ngoài mới niêm yết tại Nhật Bản.</p>",
        coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-17T03:00:00Z',
        likesCount: 876,
        commentsCount: 67,
        sharesCount: 145
    },
    {
        id: 'art-4',
        title: 'Nguyễn Thị Oanh phá kỷ lục châu Á 1500m tại Diamond League',
        excerpt: 'Nữ vận động viên Việt Nam Nguyễn Thị Oanh tiếp tục gây chấn động làng điền kinh châu Á với thành tích đáng kinh ngạc.',
        content: "<h2>Kỳ tích mới của điền kinh Việt Nam</h2>\n<p>Tại giải Diamond League chặng London, Nguyễn Thị Oanh đã về đích ở vị trí thứ 2 nội dung 1500m với thời gian 3 phút 58 giây 21, phá kỷ lục châu Á đã tồn tại 29 năm.</p>\n<h3>Hành trình đến đỉnh cao</h3>\n<p>Từ một cô gái nhỏ bé ở Bắc Giang, Oanh đã vượt qua muôn vàn khó khăn để trở thành niềm tự hào của thể thao Việt Nam. Thành tích này đưa cô vào top 10 thế giới nội dung 1500m nữ.</p>",
        coverImage: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcca7?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][3],
        createdAt: '2024-07-16T22:00:00Z',
        likesCount: 3421,
        commentsCount: 201,
        sharesCount: 890
    },
    {
        id: 'art-5',
        title: 'Review phim "Đất Rừng Phương Nam 2" - Siêu phẩm điện ảnh Việt',
        excerpt: 'Phần 2 của bộ phim bom tấn phá vỡ mọi kỷ lục phòng vé Việt Nam chỉ sau tuần đầu công chiếu.',
        content: '<h2>Khi điện ảnh Việt vươn tầm quốc tế</h2>\n<p>"Đất Rừng Phương Nam 2" đã chính thức trở thành phim Việt có doanh thu cao nhất mọi thời đại chỉ sau 7 ngày công chiếu với con số ấn tượng 250 tỷ đồng.</p>\n<h3>Điểm sáng</h3>\n<ul>\n<li>Kỹ xảo VFX đạt chuẩn Hollywood</li>\n<li>Diễn xuất xuất sắc của dàn diễn viên</li>\n<li>Âm nhạc và hình ảnh tuyệt đẹp</li>\n<li>Câu chuyện cảm động, đậm chất Việt Nam</li>\n</ul>\n<p>Bộ phim cũng đã được mời tham dự Liên hoan phim Cannes 2025 trong hạng mục "Un Certain Regard".</p>',
        coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][4],
        createdAt: '2024-07-16T18:00:00Z',
        likesCount: 1567,
        commentsCount: 134,
        sharesCount: 321
    },
    {
        id: 'art-6',
        title: 'Nghiên cứu mới: Giấc ngủ 7-8 tiếng giảm 40% nguy cơ bệnh tim',
        excerpt: 'Nghiên cứu quy mô lớn trên 500.000 người cho thấy mối liên hệ chặt chẽ giữa chất lượng giấc ngủ và sức khỏe tim mạch.',
        content: "<h2>Giấc ngủ - Liều thuốc tốt nhất cho trái tim</h2>\n<p>Một nghiên cứu mới đăng trên tạp chí The Lancet, theo dõi hơn 500.000 người trong 10 năm, cho thấy những người ngủ đủ 7-8 tiếng mỗi đêm có nguy cơ mắc bệnh tim mạch thấp hơn 40% so với những người ngủ ít hơn 6 tiếng.</p>\n<h3>Kết quả chi tiết</h3>\n<p>Nghiên cứu phân nhóm đối tượng theo thời gian ngủ và theo dõi các chỉ số sức khỏe tim mạch. Kết quả cho thấy:</p>\n<ul>\n<li>Ngủ dưới 5 tiếng: tăng 65% nguy cơ</li>\n<li>Ngủ 5-6 tiếng: tăng 30% nguy cơ</li>\n<li>Ngủ 7-8 tiếng: mức chuẩn</li>\n<li>Ngủ trên 9 tiếng: tăng 15% nguy cơ</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][5],
        createdAt: '2024-07-16T14:00:00Z',
        likesCount: 987,
        commentsCount: 45,
        sharesCount: 678
    },
    {
        id: 'art-7',
        title: 'Liên Hợp Quốc đạt thỏa thuận lịch sử về biến đổi khí hậu',
        excerpt: 'Các quốc gia thành viên LHQ đồng thuận cam kết giảm 60% lượng khí thải carbon vào năm 2035, đánh dấu bước ngoặt trong cuộc chiến chống biến đổi khí hậu.',
        content: "<h2>Thỏa thuận khí hậu mang tính bước ngoặt</h2>\n<p>Sau 2 tuần đàm phán căng thẳng tại hội nghị COP30 ở Belém, Brazil, 197 quốc gia thành viên Liên Hợp Quốc đã đạt được thỏa thuận lịch sử về giảm phát thải khí nhà kính.</p>\n<h3>Nội dung chính</h3>\n<ul>\n<li>Giảm 60% lượng phát thải CO2 vào năm 2035 (so với mức 2019)</li>\n<li>Loại bỏ hoàn toàn điện than vào năm 2040</li>\n<li>Quỹ hỗ trợ 500 tỷ USD cho các nước đang phát triển</li>\n<li>Cơ chế giám sát và báo cáo minh bạch</li>\n</ul>\n<p>Việt Nam cam kết đạt net-zero vào năm 2050 và sẽ nhận 15 tỷ USD hỗ trợ chuyển đổi năng lượng.</p>",
        coverImage: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][6],
        createdAt: '2024-07-16T10:00:00Z',
        likesCount: 1432,
        commentsCount: 178,
        sharesCount: 456
    },
    {
        id: 'art-8',
        title: 'Việt Nam đứng top 5 thế giới về đào tạo lập trình viên AI',
        excerpt: 'Báo cáo mới nhất từ World Economic Forum xếp Việt Nam vào nhóm 5 quốc gia có hệ thống đào tạo kỹ sư AI hiệu quả nhất.',
        content: '<h2>Nguồn nhân lực AI Việt Nam được thế giới công nhận</h2>\n<p>Theo báo cáo "Global AI Talent Report 2024" của World Economic Forum, Việt Nam lần đầu tiên lọt vào top 5 quốc gia có hệ thống đào tạo kỹ sư trí tuệ nhân tạo hiệu quả nhất thế giới.</p>\n<h3>Các chương trình nổi bật</h3>\n<p>Nhiều đại học Việt Nam đã cập nhật chương trình đào tạo, tích hợp AI và Machine Learning vào giáo trình từ năm nhất. Đặc biệt, chương trình hợp tác giữa các trường đại học Việt Nam và Google, Microsoft đã đào tạo hơn 50.000 kỹ sư AI trong 3 năm qua.</p>',
        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][7],
        createdAt: '2024-07-16T08:00:00Z',
        likesCount: 2156,
        commentsCount: 167,
        sharesCount: 734
    },
    {
        id: 'art-9',
        title: 'Apple Vision Pro 2 mỏng hơn 50%, giá giảm một nửa',
        excerpt: 'Apple ra mắt thế hệ Vision Pro thứ 2 với thiết kế mỏng nhẹ hơn nhiều và mức giá phải chăng hơn, hứa hẹn phổ cập AR/VR.',
        content: "<h2>Vision Pro 2 - Bước tiến lớn cho AR/VR</h2>\n<p>Tim Cook vừa giới thiệu Apple Vision Pro 2 tại WWDC 2025 với những cải tiến đáng kể về thiết kế, hiệu năng và đặc biệt là giá bán.</p>\n<h3>Thông số nổi bật</h3>\n<ul>\n<li>Chip M5 Pro với Neural Engine 32 nhân</li>\n<li>Màn hình Micro-OLED 4K mỗi mắt</li>\n<li>Trọng lượng chỉ 350g (giảm 50%)</li>\n<li>Pin 4 giờ tích hợp</li>\n<li>Giá khởi điểm: $1,799 (giảm từ $3,499)</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-15T20:00:00Z',
        likesCount: 1876,
        commentsCount: 134,
        sharesCount: 567
    },
    {
        id: 'art-10',
        title: 'Vaccine ung thư cá nhân hóa: Kết quả thử nghiệm pha 3 đầy hứa hẹn',
        excerpt: 'Moderna và Merck công bố kết quả thử nghiệm lâm sàng pha 3 cho thấy vaccine mRNA cá nhân hóa giảm 65% nguy cơ tái phát ung thư da.',
        content: "<h2>Bước đột phá trong điều trị ung thư</h2>\n<p>Liên minh Moderna-Merck vừa công bố kết quả thử nghiệm lâm sàng pha 3 của vaccine ung thư cá nhân hóa mV-4157/V940, mở ra kỷ nguyên mới trong điều trị ung thư.</p>\n<h3>Cách hoạt động</h3>\n<p>Vaccine được thiết kế riêng cho từng bệnh nhân bằng cách phân tích ADN khối u, xác định các kháng nguyên đặc hiệu, và tạo mRNA hướng dẫn hệ miễn dịch tấn công tế bào ung thư.</p>",
        coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][1],
        createdAt: '2024-07-15T16:00:00Z',
        likesCount: 3210,
        commentsCount: 198,
        sharesCount: 1023
    },
    {
        id: 'art-11',
        title: 'Bitcoin vượt mốc 150.000 USD - Điều gì đang xảy ra?',
        excerpt: 'Đồng tiền số lớn nhất thế giới thiết lập kỷ lục mới giữa bối cảnh dòng tiền từ ETF và việc các ngân hàng trung ương tích trữ.',
        content: "<h2>Bitcoin lập đỉnh lịch sử</h2>\n<p>Bitcoin đã chính thức vượt mốc 150.000 USD trong phiên giao dịch sáng nay, đánh dấu mức tăng hơn 300% trong vòng 18 tháng qua.</p>\n<h3>Nguyên nhân tăng giá</h3>\n<ul>\n<li>Dòng tiền ETF đạt kỷ lục 5 tỷ USD/tuần</li>\n<li>3 ngân hàng trung ương châu Âu bắt đầu tích trữ Bitcoin</li>\n<li>Nguồn cung giảm mạnh sau halving 2024</li>\n<li>Chính sách tiền tệ nới lỏng toàn cầu</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-15T12:00:00Z',
        likesCount: 2567,
        commentsCount: 312,
        sharesCount: 789
    },
    {
        id: 'art-12',
        title: 'Premier League mùa giải 2025-26: Đội hình "trong mơ" của Man City',
        excerpt: 'Man City hoàn tất bom tấn cuối cùng, xây dựng đội hình trị giá kỷ lục 1.2 tỷ bảng cho mùa giải mới.',
        content: "<h2>Đội hình đắt giá nhất lịch sử</h2>\n<p>Manchester City đã hoàn tất việc xây dựng đội hình cho mùa giải 2025-26 với tổng giá trị chuyển nhượng đạt kỷ lục 1.2 tỷ bảng Anh.</p>\n<h3>Những bản hợp đồng mới</h3>\n<p>Dưới sự dẫn dắt của Pep Guardiola, City đã bổ sung thêm nhiều ngôi sao trẻ tài năng, kết hợp với bộ khung vững chắc sẵn có.</p>",
        coverImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][3],
        createdAt: '2024-07-15T08:00:00Z',
        likesCount: 1234,
        commentsCount: 267,
        sharesCount: 345
    },
    {
        id: 'art-13',
        title: 'Netflix ra mắt nền tảng gaming riêng, cạnh tranh với Steam',
        excerpt: 'Netflix chính thức bước vào thị trường game PC với nền tảng gaming độc lập, kho game khổng lồ và dịch vụ cloud gaming.',
        content: '<h2>Netflix Games - Đối thủ mới của Steam?</h2>\n<p>Netflix vừa ra mắt nền tảng gaming độc lập "Netflix Games" cho PC, đánh dấu bước chuyển mình từ streaming video sang giải trí đa nền tảng.</p>\n<h3>Điểm nổi bật</h3>\n<ul>\n<li>Kho game 200+ tựa game độc quyền</li>\n<li>Cloud gaming không cần cài đặt</li>\n<li>Miễn phí cho thuê bao Premium</li>\n<li>Hỗ trợ cross-play mobile/PC</li>\n</ul>',
        coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][4],
        createdAt: '2024-07-14T20:00:00Z',
        likesCount: 1890,
        commentsCount: 156,
        sharesCount: 423
    },
    {
        id: 'art-14',
        title: 'Nhật Bản phê duyệt thuốc đảo ngược lão hóa đầu tiên trên thế giới',
        excerpt: 'Bộ Y tế Nhật Bản phê duyệt loại thuốc đầu tiên có khả năng làm chậm và đảo ngược quá trình lão hóa tế bào ở cấp độ phân tử.',
        content: "<h2>Thuốc chống lão hóa - Từ khoa học viễn tưởng đến hiện thực</h2>\n<p>Nhật Bản trở thành quốc gia đầu tiên trên thế giới phê duyệt một loại thuốc có khả năng đảo ngược quá trình lão hóa tế bào. Thuốc GeroSen-1 do công ty dược phẩm Shionogi phát triển.</p>\n<h3>Cơ chế hoạt động</h3>\n<p>GeroSen-1 hoạt động bằng cách loại bỏ có chọn lọc các tế bào lão hóa (senescent cells) - những tế bào già cỗi không còn phân chia nhưng vẫn tiết ra các chất gây viêm nhiễm.</p>",
        coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][5],
        createdAt: '2024-07-14T14:00:00Z',
        likesCount: 4521,
        commentsCount: 289,
        sharesCount: 1567
    },
    {
        id: 'art-15',
        title: 'Kênh đào Phù Nam Techo: Campuchia bắt đầu xây dựng giai đoạn 1',
        excerpt: 'Campuchia chính thức khởi công xây dựng giai đoạn 1 kênh đào Phù Nam Techo dài 180km, dự án gây nhiều tranh cãi trong khu vực.',
        content: "<h2>Dự án thay đổi dòng chảy Mekong</h2>\n<p>Campuchia đã tổ chức lễ khởi công giai đoạn 1 kênh đào Phù Nam Techo với sự tham dự của Thủ tướng Hun Manet và đại diện nhà thầu Trung Quốc.</p>\n<h3>Tổng quan dự án</h3>\n<ul>\n<li>Chiều dài: 180km</li>\n<li>Tổng vốn đầu tư: 1.7 tỷ USD</li>\n<li>Thời gian hoàn thành: 2028</li>\n<li>Mục đích: Kết nối Phnom Penh với biển qua tỉnh Kep</li>\n</ul>\n<p>Việt Nam và các chuyên gia quốc tế bày tỏ lo ngại về tác động môi trường đối với đồng bằng sông Cửu Long.</p>",
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][6],
        createdAt: '2024-07-14T10:00:00Z',
        likesCount: 876,
        commentsCount: 234,
        sharesCount: 345
    },
    {
        id: 'art-16',
        title: 'Cursor AI: IDE thế hệ mới thay đổi cách lập trình viên làm việc',
        excerpt: 'Cursor đang dẫn đầu cuộc cách mạng AI-assisted coding với tốc độ phát triển chóng mặt và cộng đồng người dùng bùng nổ.',
        content: "<h2>Cursor - Tương lai của lập trình</h2>\n<p>Cursor AI đã trở thành hiện tượng trong cộng đồng lập trình viên toàn cầu. IDE tích hợp AI này không chỉ gợi ý code mà còn có thể hiểu context dự án, refactor code phức tạp và thậm chí viết test tự động.</p>\n<h3>Tại sao Cursor vượt trội?</h3>\n<ul>\n<li>Hiểu toàn bộ codebase, không chỉ file hiện tại</li>\n<li>Multi-file editing cùng lúc</li>\n<li>Agent mode: tự động thực hiện task phức tạp</li>\n<li>Tích hợp terminal và debugging</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-14T06:00:00Z',
        likesCount: 2345,
        commentsCount: 178,
        sharesCount: 567
    },
    {
        id: 'art-17',
        title: 'ĐH Bách Khoa Hà Nội vào top 200 thế giới về Kỹ thuật & Công nghệ',
        excerpt: 'Lần đầu tiên một trường đại học Việt Nam lọt vào top 200 thế giới trong bảng xếp hạng THE theo lĩnh vực Kỹ thuật & Công nghệ.',
        content: "<h2>Thành tựu đáng tự hào</h2>\n<p>Đại học Bách Khoa Hà Nội (HUST) đã chính thức được xếp hạng 187 thế giới trong lĩnh vực Kỹ thuật & Công nghệ theo bảng xếp hạng Times Higher Education (THE) 2025.</p>\n<h3>Yếu tố thành công</h3>\n<ul>\n<li>Tăng mạnh số bài báo khoa học quốc tế</li>\n<li>Hợp tác nghiên cứu với MIT, Stanford, ETH Zurich</li>\n<li>Đầu tư phòng lab nghiên cứu hiện đại</li>\n<li>Chương trình đào tạo chuẩn quốc tế</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][7],
        createdAt: '2024-07-13T18:00:00Z',
        likesCount: 3456,
        commentsCount: 234,
        sharesCount: 890
    },
    {
        id: 'art-18',
        title: 'Samsung Galaxy S25 Ultra: Camera 200MP với AI Photo Editing',
        excerpt: 'Samsung trình làng Galaxy S25 Ultra với camera 200MP cùng bộ công cụ chỉnh ảnh AI mạnh mẽ nhất từ trước đến nay.',
        content: "<h2>Smartphone chụp ảnh tốt nhất 2025?</h2>\n<p>Samsung Galaxy S25 Ultra được đánh giá là smartphone có camera tốt nhất hiện nay nhờ cảm biến 200MP thế hệ mới và AI photo editing tích hợp.</p>\n<h3>Tính năng camera nổi bật</h3>\n<ul>\n<li>Cảm biến chính 200MP ISOCELL HP3</li>\n<li>AI Object Eraser: Xóa vật thể thông minh</li>\n<li>Nightography 2.0: Chụp đêm siêu nét</li>\n<li>Video 8K 60fps</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-13T14:00:00Z',
        likesCount: 1567,
        commentsCount: 123,
        sharesCount: 345
    },
    {
        id: 'art-19',
        title: 'Startup Việt gọi vốn kỷ lục 100 triệu USD từ Series C',
        excerpt: 'Startup fintech Việt Nam MoMo Plus vừa hoàn tất vòng gọi vốn Series C trị giá 100 triệu USD, trở thành unicorn thứ 3 của Việt Nam.',
        content: "<h2>Thêm một unicorn Việt Nam</h2>\n<p>MoMo Plus - startup fintech chuyên về embedded finance - đã trở thành unicorn thứ 3 của Việt Nam sau khi hoàn tất vòng gọi vốn Series C trị giá 100 triệu USD.</p>\n<h3>Nhà đầu tư</h3>\n<p>Vòng gọi vốn được dẫn dắt bởi Sequoia Capital và SoftBank Vision Fund, với sự tham gia của GIC (Singapore) và Temasek.</p>",
        coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-13T10:00:00Z',
        likesCount: 1234,
        commentsCount: 89,
        sharesCount: 234
    },
    {
        id: 'art-20',
        title: 'Olympic Paris 2024: Những khoảnh khắc đáng nhớ nhất',
        excerpt: 'Nhìn lại những khoảnh khắc đẹp nhất, cảm xúc nhất và đáng nhớ nhất tại Thế vận hội Mùa hè Paris 2024.',
        content: "<h2>Olympic Paris - Thế vận hội của kỷ lục</h2>\n<p>Olympic Paris 2024 đã khép lại với những kỷ lục vô tiền khoáng hậu và những khoảnh khắc cảm xúc đáng nhớ.</p>\n<h3>Top khoảnh khắc</h3>\n<ul>\n<li>Lễ khai mạc trên sông Seine lịch sử</li>\n<li>Usain Bolt Jr. phá kỷ lục 100m của cha</li>\n<li>Đoàn Việt Nam giành 3 HCV - thành tích tốt nhất lịch sử</li>\n<li>Breaking dance lần đầu tại Olympic</li>\n</ul>",
        coverImage: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"][3],
        createdAt: '2024-07-13T06:00:00Z',
        likesCount: 2789,
        commentsCount: 156,
        sharesCount: 678
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RightPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/articles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function RightPanel() {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const trending = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockArticles"]
    ].sort((a, b)=>b.likesCount + b.commentsCount - (a.likesCount + a.commentsCount)).slice(0, 5);
    const handleSearch = (e)=>{
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push("/?search=".concat(encodeURIComponent(searchQuery.trim())));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed right-0 top-0 h-screen w-[350px] p-4 overflow-y-auto border-l max-xl:hidden z-40",
        style: {
            background: '#000',
            borderColor: '#2F3336'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSearch,
                className: "relative mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                        style: {
                            color: '#71767B'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: searchQuery,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        placeholder: "Tìm kiếm tin tức...",
                        className: "w-full pl-10 pr-4 py-2.5 rounded-full border text-sm transition-colors focus:outline-none",
                        style: {
                            background: '#16181C',
                            borderColor: '#2F3336',
                            color: '#E7E9EA'
                        },
                        onFocus: (e)=>e.target.style.borderColor = '#F97316',
                        onBlur: (e)=>e.target.style.borderColor = '#2F3336'
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border mb-4 overflow-hidden",
                style: {
                    background: '#16181C',
                    borderColor: '#2F3336'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-5 h-5",
                                style: {
                                    color: '#F97316'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold",
                                style: {
                                    color: '#E7E9EA'
                                },
                                children: "Xu hướng"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    trending.map((article, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/article/".concat(article.id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                whileHover: {
                                    backgroundColor: 'rgba(255,255,255,0.03)'
                                },
                                className: "px-4 py-3 border-t cursor-pointer",
                                style: {
                                    borderColor: '#2F3336'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs mb-0.5",
                                                    style: {
                                                        color: '#71767B'
                                                    },
                                                    children: [
                                                        article.topic.icon,
                                                        " ",
                                                        article.topic.name,
                                                        " · Xu hướng"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold leading-tight line-clamp-2",
                                                    style: {
                                                        color: '#E7E9EA'
                                                    },
                                                    children: article.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs mt-1",
                                                    style: {
                                                        color: '#71767B'
                                                    },
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(article.likesCount + article.commentsCount),
                                                        " lượt tương tác"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                            lineNumber: 60,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg font-bold shrink-0",
                                            style: {
                                                color: '#2F3336'
                                            },
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        }, article.id, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/trending",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 border-t text-sm transition-colors",
                            style: {
                                borderColor: '#2F3336',
                                color: '#F97316'
                            },
                            children: "Xem thêm"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border overflow-hidden",
                style: {
                    background: '#16181C',
                    borderColor: '#2F3336'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold",
                            style: {
                                color: '#E7E9EA'
                            },
                            children: "Chủ đề"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-4 flex flex-wrap gap-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTopics"].map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/topic/".concat(topic.slug),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border",
                                    style: {
                                        borderColor: '#2F3336',
                                        color: '#E7E9EA',
                                        background: 'transparent'
                                    },
                                    children: [
                                        topic.icon,
                                        " ",
                                        topic.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this)
                            }, topic.slug, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs",
                    style: {
                        color: '#536471'
                    },
                    children: "© 2024 NewsX · Nền tảng tin tức thế hệ mới"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(RightPanel, "4sm5Xy4sGA6QIGrHn8tQ9Lk+vI8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RightPanel;
var _c;
__turbopack_context__.k.register(_c, "RightPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MobileNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const items = [
        {
            href: '/',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
            label: 'Home'
        },
        {
            href: '/trending',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            label: 'Trending'
        },
        {
            href: '/topics',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"],
            label: 'Topics'
        },
        {
            href: '/profile',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
            label: 'Profile'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed bottom-0 left-0 right-0 border-t lg:hidden z-50",
        style: {
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(20px)',
            borderColor: '#2F3336'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-around py-2",
            children: items.map((item)=>{
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const Icon = item.icon;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    className: "flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-6 h-6",
                            style: {
                                color: isActive ? '#F97316' : '#71767B'
                            },
                            strokeWidth: isActive ? 2.5 : 2
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px]",
                            style: {
                                color: isActive ? '#F97316' : '#71767B'
                            },
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx",
                            lineNumber: 36,
                            columnNumber: 15
                        }, this)
                    ]
                }, item.href, true, {
                    fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx",
                    lineNumber: 26,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(MobileNav, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileNav;
var _c;
__turbopack_context__.k.register(_c, "MobileNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticleCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ArticleCard(param) {
    let { article, index = 0 } = param;
    _s();
    const { isLiked, toggleLike, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const liked = isLiked(article.id);
    const handleLike = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (isAuthenticated) toggleLike(article.id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.3,
            delay: index * 0.05
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/article/".concat(article.id),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].article, {
                whileHover: {
                    backgroundColor: 'rgba(255,255,255,0.02)'
                },
                className: "px-4 py-4 border-b cursor-pointer transition-colors",
                style: {
                    borderColor: '#2F3336'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: article.author.avatar,
                                alt: article.author.name,
                                className: "w-10 h-10 rounded-full shrink-0",
                                style: {
                                    background: '#2F3336'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] font-bold truncate",
                                                style: {
                                                    color: '#E7E9EA'
                                                },
                                                children: article.author.name
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm shrink-0",
                                                style: {
                                                    color: '#71767B'
                                                },
                                                children: [
                                                    "· ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(article.createdAt)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 50,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs px-2 py-0.5 rounded-full",
                                        style: {
                                            background: "".concat(article.topic.color, "20"),
                                            color: article.topic.color
                                        },
                                        children: [
                                            article.topic.icon,
                                            " ",
                                            article.topic.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-[52px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[15px] font-bold leading-snug mb-1.5",
                                style: {
                                    color: '#E7E9EA'
                                },
                                children: article.title
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm leading-relaxed mb-3 line-clamp-2",
                                style: {
                                    color: '#71767B'
                                },
                                children: article.excerpt
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            article.coverImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl overflow-hidden mb-3 border",
                                style: {
                                    borderColor: '#2F3336'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: article.coverImage,
                                    alt: article.title,
                                    className: "w-full h-[200px] object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex items-center gap-2 group transition-colors",
                                        style: {
                                            color: '#71767B'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 rounded-full transition-colors group-hover:bg-blue-500/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                    className: "w-[18px] h-[18px] group-hover:text-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm group-hover:text-blue-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(article.commentsCount)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLike,
                                        className: "flex items-center gap-2 group transition-colors",
                                        style: {
                                            color: liked ? '#F91880' : '#71767B'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                whileTap: {
                                                    scale: 1.3
                                                },
                                                className: "p-2 rounded-full transition-colors",
                                                style: {
                                                    background: liked ? 'rgba(249,24,128,0.1)' : 'transparent'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: "w-[18px] h-[18px]",
                                                    fill: liked ? '#F91880' : 'none',
                                                    style: {
                                                        color: liked ? '#F91880' : undefined
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(article.likesCount + (liked ? 1 : 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex items-center gap-2 group transition-colors",
                                        style: {
                                            color: '#71767B'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 rounded-full transition-colors group-hover:bg-green-500/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                    className: "w-[18px] h-[18px] group-hover:text-green-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm group-hover:text-green-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(article.sharesCount)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ArticleCard, "M4CHURAADkFRlpFgmT4bScmv66Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ArticleCard;
var _c;
__turbopack_context__.k.register(_c, "ArticleCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/components/layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$layout$2f$RightPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/components/layout/RightPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/components/layout/MobileNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$feed$2f$ArticleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/components/feed/ArticleCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/articles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function ProfilePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { currentUser, isAuthenticated, likes, shares } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('shared');
    if (!isAuthenticated || !currentUser) {
        router.push('/login');
        return null;
    }
    const likedArticles = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockArticles"].filter((a)=>likes.includes(a.id));
    const sharedArticles = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockArticles"].filter((a)=>shares.includes(a.id));
    const displayedArticles = activeTab === 'shared' ? sharedArticles : likedArticles;
    const roleBadge = {
        admin: {
            label: '🛡️ Admin',
            color: '#8B5CF6',
            bg: 'rgba(139,92,246,0.1)'
        },
        editor: {
            label: '✍️ Editor',
            color: '#3B82F6',
            bg: 'rgba(59,130,246,0.1)'
        },
        reader: {
            label: '👤 Reader',
            color: '#71767B',
            bg: 'rgba(113,118,123,0.1)'
        }
    }[currentUser.role];
    const tabs = [
        {
            key: 'shared',
            label: 'Đã chia sẻ',
            count: sharedArticles.length,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"]
        },
        {
            key: 'liked',
            label: 'Đã thích',
            count: likedArticles.length,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        style: {
            background: '#000'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "lg:ml-[275px] xl:mr-[350px] min-h-screen border-r",
                style: {
                    borderColor: '#2F3336'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 z-30 flex items-center gap-4 px-4 py-3 border-b",
                        style: {
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(12px)',
                            borderColor: '#2F3336'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                className: "p-2 rounded-full hover:bg-white/10",
                                style: {
                                    color: '#E7E9EA'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-lg font-bold",
                                        style: {
                                            color: '#E7E9EA'
                                        },
                                        children: currentUser.name
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        style: {
                                            color: '#71767B'
                                        },
                                        children: [
                                            likedArticles.length + sharedArticles.length,
                                            " bài viết"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-32 relative",
                        style: {
                            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-16 left-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-32 h-32 rounded-full border-4 overflow-hidden",
                                style: {
                                    borderColor: '#000',
                                    background: '#16181C'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: currentUser.avatar,
                                    alt: currentUser.name,
                                    className: "w-full h-full"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-20 px-4 pb-4 border-b",
                        style: {
                            borderColor: '#2F3336'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold",
                                                style: {
                                                    color: '#E7E9EA'
                                                },
                                                children: currentUser.name
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                style: {
                                                    color: '#71767B'
                                                },
                                                children: currentUser.email
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1 rounded-full text-xs font-medium",
                                        style: {
                                            background: roleBadge.bg,
                                            color: roleBadge.color
                                        },
                                        children: roleBadge.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            currentUser.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm",
                                style: {
                                    color: '#E7E9EA'
                                },
                                children: currentUser.bio
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "w-4 h-4",
                                        style: {
                                            color: '#71767B'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        style: {
                                            color: '#71767B'
                                        },
                                        children: [
                                            "Tham gia ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(currentUser.createdAt)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex border-b",
                        style: {
                            borderColor: '#2F3336'
                        },
                        children: tabs.map((tab)=>{
                            const Icon = tab.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab.key),
                                className: "flex-1 py-3 text-sm font-medium relative flex items-center justify-center gap-2 transition-colors",
                                style: {
                                    color: activeTab === tab.key ? '#E7E9EA' : '#71767B'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this),
                                    tab.label,
                                    " (",
                                    tab.count,
                                    ")",
                                    activeTab === tab.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layoutId: "profile-tab",
                                        className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full",
                                        style: {
                                            background: '#F97316'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, tab.key, true, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    displayedArticles.length > 0 ? displayedArticles.map((article, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$feed$2f$ArticleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            article: article,
                            index: i
                        }, article.id, false, {
                            fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-16 text-center",
                        style: {
                            color: '#71767B'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg mb-2",
                                children: activeTab === 'shared' ? 'Chưa chia sẻ bài viết nào' : 'Chưa thích bài viết nào'
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: "Hãy khám phá và tương tác với các bài viết!"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$layout$2f$RightPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projects/blog-web/src/app/profile/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(ProfilePage, "/0VRyN31r7EAlHggJji987mi3tk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ProfilePage;
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Projects_blog-web_src_ec8d4012._.js.map