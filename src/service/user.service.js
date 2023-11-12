const UserModel = require('../model/user.model');

module.exports = {
  create: async (payload = {}) => {
    const { avatar, firstName, lastName, email, password } = payload;
    const data = {
      firstName, 
      lastName, 
      email, 
      password
    }
    if(avatar) {
      data.avatar = avatar;
    }
    const user = new UserModel(data);
    return user.save();
  },
  
  findAll: async () => {
    const text = 'SELECT * FROM users';
    return text;
  }
}