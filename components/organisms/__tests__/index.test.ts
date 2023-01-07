import { PageNotFound, ThreadNotFound } from '../notFound';
import { LeftSidebar, RightSidebar } from '../sidebar';
import ThreadDetails from '../details';
import Header from '../header';
import Leaderboards from '../leaderboards';
import Threads from '../threads';
import * as exported from '..';

test('Should export the same page not found and should be defined', () => {
  expect(PageNotFound).toBeDefined();
  expect(exported.PageNotFound).toBeDefined();
  expect(exported.PageNotFound).toStrictEqual(PageNotFound);
});

test('Should export the same thread not found and should be defined', () => {
  expect(ThreadNotFound).toBeDefined();
  expect(exported.ThreadNotFound).toBeDefined();
  expect(exported.ThreadNotFound).toStrictEqual(ThreadNotFound);
});

test('Should export the same left sidebar and should be defined', () => {
  expect(LeftSidebar).toBeDefined();
  expect(exported.LeftSidebar).toBeDefined();
  expect(exported.LeftSidebar).toStrictEqual(LeftSidebar);
});

test('Should export the same right sidebar and should be defined', () => {
  expect(RightSidebar).toBeDefined();
  expect(exported.RightSidebar).toBeDefined();
  expect(exported.RightSidebar).toStrictEqual(RightSidebar);
});

test('Should export the same thread detail and should be defined', () => {
  expect(ThreadDetails).toBeDefined();
  expect(exported.ThreadDetails).toBeDefined();
  expect(exported.ThreadDetails).toStrictEqual(ThreadDetails);
});

test('Should export the same header and should be defined', () => {
  expect(Header).toBeDefined();
  expect(exported.Header).toBeDefined();
  expect(exported.Header).toStrictEqual(Header);
});

test('Should export the same leaderboards and should be defined', () => {
  expect(Leaderboards).toBeDefined();
  expect(exported.Leaderboards).toBeDefined();
  expect(exported.Leaderboards).toStrictEqual(Leaderboards);
});

test('Should export the same threads and should be defined', () => {
  expect(Threads).toBeDefined();
  expect(exported.Threads).toBeDefined();
  expect(exported.Threads).toStrictEqual(Threads);
});
