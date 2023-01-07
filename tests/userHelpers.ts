import { Owner, User } from '../features/user/user.interface';

export const createOwner = ({
  id, avatar, name,
}: Partial<Owner> = {}, index = 1) => ({
  id: id || `user-${index}`,
  avatar: avatar || 'https://via.placeholder.com/150',
  name: name || `User ke-${index}`,
});

export const createUser = ({
  id, avatar, email, name,
}: Partial<User> = {}, index = 1) => ({
  ...createOwner({ id, avatar, name }, index),
  email: email || `user${index}@mail.test`,
});
