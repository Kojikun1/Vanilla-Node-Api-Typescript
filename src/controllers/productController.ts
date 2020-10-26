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
    const products = await Product.findAll();
    try {
        const productById = products.filter( item => item.id === id);
       res.writeHead(200,{'Content-Type': "application/json"});
       res.end(JSON.stringify(productById));
    } catch (error) {
        console.log(error);
    }
 }
}

export default ProductController;