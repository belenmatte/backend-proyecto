const Router = require('koa-router');

const router = new Router();

// function siguiente(p1, p2, p3) {
//   if (p1.is_playing) {
//     return p1;
//   } if (p2.is_playing) {
//     return p2;
//   } if (p3.is_playing) {
//     return p3;
//   }

//   return 0;
// }

router.get('/:id', async (ctx) => {

  let currentPlayer;

  try {
    const id = parseInt(ctx.params.id, 10);
    const game = await ctx.orm.Games.findOne({ where: { id: id} });
    const player1 = await ctx.orm.Players.findOne({ where: { id: game.player1_id } });
    const player2 = await ctx.orm.Players.findOne({ where: { id: game.player2_id } });
    const player3 = await ctx.orm.Players.findOne({ where: { id: game.player3_id } });

    //A PARTIR DEL JUEGO QUEREMOS SABER LOS USUARIOS PARA SACAR SUS NOMBRES
    const usuario1 = await ctx.orm.Users.findOne({where: {id: player1.user_id}});
    const usuario2 = await ctx.orm.Users.findOne({where: {id: player2.user_id}});
    const usuario3 = await ctx.orm.Users.findOne({where: {id: player3.user_id}});

    const nombre1 = usuario1.username 
    const nombre2 = usuario2.username
    const nombre3 = usuario3.username

    //NOMBRE DEL USUARIO DE TURNO
    //probando con cualquiera

    if (player1.is_playing === true) {
      currentPlayer = player1;
      console.log("entro1");
    } else if (player2.is_playing === true) {
      currentPlayer = player2;
      console.log("entro2");
    } else if (player3.is_playing === true) {
      currentPlayer = player3;
      console.log("entro3");
    }

    const id_de_turno = currentPlayer.user_id;
    const usuario_de_turno = await ctx.orm.Users.findOne({where: {id: id_de_turno}});
    const nombre_de_turno = usuario_de_turno.username
    
    // const cardsHidden = await ctx.orm.Cards.findAll({ where: { is_hidden: true } });

    const pointsP1 = player1.points;
    const pointsP2 = player2.points;
    const pointsP3 = player3.points;

    const playing = game.playing;

    let username_winner;

    if (game.winner !== 0) {
      const player_winner = await ctx.orm.Players.findOne({where: {id: game.winner}});
      const user_winner = await ctx.orm.Users.findOne({where: {id: player_winner.user_id}});
      username_winner = user_winner.username;
    } else {
      username_winner = '';
    }

    ctx.body = {

      winner: username_winner,
      p1: pointsP1,
      p2: pointsP2,
      p3: pointsP3,
      status: game.status,
      current: nombre_de_turno,
      nombre1: nombre1,
      nombre2: nombre2,
      nombre3: nombre3,
      jugando: playing
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 500;
  }
});

module.exports = router;
