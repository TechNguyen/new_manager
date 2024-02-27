import AccountUserModel from '../../model/AccountUser.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ProfilleController from '../Profile/Profile.controller.js'
import ProfileModel from '../../model/Profile.model.js';
import RoleController from '../Role/role.controller.js';
const profile = new ProfilleController();
const rolecontrol = new RoleController();
class authController {
    async signUp(req,res, next) {
        try {
            let {username,password,roleId} = req.body
            let hashpass = await bcrypt.hash(password, 13);
            let user = await AccountUserModel.find({ username: username})
            if(user.length != 0) {
                return res.status(400).json({
                    statuscode: 400,
                    message: "Username has been already !"
                })
            } else {
                const acc = await AccountUserModel.create({
                    username: username,
                    password: hashpass,
                    roleId: roleId
                })
                if(acc != null) {
                    const profile = new ProfileModel({
                        account_id: acc.id
                    })
                    await ProfileModel.create(profile)
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
            if(account == null) {
                return res.status(401).json({
                    statuscode: 401,
                    message: "Unauthorized!"
                }) 
            }
            else {
                let profileUser = await profile.GetPofileAuth(account.id);
                let role = await rolecontrol.GetRole(account.roleId);
                let check = await bcrypt.compare(password, account.password);
                if(check) {
                    let accesstoken = "";
                    if(profileUser) {
                        accesstoken = jwt.sign({
                            username: account.username,
                            profile: profileUser,
                        }, process.env.JWT_KEY , { expiresIn: '3h' })

                        
                            return res.status(200).json({
                                statuscode: 200,
                                data: {
                                    accesstoken: accesstoken,
                                    role: role
                                },
                                message: "Successfully!"
                            })
                       
                    } else {
                        
                            return res.status(200).json({
                                statuscode: 200,
                                data: {
                                    accesstoken: accesstoken,
                                    role: role
                                },
                                message: "Successfully!"
                            })
                    }
                } else {
                    res.status(401).json({
                        statuscode:  200,
                        message: "Password not correcct!",
                    })
                }
            }
        } catch(error) {
            return res.status(500).json({
                status: 500,
                message: error
            })
        } 
    }

    async ResetPassWord(req,res,next) {
        try {
            const {username,confirnPass,newPassword} = req.body;
            const id = req.params.id;
            if(confirnPass != newPassword) {
                return res.status(204).json(responStatus("New password not"))
            }
            const user = await AccountUserModel.find({
                _id: id,
            }).exec();
            if(user == null) {
                return res.status(203).json({
                    msg: "Not exits user"
                })
            } else {
                let hashpass = await bcrypt.hash(newPassword, 13);
                const newAccount = new AccountUserModel({
                    _id: id,
                    username: username,
                    password: hashpass
                })
                const userUpdate = await AccountUserModel.findOneAndUpdate({
                    _id: id,
                }, newAccount,  {new : true}).exec();
                return userUpdate != null ? res.status(200).json({
                    msg: "Reset password successfully"
                }) : res.status(204).json({
                    msg: "Reset password unsuccessfully"
                })
            }
        } catch (error) {
            return res.status(500).json({
                msg: error.message,
                status: 500
            })
        }
    }
    

    async GetAllAccount(req,res,next) {
        try {
            const data = await AccountUserModel.find({deleted: false}).exec();
            return res.status(200).json({
                msg: "Get all account successfully",
                data: data,
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message,
                status: 500
            })
        }
    }
    async DeleteAccount(req,res,next) {
         try {
            const id = req.query.id;
            const account = await AccountUserModel.findOne({
                _id:id 
            }).exec();

            if(!account) {
                return res.status(200).json({
                    msg: "Not exists account!"
                })
            }
            const accountCheck = await AccountUserModel.deleteOne({
                _id:id
            }).exec();
            return !accountCheck.acknowledged ? res.status(201).json({
                msg: "Delete failed!"
            }) : res.status(200).json({
                msg: "Delete success!"
            })
         } catch(error) {
            return res.status(500).json({
                msg: error
            })
         }
    }
}
export default authController