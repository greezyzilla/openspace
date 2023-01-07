import Default from '../default';
import Toggle from '../toggle';
import * as exported from '..';

test('Should export the same default button and should be defined', () => {
  expect(Default).toBeDefined();
  expect(exported.Button).toBeDefined();
  expect(exported.Button).toStrictEqual(Default);
});

test('Should export the same toggle button and should be defined', () => {
  expect(Toggle).toBeDefined();
  expect(exported.ToggleButton).toBeDefined();
  expect(exported.ToggleButton).toStrictEqual(Toggle);
});
