import RegisterPage from '@/components/gcorn/register/RegisterPage';
import { render } from '@testing-library/react';
describe('RegisterPage Test', () => {
  it('should render without throwing an error', () => {
    const { container } = render(<RegisterPage />);
    expect(container).toMatchSnapshot();
  });
});
