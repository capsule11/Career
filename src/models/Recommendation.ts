import mongoose, { Schema, Document, models } from "mongoose";

interface IRecommendation extends Document {
  userId: Schema.Types.ObjectId;
  recommendations: object[];
  createdAt: Date;
}

const RecommendationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recommendations: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Recommendation ||
  mongoose.model<IRecommendation>("Recommendation", RecommendationSchema);