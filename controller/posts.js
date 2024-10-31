const Post = require('../model/posts')
const USER = require('../model/auth')
const mongoose= require('mongoose')
const cloudinary = require('../lib/cloudinary')

exports.post_image = async(req, res)=>{
    if(req.method === "POST"){
        try{
            const {image, title, userId, anime_type, des} = req.body
            const uploadedImage = await cloudinary.uploader.upload(image, {
                folder: 'image',
                public_id: `user_${userId}_${Date.now()}`,
                overwrite: true,
              });

              const photoUrl = uploadedImage.secure_url;
            //   console.log(photoUrl)
              const newPost = new Post({
                title,
                image: photoUrl, // Store Cloudinary image URL
                userId,
                anime_type,
                des,
              });
              await newPost.save();
        
              res.status(200).json({ success: true, post: newPost, msg: "Posted Successfully" });

        }catch(error){
            cconsole.error('Error uploading image:', error);
            res.status(500).json({ success: false, message: 'Upload failed', error });
        }
    }else{
        res.status(405).json({ message: 'Only PUT requests are allowed' });
  }
}

exports.all_image = async(req, res)=>{
    try{
        const posts = await Post.find(); // Populate 'userId' if you want user details with the post
        res.status(200).json({ success: true, post_data: posts });
    }catch(error){
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch posts' });
    }
}