import { Button, ToggleButton } from '../button';
import {
  InputEmail, InputPassword, InputText, InputTextarea,
} from '../input';
import Card from '../card';
import * as exported from '..';

test('Should export the same default button and should be defined', () => {
  expect(Button).toBeDefined();
  expect(exported.Button).toBeDefined();
  expect(exported.Button).toStrictEqual(Button);
});

test('Should export the same toggle button and should be defined', () => {
  expect(ToggleButton).toBeDefined();
  expect(exported.ToggleButton).toBeDefined();
  expect(exported.ToggleButton).toStrictEqual(ToggleButton);
});

test('Should export the same input text and should be defined', () => {
  expect(InputText).toBeDefined();
  expect(exported.InputText).toBeDefined();
  expect(exported.InputText).toStrictEqual(InputText);
});

test('Should export the same input email and should be defined', () => {
  expect(InputEmail).toBeDefined();
  expect(exported.InputEmail).toBeDefined();
  expect(exported.InputEmail).toStrictEqual(InputEmail);
});

test('Should export the same input password and should be defined', () => {
  expect(InputPassword).toBeDefined();
  expect(exported.InputPassword).toBeDefined();
  expect(exported.InputPassword).toStrictEqual(InputPassword);
});

test('Should export the same input textarea and should be defined', () => {
  expect(InputTextarea).toBeDefined();
  expect(exported.InputTextarea).toBeDefined();
  expect(exported.InputTextarea).toStrictEqual(InputTextarea);
});

test('Should export the same card and should be defined', () => {
  expect(Card).toBeDefined();
  expect(exported.Card).toBeDefined();
  expect(exported.Card).toStrictEqual(Card);
});
