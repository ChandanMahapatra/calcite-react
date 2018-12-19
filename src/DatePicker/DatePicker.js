import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import moment from 'moment';

import {
  StyledDatePickerContainer,
  StyledMonthElContainer,
  StyledMonthYearSelectContainer,
  StyledMonthSelect,
  StyledYearSelect,
  StyledWeekDayList,
  StyledWeekDay
} from './DatePicker-styled';

import { SingleDatePicker } from 'react-dates';
import momentPropTypes from 'react-moment-proptypes';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';

import { DatePickerTheme } from '../CalciteThemeProvider';

import { MenuItem } from '../Menu';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(DatePickerTheme);

const DatePicker = ({
  field,
  form,
  onFocusChange,
  onDateChange,
  disabled,
  name,
  value,
  children,
  monthYearSelectionMode,
  yearSelectDates,
  hideKeyboardShortcutsPanel,
  numberOfMonths,
  ...other
}) => {
  let touched, isSubmitting, setFieldValue, setTouched;
  if (field) {
    value = field.value;
    name = field.name;
    touched = form.touched;
    isSubmitting = form.isSubmitting;
    setFieldValue = form.setFieldValue;
    setTouched = form.setTouched;
  }

  const _onDateChange = date => {
    if (setFieldValue) {
      setFieldValue(name, date);
    }

    if (onDateChange) {
      onDateChange(date);
    }
  };

  const _onFocusChange = options => {
    if (setTouched && !options.focused) {
      setTouched({ ...touched, [name]: true });
    }

    if (onFocusChange) {
      onFocusChange(options);
    }
  };

  const getMonthEl = ({ month, onMonthSelect, onYearSelect }) => {
    const weekdays = moment.weekdaysMin();
    return (
      <StyledMonthElContainer>
        <StyledMonthYearSelectContainer>
          <StyledMonthSelect
            selectedValue={month.month()}
            renderValue={selectedItem =>
              getMonthRenderValue(selectedItem, month)
            }
            onChange={value => {
              onMonthSelect(month, value);
            }}
          >
            {moment.months().map((label, value) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </StyledMonthSelect>
          {getYearEl({ month, onYearSelect })}
        </StyledMonthYearSelectContainer>
        <StyledWeekDayList>
          {weekdays.map(day => (
            <StyledWeekDay key={day}>{day}</StyledWeekDay>
          ))}
        </StyledWeekDayList>
      </StyledMonthElContainer>
    );
  };

  const getMonthRenderValue = (selectedItem, month) => {
    if (monthYearSelectionMode === 'MONTH') {
      return `${selectedItem && selectedItem.props.children} ${month.year()}`;
    }

    return selectedItem && selectedItem.props.children;
  };

  const getYearEl = ({ month, onYearSelect }) => {
    if (monthYearSelectionMode === 'MONTH_YEAR') {
      return (
        <StyledYearSelect
          selectedValue={month.year()}
          onChange={value => {
            onYearSelect(month, value);
          }}
        >
          {getYears()}
        </StyledYearSelect>
      );
    }
  };

  const getYears = () => {
    const yearsArr = [];
    for (
      let currentYear = yearSelectDates.endYear;
      yearSelectDates.startYear <= currentYear;
      currentYear--
    ) {
      yearsArr.push(
        <MenuItem value={currentYear} key={currentYear}>
          {currentYear}
        </MenuItem>
      );
    }

    return yearsArr;
  };

  return (
    <StyledDatePickerContainer
      hideDoWHeader={monthYearSelectionMode !== 'NONE'}
    >
      <SingleDatePicker
        date={value}
        onDateChange={_onDateChange}
        onFocusChange={_onFocusChange}
        disabled={isSubmitting || disabled}
        renderMonthElement={
          monthYearSelectionMode === 'NONE' ? undefined : getMonthEl
        }
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        numberOfMonths={numberOfMonths}
        {...other}
      />
    </StyledDatePickerContainer>
  );
};

DatePicker.propTypes = {
  /** The currently selected moment date object for the component. */
  date: momentPropTypes.momentObj,
  /** Callback function when the selected date is changed. */
  onDateChange: PropTypes.func.isRequired,
  /** Describe whether the DatePicker is currently focused; displays the calendar dropdown. */
  focused: PropTypes.bool,
  /** Callback function when the focus state of the DatePicker is changed. */
  onFocusChange: PropTypes.func.isRequired,
  /** Placeholder text for the DatePicker text field. */
  placeholder: PropTypes.string,
  /** An id supplied to the DatePicker. */
  id: PropTypes.string.isRequired,
  /** Determine if year and/or month dropdowns should be shown in the calendar popup */
  monthYearSelectionMode: PropTypes.oneOf(['NONE', 'MONTH', 'MONTH_YEAR']),
  /** The years that will be used to populate the year dropdown menu */
  yearSelectDates: PropTypes.shape({
    startYear: PropTypes.number,
    endYear: PropTypes.number
  }),
  /** The number of months to show in the popup */
  numberOfMonths: PropTypes.number
};

DatePicker.defaultProps = {
  placeholder: 'Date',
  id: uniqid(),
  monthYearSelectionMode: 'NONE',
  yearSelectDates: {
    startYear: new moment().subtract('year', 50).year(),
    endYear: new moment().year()
  },
  hideKeyboardShortcutsPanel: true,
  numberOfMonths: 1
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
