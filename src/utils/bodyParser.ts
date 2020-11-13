import {IncomingMessage } from 'http';

function bodyParser(req: IncomingMessage){
     return new Promise<string>((resolve,reject) => {
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end',()=> {
                resolve(body);
            });
        } catch (error) {
              reject(error);
        }
   })
}

export default bodyParser;