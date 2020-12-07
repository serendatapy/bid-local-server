/**
 * Note: Apollo server accepts promises and knows to wait
 * for the actual result from the database,
 * which makes all the async await irrelevant in some cases
 * but to be explicit it can remain.
 */
exports.get_user_by_email = async (_, { email }, { models }) => {
  try {
    const user = await models.users.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.get_user_by_Id = async (_, { id }, { models }) => {
  try {
    const user = await models.users.findByPk(id);
    return user;
  } catch (error) {
    console.error('Error', error);
  }
};

exports.get_users = async (_, __, { models }) => {
  try {
    const users = await models.users.findAll();
    return users;
  } catch (error) {
    console.error('Error', error);
  }

};

exports.get_items = async (user, _, { models }) => {
  try {
    const items = await models.items.findAll({
      where: {
        userId: user.id
      }
    });
    return items;
  }
  catch (error) {
    console.error('Error', error);
  }

};

exports.get_address = async (user, _, { models }) => {
  try {
    const address = await models.addresses.findOne({
      where: {
        userId: user.id
      }
    });
    return address;
  }
  catch (error) {
    console.error('Error', error);
  }
};

exports.create_user = async (_, { user }, { models }) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = user;
    const userFound = await models.users.findOne({ where: { email: email } });
    if (!userFound) {
      const createdUser = await models.users.create({ email: email, password: password, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber });
      return createdUser;
    }
    else {
      return new Error('There is alreary a user with this email');
    }
  } catch (error) {
    console.error('Error', error);
  }
};

const createToken = async (user) => {
  return user.email;
};

exports.sign_up = async (_, { email, password }, { models }) => {

  const user = await models.users.create({
    email: email,
    password: password,
  });

  return { token: createToken(user) };
};

exports.delete_user = async (_, { userId }, { models }) => {
  const destroyed = await models.users.destroy({
    where: {
      id: userId
    }
  });
  if (!destroyed) {
    return false;
  }
  return true;
};

exports.update_user = async (_, { userId, user }, { models }) => {
  try {
    let userFound = await models.users.findOne({ where: { id: userId } });
    if (userFound) {
      userFound = Object.assign(userFound, user);
      await userFound.save();
      return userFound;
    }
    else {
      return new Error('User doesn\'t exist');
    }
  } catch (error) {
    console.error('Error', error);
  }
};

exports.me = async (_, __, { models, me }) => { //placeholder for login
  if (!me) return null;
  try {
    return await models.users.findByPk(me.id);
  } catch (error) {
    console.error('Error', error);
  }
};