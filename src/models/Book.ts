import mongoose from "mongoose";
import "./User";

const bookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
		isbn: { type: String },
		genre: { type: String, required: true },
		description: { type: String, required: true },
		condition: { type: String, required: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		address: { type: String, required: true },
		status: {
			type: String,
			enum: ["available", "borrowed"],
			required: true,
		},
		image: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
