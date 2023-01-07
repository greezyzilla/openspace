import { renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';
import useForm from '../useForm';

test('Should make useForm work correctly', () => {
  const { result } = renderHook(() => useForm({ username: '', password: '' }));
  const [data, onChange, reset] = result.current;
  const initialData = data;

  act(() => {
    onChange({ target: { name: 'username', value: 'test123' } } as ChangeEvent<HTMLInputElement>);
    onChange({ target: { name: 'password', value: 'secretsecret' } } as ChangeEvent<HTMLInputElement>);
  });

  const changedData = result.current[0];

  act(() => {
    reset();
  });

  const resettedData = result.current[0];

  expect(initialData).toStrictEqual({ username: '', password: '' });
  expect(changedData).toStrictEqual({ username: 'test123', password: 'secretsecret' });
  expect(resettedData).toStrictEqual({ username: '', password: '' });
});
