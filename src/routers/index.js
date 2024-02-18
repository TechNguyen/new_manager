import AuthRouter from "./auth.router.js"
import RoleRouter from "./role.router.js"
import ProductRouter from "./product.router.js"
function Route(app) {
    app.use('/api/v1/auth', AuthRouter)
    app.use('/api/v1/role', RoleRouter)
    app.use('/api/v1/product', ProductRouter )
}
export default Route