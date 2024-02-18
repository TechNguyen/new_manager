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


    

}

export default RoleController