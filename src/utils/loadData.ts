import fs from 'fs';
import path from 'path';

import { Product } from '../models/productModel';

function LoadJsonData() {
    return new Promise<Product[]>((resolve, reject) => {
        try {
            const data = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),
                'utf8');
            resolve(JSON.parse(data));
        } catch (error) {
            console.log(error);
        }
    })
}


export default LoadJsonData;