import mongoose from 'mongoose';

const postSchema = mongoose.Schema ({
    author: String,
    title: String,
    name: String,
    tags: [String],
    message: String,
    selectedFile: String,
    selectedBackgroundFile: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;