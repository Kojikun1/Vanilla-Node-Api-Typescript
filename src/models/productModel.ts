import products from '../data/products.json';

import WriteDataToFile from '../utils/writeData'

export interface Product{
    id: string,
    name: string,
    description: string,
    price: number
}

function findAll(){
      return new Promise<Product[]>((resolve,reject)=> {
          resolve(products);
      })
}
function findById(id: string){
    return new Promise<Product>((resolve,reject)=> {
        const productById = products.find( item => item.id === id);
        resolve(productById);
    })
}
function create(product: Product){
    return new Promise<Product>((resolve,reject)=> {

        product.id = String((products.length + 1));

        products.push(product);
 
        WriteDataToFile(products);
         
        resolve(product);
    })
}
function remove(id: string){
    return new Promise<Product>((resolve,reject)=> {

        const deleted_product = products.find(item => item.id === id);

        const newProducts = products.filter(item => item.id !== id);

        WriteDataToFile(newProducts);
         
        resolve(deleted_product);
    })
}


export default { findAll, findById, create, remove };