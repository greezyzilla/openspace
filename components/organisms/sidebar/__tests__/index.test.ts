import LeftSidebar from '../left';
import RightSidebar from '../right';

import * as exported from '..';

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
