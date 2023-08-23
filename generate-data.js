// const faker = require("faker")
import faker from 'faker';
const fs = require("fs");

//Set locale to use VietNamese
faker.locale = 'vi'

//Loop and push categories
const randomCategoryList = (n) => {
    if (n <= 0) return [];

    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        categoryList.push(category);
    });

    return categoryList;
}

//Loop and push product
const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) return [];

    const productList = [];

    for (const category of categoryList) {

        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryName: category.name,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            productList.push(product);
        });
    }


    return productList;
}

// IFFE

(() => {
    //random data

    const categoryList = randomCategoryList(4);

    const productList = randomProductList(categoryList, 5);

    // prepare db object
    const db = {
        categories: categoryList,
        product: productList,
        profile: {
            name: "Po",
        }
    };

    //write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("Generate data successfully ^_^");
    })
})()


