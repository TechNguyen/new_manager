import express from 'express'
import TopicController from "../controller/Topic/topic.controller.js"

const router = express.Router();
const topic = new TopicController();

router.post('/create', topic.CreateTopic);
router.get('/get-topics', topic.GetTopic);
router.get('/:id', topic.FindTopicById);
router.put('/update/:id', topic.UpdateTopics);
router.delete('/delete/:id', topic.DeleteTopic);


export default router 