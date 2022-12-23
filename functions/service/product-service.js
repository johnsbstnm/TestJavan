const https = require('https');

class ProductService {
    getProducts(productId) {
        return new Promise((resolve, reject) => {
            let url = 'https://dummyjson.com/products';
            if (productId) {
                url = `https://dummyjson.com/products/${productId}`;
            }
            https.get(url, (resp) => {
                let data = '';
                resp.on('data', (d) => {
                    data += d;
                });
                resp.on('error', (err) => reject(err.message));
                resp.on('end', () => {
                    console.log(data);
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                });
            });
        });
    }
}

module.exports = new ProductService();