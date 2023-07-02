# DOCUMENTACIÓN ENTREGA 3 MEMORY CHALLENGE

## Instrucciones para instalar las dependencias de la API.

Para comenzar, abrir una terminal en la carpeta backend del proyecto y asegurarse de instalar las dependencias ejecutando el comando **yarn install** (De no funcionar, seguir las instrucciones del SetUp inicial del curso). Esto permitirá que se puedan utilizar todas la dependencias del proyecto incluidas en el archivo package.json, como koa, dotenv, sequelize, cors, jwt, bcrypt entre otras. Para corre el servidor del juego se debe correr **yarn dev**.

El backend se debe correr antes que el frontend.

## Instrucciones para levantar la base de datos.

Para poder levantar la base de datos, se debe crear en la carpeta src un archivo .env que contenga los siguientes datos:

- DB_HOST= localhost
- DB_NAME= memory
- DB_USER= *usuario personal de psql*
- DB_PASSWORD=  *contraseña personal de psql*
- JWT_SECRET = jwt_secret

Una vez creado el archivo, en el terminal personal se deben correr los siguientes comando para crear una base de datos y poder poblarla con los datos correspondientes al proyecto:

**yarn sequelize-cli dbcreate memory_development** : Crea la base de datos del proyecto.

**yarn sequelize-cli db:migrate** : Corre las migraciones necesarias.

**yarn sequelize-cli db:seed:all**: Corre las seeds de nuestra BDD. En este caso, las Cards del tablero serán creadas con seeds para que mantengan siempre una posición e imagen dada.

## Flujo

**1° Usuarios**

Para esta entrega, nuestros usuarios disponibles se encuentran creados en las seeds. Sin embargo, en el archivo routes/users.js se encuentran especificados hay un método hay un método get que enlista todos los usuarios. La ruta para estos dos métodos es la siguiente:

Ruta: `http://localhost:3000/user` 

Para poder ver la información de un usuario en específico se tiene un método GET con la siguiente ruta, donde id es el id del usuario a buscar

Ruta: `http://localhost:3000/user/id`

**2° Inicialización**

Cuando un usuario ingrese al juego, se llamará a un método POST al backend para crear un Game con sus tres jugadores y toda la información correspondiente al juego. Este método recibe un {id_user}.

Ruta: `http://localhost:3000/start`

El método POST se encargará de ir actualizando la cantidad de jugadores que desean jugar. Cuando esta cantidad sea exactamente 3, el juego se creará, creando a su vez un tablero, asignando posiciones aleatorias a las Cards y id's propios del juego a cada jugador. 

En caso de estar listo el juego para comenzar, se retornará en consola el mensaje 'El juego ha comenzado'.
En caso de que aún no se hayan conectado 3 jugadores y el juego siga esperando para ser creado, se retornará el mensaje 'Esperando la conexión de más jugadores' .

**3° Turnos y actualización de información**

Cuando un jugador selecciona 2 Cards en su turno, se envía un método POST del frontend al backend, al archivo routes/turno.js, con el id del jugador (Cada Game tiene 3 jugadores con un id respectivo) y los id de las Cards seleccionadas. Este método recibe {idCarta1, idCarta2}, siendo idCarta2 el id de la primera carta seleccionada e id Carta2 el id de la segunda carta seleccionada.

Ruta: `http://localhost:3000/turno`

Una vez recibida la información, en el método POST se verifica si estas Cards son iguales o no. En caso de serlo, al jugador se le asigna un punto, y se actualizan los valores de los atributos del Game, como el status (cambiando a FALSE cuando se acaban las Cards en pantalla), los puntajes de los jugadores, el winner (Cuando lo hay, sino es 0), las cartas que se deben dejar de mostrar en el frontend porque las han encontrado y si el jugador adivinó o no. Además, se llama a una función **siguienteJugador**, que nos entregará el id del siguiente jugador en turno.

Se envía al frontend si el usuario adivinó o no y el siguiente jugador.

Además, existe un método GET en el route update.js, que se encarga de recibir el id de un juego, y retornar los valores actualizados de los puntajes de los jugadores, el estado del juego, un posible ganador y el estado de las cartas (si se deben mostrar o no), para poder obtenerlos en cualquier minuto. Esta información se envía al frontend para poder actualizar las respectivas pestañas de los jugadores según corresponda. 

Ruta: `http://localhost:3000/update/id`, donde id es el id de una partida de juego.

**4° Inicio de sesión y registro de usuario**

Cuando un usuario inicia sesión se llamará a un método POST al backend para verificar si el mail y la contraseña ingresada se encuentran en la base de datos y cumple con el formato requerido. Este método recibe {email, password}.

Ruta: `http://localhost:3000/login`.

Si el usuario no esta registrado, puede hacerlo a través de un método POST al backend que ingresa los datos a la base de datos y deja registrado al usuario. Este método recibe {username, email, password}.

Ruta: `http://localhost:3000/signup`.

**5° Obtención de tablero y cartas asociadas**

Para poder mostrar el tablero en el frontend y asociar las cartas del frontend con los datos de la base de datos, se llama a un método GET que retorna el id del tablero de la partida que se esta jugando y un arreglo con la información necesaria de las cartas asociadas a él.

Ruta: `http://localhost:3000/board/boardData`.

**6° Verificación de protección de rutas**

Las rutas hacia los datos de un usuario y un administrador se encuentran protegidas gracias a jwt. Para verificar que esto sea cierto se utiliza un método GET que retorna un mensaje que indica si la ruta esta protegida.

Ruta: `http://localhost:3000/protecteduser`, para los usuarios.

Ruta: `http://localhost:3000/board/boardData`, para los administradores.

## Otras consideraciones

- Cuando un usuario selecciona dos tarjetas y estas son iguales (logro), van a desaparecer del tablero, quedando sus espacios vacíos.
- Modo de juego "contrareloj" fue eliminado (por el momento) por que no cumple con las restricciones de la cantidad de usuarios requeridas en el enunciado. 
