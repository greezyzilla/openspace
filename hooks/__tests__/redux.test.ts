import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux';

test('Should export the same useDispatch and should be defined', () => {
  expect(useDispatch).toBeDefined();
  expect(useAppDispatch).toBeDefined();
  expect(useAppDispatch).toStrictEqual(useDispatch);
});

test('Should export the same toggle button and should be defined', () => {
  expect(useSelector).toBeDefined();
  expect(useAppSelector).toBeDefined();
  expect(useAppSelector).toStrictEqual(useSelector);
});
