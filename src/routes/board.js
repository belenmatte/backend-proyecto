const Router = require('koa-router');

const router = new Router();

router.get("board.getCards","/boardData",async(ctx)=>{
    try{
        // Para esta cápsula, simplemente elegiremos el unico tablero que hay,
        // ya que es el que creamos con seeds.
        // En la realidad, se debería identificar el tablero por el id del
        // Jugador y del juego.
        const boards = await ctx.orm.Boards.findAll({
            attributes: ['id'],
            include: [
                { model: ctx.orm.Cards, attributes: ['id', 'name', 'is_hidden', 'image'] }
            ],
        });
        ctx.body = boards;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;