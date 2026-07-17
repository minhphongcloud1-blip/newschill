import { Article } from '@/types';
import { mockUsers } from './users';
import { mockTopics } from './topics';

const editors = mockUsers.filter((u) => u.role === 'editor' || u.role === 'admin');

export const mockArticles: Article[] = [
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
    topic: mockTopics[0],
    createdAt: '2024-07-17T06:00:00Z',
    likesCount: 1247,
    commentsCount: 89,
    sharesCount: 234,
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
    topic: mockTopics[1],
    createdAt: '2024-07-17T04:30:00Z',
    likesCount: 2103,
    commentsCount: 156,
    sharesCount: 567,
  },
  {
    id: 'art-3',
    title: 'VinFast chính thức niêm yết tại sàn chứng khoán Tokyo',
    excerpt: 'Hãng xe điện Việt Nam VinFast trở thành công ty Đông Nam Á đầu tiên niêm yết kép tại cả NASDAQ và sàn chứng khoán Tokyo.',
    content: `<h2>Bước đi chiến lược của VinFast</h2>
<p>VinFast Auto Ltd. vừa hoàn tất thủ tục niêm yết tại sàn chứng khoán Tokyo (TSE), đánh dấu cột mốc lịch sử cho ngành công nghiệp ô tô Việt Nam và khu vực Đông Nam Á.</p>
<h3>Tại sao chọn Tokyo?</h3>
<p>Nhật Bản là thị trường ô tô lớn thứ 3 thế giới và là nơi có hệ sinh thái cung ứng linh kiện hàng đầu. Việc niêm yết tại TSE giúp VinFast tiếp cận nguồn vốn dồi dào và xây dựng quan hệ đối tác chiến lược với các nhà cung cấp Nhật Bản.</p>
<h3>Kết quả phiên giao dịch đầu tiên</h3>
<p>Cổ phiếu VinFast mở cửa với mức giá tương đương 15.2 USD, tăng 12% so với giá chào sàn. Khối lượng giao dịch đạt kỷ lục cho một cổ phiếu nước ngoài mới niêm yết tại Nhật Bản.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop',
    author: editors[2],
    topic: mockTopics[2],
    createdAt: '2024-07-17T03:00:00Z',
    likesCount: 876,
    commentsCount: 67,
    sharesCount: 145,
  },
  {
    id: 'art-4',
    title: 'Nguyễn Thị Oanh phá kỷ lục châu Á 1500m tại Diamond League',
    excerpt: 'Nữ vận động viên Việt Nam Nguyễn Thị Oanh tiếp tục gây chấn động làng điền kinh châu Á với thành tích đáng kinh ngạc.',
    content: `<h2>Kỳ tích mới của điền kinh Việt Nam</h2>
<p>Tại giải Diamond League chặng London, Nguyễn Thị Oanh đã về đích ở vị trí thứ 2 nội dung 1500m với thời gian 3 phút 58 giây 21, phá kỷ lục châu Á đã tồn tại 29 năm.</p>
<h3>Hành trình đến đỉnh cao</h3>
<p>Từ một cô gái nhỏ bé ở Bắc Giang, Oanh đã vượt qua muôn vàn khó khăn để trở thành niềm tự hào của thể thao Việt Nam. Thành tích này đưa cô vào top 10 thế giới nội dung 1500m nữ.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcca7?w=800&h=400&fit=crop',
    author: editors[0],
    topic: mockTopics[3],
    createdAt: '2024-07-16T22:00:00Z',
    likesCount: 3421,
    commentsCount: 201,
    sharesCount: 890,
  },
  {
    id: 'art-5',
    title: 'Review phim "Đất Rừng Phương Nam 2" - Siêu phẩm điện ảnh Việt',
    excerpt: 'Phần 2 của bộ phim bom tấn phá vỡ mọi kỷ lục phòng vé Việt Nam chỉ sau tuần đầu công chiếu.',
    content: `<h2>Khi điện ảnh Việt vươn tầm quốc tế</h2>
<p>"Đất Rừng Phương Nam 2" đã chính thức trở thành phim Việt có doanh thu cao nhất mọi thời đại chỉ sau 7 ngày công chiếu với con số ấn tượng 250 tỷ đồng.</p>
<h3>Điểm sáng</h3>
<ul>
<li>Kỹ xảo VFX đạt chuẩn Hollywood</li>
<li>Diễn xuất xuất sắc của dàn diễn viên</li>
<li>Âm nhạc và hình ảnh tuyệt đẹp</li>
<li>Câu chuyện cảm động, đậm chất Việt Nam</li>
</ul>
<p>Bộ phim cũng đã được mời tham dự Liên hoan phim Cannes 2025 trong hạng mục "Un Certain Regard".</p>`,
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    author: editors[1],
    topic: mockTopics[4],
    createdAt: '2024-07-16T18:00:00Z',
    likesCount: 1567,
    commentsCount: 134,
    sharesCount: 321,
  },
  {
    id: 'art-6',
    title: 'Nghiên cứu mới: Giấc ngủ 7-8 tiếng giảm 40% nguy cơ bệnh tim',
    excerpt: 'Nghiên cứu quy mô lớn trên 500.000 người cho thấy mối liên hệ chặt chẽ giữa chất lượng giấc ngủ và sức khỏe tim mạch.',
    content: `<h2>Giấc ngủ - Liều thuốc tốt nhất cho trái tim</h2>
<p>Một nghiên cứu mới đăng trên tạp chí The Lancet, theo dõi hơn 500.000 người trong 10 năm, cho thấy những người ngủ đủ 7-8 tiếng mỗi đêm có nguy cơ mắc bệnh tim mạch thấp hơn 40% so với những người ngủ ít hơn 6 tiếng.</p>
<h3>Kết quả chi tiết</h3>
<p>Nghiên cứu phân nhóm đối tượng theo thời gian ngủ và theo dõi các chỉ số sức khỏe tim mạch. Kết quả cho thấy:</p>
<ul>
<li>Ngủ dưới 5 tiếng: tăng 65% nguy cơ</li>
<li>Ngủ 5-6 tiếng: tăng 30% nguy cơ</li>
<li>Ngủ 7-8 tiếng: mức chuẩn</li>
<li>Ngủ trên 9 tiếng: tăng 15% nguy cơ</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop',
    author: editors[2],
    topic: mockTopics[5],
    createdAt: '2024-07-16T14:00:00Z',
    likesCount: 987,
    commentsCount: 45,
    sharesCount: 678,
  },
  {
    id: 'art-7',
    title: 'Liên Hợp Quốc đạt thỏa thuận lịch sử về biến đổi khí hậu',
    excerpt: 'Các quốc gia thành viên LHQ đồng thuận cam kết giảm 60% lượng khí thải carbon vào năm 2035, đánh dấu bước ngoặt trong cuộc chiến chống biến đổi khí hậu.',
    content: `<h2>Thỏa thuận khí hậu mang tính bước ngoặt</h2>
<p>Sau 2 tuần đàm phán căng thẳng tại hội nghị COP30 ở Belém, Brazil, 197 quốc gia thành viên Liên Hợp Quốc đã đạt được thỏa thuận lịch sử về giảm phát thải khí nhà kính.</p>
<h3>Nội dung chính</h3>
<ul>
<li>Giảm 60% lượng phát thải CO2 vào năm 2035 (so với mức 2019)</li>
<li>Loại bỏ hoàn toàn điện than vào năm 2040</li>
<li>Quỹ hỗ trợ 500 tỷ USD cho các nước đang phát triển</li>
<li>Cơ chế giám sát và báo cáo minh bạch</li>
</ul>
<p>Việt Nam cam kết đạt net-zero vào năm 2050 và sẽ nhận 15 tỷ USD hỗ trợ chuyển đổi năng lượng.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?w=800&h=400&fit=crop',
    author: editors[0],
    topic: mockTopics[6],
    createdAt: '2024-07-16T10:00:00Z',
    likesCount: 1432,
    commentsCount: 178,
    sharesCount: 456,
  },
  {
    id: 'art-8',
    title: 'Việt Nam đứng top 5 thế giới về đào tạo lập trình viên AI',
    excerpt: 'Báo cáo mới nhất từ World Economic Forum xếp Việt Nam vào nhóm 5 quốc gia có hệ thống đào tạo kỹ sư AI hiệu quả nhất.',
    content: `<h2>Nguồn nhân lực AI Việt Nam được thế giới công nhận</h2>
<p>Theo báo cáo "Global AI Talent Report 2024" của World Economic Forum, Việt Nam lần đầu tiên lọt vào top 5 quốc gia có hệ thống đào tạo kỹ sư trí tuệ nhân tạo hiệu quả nhất thế giới.</p>
<h3>Các chương trình nổi bật</h3>
<p>Nhiều đại học Việt Nam đã cập nhật chương trình đào tạo, tích hợp AI và Machine Learning vào giáo trình từ năm nhất. Đặc biệt, chương trình hợp tác giữa các trường đại học Việt Nam và Google, Microsoft đã đào tạo hơn 50.000 kỹ sư AI trong 3 năm qua.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    author: editors[1],
    topic: mockTopics[7],
    createdAt: '2024-07-16T08:00:00Z',
    likesCount: 2156,
    commentsCount: 167,
    sharesCount: 734,
  },
  {
    id: 'art-9',
    title: 'Apple Vision Pro 2 mỏng hơn 50%, giá giảm một nửa',
    excerpt: 'Apple ra mắt thế hệ Vision Pro thứ 2 với thiết kế mỏng nhẹ hơn nhiều và mức giá phải chăng hơn, hứa hẹn phổ cập AR/VR.',
    content: `<h2>Vision Pro 2 - Bước tiến lớn cho AR/VR</h2>
<p>Tim Cook vừa giới thiệu Apple Vision Pro 2 tại WWDC 2025 với những cải tiến đáng kể về thiết kế, hiệu năng và đặc biệt là giá bán.</p>
<h3>Thông số nổi bật</h3>
<ul>
<li>Chip M5 Pro với Neural Engine 32 nhân</li>
<li>Màn hình Micro-OLED 4K mỗi mắt</li>
<li>Trọng lượng chỉ 350g (giảm 50%)</li>
<li>Pin 4 giờ tích hợp</li>
<li>Giá khởi điểm: $1,799 (giảm từ $3,499)</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=400&fit=crop',
    author: editors[2],
    topic: mockTopics[0],
    createdAt: '2024-07-15T20:00:00Z',
    likesCount: 1876,
    commentsCount: 134,
    sharesCount: 567,
  },
  {
    id: 'art-10',
    title: 'Vaccine ung thư cá nhân hóa: Kết quả thử nghiệm pha 3 đầy hứa hẹn',
    excerpt: 'Moderna và Merck công bố kết quả thử nghiệm lâm sàng pha 3 cho thấy vaccine mRNA cá nhân hóa giảm 65% nguy cơ tái phát ung thư da.',
    content: `<h2>Bước đột phá trong điều trị ung thư</h2>
<p>Liên minh Moderna-Merck vừa công bố kết quả thử nghiệm lâm sàng pha 3 của vaccine ung thư cá nhân hóa mV-4157/V940, mở ra kỷ nguyên mới trong điều trị ung thư.</p>
<h3>Cách hoạt động</h3>
<p>Vaccine được thiết kế riêng cho từng bệnh nhân bằng cách phân tích ADN khối u, xác định các kháng nguyên đặc hiệu, và tạo mRNA hướng dẫn hệ miễn dịch tấn công tế bào ung thư.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=400&fit=crop',
    author: editors[0],
    topic: mockTopics[1],
    createdAt: '2024-07-15T16:00:00Z',
    likesCount: 3210,
    commentsCount: 198,
    sharesCount: 1023,
  },
  {
    id: 'art-11',
    title: 'Bitcoin vượt mốc 150.000 USD - Điều gì đang xảy ra?',
    excerpt: 'Đồng tiền số lớn nhất thế giới thiết lập kỷ lục mới giữa bối cảnh dòng tiền từ ETF và việc các ngân hàng trung ương tích trữ.',
    content: `<h2>Bitcoin lập đỉnh lịch sử</h2>
<p>Bitcoin đã chính thức vượt mốc 150.000 USD trong phiên giao dịch sáng nay, đánh dấu mức tăng hơn 300% trong vòng 18 tháng qua.</p>
<h3>Nguyên nhân tăng giá</h3>
<ul>
<li>Dòng tiền ETF đạt kỷ lục 5 tỷ USD/tuần</li>
<li>3 ngân hàng trung ương châu Âu bắt đầu tích trữ Bitcoin</li>
<li>Nguồn cung giảm mạnh sau halving 2024</li>
<li>Chính sách tiền tệ nới lỏng toàn cầu</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop',
    author: editors[2],
    topic: mockTopics[2],
    createdAt: '2024-07-15T12:00:00Z',
    likesCount: 2567,
    commentsCount: 312,
    sharesCount: 789,
  },
  {
    id: 'art-12',
    title: 'Premier League mùa giải 2025-26: Đội hình "trong mơ" của Man City',
    excerpt: 'Man City hoàn tất bom tấn cuối cùng, xây dựng đội hình trị giá kỷ lục 1.2 tỷ bảng cho mùa giải mới.',
    content: `<h2>Đội hình đắt giá nhất lịch sử</h2>
<p>Manchester City đã hoàn tất việc xây dựng đội hình cho mùa giải 2025-26 với tổng giá trị chuyển nhượng đạt kỷ lục 1.2 tỷ bảng Anh.</p>
<h3>Những bản hợp đồng mới</h3>
<p>Dưới sự dẫn dắt của Pep Guardiola, City đã bổ sung thêm nhiều ngôi sao trẻ tài năng, kết hợp với bộ khung vững chắc sẵn có.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop',
    author: editors[1],
    topic: mockTopics[3],
    createdAt: '2024-07-15T08:00:00Z',
    likesCount: 1234,
    commentsCount: 267,
    sharesCount: 345,
  },
  {
    id: 'art-13',
    title: 'Netflix ra mắt nền tảng gaming riêng, cạnh tranh với Steam',
    excerpt: 'Netflix chính thức bước vào thị trường game PC với nền tảng gaming độc lập, kho game khổng lồ và dịch vụ cloud gaming.',
    content: `<h2>Netflix Games - Đối thủ mới của Steam?</h2>
<p>Netflix vừa ra mắt nền tảng gaming độc lập "Netflix Games" cho PC, đánh dấu bước chuyển mình từ streaming video sang giải trí đa nền tảng.</p>
<h3>Điểm nổi bật</h3>
<ul>
<li>Kho game 200+ tựa game độc quyền</li>
<li>Cloud gaming không cần cài đặt</li>
<li>Miễn phí cho thuê bao Premium</li>
<li>Hỗ trợ cross-play mobile/PC</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
    author: editors[0],
    topic: mockTopics[4],
    createdAt: '2024-07-14T20:00:00Z',
    likesCount: 1890,
    commentsCount: 156,
    sharesCount: 423,
  },
  {
    id: 'art-14',
    title: 'Nhật Bản phê duyệt thuốc đảo ngược lão hóa đầu tiên trên thế giới',
    excerpt: 'Bộ Y tế Nhật Bản phê duyệt loại thuốc đầu tiên có khả năng làm chậm và đảo ngược quá trình lão hóa tế bào ở cấp độ phân tử.',
    content: `<h2>Thuốc chống lão hóa - Từ khoa học viễn tưởng đến hiện thực</h2>
<p>Nhật Bản trở thành quốc gia đầu tiên trên thế giới phê duyệt một loại thuốc có khả năng đảo ngược quá trình lão hóa tế bào. Thuốc GeroSen-1 do công ty dược phẩm Shionogi phát triển.</p>
<h3>Cơ chế hoạt động</h3>
<p>GeroSen-1 hoạt động bằng cách loại bỏ có chọn lọc các tế bào lão hóa (senescent cells) - những tế bào già cỗi không còn phân chia nhưng vẫn tiết ra các chất gây viêm nhiễm.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
    author: editors[1],
    topic: mockTopics[5],
    createdAt: '2024-07-14T14:00:00Z',
    likesCount: 4521,
    commentsCount: 289,
    sharesCount: 1567,
  },
  {
    id: 'art-15',
    title: 'Kênh đào Phù Nam Techo: Campuchia bắt đầu xây dựng giai đoạn 1',
    excerpt: 'Campuchia chính thức khởi công xây dựng giai đoạn 1 kênh đào Phù Nam Techo dài 180km, dự án gây nhiều tranh cãi trong khu vực.',
    content: `<h2>Dự án thay đổi dòng chảy Mekong</h2>
<p>Campuchia đã tổ chức lễ khởi công giai đoạn 1 kênh đào Phù Nam Techo với sự tham dự của Thủ tướng Hun Manet và đại diện nhà thầu Trung Quốc.</p>
<h3>Tổng quan dự án</h3>
<ul>
<li>Chiều dài: 180km</li>
<li>Tổng vốn đầu tư: 1.7 tỷ USD</li>
<li>Thời gian hoàn thành: 2028</li>
<li>Mục đích: Kết nối Phnom Penh với biển qua tỉnh Kep</li>
</ul>
<p>Việt Nam và các chuyên gia quốc tế bày tỏ lo ngại về tác động môi trường đối với đồng bằng sông Cửu Long.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    author: editors[2],
    topic: mockTopics[6],
    createdAt: '2024-07-14T10:00:00Z',
    likesCount: 876,
    commentsCount: 234,
    sharesCount: 345,
  },
  {
    id: 'art-16',
    title: 'Cursor AI: IDE thế hệ mới thay đổi cách lập trình viên làm việc',
    excerpt: 'Cursor đang dẫn đầu cuộc cách mạng AI-assisted coding với tốc độ phát triển chóng mặt và cộng đồng người dùng bùng nổ.',
    content: `<h2>Cursor - Tương lai của lập trình</h2>
<p>Cursor AI đã trở thành hiện tượng trong cộng đồng lập trình viên toàn cầu. IDE tích hợp AI này không chỉ gợi ý code mà còn có thể hiểu context dự án, refactor code phức tạp và thậm chí viết test tự động.</p>
<h3>Tại sao Cursor vượt trội?</h3>
<ul>
<li>Hiểu toàn bộ codebase, không chỉ file hiện tại</li>
<li>Multi-file editing cùng lúc</li>
<li>Agent mode: tự động thực hiện task phức tạp</li>
<li>Tích hợp terminal và debugging</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    author: editors[0],
    topic: mockTopics[0],
    createdAt: '2024-07-14T06:00:00Z',
    likesCount: 2345,
    commentsCount: 178,
    sharesCount: 567,
  },
  {
    id: 'art-17',
    title: 'ĐH Bách Khoa Hà Nội vào top 200 thế giới về Kỹ thuật & Công nghệ',
    excerpt: 'Lần đầu tiên một trường đại học Việt Nam lọt vào top 200 thế giới trong bảng xếp hạng THE theo lĩnh vực Kỹ thuật & Công nghệ.',
    content: `<h2>Thành tựu đáng tự hào</h2>
<p>Đại học Bách Khoa Hà Nội (HUST) đã chính thức được xếp hạng 187 thế giới trong lĩnh vực Kỹ thuật & Công nghệ theo bảng xếp hạng Times Higher Education (THE) 2025.</p>
<h3>Yếu tố thành công</h3>
<ul>
<li>Tăng mạnh số bài báo khoa học quốc tế</li>
<li>Hợp tác nghiên cứu với MIT, Stanford, ETH Zurich</li>
<li>Đầu tư phòng lab nghiên cứu hiện đại</li>
<li>Chương trình đào tạo chuẩn quốc tế</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop',
    author: editors[1],
    topic: mockTopics[7],
    createdAt: '2024-07-13T18:00:00Z',
    likesCount: 3456,
    commentsCount: 234,
    sharesCount: 890,
  },
  {
    id: 'art-18',
    title: 'Samsung Galaxy S25 Ultra: Camera 200MP với AI Photo Editing',
    excerpt: 'Samsung trình làng Galaxy S25 Ultra với camera 200MP cùng bộ công cụ chỉnh ảnh AI mạnh mẽ nhất từ trước đến nay.',
    content: `<h2>Smartphone chụp ảnh tốt nhất 2025?</h2>
<p>Samsung Galaxy S25 Ultra được đánh giá là smartphone có camera tốt nhất hiện nay nhờ cảm biến 200MP thế hệ mới và AI photo editing tích hợp.</p>
<h3>Tính năng camera nổi bật</h3>
<ul>
<li>Cảm biến chính 200MP ISOCELL HP3</li>
<li>AI Object Eraser: Xóa vật thể thông minh</li>
<li>Nightography 2.0: Chụp đêm siêu nét</li>
<li>Video 8K 60fps</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop',
    author: editors[2],
    topic: mockTopics[0],
    createdAt: '2024-07-13T14:00:00Z',
    likesCount: 1567,
    commentsCount: 123,
    sharesCount: 345,
  },
  {
    id: 'art-19',
    title: 'Startup Việt gọi vốn kỷ lục 100 triệu USD từ Series C',
    excerpt: 'Startup fintech Việt Nam MoMo Plus vừa hoàn tất vòng gọi vốn Series C trị giá 100 triệu USD, trở thành unicorn thứ 3 của Việt Nam.',
    content: `<h2>Thêm một unicorn Việt Nam</h2>
<p>MoMo Plus - startup fintech chuyên về embedded finance - đã trở thành unicorn thứ 3 của Việt Nam sau khi hoàn tất vòng gọi vốn Series C trị giá 100 triệu USD.</p>
<h3>Nhà đầu tư</h3>
<p>Vòng gọi vốn được dẫn dắt bởi Sequoia Capital và SoftBank Vision Fund, với sự tham gia của GIC (Singapore) và Temasek.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    author: editors[0],
    topic: mockTopics[2],
    createdAt: '2024-07-13T10:00:00Z',
    likesCount: 1234,
    commentsCount: 89,
    sharesCount: 234,
  },
  {
    id: 'art-20',
    title: 'Olympic Paris 2024: Những khoảnh khắc đáng nhớ nhất',
    excerpt: 'Nhìn lại những khoảnh khắc đẹp nhất, cảm xúc nhất và đáng nhớ nhất tại Thế vận hội Mùa hè Paris 2024.',
    content: `<h2>Olympic Paris - Thế vận hội của kỷ lục</h2>
<p>Olympic Paris 2024 đã khép lại với những kỷ lục vô tiền khoáng hậu và những khoảnh khắc cảm xúc đáng nhớ.</p>
<h3>Top khoảnh khắc</h3>
<ul>
<li>Lễ khai mạc trên sông Seine lịch sử</li>
<li>Usain Bolt Jr. phá kỷ lục 100m của cha</li>
<li>Đoàn Việt Nam giành 3 HCV - thành tích tốt nhất lịch sử</li>
<li>Breaking dance lần đầu tại Olympic</li>
</ul>`,
    coverImage: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=800&h=400&fit=crop',
    author: editors[1],
    topic: mockTopics[3],
    createdAt: '2024-07-13T06:00:00Z',
    likesCount: 2789,
    commentsCount: 156,
    sharesCount: 678,
  },
];
