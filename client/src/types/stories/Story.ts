export interface Story {
    _id: string;
    title: string;
    author: {
        _id: string;
        name: string;
        avatar: string;
        bio?:string;
    };
    image: string;
    description: string;
    category: string;
    body: string;
    views: number;
    rating: number;
    numReviews: number;
    reviews: Array<Review>;
    createdAt: string;
}

export interface Review {
    _id: string;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}
