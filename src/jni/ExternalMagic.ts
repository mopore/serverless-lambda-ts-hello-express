import fs from "fs";
import fetch from "node-fetch";

export class ExternalMagic {
    static async do(): Promise<string> {
        let result: string;
        const filepath = './config/test.yaml';
        const fileExists = fs.existsSync( filepath );
        if ( fileExists ) 
            result = fs.readFileSync( filepath ).toString();
        else {
            result = `<File not found>`;
        }

        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        const webCall = await fetch( url )
        .then( respone => respone.json());

        return `Content from file: ${result}, content from webcall: ${webCall.title}`;
    }
}