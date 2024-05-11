import { render, screen } from '@testing-library/react';
import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput />', () => {
  it('should have search value', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'test'} />);
    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'the value'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'the value';

    userEvent.type(input, value);

    expect(input.value).toBe('the value');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue={''} />);

    expect(container).toMatchSnapshot();
  });
});
