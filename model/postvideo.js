const mongoose = require('mongoose');

const PostvideoSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  anime_type:{
    type: String,
    required:true
  },
  description:{
    type:String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User
    ref: 'ADMIN',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const POSTV = mongoose.model('POSTV', PostvideoSchema);

module.exports = POSTV;
