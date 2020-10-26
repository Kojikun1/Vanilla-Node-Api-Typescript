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

export default { findAll };