const header = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods", '*',
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Admin-access",
    "X-access-token",
    "Class-Id",
    "Section-Id",
    "userId",
    "userAccess",
    "Authorization"
  );
  next();
};

module.exports = { header };
