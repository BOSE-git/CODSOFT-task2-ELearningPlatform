import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  links: [{
    name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      }
  }],
  user: [{ type: mongoose.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("Course", courseSchema);