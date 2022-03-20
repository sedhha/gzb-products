import LoginPage from '@/components/gcorn/login/LoginPage';
import { render } from '@testing-library/react';
describe('LoginPage Test', () => {
  it('should render without throwing an error', () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
