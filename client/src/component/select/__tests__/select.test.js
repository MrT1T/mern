import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectField from '../index';
import { allUsersMock } from '../../../mocks/group-edit.mock';
import { TEST } from '../../../constant/variable.const';

describe('Select component', () => {
  const testUser = allUsersMock[0].name;

  it('Select exist', () => {
    render(<SelectField />);
    expect(screen.getByTestId('selectContainer')).toBeInTheDocument();
  });
  it('Options exist', () => {
    render(<SelectField options={allUsersMock} />);
    userEvent.click(screen.getByRole('combobox'));
    allUsersMock.forEach((option) =>
      expect(screen.queryByText(option.name)).toBeInTheDocument()
    );
  });
  it('Placeholder exist', () => {
    const placeholder = 'Test';
    render(<SelectField placeholder={placeholder} />);
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });
  it('Default value and clear work', () => {
    const name = 'Select';
    const onChange = jest.fn();
    render(
      <SelectField
        options={allUsersMock}
        value={testUser}
        onChange={onChange}
        name={name}
      />
    );
    expect(screen.getByText(testUser)).toBeInTheDocument();
    userEvent.click(document.getElementsByTagName('svg')[0]); // closed icon
    expect(onChange).toBeCalledWith(name, null);
  });
  it('Handle change', () => {
    const onChange = jest.fn();
    render(<SelectField options={allUsersMock} onChange={onChange} />);
    userEvent.type(screen.getByRole('combobox'), TEST);
    userEvent.click(screen.getByText(testUser));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
