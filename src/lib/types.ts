export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    _ref: string;
  };
  // mainImage: {
  //   alt: string;
  //   asset: {
  //     url: string;
  //   };
  // };
  categories: Array<{
    _ref: string;
  }>;
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
