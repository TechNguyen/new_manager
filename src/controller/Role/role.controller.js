import RoleModel from "../../model/Role.model.js";
class RoleController {
    async CreateRole(req,res,next) {
        try {
            let {roleName} = req.body 
            var role = await RoleModel.findOne({
                roleName: roleName
            }).exec();    
            if(role == null) {
                var rs = await RoleModel.create({
                    roleName: roleName
                });

                return rs != null ? res.status(200).json({
                    statusCode: 200,
                    message: "Successfully!"
                }) : res.status(204).json({
                    statusCode: 204,
                    message: "Create role unsuccessfully!"
                })
            }
            return res.status(404).json({
                statusCode: 404,
                message: "Role has created"
            })
        } catch(error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message
            })
        }
    }

    async GetAll(req,res,next) {
        try {
            const role = await RoleModel.find({
                deleted: false
            }).exec();    
            console.log(role);
            return role != null ? res.status(200).json({
                statusCode: 200,
                data: role,
                message: "Successfully!"
            }) : res.status(204).json({
                statusCode: 204,
                message: "get role unsuccessfully!"
            })
        } catch(error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message
            })
        }
    }

    async UpdateRole(req,res,next) {
        try {
            let roleNew = new RoleModel(req.body)
            roleNew.updateat = Date.now;
            const role = await RoleModel.findByIdAndUpdate(roleNew._id,roleNew).exec();    
            return role != null ? res.status(200).json({
                statusCode: 200,
                data: role,
                message: "Successfully!"
            }) : res.status(204).json({
                statusCode: 204,
                message: "Update unsuccessfully!"
            })
        } catch(error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message
            })
        }
    }
    

}

export default RoleController