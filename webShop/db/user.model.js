import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./createConnection.js";


/**
 * Table Model containing (email, password) fields.
 */
const User = sequelize.define("user", {
   email: {
     type: DataTypes.STRING,
     allowNull: false
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false
   }
});



export async function createUser(userData) {
   let user;
   await sequelize.sync().then(async () => {
      await User.create(userData).then(res => {
            user = res;
         }).catch((error) => {
            console.error('Failed to create a new record : ', error);
         });
      }).catch((error) => {
         console.error('Unable to create table : ', error);
      });
   return user;
}

export async function getUserByEmail(userEmail) {
   let user;
   await sequelize.sync().then(async() => {
      await User.findOne({
         where: {
            email: userEmail
         }
      }).then(res => {
         user = res;
         }).catch((error) => {
            console.error('Failed to get a record : ', error);
         });
      }).catch((error) => {
         console.error('Unable to get table : ', error);
      });
   return user;
}
