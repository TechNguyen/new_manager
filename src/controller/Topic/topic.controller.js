import TopicModel from "../../model/Topic.model.js";

class TopicController {
    async GetTopic(req,res,next){
        try {
            const count = (await TopicModel.countDocuments().exec());
            var rs = await TopicModel.find({
                delete: false
            }).exec()
            return res.status(200).json({
                msg: "Get topic successfully!",
                count: count,
                data: rs
            })
        } catch(error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async CreateTopic(req,res,next){
        try {
            const topic = new TopicModel(req.body);
            var rs = await TopicModel.create(topic)
            return res.status(200).json({
                msg: "Create topic successfully!",
                topic: rs
            })
        } catch(error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async FindTopicById(req,res,next){
        try{
            let id =  req.params.id;
            const topic = await TopicModel.findById(id).exec();
            return topic != null ? res.status(200).json({
                msg: " Get the message succesfully!",
                data: topic
            }) : res.status(204).json({
                msg: "Not exits data"
            })
        } catch(error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async UpdateTopics(req,res,next){
        try{
            let id = req.query.id;
            const topic = await TopicModel.findByIdAndUpdate(id).exec();
            return topic != null ? res.status(200).json({
                msg: " Get the message succesfully!",
                data: topic
            }) : res.status(204).json({
                msg: "Not exits data"
            })
        } catch(error) {
            return res.status(500).json({
                msg: error
            })
        }
    }
    async DeleteTopic(req,res,next){
        try{
            let id =  req.params.id;
            const topic = await TopicModel.findByIdAndDelete(id).exec();
            return topic != null ? res.status(200).json({
                msg: "Delete succesfully!",
                data: topic,
                status: 200
            }) : res.status(204).json({
                msg: "Not exits topic",
                status: 204
            })
        } catch(error) {
            return res.status(500).json({
                msg: error,
                status: 500
            })
        }
    }

    async SearchTopic(topicId){
        try{
            const topic = await TopicModel.findOne({
                _id: topicId
            }).exec();
            return topic != null ? topic : null;
        } catch(error) {
            return null;
        }
    }
}


export default TopicController