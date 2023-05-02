import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    Customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    Rate: {
      type: Number,
    },
    Review: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      // transform(doc,ret){
      //     delete ret.Password;
      //     delete ret.ConfirmPassword
      // }
    },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Customer",
    select: "Name ContactNumber Email ProfileImage",
  });

  next();
});

const Reviews = mongoose.model("Review", ReviewSchema);

export default Reviews;
