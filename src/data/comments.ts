import { Comment } from '@/types';
import { mockUsers } from './users';

const readers = mockUsers.filter((u) => u.role === 'reader' && u.status === 'active');
const editors = mockUsers.filter((u) => u.role === 'editor');

export const mockComments: Comment[] = [
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
        likesCount: 5,
      },
      {
        id: 'cmt-1-2',
        content: 'Giá API có cao hơn GPT-4 nhiều không bạn?',
        author: readers[1],
        articleId: 'art-1',
        parentId: 'cmt-1',
        createdAt: '2024-07-17T08:00:00Z',
        likesCount: 3,
      },
    ],
  },
  {
    id: 'cmt-2',
    content: 'Context window 1 triệu token là game changer. Cuối cùng cũng có thể xử lý cả codebase mà không cần chia nhỏ.',
    author: readers[1],
    articleId: 'art-1',
    parentId: null,
    createdAt: '2024-07-17T08:30:00Z',
    likesCount: 6,
    replies: [],
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
        likesCount: 4,
      },
    ],
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
        likesCount: 7,
      },
    ],
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
    replies: [],
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
        likesCount: 5,
      },
    ],
  },
];
