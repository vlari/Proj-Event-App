import Collection from '../src/db/models/collection';

export const getSavedEvents = async (user) => {
  const collection = await Collection.findOne({ userId: user._id });
  return collection;
};