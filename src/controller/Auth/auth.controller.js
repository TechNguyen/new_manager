import AccountUserModel from '../../model/AccountUser.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
class authController {
    async signUp(req,res, next) {
        try {
            let {username,password} = req.body
            let hashpass = await bcrypt.hash(password, 13);
            let user = await AccountUserModel.find({ username: username})
            if(user.length != 0) {
                return res.status(400).json({
                    statuscode: 400,
                    message: "Username has been already !"
                })
            } else {
                await AccountUserModel.create({
                    username: username,
                    password: hashpass
                })
                if((await AccountUserModel.find({username: username})).length > 0) {
                    return res.status(200).json({
                        statuscode: 200,
                        message: "Create account successfully!"
                    })
                }         
            }
        } catch {
            return res.status(404).json({
                status: 500,
                message: "Error when creare new account"
            })
        }
    }

    async signIn(req,res,next) {
        try {
            let {username, password} = req.body;
            const account = await AccountUserModel.findOne({
                username: username
            }).exec();
            return account == null ?  res.status(401).json({
                statuscode: 401,
                message: "Unauthorized!"
            }) : (await bcrypt.compare(password, account.password) ? res.status(200).json({
                statuscode:  200,
                message: "Successfully!",
            }) : res.status(401).json({
                statuscode:  200,
                message: "Password not correcct!",
            }))
        } catch(error) {
            return res.status(500).json({
                status: 500,
                message: error
            })
        } 
    }
}
export default authController