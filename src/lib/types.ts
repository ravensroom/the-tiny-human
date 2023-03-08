export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: Author;
  // mainImage: {
  //   alt: string;
  //   asset: {
  //     url: string;
  //   };
  // };
  categories: Array<Category>;
  publishedAt: string;
  body: any;
};

export type Author = {
  _id: string;
  name: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};
