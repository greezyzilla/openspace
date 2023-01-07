import useForm from '../useForm';
import useToggle from '../useToggle';
import useRequest from '../useRequest';
import { useAppDispatch, useAppSelector } from '../redux';

import * as exported from '..';

test('Should export the same useForm and should be defined', () => {
  expect(useForm).toBeDefined();
  expect(exported.useForm).toBeDefined();
  expect(exported.useForm).toStrictEqual(useForm);
});

test('Should export the same useToggle and should be defined', () => {
  expect(useToggle).toBeDefined();
  expect(exported.useToggle).toBeDefined();
  expect(exported.useToggle).toStrictEqual(useToggle);
});

test('Should export the same useRequest and should be defined', () => {
  expect(useRequest).toBeDefined();
  expect(exported.useRequest).toBeDefined();
  expect(exported.useRequest).toStrictEqual(useRequest);
});

test('Should export the same useAppDispatch and should be defined', () => {
  expect(useAppDispatch).toBeDefined();
  expect(exported.useAppDispatch).toBeDefined();
  expect(exported.useAppDispatch).toStrictEqual(useAppDispatch);
});

test('Should export the same useAppSelector and should be defined', () => {
  expect(useAppSelector).toBeDefined();
  expect(exported.useAppSelector).toBeDefined();
  expect(exported.useAppSelector).toStrictEqual(useAppSelector);
});
