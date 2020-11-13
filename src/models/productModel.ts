import WriteDataToFile from '../utils/writeData'
import LoadJsonData from '../utils/loadData';

export interface Product{
    id: string,
    name: string,
    description: string,
    price: number
}

function findAll(){
      
      return new Promise<Product[]>(async (resolve,reject)=> {
        const products = await LoadJsonData();
          try {
              resolve(products);
          } catch (error) {
               reject(error);
          }
      })
}
function findById(id: string){
    return new Promise<Product>(async (resolve,reject)=> {
        const products = await LoadJsonData();
        const productById = products.find( item => item.id === id);
        resolve(productById);
    })
}
function create(product: Product){
    return new Promise<Product>(async (resolve,reject)=> {

        const products = await LoadJsonData();

        product.id = String((products.length + 1));

        products.push(product);
 
        WriteDataToFile(products);
         
        resolve(product);
    })
}
function update(id: string, product: Product){
      return new Promise<Product>(async (resolve, reject) => {
        const products = await LoadJsonData();
        
        const index = products.findIndex(item => item.id === id);

        products[index] = {...product};

        WriteDataToFile(products);

        resolve(products[index]);
      })
}
function remove(id: string){
    return new Promise<{}>(async (resolve,reject)=> {

        const products = await LoadJsonData();
       try {

            const newProducts = products.filter(item => item.id !== id);

            WriteDataToFile(newProducts);
      
            resolve({message: "Succefful Deleted"});
       } catch (error) {
           reject(error);
       }
    })
}


export default { findAll, findById, create, update, remove };