export type Post = {
	frontMatter: PostFrontMatter;
	markdownBody: string;
	slug: string;
};

export type PostFrontMatter = {
	title: string;
	author?: string;
	originLink?: string;
	category?: Array<string>;
};
