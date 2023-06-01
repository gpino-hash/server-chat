const { connectToMongoDB } = require('../../db');
const { ObjectId } = require('mongodb');

const nameCollection = 'chats';

const addChat = async (users) => {
    try {
      const db = await connectToMongoDB();
      const userIds = users.map(userId => new ObjectId(userId));
      const chat = { users: userIds };
      const result = await db.collection(nameCollection).insertOne(chat);
      console.log('Chat creado:', result.insertedId);
    } catch (error) {
      console.log('Error al crear el chat', error);
    }
  };

  const getChats = async (userId) => {
    try {
      const db = await connectToMongoDB();
      
      const chats = await db.collection(nameCollection).aggregate([
        {
          $match: { users: new ObjectId(userId) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: '_id',
            as: 'users'
          }
        },
        {
          $project: {
            _id: 1,
            users: 1
          }
        }
      ]).toArray();
  
      return chats;
    } catch (error) {
      console.log('Error al obtener chats', error);
    }
  }

const updateChat = async (id, chat) => {
  try {
    const db = await connectToMongoDB();
    const objectId = new ObjectId(id);
    await db.collection(nameCollection).updateOne({ _id: objectId }, { $set: chat } );
    console.log('Chat actualizado');
  } catch (error) {
    console.log('Error al actualizar el chat', error);
  }
};

const deleteMessage = async (id) => {
  try {
    const db = await connectToMongoDB();
    const objectId = new ObjectId(id);
    await db.collection(nameCollection).deleteOne({ _id: objectId });
    console.log('Mensaje eliminado');
  } catch (error) {
    console.log('Error al eliminar el mensaje', error);
  }
};

module.exports = {
  add: addChat,
  list: getChats,
  update: updateChat,
  delete: deleteMessage,
};