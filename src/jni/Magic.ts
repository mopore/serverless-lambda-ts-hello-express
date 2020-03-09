import { ExternalMagic } from "./ExternalMagic";
import { Envelope } from "./Envelope";

export class Magic {
    static async hello(): Promise<string> {
        const messageFromBigMagic = await ExternalMagic.do();
        return messageFromBigMagic;
    }

    static helloWithMessage( inEnvelope: Envelope ): Envelope {
        console.info( `Request received from a client ${JSON.stringify(inEnvelope)}` );
        const newSimpleMessage = `Reflecting your message: "${inEnvelope.simpleMessage}"`;
        const outEnvelope = {
            simpleMessage: newSimpleMessage
        };
        console.info( `Response created for client ${JSON.stringify(outEnvelope)}` );
        return outEnvelope;
    }
}