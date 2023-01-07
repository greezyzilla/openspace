import { store } from '../index';

test('should have correct reducer and middleware', () => {
  expect(store.getState().thread).toBeDefined();
  expect(store.getState().user).toBeDefined();
  expect(store.getState().auth).toBeDefined();
  expect(store.getState().loadingBar).toBeDefined();
});

it('should show loading bar when action has "pending" and hide when "fulfilled", or "rejected" suffix', () => {
  store.dispatch({ type: 'test/pending' });
  store.dispatch({ type: 'test2/pending' });
  store.dispatch({ type: 'test3/pending' });

  expect(store.getState().loadingBar).toStrictEqual({ default: 3 });

  store.dispatch({ type: 'test/fulfilled' });

  expect(store.getState().loadingBar).toStrictEqual({ default: 2 });

  store.dispatch({ type: 'test/rejected' });
  store.dispatch({ type: 'test/rejected' });

  expect(store.getState().loadingBar).toStrictEqual({ default: 0 });
});
