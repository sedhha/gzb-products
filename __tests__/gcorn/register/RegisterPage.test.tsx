import RegisterPage, {
  getDefaultGender,
} from '@/components/gcorn/register/RegisterPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import metadataJson from '@gzb-mocks/metadata.json';

describe('RegisterPage Test', () => {
  it('should render without throwing an error', () => {
    const { container } = render(<RegisterPage metadata={metadataJson} />);
    expect(container).toMatchSnapshot();
  });

  it('should allow user to select all Genders.', () => {
    render(<RegisterPage metadata={metadataJson} />);
    const { gender } = metadataJson;
    gender.forEach((gender) => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: gender })
      );
      const selectedOption = screen.getByRole('option', {
        name: gender,
      }) as HTMLOptionElement;
      expect(selectedOption).toBeDefined();
      expect(selectedOption.selected).toBe(true);
    });
  });

  it('should return default Gender as "Male" if not supplied', () => {
    expect(getDefaultGender(undefined)).toBe('Male');
  });
});
