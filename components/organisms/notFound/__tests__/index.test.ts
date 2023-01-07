import PageNotFound from '../page';
import ThreadNotFound from '../thread';
import * as exported from '..';

test('Should export the same page 404 and should be defined', () => {
  expect(PageNotFound).toBeDefined();
  expect(exported.PageNotFound).toBeDefined();
  expect(exported.PageNotFound).toStrictEqual(PageNotFound);
});

test('Should export the same thread 404 and should be defined', () => {
  expect(ThreadNotFound).toBeDefined();
  expect(exported.ThreadNotFound).toBeDefined();
  expect(exported.ThreadNotFound).toStrictEqual(ThreadNotFound);
});
