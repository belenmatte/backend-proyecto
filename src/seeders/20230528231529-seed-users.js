const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword1 = await bcrypt.hash('belen123', saltRounds);
    const hashedPassword2 = await bcrypt.hash('amelia123', saltRounds);
    const hashedPassword3 = await bcrypt.hash('macarena123$$', saltRounds);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'belenmatte',
        password: hashedPassword1,
        mail: 'belen.matte@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'ameliaiacobelli',
        password: hashedPassword2,
        mail: 'amelia.iacobelli@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'macarenaabarca',
        password: hashedPassword3,
        mail: 'maca.abarca@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

