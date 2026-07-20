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
        status: 'active',
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
"[project]/Downloads/Projects/blog-web/src/data/articles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockArticles",
    ()=>mockArticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/users.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/topics.ts [app-ssr] (ecmascript)");
;
;
const editors = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"].filter((u)=>u.role === 'editor' || u.role === 'admin');
const mockArticles = [
    {
        id: 'art-1',
        title: 'GPT-5 ra mắt: Bước ngoặt mới trong trí tuệ nhân tạo',
        excerpt: 'OpenAI chính thức giới thiệu GPT-5 với khả năng suy luận nâng cao, đa phương thức và hiểu ngữ cảnh sâu hơn bao giờ hết.',
        content: `<h2>GPT-5 đã chính thức ra mắt</h2>
<p>OpenAI vừa công bố phiên bản mới nhất của mô hình ngôn ngữ lớn - GPT-5, đánh dấu một bước tiến vượt bậc trong lĩnh vực trí tuệ nhân tạo. Với kiến trúc hoàn toàn mới, GPT-5 không chỉ cải thiện đáng kể về khả năng suy luận mà còn mang đến trải nghiệm đa phương thức chưa từng có.</p>
<h3>Những điểm nổi bật</h3>
<ul>
<li><strong>Suy luận chuỗi tư duy</strong>: GPT-5 có thể giải quyết các bài toán phức tạp bằng cách chia nhỏ vấn đề thành các bước logic.</li>
<li><strong>Đa phương thức nâng cao</strong>: Xử lý đồng thời văn bản, hình ảnh, âm thanh và video với độ chính xác cao.</li>
<li><strong>Context window 1 triệu token</strong>: Cho phép xử lý tài liệu dài và dự án phức tạp.</li>
<li><strong>Giảm 90% hallucination</strong>: Đáng tin cậy hơn nhiều so với các phiên bản trước.</li>
</ul>
<h3>Tác động đến ngành công nghiệp</h3>
<p>Các chuyên gia nhận định GPT-5 sẽ tạo ra làn sóng mới trong việc ứng dụng AI vào doanh nghiệp. Từ tự động hóa quy trình, phân tích dữ liệu đến sáng tạo nội dung - tất cả sẽ được nâng lên tầm cao mới.</p>
<p>"Đây không chỉ là một bản nâng cấp, mà là sự chuyển đổi paradigm trong cách chúng ta tương tác với AI," - Sam Altman, CEO OpenAI chia sẻ tại sự kiện ra mắt.</p>
<h3>Giá cả và khả năng truy cập</h3>
<p>GPT-5 sẽ được triển khai qua API với mức giá cạnh tranh. Phiên bản miễn phí cũng sẽ được cập nhật với một số tính năng cơ bản của GPT-5 trong những tuần tới.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-17T06:00:00Z',
        likesCount: 7,
        commentsCount: 4,
        sharesCount: 3
    },
    {
        id: 'art-2',
        title: 'Phát hiện hành tinh có nước lỏng cách Trái Đất 40 năm ánh sáng',
        excerpt: 'Kính thiên văn James Webb xác nhận sự tồn tại của nước lỏng trên bề mặt một hành tinh ngoài hệ Mặt Trời, mở ra hy vọng tìm kiếm sự sống ngoài Trái Đất.',
        content: `<h2>Khám phá đột phá về sự sống ngoài Trái Đất</h2>
<p>NASA vừa công bố một phát hiện lịch sử: kính thiên văn không gian James Webb đã xác nhận sự tồn tại của nước lỏng trên bề mặt hành tinh TRAPPIST-1e, cách Trái Đất khoảng 40 năm ánh sáng.</p>
<h3>Chi tiết phát hiện</h3>
<p>Thông qua phân tích quang phổ khí quyển, các nhà khoa học đã phát hiện dấu hiệu rõ ràng của hơi nước, oxy phân tử và thậm chí là methane - một chất có thể được tạo ra bởi các sinh vật sống.</p>
<blockquote><p>"Đây là lần đầu tiên chúng ta có bằng chứng trực tiếp về nước lỏng trên một hành tinh khác. Điều này thay đổi hoàn toàn cách chúng ta nhìn nhận vũ trụ." - TS. Sarah Chen, trưởng nhóm nghiên cứu</p></blockquote>
<h3>Ý nghĩa của phát hiện</h3>
<p>Nước lỏng là điều kiện thiết yếu cho sự sống như chúng ta biết. Phát hiện này không chỉ mở ra khả năng tồn tại sự sống ngoài Trái Đất mà còn thúc đẩy các chương trình thám hiểm không gian mới.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][1],
        createdAt: '2024-07-17T04:30:00Z',
        likesCount: 9,
        commentsCount: 2,
        sharesCount: 5
    },
    {
        id: 'art-3',
        title: 'VinFast chính thức niêm yết tại sàn chứng khoán Tokyo',
        excerpt: 'Hãng xe điện Việt Nam VinFast trở thành công ty Đông Nam Á đầu tiên niêm yết kép tại cả NASDAQ và sàn chứng khoán Tokyo.',
        content: `<h2>Bước đi chiến lược của VinFast</h2>
<p>VinFast Auto Ltd. vừa hoàn tất thủ tục niêm yết tại sàn chứng khoán Tokyo (TSE), đánh dấu cột mốc lịch sử cho ngành công nghiệp ô tô Việt Nam và khu vực Đông Nam Á.</p>
<h3>Tại sao chọn Tokyo?</h3>
<p>Nhật Bản là thị trường ô tô lớn thứ 3 thế giới và là nơi có hệ sinh thái cung ứng linh kiện hàng đầu. Việc niêm yết tại TSE giúp VinFast tiếp cận nguồn vốn dồi dào và xây dựng quan hệ đối tác chiến lược với các nhà cung cấp Nhật Bản.</p>
<h3>Phản ứng của thị trường</h3>
<p>Cổ phiếu VinFast tăng mạnh sau thông báo, nhà đầu tư Nhật Bản đón nhận tích cực nhờ cam kết về pin thể rắn và sạc nhanh 15 phút.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-17T03:00:00Z',
        likesCount: 5,
        commentsCount: 0,
        sharesCount: 2
    },
    {
        id: 'art-4',
        title: 'Ánh Viên phá kỷ lục SEA Games, đoạt HCV 100m bướm',
        excerpt: 'Vận động viên bơi lội Nguyễn Thị Ánh Viên lập kỷ lục SEA Games mới tại nội dung 100m bơi bướm với thành tích 57.23 giây.',
        content: `<h2>Chiến thắng lịch sử của Ánh Viên</h2>
<p>Tại đường đua xanh SEA Games, Nguyễn Thị Ánh Viên đã có màn trình diễn xuất sắc khi cán đích với thành tích 57.23 giây, phá vỡ kỷ lục SEA Games tồn tại 29 năm.</p>
<blockquote><p>"Tôi đã tập luyện rất chăm chỉ suốt 2 năm qua. Đây là thành quả xứng đáng." - Ánh Viên chia sẻ</p></blockquote>
<h3>Hành trình đến kỷ lục</h3>
<p>Để đạt được kỷ lục này, Ánh Viên đã trải qua quá trình tập luyện cực kỳ gian khổ cùng đội ngũ HLV người Mỹ, thay đổi hoàn toàn kỹ thuật và chế độ dinh dưỡng.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][3],
        createdAt: '2024-07-16T22:00:00Z',
        likesCount: 8,
        commentsCount: 2,
        sharesCount: 4
    },
    {
        id: 'art-5',
        title: 'Xe điện Tesla Model 3 đến Việt Nam: Giá 1.5 tỷ đồng',
        excerpt: 'Tesla chính thức mở bán Model 3 tại Việt Nam qua đại lý ủy quyền, với mức giá khởi điểm 1.5 tỷ đồng cho phiên bản Standard Range.',
        content: `<h2>Tesla chính thức vào thị trường Việt Nam</h2>
<p>Sau nhiều năm chờ đợi, người tiêu dùng Việt Nam cuối cùng cũng có thể mua Tesla Model 3 qua kênh chính thức với giá 1.5 tỷ đồng.</p>
<h3>Thông số kỹ thuật</h3>
<ul>
<li>Phạm vi: 450km/lần sạc (WLTP)</li>
<li>Tăng tốc 0-100km/h: 6.1 giây</li>
<li>Sạc nhanh DC: 170kW</li>
<li>Màn hình 15.4 inch trung tâm</li>
</ul>
<p>Tesla cam kết xây dựng mạng lưới Supercharger tại Việt Nam trong năm 2024.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][4],
        createdAt: '2024-07-16T10:00:00Z',
        likesCount: 6,
        commentsCount: 0,
        sharesCount: 3
    },
    {
        id: 'art-6',
        title: 'WHO cảnh báo đại dịch cúm H5N2 mới ở Đông Nam Á',
        excerpt: 'Tổ chức Y tế Thế giới phát đi cảnh báo khẩn về sự lây lan của cúm gia cầm H5N2 tại 5 quốc gia Đông Nam Á, trong đó có Việt Nam.',
        content: `<h2>Cảnh báo dịch cúm H5N2</h2>
<p>WHO đã nâng mức cảnh báo lên cấp 3 sau khi ghi nhận hơn 200 ca nhiễm H5N2 tại Thái Lan, Việt Nam, Indonesia, Malaysia và Philippines.</p>
<h3>Triệu chứng và cách phòng ngừa</h3>
<p>Virus H5N2 gây sốt cao, ho khan và khó thở. Người dân được khuyến cáo tránh tiếp xúc với gia cầm chết, đeo khẩu trang và rửa tay thường xuyên.</p>
<h3>Phản ứng của Việt Nam</h3>
<p>Bộ Y tế Việt Nam đã khởi động gói phòng dịch khẩn cấp, tăng cường giám sát tại các cửa khẩu và trang trại gia cầm trên cả nước.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][5],
        createdAt: '2024-07-16T08:00:00Z',
        likesCount: 4,
        commentsCount: 0,
        sharesCount: 1
    },
    {
        id: 'art-7',
        title: 'Hà Nội khai trương tuyến Metro số 3 kết nối Nhổn - Ga Hà Nội',
        excerpt: 'Sau 15 năm xây dựng, tuyến đường sắt đô thị Nhổn - Ga Hà Nội chính thức đi vào hoạt động, phục vụ hàng trăm nghìn hành khách mỗi ngày.',
        content: `<h2>Metro Hà Nội chính thức hoạt động</h2>
<p>Sáng 15/7, tuyến Metro số 3 đoạn Nhổn - Ga Hà Nội đã chính thức khai trương, đánh dấu bước ngoặt lớn trong hạ tầng giao thông đô thị của thủ đô.</p>
<h3>Thông số tuyến đường</h3>
<ul>
<li>Chiều dài: 12.5km (8.5km trên cao + 4km ngầm)</li>
<li>12 nhà ga</li>
<li>Tần suất: 5 phút/chuyến giờ cao điểm</li>
<li>Vận tốc tối đa: 80km/h</li>
</ul>
<p>Vé lượt có giá 15.000-40.000 đồng tùy đoạn, vé tháng 200.000 đồng.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][6],
        createdAt: '2024-07-15T16:00:00Z',
        likesCount: 7,
        commentsCount: 0,
        sharesCount: 3
    },
    {
        id: 'art-8',
        title: 'Samsung Galaxy S25 Ultra ra mắt với chip Snapdragon 8 Gen 4',
        excerpt: 'Samsung vừa giới thiệu dòng Galaxy S25 với màn hình 6.9 inch 2K, pin 6000mAh và khả năng AI on-device hoàn toàn mới.',
        content: `<h2>Galaxy S25 Ultra - Đỉnh cao Android 2025</h2>
<p>Samsung Electronics chính thức ra mắt dòng Galaxy S25 tại sự kiện Unpacked, với Galaxy S25 Ultra là flagship mạnh nhất từ trước đến nay.</p>
<h3>Điểm nổi bật</h3>
<ul>
<li>Chip Snapdragon 8 Gen 4 (3nm)</li>
<li>RAM 16GB LPDDR6</li>
<li>Camera 200MP + 50MP telephoto 10x</li>
<li>Galaxy AI 3.0 hoạt động hoàn toàn offline</li>
<li>Sạc 65W có dây + 25W không dây</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-15T08:00:00Z',
        likesCount: 9,
        commentsCount: 0,
        sharesCount: 4
    },
    {
        id: 'art-9',
        title: 'Nghiên cứu mới: Ngủ đủ 8 tiếng giảm 40% nguy cơ Alzheimer',
        excerpt: 'Nghiên cứu kéo dài 20 năm với 10.000 người tham gia cho thấy giấc ngủ đủ giờ có tác động mạnh mẽ đến sức khỏe não bộ.',
        content: `<h2>Giấc ngủ và sức khỏe não bộ</h2>
<p>Một nghiên cứu quy mô lớn vừa được công bố trên tạp chí Nature Medicine đã xác nhận mối liên hệ chặt chẽ giữa thời lượng ngủ và nguy cơ mắc bệnh Alzheimer.</p>
<h3>Phát hiện quan trọng</h3>
<p>Những người ngủ đủ 7-9 tiếng mỗi đêm có lượng protein beta-amyloid trong não thấp hơn đáng kể - đây là dấu hiệu chính của Alzheimer.</p>
<p>Ngủ không đủ giấc mãn tính (dưới 6 tiếng) làm tăng nguy cơ suy giảm nhận thức lên đến 40% sau 20 năm.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][1],
        createdAt: '2024-07-15T06:00:00Z',
        likesCount: 8,
        commentsCount: 0,
        sharesCount: 3
    },
    {
        id: 'art-10',
        title: 'Việt Nam đứng đầu ASEAN về tốc độ tăng trưởng GDP 2024',
        excerpt: 'IMF xác nhận Việt Nam đạt tăng trưởng GDP 7.2% trong năm 2024, dẫn đầu khu vực ASEAN và vượt mục tiêu của Chính phủ.',
        content: `<h2>Kinh tế Việt Nam tăng trưởng vượt kỳ vọng</h2>
<p>Quỹ Tiền tệ Quốc tế (IMF) vừa công bố báo cáo xác nhận Việt Nam đạt mức tăng trưởng GDP 7.2% trong năm 2024, cao nhất trong 5 năm trở lại đây.</p>
<h3>Động lực tăng trưởng</h3>
<ul>
<li>Xuất khẩu điện tử tăng 23%</li>
<li>FDI đạt 38 tỷ USD, kỷ lục mới</li>
<li>Du lịch quốc tế phục hồi hoàn toàn</li>
<li>Công nghiệp chế biến tăng 9.4%</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-14T14:00:00Z',
        likesCount: 9,
        commentsCount: 0,
        sharesCount: 5
    },
    {
        id: 'art-11',
        title: 'Bitcoin chạm mốc 150,000 USD: Kỷ nguyên mới của tiền mã hoá',
        excerpt: 'Bitcoin lần đầu tiên vượt ngưỡng 150,000 USD/BTC, được thúc đẩy bởi làn sóng ETF tổ chức và sự kiện halving lần thứ 4.',
        content: `<h2>Bitcoin phá vỡ mọi kỷ lục</h2>
<p>Đồng tiền mã hoá lớn nhất thế giới đã chạm mức 150,123 USD vào sáng ngày 14/7, xác lập kỷ lục lịch sử mới và thu hút sự chú ý của toàn bộ thị trường tài chính.</p>
<h3>Nguyên nhân bứt phá</h3>
<ul>
<li>BlackRock và Fidelity tăng mạnh vị thế ETF Bitcoin</li>
<li>Sự kiện halving lần 4 giảm nguồn cung</li>
<li>El Salvador công bố tích trữ 1 tỷ USD BTC</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-14T12:00:00Z',
        likesCount: 6,
        commentsCount: 2,
        sharesCount: 2
    },
    {
        id: 'art-12',
        title: 'Bão số 3 đổ bộ miền Trung, gió giật cấp 14',
        excerpt: 'Cơn bão nhiệt đới mạnh nhất trong thập kỷ đổ bộ vào bờ biển miền Trung Việt Nam, gây mưa lớn và gió mạnh trên diện rộng.',
        content: `<h2>Bão số 3 đổ bộ</h2>
<p>Bão số 3 đổ bộ vào bờ biển các tỉnh Quảng Ngãi - Bình Định lúc 3 giờ sáng với sức gió tối đa 140km/h, gió giật lên đến cấp 14.</p>
<h3>Tình hình thiệt hại</h3>
<p>Gần 50.000 hộ dân đã được sơ tán khỏi vùng nguy hiểm. Điện bị cắt tại nhiều nơi, sóng biển cao 5-7m tại vùng ven biển.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][5],
        createdAt: '2024-07-14T02:00:00Z',
        likesCount: 5,
        commentsCount: 0,
        sharesCount: 1
    },
    {
        id: 'art-13',
        title: 'Apple Vision Pro 2 ra mắt với giá 2,999 USD',
        excerpt: 'Apple công bố thế hệ Vision Pro thứ 2 với màn hình micro-OLED cải tiến, chip M4 và trọng lượng nhẹ hơn 30% so với phiên bản đầu.',
        content: `<h2>Vision Pro 2 - Tương lai của máy tính không gian</h2>
<p>Apple đã chính thức giới thiệu Vision Pro 2 tại WWDC 2025, mang đến những cải tiến đột phá cho nền tảng spatial computing.</p>
<h3>Nâng cấp chính</h3>
<ul>
<li>Chip Apple M4: hiệu năng AI tăng 60%</li>
<li>Màn hình micro-OLED 4K mỗi mắt</li>
<li>Thời lượng pin: 4 giờ (tăng 60%)</li>
<li>Giá: 2,999 USD (giảm 1,000 USD)</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-13T18:00:00Z',
        likesCount: 8,
        commentsCount: 0,
        sharesCount: 3
    },
    {
        id: 'art-14',
        title: 'Tàu vũ trụ Artemis III chạm mặt trăng sau 52 năm',
        excerpt: 'NASA đưa phi hành đoàn gồm 4 người, trong đó có 2 phụ nữ, lần đầu tiên đặt chân lên bề mặt Mặt Trăng kể từ Apollo 17 năm 1972.',
        content: `<h2>Nhân loại trở lại Mặt Trăng</h2>
<p>Tàu vũ trụ Artemis III đã hạ cánh thành công tại vùng cực nam Mặt Trăng lúc 14:27 GMT ngày 12/7/2024, đánh dấu mốc lịch sử sau 52 năm gián đoạn.</p>
<h3>Phi hành đoàn lịch sử</h3>
<p>Đây là lần đầu tiên phụ nữ đặt chân lên Mặt Trăng, với Commander Christina Koch và Mission Specialist Priya Patel.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][1],
        createdAt: '2024-07-13T14:00:00Z',
        likesCount: 9,
        commentsCount: 0,
        sharesCount: 5
    },
    {
        id: 'art-15',
        title: 'Chứng khoán Việt Nam: VN-Index vượt 1,500 điểm',
        excerpt: 'Thị trường chứng khoán Việt Nam ghi nhận phiên giao dịch lịch sử khi VN-Index lần đầu vượt ngưỡng 1,500 điểm với thanh khoản đạt 30,000 tỷ đồng.',
        content: `<h2>VN-Index xác lập kỷ lục mới</h2>
<p>Thị trường chứng khoán Việt Nam bùng nổ với VN-Index tăng 2.3% trong phiên giao dịch ngày 12/7, chính thức vượt mốc 1,500 điểm lần đầu tiên trong lịch sử.</p>
<h3>Cổ phiếu dẫn sóng</h3>
<ul>
<li>Nhóm ngân hàng: VCB +3.2%, BID +2.8%, TCB +4.1%</li>
<li>Nhóm bất động sản: VHM +5.6%, VIC +3.4%</li>
<li>Nhóm công nghệ: FPT +6.2%</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][2],
        createdAt: '2024-07-12T16:00:00Z',
        likesCount: 4,
        commentsCount: 0,
        sharesCount: 2
    },
    {
        id: 'art-16',
        title: 'Cursor AI - Công cụ lập trình thay đổi cuộc chơi năm 2024',
        excerpt: 'Cursor, IDE tích hợp AI được xây dựng trên nền VS Code, đã thu hút 1 triệu developer chỉ sau 6 tháng ra mắt nhờ khả năng code tự động vượt trội.',
        content: `<h2>Cursor: IDE thông minh nhất thế giới</h2>
<p>Cursor AI đang làm thay đổi cách hàng triệu developer viết code. Không chỉ là một AI assistant thông thường, Cursor hiểu toàn bộ codebase và có thể thực hiện các thay đổi phức tạp theo ngữ cảnh.</p>
<h3>Tính năng vượt trội</h3>
<ul>
<li>Tab completion thông minh đọc được ý định lập trình viên</li>
<li>Chat với toàn bộ codebase - hỏi bất kỳ điều gì về code</li>
<li>Agent mode tự động hoàn thành task phức tạp</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-14T09:00:00Z',
        likesCount: 7,
        commentsCount: 1,
        sharesCount: 3
    },
    {
        id: 'art-17',
        title: 'Căng thẳng Biển Đông leo thang: Mỹ điều tàu sân bay đến',
        excerpt: 'USS Gerald R. Ford đến Biển Đông trong bối cảnh tình hình leo thang với các hành động khiêu khích của tàu Trung Quốc tại vùng đặc quyền kinh tế Việt Nam.',
        content: `<h2>Tàu sân bay Mỹ xuất hiện ở Biển Đông</h2>
<p>Hàng không mẫu hạm USS Gerald R. Ford, cùng nhóm tàu hộ tống 7 chiếc, đã tiến vào Biển Đông trong chuyến tuần tra tự do hàng hải.</p>
<h3>Phản ứng các bên</h3>
<p>Việt Nam hoan nghênh hoạt động tuần tra tuân thủ luật quốc tế. Trung Quốc phản đối và cử 12 tàu chiến bám sát nhóm tàu Mỹ.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][6],
        createdAt: '2024-07-11T10:00:00Z',
        likesCount: 8,
        commentsCount: 0,
        sharesCount: 4
    },
    {
        id: 'art-18',
        title: 'Lộ trình metro TP.HCM: 6 tuyến hoàn thành vào 2030',
        excerpt: 'UBND TP.HCM công bố lộ trình xây dựng 6 tuyến metro trong giai đoạn 2024-2030, tổng mức đầu tư 25 tỷ USD từ vốn ODA và ngân sách nhà nước.',
        content: `<h2>TP.HCM đẩy nhanh xây dựng Metro</h2>
<p>Sau thành công của tuyến Metro số 1 Bến Thành - Suối Tiên, TP.HCM công bố kế hoạch tham vọng xây dựng thêm 6 tuyến metro mới.</p>
<h3>Các tuyến trong kế hoạch</h3>
<ul>
<li>Metro 2: Bến Thành - Tham Lương (2026)</li>
<li>Metro 3a: Bến Thành - Tân Kiên (2027)</li>
<li>Metro 4: Thạnh Xuân - Khu đô thị Hiệp Phước (2028)</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1555761711-259aca01de21?w=800&h=400&fit=crop',
        author: editors[2],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][6],
        createdAt: '2024-07-10T14:00:00Z',
        likesCount: 6,
        commentsCount: 0,
        sharesCount: 2
    },
    {
        id: 'art-19',
        title: 'Bộ Y tế phát hiện kháng sinh mới chữa được vi khuẩn đa kháng',
        excerpt: 'Nhóm nghiên cứu Đại học Y Hà Nội phát triển thành công hợp chất kháng sinh mới có khả năng tiêu diệt 95% chủng vi khuẩn kháng thuốc mức độ cao.',
        content: `<h2>Kháng sinh mới - Vũ khí chống lại siêu vi khuẩn</h2>
<p>Một phát hiện đột phá từ các nhà khoa học Việt Nam: hợp chất VN-2024A có khả năng tiêu diệt hiệu quả các chủng vi khuẩn đề kháng nhiều loại kháng sinh.</p>
<h3>Kết quả thử nghiệm</h3>
<p>Trong thử nghiệm tiền lâm sàng, VN-2024A cho tỷ lệ diệt khuẩn 95.3% với Staphylococcus aureus kháng methicillin (MRSA) - loại vi khuẩn nguy hiểm gây nhiễm trùng bệnh viện.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        author: editors[1],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][5],
        createdAt: '2024-07-09T08:00:00Z',
        likesCount: 5,
        commentsCount: 0,
        sharesCount: 1
    },
    {
        id: 'art-20',
        title: 'Vingroup ra mắt VinAI Assistant: Trợ lý AI thuần Việt đầu tiên',
        excerpt: 'VinAI Assistant là mô hình ngôn ngữ lớn đầu tiên của Việt Nam, được huấn luyện với 500 tỷ token tiếng Việt, sẵn sàng cạnh tranh với ChatGPT.',
        content: `<h2>VinAI - Tự hào trí tuệ nhân tạo Việt</h2>
<p>Vingroup chính thức ra mắt VinAI Assistant, mô hình ngôn ngữ lớn (LLM) thuần Việt đầu tiên với 70 tỷ tham số, được huấn luyện bằng dữ liệu tiếng Việt chất lượng cao.</p>
<h3>Điểm mạnh của VinAI</h3>
<ul>
<li>Hiểu sâu văn hoá, phong tục và pháp luật Việt Nam</li>
<li>Xử lý tiếng Việt tốt hơn ChatGPT 40% trong các bài kiểm tra chuẩn</li>
<li>Tích hợp vào hệ sinh thái Vingroup: VinFast, Vinhomes, Vinmec</li>
</ul>`,
        coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
        author: editors[0],
        topic: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"][0],
        createdAt: '2024-07-08T10:00:00Z',
        likesCount: 8,
        commentsCount: 0,
        sharesCount: 3
    }
];
}),
"[project]/Downloads/Projects/blog-web/src/data/comments.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockComments",
    ()=>mockComments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/users.ts [app-ssr] (ecmascript)");
;
const readers = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"].filter((u)=>u.role === 'reader' && u.status === 'active');
const editors = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"].filter((u)=>u.role === 'editor');
const mockComments = [
    // art-1: GPT-5 (4 comments: 2 root + 2 replies)
    {
        id: 'cmt-1',
        content: 'GPT-5 thực sự ấn tượng! Mình đã thử nghiệm và khả năng suy luận tốt hơn rất nhiều so với GPT-4.',
        author: readers[0],
        articleId: 'art-1',
        parentId: null,
        createdAt: '2024-07-17T07:00:00Z',
        likesCount: 7,
        replies: [
            {
                id: 'cmt-1-1',
                content: 'Đồng ý! Mình thấy nó gần như không bị hallucination nữa. Rất phù hợp cho enterprise.',
                author: editors[0],
                articleId: 'art-1',
                parentId: 'cmt-1',
                createdAt: '2024-07-17T07:30:00Z',
                likesCount: 5
            },
            {
                id: 'cmt-1-2',
                content: 'Giá API có cao hơn GPT-4 nhiều không bạn?',
                author: readers[1],
                articleId: 'art-1',
                parentId: 'cmt-1',
                createdAt: '2024-07-17T08:00:00Z',
                likesCount: 3
            }
        ]
    },
    {
        id: 'cmt-2',
        content: 'Context window 1 triệu token là game changer. Cuối cùng cũng có thể xử lý cả codebase mà không cần chia nhỏ.',
        author: readers[1],
        articleId: 'art-1',
        parentId: null,
        createdAt: '2024-07-17T08:30:00Z',
        likesCount: 6,
        replies: []
    },
    // art-2: Nước lỏng (2 comments: 1 root + 1 reply)
    {
        id: 'cmt-3',
        content: 'Wow, nước lỏng trên hành tinh khác! Đây thực sự là tin tức lớn nhất năm nay.',
        author: readers[0],
        articleId: 'art-2',
        parentId: null,
        createdAt: '2024-07-17T05:00:00Z',
        likesCount: 8,
        replies: [
            {
                id: 'cmt-3-1',
                content: '40 năm ánh sáng thì vẫn xa quá. Nhưng ít nhất biết rằng sự sống có thể tồn tại ngoài Trái Đất.',
                author: editors[1],
                articleId: 'art-2',
                parentId: 'cmt-3',
                createdAt: '2024-07-17T05:30:00Z',
                likesCount: 4
            }
        ]
    },
    // art-4: Ánh Viên (2 comments: 1 root + 1 reply)
    {
        id: 'cmt-4',
        content: 'Tự hào Việt Nam! Ánh Viên quá giỏi 🇻🇳',
        author: readers[1],
        articleId: 'art-4',
        parentId: null,
        createdAt: '2024-07-16T23:00:00Z',
        likesCount: 9,
        replies: [
            {
                id: 'cmt-4-1',
                content: 'Phá kỷ lục châu Á tồn tại 29 năm, quá đỉnh!',
                author: readers[0],
                articleId: 'art-4',
                parentId: 'cmt-4',
                createdAt: '2024-07-16T23:30:00Z',
                likesCount: 7
            }
        ]
    },
    // art-16: Cursor AI (1 comment)
    {
        id: 'cmt-5',
        content: 'Cursor thay đổi cách mình code hoàn toàn. Từ khi dùng Cursor, productivity tăng gấp đôi.',
        author: readers[0],
        articleId: 'art-16',
        parentId: null,
        createdAt: '2024-07-14T07:00:00Z',
        likesCount: 6,
        replies: []
    },
    // art-11: Bitcoin (2 comments: 1 root + 1 reply)
    {
        id: 'cmt-6',
        content: 'Bitcoin 150K thì có nên mua vào không mọi người?',
        author: readers[1],
        articleId: 'art-11',
        parentId: null,
        createdAt: '2024-07-15T13:00:00Z',
        likesCount: 4,
        replies: [
            {
                id: 'cmt-6-1',
                content: 'DCA thôi bạn, đừng FOMO!',
                author: readers[0],
                articleId: 'art-11',
                parentId: 'cmt-6',
                createdAt: '2024-07-15T13:30:00Z',
                likesCount: 5
            }
        ]
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/articles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$comments$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/data/comments.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
/** Build initial stats from mockArticles */ function buildInitialStats() {
    const stats = {};
    for (const a of __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockArticles"]){
        stats[a.id] = {
            likes: a.likesCount,
            shares: a.sharesCount,
            comments: a.commentsCount,
            views: 0
        };
    }
    return stats;
}
/** Build initial comments map from mockComments */ function buildInitialComments() {
    const map = {};
    for (const c of __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$comments$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockComments"]){
        if (!map[c.articleId]) map[c.articleId] = [];
        map[c.articleId].push(c);
    }
    return map;
}
function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [likes, setLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [shares, setShares] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topics, setTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [myArticles, setMyArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [articleStats, setArticleStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [allComments, setAllComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [articleEdits, setArticleEdits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentLikes, setCommentLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}); // commentId -> liked
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Version gate: bump this when mock data changes to clear stale localStorage cache
        const DATA_VERSION = 'v2';
        const storedVersion = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('dataVersion', '');
        if (storedVersion !== DATA_VERSION) {
            // Clear only data caches — preserve user accounts & login
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].remove('articleStats');
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].remove('allComments');
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].remove('articleEdits');
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('dataVersion', DATA_VERSION);
        }
        const savedUser = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('currentUser', null);
        const savedUsers = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('users', __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"]);
        const savedLikes = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('likes', []);
        const savedShares = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('shares', []);
        const savedTopics = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('topics', __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"]);
        const savedMyArticles = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('myArticles', []);
        const savedStats = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('articleStats', buildInitialStats());
        const savedComments = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('allComments', buildInitialComments());
        const savedArticleEdits = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('articleEdits', {});
        setCurrentUser(savedUser);
        setUsers(savedUsers.length > 0 ? savedUsers : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"]);
        setLikes(savedLikes);
        setShares(savedShares);
        setTopics(savedTopics.length > 0 ? savedTopics : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTopics"]);
        setMyArticles(savedMyArticles);
        // Merge: ensure any new mockArticle IDs have stats
        const merged = {
            ...buildInitialStats(),
            ...savedStats
        };
        setArticleStats(merged);
        // Merge: ensure mockComments are included
        const mergedComments = {
            ...buildInitialComments()
        };
        for (const [aid, cmts] of Object.entries(savedComments)){
            const existing = mergedComments[aid] ?? [];
            const existingIds = new Set(existing.map((c)=>c.id));
            mergedComments[aid] = [
                ...existing,
                ...cmts.filter((c)=>!existingIds.has(c.id))
            ];
        }
        setAllComments(mergedComments);
        setArticleEdits(savedArticleEdits);
        setIsHydrated(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isHydrated) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('currentUser', currentUser);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('users', users);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('likes', likes);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('shares', shares);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('topics', topics);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('myArticles', myArticles);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('articleStats', articleStats);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('allComments', allComments);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('articleEdits', articleEdits);
        }
    }, [
        currentUser,
        users,
        likes,
        shares,
        topics,
        myArticles,
        articleStats,
        allComments,
        articleEdits,
        isHydrated
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((email, password)=>{
        const user = users.find((u)=>u.email === email && u.password === password);
        if (!user) return {
            success: false,
            message: 'Email hoặc mật khẩu không đúng'
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
    const changeUserPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId, newPassword)=>{
        setUsers((prev)=>prev.map((u)=>u.id === userId ? {
                    ...u,
                    password: newPassword
                } : u));
        if (currentUser?.id === userId) {
            setCurrentUser((prev)=>prev ? {
                    ...prev,
                    password: newPassword
                } : null);
        }
    }, [
        currentUser?.id
    ]);
    const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((updates)=>{
        setCurrentUser((prev)=>prev ? {
                ...prev,
                ...updates
            } : null);
        setUsers((prev)=>prev.map((u)=>u.id === currentUser?.id ? {
                    ...u,
                    ...updates
                } : u));
    }, [
        currentUser?.id
    ]);
    const upgradePlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Only set pending — admin must approve before becoming pro
        setCurrentUser((prev)=>prev ? {
                ...prev,
                plan: 'pending_pro'
            } : null);
        setUsers((prev)=>prev.map((u)=>u.id === currentUser?.id ? {
                    ...u,
                    plan: 'pending_pro'
                } : u));
    }, [
        currentUser?.id
    ]);
    const approvePlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId)=>{
        setUsers((prev)=>prev.map((u)=>u.id === userId ? {
                    ...u,
                    plan: 'pro',
                    role: 'editor'
                } : u));
        // If approving current user, update their session too
        setCurrentUser((prev)=>prev?.id === userId ? {
                ...prev,
                plan: 'pro',
                role: 'editor'
            } : prev);
    }, []);
    const rejectPlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userId)=>{
        setUsers((prev)=>prev.map((u)=>u.id === userId ? {
                    ...u,
                    plan: 'free'
                } : u));
        setCurrentUser((prev)=>prev?.id === userId ? {
                ...prev,
                plan: 'free'
            } : prev);
    }, []);
    const toggleLike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        setLikes((prev)=>{
            const alreadyLiked = prev.includes(articleId);
            setArticleStats((stats)=>({
                    ...stats,
                    [articleId]: {
                        ...stats[articleId] ?? {
                            likes: 0,
                            shares: 0,
                            comments: 0
                        },
                        likes: Math.max(0, (stats[articleId]?.likes ?? 0) + (alreadyLiked ? -1 : 1))
                    }
                }));
            return alreadyLiked ? prev.filter((id)=>id !== articleId) : [
                ...prev,
                articleId
            ];
        });
    }, []);
    const recordShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        // One-way: cannot "unshare". Works for guests too.
        // Use sessionStorage to avoid double-counting within the same tab session.
        const sessionKey = `shared_${articleId}`;
        if ("undefined" !== 'undefined' && sessionStorage.getItem(sessionKey)) //TURBOPACK unreachable
        ;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Track in user's shares list if logged in (for UI indicator)
        setShares((prev)=>prev.includes(articleId) ? prev : [
                ...prev,
                articleId
            ]);
        // Always increment the stat
        setArticleStats((stats)=>({
                ...stats,
                [articleId]: {
                    ...stats[articleId] ?? {
                        likes: 0,
                        shares: 0,
                        comments: 0,
                        views: 0
                    },
                    shares: (stats[articleId]?.shares ?? 0) + 1
                }
            }));
    }, []);
    const recordView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        // Count every unique article open per session (guest or logged in)
        const sessionKey = `viewed_${articleId}`;
        if ("undefined" !== 'undefined' && sessionStorage.getItem(sessionKey)) //TURBOPACK unreachable
        ;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setArticleStats((stats)=>({
                ...stats,
                [articleId]: {
                    ...stats[articleId] ?? {
                        likes: 0,
                        shares: 0,
                        comments: 0,
                        views: 0
                    },
                    views: (stats[articleId]?.views ?? 0) + 1
                }
            }));
    }, []);
    const isLiked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>likes.includes(articleId), [
        likes
    ]);
    const hasShared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>shares.includes(articleId), [
        shares
    ]);
    const getStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        return articleStats[articleId] ?? {
            likes: 0,
            shares: 0,
            comments: 0
        };
    }, [
        articleStats
    ]);
    const addComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId, comment)=>{
        setAllComments((prev)=>({
                ...prev,
                [articleId]: [
                    comment,
                    ...prev[articleId] ?? []
                ]
            }));
        setArticleStats((stats)=>({
                ...stats,
                [articleId]: {
                    ...stats[articleId] ?? {
                        likes: 0,
                        shares: 0,
                        comments: 0
                    },
                    comments: (stats[articleId]?.comments ?? 0) + 1
                }
            }));
    }, []);
    const addReply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId, parentId, reply)=>{
        setAllComments((prev)=>({
                ...prev,
                [articleId]: (prev[articleId] ?? []).map((c)=>c.id === parentId ? {
                        ...c,
                        replies: [
                            ...c.replies ?? [],
                            reply
                        ]
                    } : c)
            }));
        setArticleStats((stats)=>({
                ...stats,
                [articleId]: {
                    ...stats[articleId] ?? {
                        likes: 0,
                        shares: 0,
                        comments: 0
                    },
                    comments: (stats[articleId]?.comments ?? 0) + 1
                }
            }));
    }, []);
    const getComments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId)=>{
        return allComments[articleId] ?? [];
    }, [
        allComments
    ]);
    const toggleCommentLike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((articleId, commentId)=>{
        setCommentLikes((prev)=>{
            const alreadyLiked = !!prev[commentId];
            setAllComments((comments)=>({
                    ...comments,
                    [articleId]: (comments[articleId] ?? []).map((c)=>{
                        if (c.id === commentId) {
                            return {
                                ...c,
                                likesCount: Math.max(0, (c.likesCount ?? 0) + (alreadyLiked ? -1 : 1))
                            };
                        }
                        if (c.replies?.some((r)=>r.id === commentId)) {
                            return {
                                ...c,
                                replies: c.replies.map((r)=>r.id === commentId ? {
                                        ...r,
                                        likesCount: Math.max(0, (r.likesCount ?? 0) + (alreadyLiked ? -1 : 1))
                                    } : r)
                            };
                        }
                        return c;
                    })
                }));
            return {
                ...prev,
                [commentId]: !alreadyLiked
            };
        });
    }, []);
    const isCommentLiked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((commentId)=>!!commentLikes[commentId], [
        commentLikes
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
    const addArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((article)=>{
        setMyArticles((prev)=>[
                article,
                ...prev
            ]);
        setArticleStats((stats)=>({
                ...stats,
                [article.id]: {
                    likes: 0,
                    shares: 0,
                    comments: 0,
                    views: 0
                }
            }));
    }, []);
    const updateArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        // If in myArticles → update there; otherwise store override for mock articles
        setMyArticles((prev)=>{
            const inMine = prev.some((a)=>a.id === id);
            if (inMine) return prev.map((a)=>a.id === id ? {
                    ...a,
                    ...updates
                } : a);
            return prev;
        });
        // Always persist edits for admin overrides of mock articles
        setArticleEdits((prev)=>({
                ...prev,
                [id]: {
                    ...prev[id] ?? {},
                    ...updates
                }
            }));
    }, []);
    /** Get a single article merging mockArticles + myArticles + admin edits */ const getArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        // Check myArticles first (user-created)
        const mine = myArticles.find((a)=>a.id === id);
        const mock = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$data$2f$articles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockArticles"].find((a)=>a.id === id);
        const base = mine ?? mock;
        if (!base) return undefined;
        const edits = articleEdits[id];
        return edits ? {
            ...base,
            ...edits
        } : base;
    }, [
        myArticles,
        articleEdits
    ]);
    if (!isHydrated) return null;
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
            changeUserPassword,
            updateProfile,
            upgradePlan,
            approvePlan,
            rejectPlan,
            likes,
            shares,
            toggleLike,
            recordShare,
            recordView,
            isLiked,
            hasShared,
            articleStats,
            getStats,
            allComments,
            addComment,
            addReply,
            getComments,
            toggleCommentLike,
            isCommentLiked,
            myArticles,
            addArticle,
            updateArticle,
            articleEdits,
            getArticle,
            topics,
            addTopic,
            updateTopic,
            deleteTopic
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Projects/blog-web/src/contexts/AuthContext.tsx",
        lineNumber: 400,
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
"[project]/Downloads/Projects/blog-web/src/contexts/ThemeContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projects/blog-web/src/lib/store.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].get('theme', 'dark');
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
        setIsHydrated(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isHydrated) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"].set('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [
        theme,
        isHydrated
    ]);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setTheme((prev)=>prev === 'dark' ? 'light' : 'dark');
    }, []);
    if (!isHydrated) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme,
            isDark: theme === 'dark'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Projects/blog-web/src/contexts/ThemeContext.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projects$2f$blog$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
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

//# sourceMappingURL=%5Broot-of-the-server%5D__638ae670._.js.map