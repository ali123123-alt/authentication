import mongoos from "mongoose"

const userSchema = new mongoos.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true,required: true },
  password: { type: String,required: true},
  isAdmin: { type: Boolean, default: false },
  token: { type: String,},
},{
    timestamps: true,
});

const User = mongoos.model('User', userSchema);
export default User;