import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required: true,
        unique : true
    },
    password : {
        type :String,
        required : true,
        
    }
},{timestamps: true});

export const UserModel = mongoose.model("User", userSchema)

const contentTypes = ['image','video','article','audio'];

const contentSchema = new mongoose.Schema({
    Link : {
        type : String,
        required: true
    },
    Type :{
        type : String,
        // enum : contentTypes,
        required : true
    },
    title : {
         type :String,
         required :true
    },
    tags :[{type : mongoose.Schema.Types.ObjectId ,ref : 'Tag'}],
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

export const ContentModle = mongoose.model("Content",contentSchema);

const tagSchema = new mongoose.Schema({
    Title : {
        type : String,
        required : true
       
    }
})

export const TagModel = mongoose.model("Tag",tagSchema);


const LinkSchema = new mongoose.Schema({
    hash :{
        type :String,
        require :true
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        // unique: true

    }
})

export const LinkModel = mongoose.model("Link",LinkSchema)
