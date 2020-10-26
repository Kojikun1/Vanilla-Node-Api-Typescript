import products from '../data/products.json';

interface Product{
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

export default { findAll, findById };