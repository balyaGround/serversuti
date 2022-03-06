module.exports = (data, req, res, next) => {
  if (data.statusCode && data.statusCode < 400) {
    res.status(data.statusCode).json({
      status: data.statusCode,
      data: data.value,
      meta: data.meta,
      message: data.message,
    });
  } else {
    res.status(data.statusCode || 500).json({
      status: data.statusCode || 500,
      errors: data.message || [data.message],
      message: data.error || "Internal Server Error",
    });
  }
};
