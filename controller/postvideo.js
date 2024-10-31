const POSTV = require('../model/postvideo')
const USER = require('../model/auth')
const mongoose= require('mongoose')
const cloudinary = require('../lib/cloudinary')


exports.post_video = async(req, res)=>{
    if(req.method === "POST"){
        try{
            const {video, title, userId, anime_type, des} = req.body
            const uploadedVideo = await cloudinary.uploader.upload(video, {

                folder: 'vidimage',
                resource_type: 'video',
                public_id: `user_${userId}_${Date.now()}`,
                overwrite: true,
              });

              const videoUrl = uploadedVideo.secure_url;
              // console.log(videoUrl)
              const newPost = new POSTV({
                title,
                video: videoUrl, // Store Cloudinary image URL
                userId,
                anime_type,
                des,
              });
              await newPost.save();
        
              res.status(201).json({ success: true, post: newPost });

        }catch(error){
            cconsole.error('Error uploading image:', error);
            res.status(500).json({ success: false, message: 'Upload failed', error });
        }
    }else{
        res.status(405).json({ message: 'Only PUT requests are allowed' });
  }
}

exports.all_video= async(req, res)=>{
  try{
    const videos = await POSTV.find()
    res.status(200).json({ success: true, video_data: videos})
  }catch(error){
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
}