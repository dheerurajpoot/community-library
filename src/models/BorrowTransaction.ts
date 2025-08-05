import mongoose from "mongoose";

const borrowTransactionSchema = new mongoose.Schema(
	{
		book: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		borrower: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		borrowDate: { type: Date, required: true },
		returnDate: { type: Date },
		status: {
			type: String,
			enum: ["borrowed", "returned", "overdue"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.BorrowTransaction ||
	mongoose.model("BorrowTransaction", borrowTransactionSchema);
