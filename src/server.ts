import http from 'http';

import ProductController from './controllers/productController';

const productController = new ProductController();

const server = http.createServer((req,res)=> {
    if(req.method === "GET"){
 
        if(req.url === '/'){
            res.writeHead(200,{'Content-Type': "application/json"});
            res.end(JSON.stringify({description: "Api Version 1.0"}));
        }
        if(req.url === '/api/products'){
            productController.getProducts(req,res);
        }else if(req.url?.match(/\/api\/products\/([0-9]+)/)) {
            const id = req.url.split('/');
            productController.getProductsById(req,res, id[id.length -1]);
        }
    }
    else{
        res.writeHead(404,{'Content-Type': "application/json"});
        res.end(JSON.stringify({message: "Not Found"}));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Runing o PORT: ${PORT}`));

