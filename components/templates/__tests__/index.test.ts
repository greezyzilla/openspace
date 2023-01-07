import AuthTemplate from '../auth';
import DashboardTemplate from '../dashboard';
import * as exported from '..';

test('Should export the same auth template should be defined', () => {
  expect(AuthTemplate).toBeDefined();
  expect(exported.AuthTemplate).toBeDefined();
  expect(exported.AuthTemplate).toStrictEqual(AuthTemplate);
});

test('Should export the same dashboard template and should be defined', () => {
  expect(DashboardTemplate).toBeDefined();
  expect(exported.DashboardTemplate).toBeDefined();
  expect(exported.DashboardTemplate).toStrictEqual(DashboardTemplate);
});
