import { server } from "./server";

const PORT = 80;
server.listen( PORT, () => console.info( `Listening to the port ${PORT}...`) );