// routes/search.js
const POSTV = require('../model/postvideo'); // Adjust path as needed
const Post = require('../model/posts');

// Unified search function for images or videos by anime_type and type
exports.searchMedia = async (req, res) => {
  try {
    const { anime_type, type } = req.query;

    // Validate search term
    if (!anime_type || !type) {
      return res.status(400).json({ message: 'Anime type and type are required' });
    }

    // Determine the model based on type
    let results;
    if (type.toLowerCase() === 'video') {
      results = await POSTV.find({ anime_type: new RegExp(anime_type, 'i') });
    } else if (type.toLowerCase() === 'image') {
      results = await Post.find({ anime_type: new RegExp(anime_type, 'i') });
    } else {
      return res.status(400).json({ message: 'Invalid type. Use "image" or "video".' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
