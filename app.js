const express = require('express');
const app = express();
const PortNo = 8000; // Ensure 'mongoUrl' is correctly exported from './key'
const mongoose = require('mongoose');
const database = process.env.MONGO_URL
const cors = require('cors')
const {mongoUrl} = require('./keys')

app.use(cors({
  origin: "https://animeclipsfr.vercel.app",
  methods: ['GET', 'POST', 'DELETE']
}))
app.use(express.json());

require('./model/auth')
require('./model/posts')
require('./model/postvideo')
const loginrequire = require('./middleware/loginrequired')
const Signup = require('./auth/signup')
const Signin = require('./auth/signin')
const Post = require('./controller/posts');
const Postv = require('./controller/postvideo')
const Userpost = require('./controller/userpost')
const Adminsignin = require('./auth/adminsignin')
const searchvideo = require('./controller/search')

// console.log(mongoUrl)
mongoose.connect(database)
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.post('/auth/signup', Signup.signup)
app.post('/auth/signin', Signin.signin)
app.post('/auth/adminsignin', Adminsignin.adminsignin)
app.post('/post/image', loginrequire,Post.post_image)
app.post('/post/video', loginrequire,Postv.post_video)
app.get('/all-post/image', Post.all_image)
app.get('/all-posts/videos', Postv.all_video)
app.get('/api/user-post/:id', loginrequire, Userpost.userpost)
app.delete('/post-image/delete/:id', loginrequire, Userpost.deleteImagePost)
app.delete('/post-video/delete/:id', loginrequire, Userpost.deleteVideoPost)
app.get('/api/searchmedia', searchvideo.searchMedia)

app.listen(PortNo, () => {
    console.log(`Server started at port number ${PortNo}`);
});

