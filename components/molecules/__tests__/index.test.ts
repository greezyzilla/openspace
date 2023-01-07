import {
  LoginForm, RegisterForm, AddCommentForm, AddThreadForm,
} from '../form';
import { UserItem, LeaderboardItem, SidebarItem } from '../item';
import ButtonVote from '../buttonVote';
import Comment from '../comment';
import Modal from '../modal';
import Search from '../search';
import Thread from '../thread';
import UserNavigation from '../userNavigation';
import * as exported from '..';

test('Should export the same login form and should be defined', () => {
  expect(LoginForm).toBeDefined();
  expect(exported.LoginForm).toBeDefined();
  expect(exported.LoginForm).toStrictEqual(LoginForm);
});

test('Should export the same register form and should be defined', () => {
  expect(RegisterForm).toBeDefined();
  expect(exported.RegisterForm).toBeDefined();
  expect(exported.RegisterForm).toStrictEqual(RegisterForm);
});

test('Should export the same add comment form and should be defined', () => {
  expect(AddCommentForm).toBeDefined();
  expect(exported.AddCommentForm).toBeDefined();
  expect(exported.AddCommentForm).toStrictEqual(AddCommentForm);
});

test('Should export the same add thread form and should be defined', () => {
  expect(AddThreadForm).toBeDefined();
  expect(exported.AddThreadForm).toBeDefined();
  expect(exported.AddThreadForm).toStrictEqual(AddThreadForm);
});

test('Should export the same user item and should be defined', () => {
  expect(UserItem).toBeDefined();
  expect(exported.UserItem).toBeDefined();
  expect(exported.UserItem).toStrictEqual(UserItem);
});

test('Should export the same leaderboard item and should be defined', () => {
  expect(LeaderboardItem).toBeDefined();
  expect(exported.LeaderboardItem).toBeDefined();
  expect(exported.LeaderboardItem).toStrictEqual(LeaderboardItem);
});

test('Should export the same sidebar item and should be defined', () => {
  expect(SidebarItem).toBeDefined();
  expect(exported.SidebarItem).toBeDefined();
  expect(exported.SidebarItem).toStrictEqual(SidebarItem);
});

test('Should export the same button vote and should be defined', () => {
  expect(ButtonVote).toBeDefined();
  expect(exported.ButtonVote).toBeDefined();
  expect(exported.ButtonVote).toStrictEqual(ButtonVote);
});

test('Should export the same comment and should be defined', () => {
  expect(Comment).toBeDefined();
  expect(exported.Comment).toBeDefined();
  expect(exported.Comment).toStrictEqual(Comment);
});

test('Should export the same modal and should be defined', () => {
  expect(Modal).toBeDefined();
  expect(exported.Modal).toBeDefined();
  expect(exported.Modal).toStrictEqual(Modal);
});

test('Should export the same search and should be defined', () => {
  expect(Search).toBeDefined();
  expect(exported.Search).toBeDefined();
  expect(exported.Search).toStrictEqual(Search);
});

test('Should export the same thread and should be defined', () => {
  expect(Thread).toBeDefined();
  expect(exported.Thread).toBeDefined();
  expect(exported.Thread).toStrictEqual(Thread);
});

test('Should export the same thread and should be defined', () => {
  expect(UserNavigation).toBeDefined();
  expect(exported.UserNavigation).toBeDefined();
  expect(exported.UserNavigation).toStrictEqual(UserNavigation);
});
