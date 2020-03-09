import serverlessHttp from "serverless-http";
import { server } from "./src/express-server/server";

module.exports.handler = serverlessHttp( server );