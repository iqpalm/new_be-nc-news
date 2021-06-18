exports.getStatus = (req, res) => {
  const output = { message: "API ready to use" };
  res.send(output);
};
