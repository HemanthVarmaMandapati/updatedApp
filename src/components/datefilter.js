import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  startOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

const DateFilter = ({ onRangeChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const applyQuickSelect = (type) => {
    let start, end;

    switch (type) {
      case 'Today':
        start = end = startOfToday();
        break;
      case 'Week':
        start = startOfWeek(new Date(), { weekStartsOn: 1 });
        end = endOfWeek(new Date(), { weekStartsOn: 1 });
        break;
      case 'Month':
        start = startOfMonth(new Date());
        end = endOfMonth(new Date());
        break;
      default:
        return;
    }

    setDateRange([start, end]);
    onRangeChange({ startDate: start, endDate: end });
  };

  const handleCalendarChange = (update) => {
    setDateRange(update);
    const [start, end] = update;
    if (start && end) {
      onRangeChange({ startDate: start, endDate: end });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {['Today', 'Week', 'Month'].map((label) => (
        <button className='dbutton' key={label} onClick={() => applyQuickSelect(label)}>
          {label}
        </button>
      ))}
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleCalendarChange}
        dateFormat="dd/MM/yyyy"
        className="border px-2 py-1 text-sm rounded dpicker"
        placeholderText="Jan, 2019 - Dec, 2019" 
        isClearable
      />
    </div>
  );
};

export default DateFilter;
