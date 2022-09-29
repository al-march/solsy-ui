import {Avatar, AvatarSelectors} from '../Avatar';
import {render, screen} from 'solid-testing-library';

const avatarRef = () => screen.getByTestId(AvatarSelectors.AVATAR);
const avatarItemRef = () => screen.getByTestId(AvatarSelectors.ITEM);

describe('Avatar', () => {
  test('should render', () => {
    render(() => <Avatar />);
    expect(avatarRef()).toBeInTheDocument();
  });
  test('should set classes to Avatar', () => {
    const className = 'class-name';
    render(() => <Avatar class={className} />);
    expect(avatarRef()).toHaveClass(className);
  });
  test('should render avatarItem', () => {
    render(() => (
      <Avatar>
        <Avatar.Item />
      </Avatar>
    ));
    expect(avatarItemRef()).toBeInTheDocument();
  });
  test('should set classes to avatarItem', () => {
    const className = 'class-name';
    render(() => (
      <Avatar>
        <Avatar.Item class={className} />
      </Avatar>
    ));
    expect(avatarItemRef()).toHaveClass(className);
  });
});
