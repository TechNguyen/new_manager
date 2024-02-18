const appMiddleware = (res,req,err,next) => {
    if(err == 400) {
        return res.status(400).json({
            statuscode: 400,
            message: "Bad Request"
        })
    }
    if(err == 500) {
        return res.status(500).json({
            statuscode: 500,
            message: "Internal Server Error"
        })
    } 
}
export default appMiddleware