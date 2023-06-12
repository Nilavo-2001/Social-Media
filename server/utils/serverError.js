const handleServerError = function (res, error, status) {
    console.log(error);
    return res.status(status).json({ error: error.message })
}
module.exports = handleServerError;
