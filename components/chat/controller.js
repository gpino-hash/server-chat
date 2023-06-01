const store = require('./store')

const addChat = async (users) => {
    if (!users || !Array.isArray(users)) {
        throw new Error('Invalid users');
    }

    return store.add(users);
}

const getChats = async (userId) => {
    try {
      const chats = await store.list(userId);
  
      return { chats };
    } catch (error) {
      console.log('Error al obtener chats', error);
      throw error;
    }
  };

  const updateChat = async (id, chat) => {
    try {
      if (!id) {
        throw new Error('El ID no puede estar vacío');
      }
          
      if (!chat || Object.keys(chat).length === 0) {
        throw new Error('El objeto "chat" no puede estar vacío');
      }

      const fullChat = await store.get(id);
      if (!fullChat) {
        throw new Error('No se encontró el chat');
      }
      return store.update(id, chat);
    } catch (error) {
      console.log('Error al actualizar el chat', error);
      throw error;
    }
  }

  const deleteChat = async (id) => {
    try {
      if (!id) {
        throw new Error('El ID no puede estar vacío');
      }
      const fullChat = await store.get(id);
      if (!fullChat) {
        throw new Error('No se encontró el chat');
      }

      store.delete(id);
    } catch (error) {
      console.log('Error al eliminar el chat', error);
      throw error;
    }
  }

module.exports = {
    addChat,
    getChats,
    updateChat,
    deleteChat,
}