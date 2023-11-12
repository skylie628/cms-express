const userService = require("../service/user.service");

module.exports = {
  signup:  async (req, res) => {
    const firstName = req.body.data.firstName;
    const lastName = req.body.data.lastName;
    const email = req.body.data.email;
    const password = req.body.data.password;
    const payload = {
      firstName,
      lastName,
      email,
      password
    }

    try {
      const user = await userService.create(payload)
      res.status(200).json({
        msg: 'Create user success',
        isSucess: true,
        data: user
      });
    } catch (err){

      res.status(400).json({
        msg: 'Create user error',
        isSucess: false,
        data: null,
        error: err
      });
    }
  },
  getAllUsers: async (req, res) => {
    const data = await userService.findAll();
    console.log(data);
  }
}