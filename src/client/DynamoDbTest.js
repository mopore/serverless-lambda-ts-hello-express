// Load the AWS SDK for Node.js
var aws = require('aws-sdk');

async function runAsync(){

    console.log( "Starting..." );

    const tableName = 'test2';

    const db = new aws.DynamoDB.DocumentClient({
        accessKeyId: 'AK',
        secretAccessKey: 'aAK',
        region: 'eu-central-1',
    })
    
    const dynamo = {
    
        get: async (key) => {
            
            const params = {
                TableName: tableName,
                Key: {
                    path: key
                }
            };
    
            const x = await db.get(params).promise();
            return x.Item;
        },

        getFromWorld: async (world) => {

            const params = {
                TableName: tableName,
                FilterExpression: "world = :w",
                ExpressionAttributeValues: {
                    ":w": world
                }
            };

            const x = await db.scan(params).promise();
            return x.Items;

        },

        all: async () => {

            const params = {
                TableName: tableName,
            };

            const x = await db.scan(params).promise();
            return x.Items;

        },

        put: async ( pathData ) => {

            const params = {
                TableName: tableName,
                Item: pathData             
            };

            const x = await db.put(params).promise();
            return x.Items;
        },

        delete: async (key) => {
            
            const params = {
                TableName: tableName,
                Key: {
                    path: key
                }
            };
    
            await db.delete(params).promise();
        },
    };

    console.log("Testing all");
    let pathDatas = await dynamo.all();
    pathDatas.forEach(pathData => {
        printPathData( pathData );
    });

    console.log("Testing get /salaries/2019/04/Ahmed-Hasnaoui.pdf");
    let pathData = await dynamo.get("/salaries/2019/04/Ahmed-Hasnaoui.pdf");
    printPathData( pathData );

    console.log("Testing get from world CH Dev");
    pathDatas = await dynamo.getFromWorld('CH Dev');
    pathDatas.forEach(pathData => {
        printPathData( pathData );
    });

    console.log("Testing putting new path data for UK Dev");
    const pathKey = "/sample";

    const info = {"name":"Jens","salary":5};
    const infos = [info];
    const infosJson = JSON.stringify(infos);

    const newPathData = {
        path: pathKey,
        world: "UK Dev",
        version: "1.0",
        data: infosJson
    }
    await dynamo.put( newPathData );

    console.log("Testing get from world UK Dev");
    pathDatas = await dynamo.getFromWorld('UK Dev');
    pathDatas.forEach(pathData => {
        printPathData( pathData );
    });

    console.log("Testing putting delete path data here created");
    await dynamo.delete( pathKey );

    console.log("Testing get from world UK Dev");
    pathDatas = await dynamo.getFromWorld('UK Dev');
    pathDatas.forEach(pathData => {
        printPathData( pathData );
    });


};


function printPathData( pathData ){
    const infos = JSON.parse( pathData.data );
    infos.forEach(info => {
        console.log( `${pathData.world}, "${pathData.path}": ${JSON.stringify(info)}` );        
    });
}

runAsync();
