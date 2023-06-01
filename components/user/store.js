const { connectToMongoDB } = require('../../db');
const { ObjectId } = require('mongodb');

const nameCollection = 'users';

const addUser = async (user) => {
    try {
      const db = await connectToMongoDB();
      const result = await db.collection(nameCollection).insertOne(user);
      console.log('Mensaje creado:', result.insertedId);
    } catch (error) {
      console.log('Error al crear el mensaje', error);
    }
  };
  
  const getUsers = async (filterUser) => {
    try {
      let filter = filterUser ? { user: new RegExp(filterUser, "i") } : {};
      const db = await connectToMongoDB();
      return await db.collection(nameCollection).find(filter).toArray();
    } catch (error) {
      console.log('Error al obtener usuarios', error);
    }
  };
  
  const getUser = async (id) => {
    try {
      const db = await connectToMongoDB();
      const objectId = new ObjectId(id);
      return await db.collection(nameCollection).findOne({ _id: objectId });
    } catch (error) {
      console.log('Error al obtener el usuario', error);
    }
  };
  
  const updateUser = async (id, message) => {
    try {
      const db = await connectToMongoDB();
      const objectId = new ObjectId(id);
      await db.collection(nameCollection).updateOne({ _id: objectId }, { $set: message } );
      console.log('Usuario actualizado');
    } catch (error) {
      console.log('Error al actualizar el usuario', error);
    }
  };

module.exports = {
    add: addUser,
    list: getUsers,
    update: updateUser,
    get: getUser,
}