export default function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next(); // user is logged in, allow access
  } else {
    res.redirect("/auth/login"); // redirect to login page if not logged in
  }
}
