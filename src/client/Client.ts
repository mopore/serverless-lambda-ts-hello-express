import fetch from "node-fetch"
import { Envelope } from "../jni/Envelope";
const AWS_LAMBDA_DEV_URL = 'https://h9tjoj77w4.execute-api.eu-central-1.amazonaws.com/dev';
const LOCAL_EXPRESS_URL = 'http://localhost';
const selectedEnv = AWS_LAMBDA_DEV_URL;
const url = `${selectedEnv}/helloPost`;

class Client {
    async callLambda(): Promise<void> {
        const inEnvelope: Envelope = {
            simpleMessage: 'Hello from client'
        }
        const json = await fetch( url, {
            method: 'post',
            body:    JSON.stringify( inEnvelope) ,
            headers: { 'Content-Type': 'application/json' },
        }).then( respone => respone.json());
        const outEnvelope: Envelope = json;
        console.info( `Response from the server-side: >>${outEnvelope.simpleMessage}<<` );
    }
}

const run = async () => {
    const c = new Client();
    console.log( 'Starting client...' );
    console.log( `Calling ${url} ...`)
    await c.callLambda();
    console.log( 'Client stopped.' );
}
run();