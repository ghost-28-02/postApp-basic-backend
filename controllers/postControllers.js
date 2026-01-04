const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        console.log(req.user);

        const { title, content, tags, visibility } = req.body;
        const postData = {
            title,
            content,
            author: req.user._id
        };

        // Only add optional fields if they exist
        if (tags) postData.tags = tags;
        if (visibility) postData.visibility = visibility;

        const post = await Post.create(postData);
        res.status(200).json({
            success: true,
            data: postData,
            message: "Entry Created successfully"
        })
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                message: 'Post creation failed',
                error: err.message
            }
        )
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            success: true,
            data: posts,
            message: "Entire Data is fetched!"
        })
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: 'Internal server Error',
                message: err.message
            }
        )
    }
}

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById({ _id: id });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "No Data Found By Given Id"
            })
        }
        res.status(200).json({
            success: true,
            data: post,
            message: `Post ${id} data Successfully fetched`
        })
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: 'Internal server Error',
                message: err.message
            }
        )
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not allowed to edit this post" });
        }

        if (title) post.title = title;
        if (content) post.content = content;
        post.isEdited = true;
        post.updatedAt = Date.now();

        await post.save();
        res.status(200).json({
            success: true,
            data: post,
            message: "Updated Successfully"
        })
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: 'Internal server Error',
                message: err.message
            }
        )
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this post"
            });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Post Deleted!"
        });

    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: 'Internal server Error',
                message: err.message
            }
        )
    }
}

exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id.toString();

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id required"
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found!"
            });
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(
                id => id.toString() !== userId
            );
        } else {
            post.dislikes = post.dislikes.filter(
                id => id.toString() !== userId
            );

            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            success: true,
            likesCount: post.likes.length,
            dislikesCount: post.dislikes.length
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error liking post",
            error: err.message
        });
    }
}

exports.commentOnPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id.toString();
        const { text } = req.body;

        if (!userId || !text) {
            return res.status(400).json({
                success: false,
                message: "userId and text are required"
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not found!"
            });
        }

        post.comments.push({
            uuser: req.user._id,
            text
        });

        await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comments: post.comments
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error commenting on post",
            error: err.message
        });
    }
}

