const POSTV = require('../model/postvideo');
const Post = require('../model/posts');
const USER = require('../model/auth');
const ADMIN = require('../model/admin')

exports.userpost = async (req, res) => {
    try {
        // Fetch user information excluding the password
        const user = await ADMIN.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch all image posts by the user
        const images = await Post.find({ userId: req.params.id }, '_id image title')

        // Fetch all video posts by the user
        const videos = await POSTV.find({ userId: req.params.id }, '_id video title')

        // Respond with user details and associated images and videos
        res.status(200).json({
            user,
            images,
            videos
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteImagePost = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const deletedImagePost = await Post.findByIdAndDelete(id);
        if (!deletedImagePost) {
            return res.status(404).json({ success: false, message: 'Image post not found' });
        }

        res.status(200).json({ success: true, message: 'Image post deleted successfully' });
    } catch (error) {
        console.error('Error deleting image post:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Delete Video Post by ID
exports.deleteVideoPost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVideoPost = await POSTV.findByIdAndDelete(id);
        if (!deletedVideoPost) {
            return res.status(404).json({ success: false, message: 'Video post not found' });
        }

        res.status(200).json({ success: true, message: 'Video post deleted successfully' });
    } catch (error) {
        console.error('Error deleting video post:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};