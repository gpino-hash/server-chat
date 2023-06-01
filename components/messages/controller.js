
const { socket } = require('../../socket')
const store = require('./store')
const config = require('../../config')

const addMessage = (user, chat, message, file) => {

    return new Promise((resolve, reject) => {
        if (!user || !message  || !chat) {
            console.log('[message.controller] No hay usuario o mensaje o chat')
            reject('Los datos son incorrectos.')
            return false
        }

        let fileUrl = ''
        if  (file) {
          fileUrl = `${config.host}:${config.port + config.publicRoute + config.filesRoute}/' + ${file.filename}`
        }

        const fullMessage = {
            message,
            file: fileUrl,
            date: new Date,
        }
        store.add(fullMessage, chat, user)

        socket.io.emit('message', fullMessage)

        resolve("Creado correctamente")
    })
}

const getMessages = async (filterMessage) => {
    try {
      const messages = await store.list(filterMessage);
  
      return { messages };
    } catch (error) {
      console.log('Error al obtener mensajes', error);
      throw error;
    }
  };

  const getMessage = async (id) => {
    try {
      const message = await store.get(id);
      return { message };
    } catch (error) {
      console.log('Error al obtener el mensaje', error);
      throw error;
    }
  }

  const updateMessage = async (id, message) => {
    try {
      if (!id) {
        throw new Error('El ID no puede estar vacío');
      }
          
      if (!message || Object.keys(message).length === 0) {
        throw new Error('El objeto "message" no puede estar vacío');
      }

      const fullMessage = await store.get(id);
      if (!fullMessage) {
        throw new Error('No se encontró el mensaje');
      }
      return store.update(id, message);
    } catch (error) {
      console.log('Error al actualizar el mensaje', error);
      throw error;
    }
  }

  const deleteMessage = async (id) => {
    try {
      if (!id) {
        throw new Error('El ID no puede estar vacío');
      }
      const fullMessage = await store.get(id);
      if (!fullMessage) {
        throw new Error('No se encontró el mensaje');
      }

      store.delete(id);
    } catch (error) {
      console.log('Error al eliminar el mensaje', error);
      throw error;
    }
  }

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    getMessage,
    deleteMessage,
}