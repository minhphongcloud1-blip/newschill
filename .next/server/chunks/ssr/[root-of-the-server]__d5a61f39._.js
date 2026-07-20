module.exports = [
"[project]/Downloads/Projects/blog-web/.next-internal/server/app/topic/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/Downloads/Projects/blog-web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Downloads/Projects/blog-web/src/components/seo/JsonLd.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * JSON-LD Structured Data Components for SEO
 * Usage: <JsonLd data={articleSchema} />
 */ __turbopack_context__.s([
    "JsonLd",
    ()=>JsonLd,
    "buildArticleSchema",
    ()=>buildArticleSchema,
    "buildBreadcrumbSchema",
    ()=>buildBreadcrumbSchema,
    "buildCollectionSchema",
    ()=>buildCollectionSchema,
    "websiteSchema",
    ()=>websiteSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function JsonLd({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(data)
        }
    }, void 0, false, {
        fileName: "[project]/Downloads/Projects/blog-web/src/components/seo/JsonLd.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn';
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NewsX',
    url: SITE_URL,
    description: 'Đọc tin tức, bình luận và chia sẻ trên nền tảng kiểu X. Cập nhật tin tức công nghệ, khoa học, kinh doanh, thể thao nhanh nhất Việt Nam.',
    inLanguage: 'vi',
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
    }
};
function buildArticleSchema(article) {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage ? [
            article.coverImage
        ] : [],
        datePublished: article.createdAt,
        dateModified: article.createdAt,
        author: {
            '@type': 'Person',
            name: article.author.name,
            image: article.author.avatar
        },
        publisher: {
            '@type': 'Organization',
            name: 'NewsX',
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/article/${article.id}`
        },
        articleSection: article.topic.name,
        inLanguage: 'vi',
        url: `${SITE_URL}/article/${article.id}`
    };
}
function buildBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index)=>({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
    };
}
function buildCollectionSchema(name, description, url) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url,
        inLanguage: 'vi',
        publisher: {
            '@type': 'Organization',
            name: 'NewsX',
            url: SITE_URL
        }
    };
}
}),
"[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx <module evaluation>", "default");
}),
"[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx", "default");
}),
"[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$app$2f$topic$2f5b$slug$5d2f$TopicPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$app$2f$topic$2f5b$slug$5d2f$TopicPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$app$2f$topic$2f5b$slug$5d2f$TopicPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopicPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/components/seo/JsonLd.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$app$2f$topic$2f5b$slug$5d2f$TopicPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/TopicPageClient.tsx [app-rsc] (ecmascript)");
;
;
;
;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsx.vn';
async function generateMetadata({ params }) {
    const { slug } = await params;
    const topic = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockTopics"].find((t)=>t.slug === slug);
    if (!topic) return {
        title: 'Không tìm thấy chủ đề'
    };
    const url = `${SITE_URL}/topic/${slug}`;
    const description = `${topic.description} Xem ${topic.articleCount} bài viết về chủ đề ${topic.name} trên NewsX.`;
    return {
        title: `${topic.icon} ${topic.name}`,
        description,
        openGraph: {
            title: `${topic.name} | NewsX`,
            description,
            url,
            siteName: 'NewsX',
            locale: 'vi_VN'
        },
        twitter: {
            card: 'summary',
            title: `${topic.name} | NewsX`,
            description
        },
        alternates: {
            canonical: url
        }
    };
}
async function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockTopics"].map((t)=>({
            slug: t.slug
        }));
}
async function TopicPage({ params }) {
    const { slug } = await params;
    const topic = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockTopics"].find((t)=>t.slug === slug);
    const url = `${SITE_URL}/topic/${slug}`;
    const collectionSchema = topic ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildCollectionSchema"])(`${topic.icon} ${topic.name}`, topic.description, url) : null;
    const breadcrumbSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildBreadcrumbSchema"])([
        {
            name: 'Trang chủ',
            url: SITE_URL
        },
        {
            name: 'Chủ đề',
            url: `${SITE_URL}/topics`
        },
        {
            name: topic?.name ?? slug,
            url
        }
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            collectionSchema && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["JsonLd"], {
                data: collectionSchema
            }, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/page.tsx",
                lineNumber: 45,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["JsonLd"], {
                data: breadcrumbSchema
            }, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$app$2f$topic$2f5b$slug$5d2f$TopicPageClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                slug: slug
            }, void 0, false, {
                fileName: "[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/app/topic/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d5a61f39._.js.map