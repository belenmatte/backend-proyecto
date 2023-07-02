const Router = require('koa-router');
const users = require('./routes/users');
const start = require('./routes/start');
const turno = require('./routes/turno');
const update = require('./routes/update');
const authRoutes = require('./routes/authentication');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const scopeProtectedRoutes = require('./routes/scope');
const board = require('./routes/board');

dotenv.config();

const router = new Router();

router.use('/start', start.routes());
router.use('/turno', turno.routes());
router.use('/update', update.routes());
router.use('/board', board.routes());
router.use(authRoutes.routes());

router.use('/users', users.routes());

router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } ));
router.use('/scope', scopeProtectedRoutes.routes());


module.exports = router;
