import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useToggle from '../useToggle';

test('Should make useToggle work correctly', () => {
  const { result } = renderHook(() => useToggle(false));
  const [data, toggle, setTrue, setFalse] = result.current;
  const initialData = data;

  act(() => toggle());

  const toggledData1 = result.current[0];

  act(() => toggle());

  const toggledData2 = result.current[0];

  act(() => setTrue());

  const setTrueData = result.current[0];

  act(() => setFalse());

  const setFalseData = result.current[0];

  expect(initialData).toBe(false);
  expect(toggledData1).toBe(true);
  expect(toggledData2).toBe(false);
  expect(setTrueData).toBe(true);
  expect(setFalseData).toBe(false);
});
