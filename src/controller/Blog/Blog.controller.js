import multer from "multer";
import BlogModel from "../../model/Blog.model.js"
import redis from 'redis'




  
class BlogController {
    async GetBlogbyPage(req,res,next) {
        try {
            let { pageSize , pageIndex} = req.query
            const total = await BlogModel.countDocuments({deleted: false});
            if((pageSize * 1) <= 0 || !Boolean(pageSize)) {
                pageSize = 10;
            }
            if((pageIndex * 1) <= 0 || !Boolean(pageIndex)) {
                pageIndex = 1;
            }
            if(pageIndex != null && pageSize != null) {
                var list = await BlogModel.find({deleted: false}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                return res.status(200).json({
                    msg: "Get blogs successfully!",
                    total: total,
                    pageSize: pageSize * 1,
                    pageIndex: pageIndex * 1,
                    products: list
                })
            }
            var list = await BlogModel.find({deleted: false}).exec();
            return res.status(200).json({
                msg: "Get products successfully!",
                total: total,
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
            let BlogMD = new BlogModel(req.body);
            let filepath = req.file.path;
            BlogMD.BlogImages = filepath;
            let rs = await BlogModel.create(BlogMD);
            return res.status(200).json({
                data: rs,
                msg: "Create blog successfully!"
            })
        } catch (error) {
            return res.json(500).status({
                msg: error.message
            })
        }
    }
    async Update(req,res,next) {
        try {
            const id = req.params.id;
            const data = req.body
            const updatePro = await BlogModel.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            }).exec();
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
            const id = req.params.id;
            console.log(id);
            let updatePro = await BlogModel.findOne({
                _id: id,
                deleted: false
            }).exec();
            if(!updatePro) {
                return res.status(203).json({
                    msg: "Not exits product",
                })
            }
            updatePro.deleted = true;
            await updatePro.save();
            return res.status(200).json({
                msg: "Delete soft successfully",
                data: updatePro
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async Delete(req,res,next) {
        try {
            const id = req.params.id;
            const pro = await BlogModel.findById(id).exec();
            if(pro == null) {
                return res.status(202).json({
                    msg: "Not exists product"
                })
            }
            await BlogModel.findByIdAndDelete(id, {
                new: true,
                runValidators: true,
            }).exec();
            const proDelete = await BlogModel.findById(id).exec();
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
    async FindById(req,res,next) {
        try {
            const _id = req.query.id;
            // client.get(_id, async(err, cache) => {
            //     if(err) {
            //         return res.status(404).json({
            //             msg: "Error in cache"
            //         })
            //     }
            //     if(cache) {
            //         return res.status(200).json({
            //             data: JSON.parse(cachedBlog),
            //             status: 200,
            //             msg: "Get the cache successfully!"
            //         });
            //     } else {
            //         const Blog = await BlogModel.findOne(
            //             {
            //                 _id: _id,
            //                 deleted: false
            //             }
            //         ).exec();
            //         if(Blog == null) {
            //             return res.status(203).json({
            //                 msg: "Not exits blog",
            //                 status: 203
            //             })
            //         } else {
            //             client.setEx(_id, 3600,JSON.stringify(Blog))
            //             return res.status(200).json({
            //                 data: Blog,
            //                 status: 200,
            //                 msg: "Get the blog successfully!"
            //             })
            //         }
            //     }
            // })
            const Blog = await BlogModel.findOne(
                {
                    _id: _id,
                    deleted: false
                }
            ).exec();
            if(Blog == null) {
                return res.status(203).json({
                    msg: "Not exits blog",
                    status: 203
                })
            } else {
                // client.setEx(_id, 3600,JSON.stringify(Blog))
                return res.status(200).json({
                    data: Blog,
                    status: 200,
                    msg: "Get the blog successfully!"
                })
            }
        } catch(error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async FindByAccount(req,res,next) {
        try {
            const _id = req.query.AuthorId;
            const Blog = await BlogModel.findOne(
                {
                    deleted: false,
                    AuthorId: _id
                }
            ).exec();
            if(Blog == null) {
                return res.status(203).json({
                    msg: "Not exits blog",
                    status: 203
                })
            }
            return res.status(200).json({
                data: Blog,
                status: 200,
                msg: "Get the blog successfully!"
            })
        } catch(error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
}


export default BlogController