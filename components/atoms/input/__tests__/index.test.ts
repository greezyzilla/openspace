import Text from '../text';
import Email from '../email';
import Password from '../password';
import Textarea from '../textarea';
import * as exported from '..';

test('Should export the same input text and should be defined', () => {
  expect(Text).toBeDefined();
  expect(exported.InputText).toBeDefined();
  expect(exported.InputText).toStrictEqual(Text);
});

test('Should export the same input email and should be defined', () => {
  expect(Email).toBeDefined();
  expect(exported.InputEmail).toBeDefined();
  expect(exported.InputEmail).toStrictEqual(Email);
});

test('Should export the same input password and should be defined', () => {
  expect(Password).toBeDefined();
  expect(exported.InputPassword).toBeDefined();
  expect(exported.InputPassword).toStrictEqual(Password);
});

test('Should export the same input textarea and should be defined', () => {
  expect(Textarea).toBeDefined();
  expect(exported.InputTextarea).toBeDefined();
  expect(exported.InputTextarea).toStrictEqual(Textarea);
});
