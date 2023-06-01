const { connectToMongoDB } = require('../../db');
const { ObjectId } = require('mongodb');

const nameCollection = 'messages';

const addMessage = async (message) => {
  try {
    const db = await connectToMongoDB();
    const result = await db.collection(nameCollection).insertOne(message);
    console.log('Mensaje creado:', result.insertedId);
  } catch (error) {
    console.log('Error al crear el mensaje', error);
  }
};

const getMessages = async (filterMessage) => {
  try {
    let filter = filterMessage ? {chatId: new ObjectId(filterMessage)} : {};
    const db = await connectToMongoDB()
    const messages = await db.collection(nameCollection).find(filter).toArray()

    const userIds = messages.map(message => message.userId)
    const chatIds = messages.map(message => message.chatId)

    const users = await db.collection('users').find({ _id: { $in: userIds } }).toArray()
    const chats = await db.collection('chats').find({ _id: { $in: chatIds } }).toArray()

    return messages.map(message => {
      const user = users.find(user => user._id.equals(message.userId))
      const chat = chats.find(chat => chat._id.equals(message.chatId))
      return { ...message, user, chat }
    });

  } catch (error) {
    console.log('Error al obtener mensajes', error)
  }
};

const getMessage = async (id) => {
  try {
    const db = await connectToMongoDB();
    const objectId = new ObjectId(id);
    return await db.collection(nameCollection).findOne({ _id: objectId });
  } catch (error) {
    console.log('Error al obtener el mensaje', error);
  }
};

const updateMessage = async (id, message) => {
  try {
    const db = await connectToMongoDB();
    const objectId = new ObjectId(id);
    await db.collection(nameCollection).updateOne({ _id: objectId }, { $set: message } );
    console.log('Mensaje actualizado');
  } catch (error) {
    console.log('Error al actualizar el mensaje', error);
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
  add: addMessage,
  list: getMessages,
  get: getMessage,
  update: updateMessage,
  delete: deleteMessage,
};