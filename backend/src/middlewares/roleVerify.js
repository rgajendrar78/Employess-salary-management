const allowHrAdmin =
  (...allowedRoles) =>
  (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };

export default allowHrAdmin;
