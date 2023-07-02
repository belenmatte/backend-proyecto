const Router = require('koa-router');
const _ = require('lodash');

const router = new Router();

let gameCreado = false;

let game = null;

let player = null;

let numberPlayers = 0;

function generateRandomPositions(count) {
  const positions = _.shuffle(_.range(1, count + 1));
  return positions;
}

router.post('start', '/', async (ctx) => {
  try {
    const { id_user } = ctx.request.body;

    if (numberPlayers === 3 ) {
      gameCreado = false;
      numberPlayers = 0;
    }

    if (!gameCreado) {
      game = await ctx.orm.Games.create({
        player1_id: 0, player2_id: 0, player3_id: 0, winner: 0, status: true, number_players: 0, playing: false
      });
      gameCreado = true;
    }

    numberPlayers += 1;
    game.number_players += 1;
    await game.save();

    player = await ctx.orm.Players.create({
      user_id: id_user, game_id: game.id, points: 0, is_playing: false,
    });
    if (game.number_players === 1) {
      await ctx.orm.Players.update(
        { is_playing: true },
        { where: { id: player.id } },
      );
    }
    if (game.number_players === 1) {
      await ctx.orm.Games.update(
        { player1_id: player.id },
        { where: { id: game.id } },
      );
    } else if (game.number_players === 2) {
      await ctx.orm.Games.update(
        { player2_id: player.id },
        { where: { id: game.id } },
      );
    } else if (game.number_players === 3) {
      await ctx.orm.Games.update(
        { player3_id: player.id },
        { where: { id: game.id } },
      );
    }

    if (game.number_players === 3) {
      const cards = await ctx.orm.Cards.findAll();

      const board = await ctx.orm.Boards.create({ game_id: game.id, cards_left: cards.length });

      const randomPositions = generateRandomPositions(cards.length);

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i];
        const newPosition = randomPositions[i];

        ctx.orm.Cards.update(
          { position: newPosition, board_id: board.id, is_hidden: false },
          { where: { id: card.id } },
        );
      }

      game.playing = true;
      await game.save();

      ctx.body = { jugando: game.playing, id_juego: game.id};
      ctx.status = 200;
    } else {
      ctx.body = { jugando: game.playing, id_juego: game.id};
      ctx.status = 200;
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 500;
  }
});

module.exports = router;
