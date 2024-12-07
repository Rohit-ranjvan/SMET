import React, { useState } from 'react';
import { FiFilter, FiPlus } from 'react-icons/fi';
import Checkbox from '@/components/shared/Checkbox';
import { Link } from 'react-router-dom';

const filterItems = [
    "First Name", "Last Name", "Mobile", "Email",
    "Education", "City", "Pincode", "Landmark",
    "Address", "Reference", "Group Name", "Team Leader", "AYG Code"
];

const PageHeaderWidgets = ({ onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (filter) => {
        setSelectedFilters((prev) => {
            const updatedFilters = prev.includes(filter)
                ? prev.filter((item) => item !== filter)
                : [...prev, filter];
            onFilterChange(updatedFilters); // Notify parent of filter change
            return updatedFilters;
        });
    };

    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <div className="filter-dropdown">
                <Link
                    className="btn btn-md btn-light-brand"
                    style={{ paddingTop: "12px", paddingBottom: "12px" }}
                    data-bs-toggle="dropdown"
                    data-bs-offset="0, 10"
                    data-bs-auto-close="outside"
                >
                    <i className="me-2"><FiFilter strokeWidth={1.6} /></i>
                    <span>Filter</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                    {filterItems.map((name, index) => (
                        <div key={index} className="dropdown-item">
                            <Checkbox
                                name={name}
                                id={index}
                                checked={selectedFilters.includes(name)}
                                onChange={() => handleFilterChange(name)}
                            />
                            <span className="ms-2">{name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <a href="#" className="btn btn-primary">
                <FiPlus size={16} className='me-2' />
                <span>Add Widgets</span>
            </a>
        </div>
    );
};

export default PageHeaderWidgets;
