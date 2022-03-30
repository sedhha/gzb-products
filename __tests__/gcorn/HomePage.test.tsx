import HomePage from '@/components/gcorn/HomePage';
import { render, screen, fireEvent } from '@testing-library/react';
import * as NextRouter from 'next/router';
import { routeSynthesizer } from '@/components/gcorn/global/utils/routes';
import { routeProps } from '@/components/gcorn/constants/routes';
import { ariaLabels } from '@/components/gcorn/constants/ui-constants';
const { HOME_PAGE_ARIA_LABEL_DESCRIPTOR } = ariaLabels;

describe('HomePage Test', () => {
  it('should render without throwing an error', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it('should contain "OUTLINE-BUTTON" section', () => {
    const pushFunction = jest.fn();
    const routerFunction = jest
      .spyOn(NextRouter, 'useRouter')
      .mockImplementation(jest.fn().mockReturnValue({ push: pushFunction }));
    render(<HomePage />);

    routeProps.forEach((element) => {
      const navButton = screen.getByLabelText(
        HOME_PAGE_ARIA_LABEL_DESCRIPTOR +
          'OUTLINE_BUTTON' +
          element.routeLocation
      );
      expect(navButton).toBeInTheDocument();
      fireEvent.click(navButton);
      expect(pushFunction).toHaveBeenCalledWith(
        routeSynthesizer(element.routeLocation)
      );
    });
    routerFunction.mockReset();
  });
});
