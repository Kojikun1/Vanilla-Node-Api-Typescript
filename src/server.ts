import http from 'http';

import ProductController from './controllers/productController';

const productController = new ProductController();

const server = http.createServer((req,res)=> {
    if(req.method === "GET"){
        /* Read List Product */
        if(req.url === '/' || req.url === "/api"){
            res.writeHead(200,{'Content-Type': "application/json"});
            res.end(JSON.stringify({description: "Api Version 1.0"}));
        }
        if(req.url === '/api/products'){
            productController.getProducts(req,res);
        }else if(req.url?.match(/\/api\/products\/([0-9]+)/)) {
            const id = req.url.split('/');
            productController.getProductsById(req,res, id[id.length -1]);
        }else{
            res.writeHead(404,{'Content-Type': "application/json"});
            res.end(JSON.stringify({message: "Not Found"}));
        }
        /* Create Product */
    }else if(req.method === 'POST') {
        if(req.url === "/api/products"){
            productController.createNewProduct(req,res);
        }else{
            res.writeHead(404,{'Content-Type': "application/json"});
            res.end(JSON.stringify({message: "Not Found"}));
        }
         
    } /* Update  Product */
    else if(req.method === 'PUT') {
        if(req.url?.match(/\/api\/products\/([0-9]+)/)){
            const id = req.url.split('/');
            productController.updateProduct(req,res,id[id.length -1]);
        }else{
            res.writeHead(404,{'Content-Type': "application/json"});
            res.end(JSON.stringify({message: "Not Found"}));
        }
         /* Delete  Product */
    }
    else if(req.method === 'DELETE'){
        if(req.url?.match(/\/api\/products\/([0-9]+)/)) {
            const url_id = req.url.split('/');
            productController.deleteProduct(req,res, url_id[url_id.length -1]);
        }else{
            res.writeHead(404,{'Content-Type': "application/json"});
            res.end(JSON.stringify({message: "Not Found"}));
        }
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Runing o PORT: ${PORT}`));

