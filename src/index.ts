import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  return "hello world";
});

app.get("/test", async (request, reply) => {
  return "test route";
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("App running at port 3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
