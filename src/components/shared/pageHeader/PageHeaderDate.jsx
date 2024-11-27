import React, { useState } from 'react';
import { FiFilter, FiPlus } from 'react-icons/fi';
import Checkbox from '@/components/shared/Checkbox';
import { Link } from 'react-router-dom';
import DateRange from '../DateRange';

// Helper function to format date in dd/mm/yyyy format
const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const filterItems = ["Role", "Team", "Email", "Member", "Recommendation"];

const PageHeaderDate = () => {
  const [toggleDateRange, setToggleDateRange] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: formatDate(new Date()), // Default to today's date
    endDate: null, // No range initially
    isToday: true, // Tracks if the default "today" is displayed
  });

  const handleDateRangeChange = (start, end) => {
    setDateRange({
      startDate: formatDate(new Date(start)),
      endDate: end ? formatDate(new Date(end)) : null,
      isToday: false, // User has selected a custom range
    });
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        <div
          className="position-relative date-picker-field"
          onClick={() => setToggleDateRange(!toggleDateRange)}
        >
          <div>
            {/* Display only today's date by default; show range if selected */}
            {dateRange.isToday}
             
          </div>
          {/* Pass handler to update date range */}
          <DateRange
            toggleDateRange={toggleDateRange}
            setToggleDateRange={setToggleDateRange}
            onDateChange={handleDateRangeChange} // Example callback in DateRange component
          />
        </div>
        <div className="filter-dropdown">
          <Link
            className="btn btn-md btn-light-brand"
            data-bs-toggle="dropdown"
            data-bs-offset="0, 10"
            data-bs-auto-close="outside"
          >
            <i className="me-2">
              <FiFilter />
            </i>
            <span>Filter</span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            {filterItems.map((name, index) => (
              <div key={index} className="dropdown-item">
                <Checkbox name={name} id={index} checked={name} />
              </div>
            ))}

            <div className="dropdown-divider"></div>
            <Link to="#" className="dropdown-item">
              <FiPlus size={16} className="me-3" />
              <span>Create New</span>
            </Link>
            <Link to="#" className="dropdown-item">
              <FiFilter size={16} className="me-3" />
              <span>Manage Filter</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeaderDate;
