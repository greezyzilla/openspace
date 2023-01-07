import AddCommentForm from '../addComment';
import AddThreadForm from '../addThread';
import LoginForm from '../login';
import RegisterForm from '../register';
import * as exported from '..';

test('Should export the same comment form and should be defined', () => {
  expect(AddCommentForm).toBeDefined();
  expect(exported.AddCommentForm).toBeDefined();
  expect(exported.AddCommentForm).toStrictEqual(AddCommentForm);
});

test('Should export the same thread form and should be defined', () => {
  expect(AddThreadForm).toBeDefined();
  expect(exported.AddThreadForm).toBeDefined();
  expect(exported.AddThreadForm).toStrictEqual(AddThreadForm);
});

test('Should export the same login form and should be defined', () => {
  expect(LoginForm).toBeDefined();
  expect(exported.LoginForm).toBeDefined();
  expect(exported.LoginForm).toStrictEqual(LoginForm);
});

test('Should export the same register form and should be defined', () => {
  expect(RegisterForm).toBeDefined();
  expect(exported.RegisterForm).toBeDefined();
  expect(exported.RegisterForm).toStrictEqual(RegisterForm);
});
