const store = require('./store')

const addUser = (user) => {

    return new Promise((resolve, reject) => {
        if (!user) {
            console.log('[user.controller] No hay usuario')
            reject('Los datos son incorrectos.')
            return false
        }

        const fullUser = {
            name: user,
            date: new Date,
        }
        store.add(fullUser)
        resolve("Creado correctamente")
    })
}

const getUsers = async (filterUser) => {
    try {
      const users = await store.list(filterUser);
  
      return { users };
    } catch (error) {
      console.log('Error al obtener usuarios', error);
      throw error;
    }
  };

  const getUser = async (id) => {
    try {
      const message = await store.get(id);
      return { message };
    } catch (error) {
      console.log('Error al obtener el chat', error);
      throw error;
    }
  }

  const updateUser = async (id, user) => {
    try {
      if (!id) {
        throw new Error('El ID no puede estar vacío');
      }
          
      if (!user || Object.keys(user).length === 0) {
        throw new Error('El objeto "user" no puede estar vacío');
      }

      const fullUser = await store.get(id);
      if (!fullUser) {
        throw new Error('No se encontró el user');
      }
      return store.update(id, user);
    } catch (error) {
      console.log('Error al actualizar el user', error);
      throw error;
    }
  }

  const deleteUser = async (id) => {
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
    addUser,
    getUsers,
    updateUser,
    getUser,
}