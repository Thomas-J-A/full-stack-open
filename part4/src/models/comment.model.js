const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: String,
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
