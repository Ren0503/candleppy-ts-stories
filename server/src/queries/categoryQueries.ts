// @ts-nocheck
import { Category } from '../models';

export const createCategory = async (
    name: string,
    description: string,
    image: string,
): Promise<any> => {
    const category = await new Category({
        name,
        description,
        image,
    }).save();

    return category;
};

export const getCategories = async (): Promise<any> => {
    const categories = await Category.find();

    return categories;
}

export const updateCategory = async (
    id: string,
    name: string,
    description: string,
    image: string,
): Promise<any> => {
    const fields = {
        name,
        description,
        image,
    };

    const category = await Category.findOneAndUpdate({ _id: id }, { ...fields }, { new: true })

    return category;
};

export const deleteCategory = async (id: string): Promise<any> => {
    const category = await Category.findByIdAndRemove(id);

    return category;
}