export interface Story {
    _id: string;
    title: string;
    author: {
        _id: string;
        name: string;
        avatar: string;
    };
    image: string;
    description: string;
    category: string;
    body: string;
    views: number;
    rating: number;
    numReviews: number;
    reviews: Array<Review>;
}

export interface Review {
    _id: string;
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
}
