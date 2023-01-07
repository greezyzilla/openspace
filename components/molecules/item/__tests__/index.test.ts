import LeaderboardItem from '../leaderboardItem';
import UserItem from '../userItem';
import SidebarItem from '../sidebarItem';
import * as exported from '..';

test('Should export the same leaderboard item and should be defined', () => {
  expect(LeaderboardItem).toBeDefined();
  expect(exported.LeaderboardItem).toBeDefined();
  expect(exported.LeaderboardItem).toStrictEqual(LeaderboardItem);
});

test('Should export the same user item and should be defined', () => {
  expect(UserItem).toBeDefined();
  expect(exported.UserItem).toBeDefined();
  expect(exported.UserItem).toStrictEqual(UserItem);
});

test('Should export the same sidebar item and should be defined', () => {
  expect(SidebarItem).toBeDefined();
  expect(exported.SidebarItem).toBeDefined();
  expect(exported.SidebarItem).toStrictEqual(SidebarItem);
});
