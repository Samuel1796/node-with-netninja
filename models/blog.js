const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema or input structures
const BlogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
},{timestamps: true})
//Models
const Blog = mongoose.model('Blog', BlogSchema)

module.exports=Blog;