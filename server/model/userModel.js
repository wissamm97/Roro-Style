const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    displayName: {
      type: String,
    },
    name: {
      type: String,
      require: [true, "Please Add A Name"],
    },
    email: {
      type: String,
      require: [true, "Please Add A You Email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please Add Password"],
    },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String },
    emailTokenExpiresAt: { type: Date },
    isAdmin:{type:Boolean,default:false,require:true}
  },
  {
    timestamps: true,
  }
);
// Middleware to set emailToken expiration and schedule deletion
userSchema.pre("save", function (next) {
  const user = this;

  // Check if emailToken is modified or newly created
  if (user.isModified("emailToken") || user.isNew) {
    // Set expiration time, e.g., 5 minutes from now
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in milliseconds

    user.emailTokenExpiresAt = expirationTime;

    // Schedule a timeout to delete emailToken
    setTimeout(() => {
      user.emailToken = undefined;
      user.emailTokenExpiresAt = undefined;
      user.save(); // Save the user to reflect the changes
    }, 5 * 60 * 1000); // Trigger deletion after 5 minutes
  }

  next();
});

module.exports = mongoose.model("userModel", userSchema);
