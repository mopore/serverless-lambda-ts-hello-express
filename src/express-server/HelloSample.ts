import { Express } from "express";
import { Magic } from "../jni/Magic";
import { Envelope } from "../jni/Envelope";

export class HelloSample {
    static applySample( app: Express ){
        app.get('/hello', ( req, resp ) => {
            Magic.hello().then( serviceResult => {
                resp.send( serviceResult );
            });
        } )
        
        app.post('/helloPost', (req, resp ) => {
            const body = req.body;
            const inputEnvelpope = body as Envelope;
            const outputEnvelope = Magic.helloWithMessage( inputEnvelpope );
            resp.send( outputEnvelope );
        });
    }
}