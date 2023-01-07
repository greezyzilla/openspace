import userReducer from '../user';
import authReducer from '../auth';
import threadReducer from '../thread';
import * as exported from '..';

test('Should export the same user reducer and should be defined', () => {
  expect(userReducer).toBeDefined();
  expect(exported.userReducer).toBeDefined();
  expect(exported.userReducer).toStrictEqual(userReducer);
});

test('Should export the same authentication reducer and should be defined', () => {
  expect(authReducer).toBeDefined();
  expect(exported.authReducer).toBeDefined();
  expect(exported.authReducer).toStrictEqual(authReducer);
});

test('Should export the same thread reducer and should be defined', () => {
  expect(threadReducer).toBeDefined();
  expect(exported.threadReducer).toBeDefined();
  expect(exported.threadReducer).toStrictEqual(threadReducer);
});
