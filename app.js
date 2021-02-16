const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

const init = async () => {
  try {
    await server.start();
    console.log('Server started...');
    console.log(server.info);
  } catch (error) {
    console.log(error);
  }
};

init();