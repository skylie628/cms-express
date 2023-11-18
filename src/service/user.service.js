const UserModel = require("../model/user.model");

module.exports = {
  create: async (payload = {}) => {
    const { avatar, firstName, lastName, email, password } = payload;
    const data = {
      avatar,
      firstName,
      lastName,
      email,
      password,
    };
   
    const user = new UserModel(data);
    return user.save();
  },
  findAll: async () => {
    const users = await UserModel.find().sort({ data: -1 })
    return users;
  },
  findOne: async (id) => {
    const user = await UserModel.findById(id);
    return user;
  },
  findEmail: async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
  },
  update: async (id, payload = {}) => {
    console.log('update: ', id, payload)
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );
    return user
  },
  delete: async (id) => {
    const user = await UserModel.findOneAndDelete({ _id: id });
    return user;
  },

};
