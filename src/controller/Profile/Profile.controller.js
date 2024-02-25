import ProfileModel from "../../model/Profile.model.js";

class ProfilleController {
    async GetById(req,res,next) {
        try {
            let accountId = req.params.account_id;
            const profile = await ProfileModel.findOne({
                account_id: accountId
            }).exec();
            profile != null ? res.status(200).json({
                msg: "Get the profile successsflly",
                profile: profile
            }) : res.status(203).json({
                msg: "No infor"
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async GetId(req,res,next) {
        try {
            let id = req.params.id;
            const profile = await ProfileModel.findOne({
                _id: id
            }).exec();
            profile != null ? res.status(200).json({
                msg: "Get the profile successsflly",
                profile: profile
            }) : res.status(203).json({
                msg: "No infor"
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async CreateProfile(req,res,next) {
        try {
            const profileEntities = new ProfileModel(req.body);
            const profille = await ProfileModel.findOne({
                account_id: profileEntities.account_id
            }).exec();
            if(profille) {
                return res.status(201).json({
                    msg: `Profile id: ${profileEntities.account_id} has exits`
                })
            }
            const profile = await ProfileModel.create(profileEntities).exec();
            profile != null ? res.status(200).json({
                msg: "Create profile successsflly",
                profile: profile
            }) : res.status(203).json({
                msg: "No infor"
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async UpdateProfile(req,res,next) {
        try {
            const profileUser = new ProfileModel(req.body);
            const profile = await ProfileModel.findOneAndUpdate({account_id: profileUser.account_id}, profileUser, {new : true}).exec();
            profile != null ? res.status(200).json({
                msg: "Update the profile successsflly",
                profile: profile
            }) : res.status(203).json({
                msg: "No infor"
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: error
            })
        }
    }


    async GetPofileAuth(accountId) {
        try {
            const profile = await ProfileModel.findOne({
                account_id: accountId
            }).exec();
            return profile ? profile : null;
        } catch (error) {
            return null
        }
    }
}
export default ProfilleController