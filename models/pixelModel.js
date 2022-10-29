import mongoose from 'mongoose';

const pixelSchema = new mongoose.Schema({
    color: { type: String, default: "#fff" },
    isAvailable: { type: Boolean, default: true },
    X: Number,
    Y: Number,
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'creator' }
});


module.exports.Pixel = mongoose.models.pixel || mongoose.model('pixel', pixelSchema);
module.exports.pixelSchema = pixelSchema;