const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minlength: [2, "too short user name"],
    },

    email: {
      type: String,
      required: [true, "email required"],
      trim: true,
      unique: [true, "email must be unique"],
    },
    phone: {
      type: String,
      required: [true, "phone required"],
    },

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "minlength 6 characters"],
    },
    passwordChangedAt: Date,
    prfileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    wishlist: [{ type: Types.ObjectId, ref: 'product' }],
    addresses: [{
      name: String,
      street: String,
      city: String,
      phone: String
    }]
  },
  { timestamps: true }
);

schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
});

schema.pre("findOneAndUpdate", async function () {
  if (!this._update.password) return;
  this._update.password = await bcrypt.hash(
    this._update.password,
    Number(process.env.ROUND)
  );
});

module.exports = model("user", schema);
