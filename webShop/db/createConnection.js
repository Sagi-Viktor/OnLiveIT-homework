import { Sequelize } from "sequelize";

const init = () => {
    const sequelize = new Sequelize(
        'webshop',
        'root',
        'password',
         {
           host: 'localhost',
           dialect: 'mysql'
         }
      );
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
     }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
     });
    return sequelize;
}

export default init();
