export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  content: string;
  image?: string;
};

export const blogPosts: BlogPost[] = [];
