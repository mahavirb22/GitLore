export function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'You must be logged in to perform this action.'
  });
}

export function optionalAuth(req, res, next) {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    req.userToken = req.session.userToken || null;
  }
  next();
}
