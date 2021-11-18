import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    tags: [{
        type: String,
        required: true,
    }],
    image: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Article', articleSchema);