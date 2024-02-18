import multer from "multer";
import ProductModel from "../../model/Product.model.js"
import imagesProductModel from "../../model/imagesproduct.model.js"
import Common from "../../../Helper/Common.js";
import excel from 'exceljs'
var commonjs = new Common();
 
class ProductController {
    async GetProductbyPage(req,res,next) {
        try {
            let { pageSize , pageIndex} = req.query
            const totalPage = await ProductModel.countDocuments({deleted: false});
            if((pageSize * 1) <= 0 || !Boolean(pageSize)) {
                pageSize = 10;
            }
            if((pageIndex * 1) <= 0 || !Boolean(pageIndex)) {
                pageIndex = 1;
            }
            if(pageIndex != null && pageSize != null) {
                var list = await ProductModel.find({deleted: false}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                return res.status(200).json({
                    msg: "Get products successfully!",
                    totalPage: totalPage,
                    pageSize: pageSize * 1,
                    pageIndex: pageIndex * 1,
                    products: list
                })
            }
            var list = await ProductModel.find({deleted: false}).exec();
            return res.status(200).json({
                msg: "Get products successfully!",
                totalPage: totalPage,
                pageSize: pageSize * 1,
                pageIndex: pageIndex * 1,
                products: list
            })
        } catch (error) {
            return res.json(500).status({
                msg: error.message
            })
        }
    }
    async CreatePro(req,res,next) {
        try {
            const ProductMD = new ProductModel(req.body);
            const rs = await ProductModel.create(ProductMD);
            return res.status(ts)
        } catch (error) {
            return res.json(500).status({
                msg: error.message
            })
        }
    }
    async Update(req,res,next) {
        try {
            const id = req.query.id;
            const data = req.body
            const updatePro = await ProductModel.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            }).exec();
            updatePro.updated = true;
            updatePro.updateAt = Date.now();
            await updatePro.save();
            return res.status(203).json(updatePro)
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async DeleteSoft(req,res,next) {
        try {
            const id = req.query.id;
            const updatePro = await ProductModel.findByIdAndUpdate(id, {
                new: true,
                runValidators: true,
            }).exec();
            updatePro.updateAt = Date.now();
            updatePro.deleteAt = Date.now();
            updatePro.deleted = true;
            await updatePro.save();
            return res.status(204).json(updatePro)
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async Delete(req,res,next) {
        try {
            const id = req.query.id;
            const pro =  await  ProductModel.findById(id).exec();
            if(pro == null) {
                return res.status(202).json({
                    msg: "Not exists product"
                })
            }
            await ProductModel.findByIdAndRemove(id, {
                new: true,
                runValidators: true,
            }).exec();
            const proDelete = await ProductModel.findById(id).exec();
            return proDelete == null ? res.status(202).json({
                msg: "Delete product successfully!",
            }) : res.status(401).json({
                msg: "Delete product unsuccessfully!",
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async ImportProduct(req,res,next) {
        try {
            const filePath = req.file.path
            const dataJson = commonjs.importExceltoMongo(filePath, "Sheet1");
            var rs = await ProductModel.insertMany(dataJson["Sheet1"])
            return rs.length == dataJson["Sheet1"].length ? res.status(200).json({
                status: 200,
                msg: "Import excel successfully!"
            }) :  res.status(203).json({
                status: 203,
                msg: "Import excel unsuccessfully!"
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async ExportProduct(req,res,next) {
        try {
            let workbook = new excel.Workbook();
            let worksheet  = workbook.addWorksheet("Products");
            //config
            worksheet.columns = [
                {header: "Tên sản phẩm", key: "productName", width: 5},
                 {key: "quanlity", header: "Số lượng", width: 5 },
                 {key: "price", header: "Gía thành", width: 5},
                 {key: "description", header: "Mô tả", width: 5},
                 {key: "user_manual", header: "Hướng dẫn sử dụng", width: 5},
                 {key: "Ingredient", header: "Thành phần", width: 5},
                 {key: "Preserve", header: "Bảo quản", width: 5},
                 {key: "brandId", header: "Mã thương hiệu", width: 5},
                 {key: "origin", header: "Xuất xứ", width: 5},
                 {key: "views", header: "Lượt xem", width: 5},
                 {key: "EvaluteCount", header: "Đánh giá", width: 10},
                 {key: "InputDay_warehouse", header: "Ngày nhập kho", width: 10},
                 {key: "package", header: "Đơn vị", width: 10},
                 {key: "createAt", header: "Ngày tạo", width: 10 },
                 {key: "updateAt", header: "Ngày cập nhật", width: 10},
            ]


            //get all product
            const listProduct = await ProductModel.find({deleted: false}).exec(); 
            worksheet.addRows(listProduct);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); 
            res.setHeader("Content-Disposition", "attachment; filename=" + "Products.xlsx");

            return workbook.xlsx.write(res).then(() => 
                res.status(200).end()
            )
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }


    async UploadImages(req,res,next) {
        try {
                        
        } catch(error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
}


export default ProductController