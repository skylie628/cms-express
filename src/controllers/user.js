const getUser = (rq, rs) => {
  return rs.send("getUser");
};
module.exports = { getUser };
