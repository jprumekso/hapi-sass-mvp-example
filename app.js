const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

const stores = [
  {
    id: 1,
    name: "JoeTech Store 1",
    address: "East Java, Indonesia",
  },
  {
    id: 2,
    name: "JoeTech Store 2",
    address: "Lombok, Indonesia",
  },
  {
    id: 3,
    name: "JoeTech Store 2",
    address: "Bali, Indonesia",
  },
];

server.route({
  method: "GET",
  path: "/test",
  handler () {
    console.log("it works...");
    return "OK";
  },
});

server.route({
  method: "GET",
  path: "/api/stores",
  handler (req) {
    const { name } = req.query;

    if (name) {
      return stores.filter((store) => store.name == name);
    }

    return stores;
  },
});

server.route({
  method: "GET",
  path: "/api/stores/{id}",
  handler (req) {
    const { id } = req.params;
    return stores.find((store) => store.id === id);
  },
});

server.route({
  method: "POST",
  path: "/api/stores",
  handler (req) {
    const newStore = {
      id: stores.length + 1,
      name: req.payload.name,
      address: req.payload.address,
    };

    stores.push(newStore);

    return newStore;
  },
});

server.route({
  method: "PUT",
  path: "/api/stores/{id}",
  handler (req) {
    const { id } = req.params;

    const theStore = stores.find((store) => store.id === parseInt(id));

    theStore.name = req.payload.name;
    theStore.address = req.payload.address;

    return theStore;
  },
});

const init = async () => {
  try {
    await server.start();
    console.log("Server started...");
    console.log(server.info);
  } catch (error) {
    console.log(error);
  }
};

init();