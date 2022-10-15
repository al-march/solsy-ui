import {createToggle} from '../CreateToggle';

describe('createToggle', () => {
  test('should set initial state', () => {
    const initial = true;
    const toggle = createToggle(initial);
    expect(toggle.isActive()).toBe(initial);
    const toggle2 = createToggle(!initial);
    expect(toggle2.isActive()).toBe(!initial);
  });
  test('should set active to true', () => {
    const toggle = createToggle(false);
    toggle.onActive();
    expect(toggle.isActive()).toBeTruthy();
  });
  test('should set active to false', () => {
    const toggle = createToggle(true);
    toggle.onUnActive();
    expect(toggle.isActive()).toBeFalsy();
  });
  test('should toggle', () => {
    const {isActive, onToggle} = createToggle(false);
    onToggle();
    expect(isActive()).toBeTruthy();
    onToggle();
    expect(isActive()).toBeFalsy();
  });
});
