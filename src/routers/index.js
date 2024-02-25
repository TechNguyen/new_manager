import AuthRouter from "./auth.router.js"
import RoleRouter from "./role.router.js"
import BlogRouter from "./blog.router.js"
import TopicRouter from './topic.router.js'
import ProfileRouter from './profille.router.js'
function Route(app) {
    app.use('/api/v1/auth', AuthRouter)
    app.use('/api/v1/role', RoleRouter)
    app.use('/api/v1/blog', BlogRouter)
    app.use('/api/v1/topic', TopicRouter)
    app.use('/api/v1/profile', ProfileRouter)
}
export default Route