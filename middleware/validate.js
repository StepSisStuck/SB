function validate(fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] === undefined) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    next();
  };
}

module.exports = validate;
