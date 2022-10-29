import mongoose from 'mongoose';


const creatorSchema = new mongoose.Schema({
    email: {
        type:String,
        unique: true,
        required:true
    }, 
    code: {type:String, required:true, default: "1"},
    name:String,
    imageUrl: {type: String, default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"},
    project_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'project'}]
},{
    timestamps: true
});


module.exports = mongoose.models.creator || mongoose.model('creator', creatorSchema);
