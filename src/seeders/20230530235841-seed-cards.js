module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Cards', [
    {
      name: 'coni',
      board_id: null,
      position: 1,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/UNA.jpeg"
    },
    {
      name: 'blanca',
      board_id: null,
      position: 2,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/DOS.jpeg"
    },
    {
      name: 'mp',
      board_id: null,
      position: 3,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/TRES.jpeg"
    },
    {
      name: 'berni',
      board_id: null,
      position: 4,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/CUATRO.jpeg"
    },
    {
      name: 'eli',
      board_id: null,
      position: 5,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/CINCO.jpeg"
    },
    {
      name: 'joso',
      board_id: null,
      position: 6,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/SEIS.jpeg"
    },
    {
      name: 'laura',
      board_id: null,
      position: 7,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/SIETE.jpeg"
    },
    {
      name: 'jo',
      board_id: null,
      position: 8,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/OCHO.jpeg"
    },
    {
      name: 'mp',
      board_id: null,
      position: 9,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/TRES.jpeg"
    },
    {
      name: 'laura',
      board_id: null,
      position: 10,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/SIETE.jpeg"
    },
    {
      name: 'blanca',
      board_id: null,
      position: 11,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/DOS.jpeg"
    },
    {
      name: 'eli',
      board_id: null,
      position: 12,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/CINCO.jpeg"
    },
    {
      name: 'joso',
      board_id: null,
      position: 13,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/SEIS.jpeg"
    },
    {
      name: 'jo',
      board_id: null,
      position: 14,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/OCHO.jpeg"
    },
    {
      name: 'berni',
      board_id: null,
      position: 15,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/CUATRO.jpeg"
    },
    {
      name: 'coni',
      board_id: null,
      position: 16,
      is_chosen: false,
      is_hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "/UNA.jpeg"
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cards', null, {}),
};
