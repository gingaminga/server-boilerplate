import server from "@/app";

const PORT = server.get("port");

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
