export const checkAdminPassword = (req, res, next) => {
  const adminPassword = req.body.adminPassword;

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Incorrect admin password' });
  }
};