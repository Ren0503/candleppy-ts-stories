// @ts-nocheck
import { Article } from '../models';

export const getArticles = async (
    size: number,
    page: number,
    sort: string,
): Promise<any> => {
    const articles = await Article.find()
        .limit(size)
        .skip(size * (page - 1))
        .sort(sort)

    return articles;
};

export const getArticlesByCategory = async (
    category: string,
    size: number,
    page: number,
    sort: string,
): Promise<any> => {
    const articles = await Article.find({ category: category })
        .limit(size)
        .skip(size * (page - 1))
        .sort(sort)

    return articles;
};

export const getArticlesByTags = async (
    tags: [string],
    size: number,
    page: number,
    sort: string,
): Promise<any> => {
    const articles = await Article.find({ tags: { $in: tags } })
        .limit(size)
        .skip(size * (page - 1))
        .sort(sort)

    return articles;
};

export const getArticlesByAuthor = async (
    author: string,
    size: number,
    page: number,
    sort: string,
): Promise<any> => {
    const articles = await Article.find({ author: author })
        .limit(size)
        .skip(size * (page - 1))
        .sort(sort)

    return articles;
};

export const createArticle = async (
    title: string,
    description: string,
    categoryId: string,
    tags: [string],
    authorId: string,
    image: string,
    body: string
): Promise<any> => {
    const newArticle = await new Article({
        title,
        description,
        category: categoryId,
        author: authorId,
        tags,
        image,
        body,
    }).save();

    await newArticle
        .populate('category')
        .populate('author')
        .execPopulate();

    return newArticle;
};

export const updateArticle = async (
    articleId: string,
    title: string,
    description: string,
    categoryId: string,
    tags: [string],
    image: string,
    body: string
): Promise<any> => {
    const fields = {
        title,
        description,
        tags,
        image,
        body,
    };

    const updateArticle = await Article.findOneAndUpdate({ _id: articleId }, { ...fields }, { new: true })
        .populate({
            path: 'author',
            select: '-password'
        })
        .populate('category')

    return updateArticle;
};

export const deleteArticle = async (id: string): Promise<any> => {
    const article = await Article.findByIdAndRemove(id);

    return article;
}
