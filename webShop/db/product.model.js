import { DataTypes } from "sequelize";
import sequelize from "./createConnection.js";


/**
 * Table Model containing (name, price, isActive) fields.
 */
const Products = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});



export async function getAllProduct() {
    let allProduct;
    await sequelize.sync().then(async() => {
        await Products.findAll().then(res => {
            allProduct = res;
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    return allProduct;
}

export async function createProduct(productData) {
    productData.isActive = ((productData.isActive) ? 0 : 1);
    let newProduct;
    await sequelize.sync().then(async() => {
        await Products.create(productData).then(res => {
            newProduct = res;
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    return newProduct;
}
