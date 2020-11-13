import fs from 'fs';
import path from 'path';

function writeDataToFile(data: any) {
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),
            JSON.stringify(data),
    'utf8');
}

export default writeDataToFile