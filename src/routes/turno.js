const Router = require('koa-router');

const router = new Router();

function encontrarMayor(p1, p2, p3) {
  const max = Math.max(p1.points, p2.points, p3.points);

  if (p1.points === max) {
    return p1.id;
  } if (p2.points === max) {
    return p2.id;
  }
  return p3.id;
}

function siguienteJugador(p1, p2, p3, current) {
  console.log("entro la funcion");
  if (current.id === p1.id) {
    return p2;
  } if (current.id === p2.id) {
    return p3;
  } if (current.id === p3.id) {
    return p1;
  }

  return 0;
}

router.post('turno', '/', async (ctx) => {
  let adivino = false;
  let siguiente;
  let currentPlayer;

  try {
    const { idCarta1, idCarta2 } = ctx.request.body;

    const card1 = await ctx.orm.Cards.findOne({ where: { id: idCarta1 } });
    const card2 = await ctx.orm.Cards.findOne({ where: { id: idCarta2 } });
   
    const board = await ctx.orm.Boards.findOne({ where: { id: card1.board_id } });
    const game = await ctx.orm.Games.findOne({ where: { id: board.game_id } });
    const player1 = await ctx.orm.Players.findOne({ where: { id: game.player1_id } });
    const player2 = await ctx.orm.Players.findOne({ where: { id: game.player2_id } });
    const player3 = await ctx.orm.Players.findOne({ where: { id: game.player3_id } });

    if (player1.is_playing === true) {
      currentPlayer = player1;
    } else if (player2.is_playing === true) {
      currentPlayer = player2;
    } else if (player3.is_playing === true) {
      currentPlayer = player3;
    }

    if (game.status) {
      if (card1.name === card2.name) {
        currentPlayer.points += 1;
        await currentPlayer.save();

        card1.is_hidden = true;
        await card1.save();

        card2.is_hidden = true;
        await card2.save();

        board.cards_left -= 2;
        await board.save();

        adivino = true;

        if (board.cards_left === 0) {
          game.status = false;
          await game.save();

          game.winner = encontrarMayor(player1, player2, player3);
          await game.save();

          siguiente = siguienteJugador(player1, player2, player3, currentPlayer);
          siguiente_usuario = await ctx.orm.Users.findOne({ where: { id: siguiente.user_id } });
          nombre_siguiente = siguiente_usuario.username;

          currentPlayer.is_playing = false;
          await currentPlayer.save();

          siguiente.is_playing = true;
          await siguiente.save();



          ctx.body = {
            adivino: adivino,
            siguiente_username: nombre_siguiente,
          };
          ctx.status = 200;

          return;
        };

          siguiente = siguienteJugador(player1, player2, player3, currentPlayer);
          siguiente_usuario = await ctx.orm.Users.findOne({ where: { id: siguiente.user_id } });
          nombre_siguiente = siguiente_usuario.username;

          currentPlayer.is_playing = false;
          await currentPlayer.save();

          siguiente.is_playing = true;
          await siguiente.save();



          ctx.body = {
            adivino: adivino,
            siguiente_username: nombre_siguiente,
          };
          ctx.status = 200;

        return;
      };

        siguiente = siguienteJugador(player1, player2, player3, currentPlayer);
          siguiente_usuario = await ctx.orm.Users.findOne({ where: { id: siguiente.user_id } });
          nombre_siguiente = siguiente_usuario.username;

          currentPlayer.is_playing = false;
          await currentPlayer.save();

          siguiente.is_playing = true;
          await siguiente.save();



          ctx.body = {
            adivino: adivino,
            siguiente_username: nombre_siguiente,
          };
          ctx.status = 200;
    } else {
      ctx.body = 'El juego se terminó';
      ctx.status = 200;
    };
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
