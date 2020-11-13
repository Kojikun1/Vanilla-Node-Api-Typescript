import Product from '../models/productModel';
import {IncomingMessage, ServerResponse} from 'http';

import bodyParser from '../utils/bodyParser';

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
 async createNewProduct(req: IncomingMessage, res: ServerResponse){
    try {
    const data = await bodyParser(req);

     const { name, description, price } = JSON.parse(data);

     const product = {
         id: "",
         name,
         description,
         price
     }
      const newProduct = await Product.create(product);
   
        res.writeHead(200,{'Content-Type': "application/json"});
        res.end(JSON.stringify(newProduct)); 

     } catch (error) {
         console.log(error);
     }   
 }
 async updateProduct(req: IncomingMessage, res: ServerResponse, id: string){
    try {
       const product = await Product.findById(id);

       if(!product){
        res.writeHead(404,{'Content-Type': "application/json"});
        return res.end(JSON.stringify({message: "Product not Found"})); 
     }

     const data = await bodyParser(req);

     const { name, description, price } = JSON.parse(data);

     const newproduct = {
         id,
         name: name || product.name ,
         description: description || product.description,
         price: price || product.price
     }
    const newProduct = await Product.update(id,newproduct);
   
        res.writeHead(200,{'Content-Type': "application/json"});
        res.end(JSON.stringify(newProduct)); 

     } catch (error) {
         console.log(error);
     }   
 }
 async deleteProduct(req: IncomingMessage, res: ServerResponse,id: string){
    try {
        const deleted_product = await Product.findById(id);

        if(!deleted_product){
           res.writeHead(404,{'Content-Type': "application/json"});
           return res.end(JSON.stringify({message: "Product not Found"})); 
        }

        await Product.remove(id);
  
       res.writeHead(200,{'Content-Type': "application/json"});
       return res.end(JSON.stringify({product: deleted_product, message: "Successful Delete"})); 

    } catch (error) {
        console.log(error);
    }   
}

}

export default ProductController;