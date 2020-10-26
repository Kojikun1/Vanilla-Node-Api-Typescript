import Product from '../models/productModel';
import {IncomingMessage, ServerResponse} from 'http';

 class ProductController {
    async getProducts(req: IncomingMessage, res: ServerResponse) {
        const products = await Product.findAll();
          try {
             res.writeHead(200,{'Content-Type': "application/json"});
             res.end(JSON.stringify(products));
          } catch (error) {
              console.log(error);
    }
 }
 async getProductsById(req: IncomingMessage, res: ServerResponse, id: string){
    const product = await Product.findById(id);

    try {
        if(!product){
            res.writeHead(404,{'Content-Type': "application/json"});
           res.end(JSON.stringify({message: "Product Not Found"}));
        }else{
            res.writeHead(200,{'Content-Type': "application/json"});
            res.end(JSON.stringify(product));
        }   
    } catch (error) {
        console.log(error);
    }
 }
}

export default ProductController;