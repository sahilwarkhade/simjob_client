import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Check,
  Search,
  X,
  AlertCircle
} from "lucide-react";

export const Dropdown = ({
  options = [],
  placeholder = "Select option...",
  value = null,
  onChange = () => {},
  onSearch = null,
  disabled = false,
  loading = false,
  error = null,
  className = "",
  label = null,
  required = false,
  helperText = null,
  searchable = false,
  clearable = false,
  multiple = false,
  size = "md",
  variant = "default",
  maxHeight = "240px",
  noOptionsMessage = "No options found",
  loadingMessage = "Loading...",
  groupBy = null,
  renderOption = null,
  renderValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const searchRef = useRef(null);

  // Size variants
  const sizeClasses = {
    sm: "!px-2.5 !py-1.5 text-sm",
    md: "!px-3 !py-2 text-sm",
    lg: "!px-3.5 !py-2.5 text-base",
  };

  // Style variants
  const variantClasses = {
    default:
      "border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500",
    outline:
      "border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500/20",
    filled:
      "border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:bg-white",
    minimal:
      "border-transparent bg-gray-50 hover:bg-gray-100 focus:border-blue-500 focus:ring-blue-500",
  };

  // Helper function to get option text
  const getOptionText = (option) => {
    if (typeof option === "string") return option;
    return option.label || option.name || option.title || String(option);
  };

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchTerm || !searchable) return options;

    return options.filter((option) => {
      const text = getOptionText(option).toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return text.includes(searchLower);
    });
  }, [options, searchTerm, searchable]);

  // Group options if groupBy is provided
  const groupedOptions = useMemo(() => {
    if (!groupBy || !filteredOptions.length)
      return { ungrouped: filteredOptions };

    const grouped = {};
    filteredOptions.forEach((option) => {
      const groupValue =
        typeof groupBy === "function" ? groupBy(option) : option[groupBy];
      const group = groupValue || "Other";
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(option);
    });

    return grouped;
  }, [filteredOptions, groupBy]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      const totalOptions = filteredOptions.length;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < totalOptions - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : totalOptions - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          setSearchTerm("");
          buttonRef.current?.focus();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  const handleToggle = () => {
    if (disabled || loading) return;
    setIsOpen(!isOpen);
    setHighlightedIndex(-1);
    if (!isOpen) setSearchTerm("");
  };

  const handleSelect = (option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.some((v) => isOptionSelected(v, option));

      if (isSelected) {
        onChange(currentValues.filter((v) => !isOptionSelected(v, option)));
      } else {
        onChange([...currentValues, option]);
      }
    } else {
      onChange(option);
      setIsOpen(false);
      setHighlightedIndex(-1);
      setSearchTerm("");
      buttonRef.current?.focus();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : null);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setHighlightedIndex(-1);

    if (onSearch) {
      onSearch(term);
    }
  };

  const isOptionSelected = (selectedValue, option) => {
    if (!selectedValue) return false;

    if (typeof selectedValue === "string" && typeof option === "string") {
      return selectedValue === option;
    }

    if (typeof selectedValue === "object" && typeof option === "object") {
      return (
        selectedValue.value === option.value || selectedValue.id === option.id
      );
    }

    return false;
  };

  const isSelected = (option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      return currentValues.some((v) => isOptionSelected(v, option));
    }
    return isOptionSelected(value, option);
  };

  const getDisplayText = () => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.length === 0) return placeholder;
      if (currentValues.length === 1) return getOptionText(currentValues[0]);
      return `${currentValues.length} selected`;
    }

    if (!value) return placeholder;
    if (renderValue) return renderValue(value);
    return getOptionText(value);
  };

  const showClearButton =
    clearable &&
    ((multiple && Array.isArray(value) && value.length > 0) ||
      (!multiple && value));

  const hasError = Boolean(error);
  const isRequired = required;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="flex items-center gap-1 text-sm font-medium text-gray-700 !mb-1.5">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled || loading}
        className={`
          relative w-full rounded-lg border shadow-sm transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-offset-1
          ${sizeClasses[size]}
          ${
            hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : variantClasses[variant]
          }
          ${
            disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-60"
              : "cursor-pointer hover:border-gray-400"
          }
          ${loading ? "cursor-wait" : ""}
          ${isOpen ? "ring-2 ring-offset-1" : ""}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`block truncate ${
            !value || (multiple && (!value || value.length === 0))
              ? "text-gray-500"
              : "text-gray-900"
          }`}
        >
          {getDisplayText()}
        </span>

        {/* Right side icons */}
        <span className="absolute inset-y-0 right-0 flex items-center !pr-2 gap-1">
          {loading && (
            <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full" />
          )}
          {showClearButton && !loading && (
            <button
              onClick={handleClear}
              className="!p-0.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {/* Error Message */}
      {hasError && (
        <div className="flex items-center gap-1.5 !mt-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Helper Text */}
      {helperText && !hasError && (
        <p className="!mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 !mt-1 w-full bg-white shadow-xl rounded-lg border border-gray-200 overflow-y-auto"
          style={{ maxHeight }}
        >
          {/* Search Input */}
          {searchable && (
            <div className="!p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search options..."
                  className="w-full !pl-9 !pr-3 !py-2 border border-gray-200 rounded-md text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Options Container */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight: searchable ? "calc(100% - 60px)" : "100%" }}
          >
            {loading ? (
              <div className="!px-3 !py-8 text-center text-gray-500">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto !mb-2" />
                {loadingMessage}
              </div>
            ) : Object.keys(groupedOptions).length === 0 ||
              filteredOptions.length === 0 ? (
              <div className="!px-3 !py-8 text-center text-gray-500">
                {noOptionsMessage}
              </div>
            ) : (
              Object.entries(groupedOptions).map(
                ([groupName, groupOptions]) => (
                  <div key={groupName}>
                    {/* Group Header */}
                    {groupBy && groupName !== "ungrouped" && (
                      <div className="!px-3 !py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                        {groupName}
                      </div>
                    )}

                    {/* Group Options */}
                    {groupOptions.map((option, index) => {
                      const globalIndex = filteredOptions.indexOf(option);
                      const isHighlighted = highlightedIndex === globalIndex;
                      const isOptionSelected = isSelected(option);

                      return (
                        <div
                          key={
                            typeof option === "string"
                              ? option
                              : option.value || option.id || index
                          }
                          onClick={() => handleSelect(option)}
                          className={`
                          relative cursor-pointer select-none !px-3 !py-2.5 transition-colors duration-150
                          ${
                            isHighlighted
                              ? "bg-blue-50 text-blue-900"
                              : "text-gray-900 hover:bg-gray-50"
                          }
                          ${isOptionSelected ? "bg-blue-50 text-blue-900" : ""}
                        `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              {renderOption ? (
                                renderOption(option, isOptionSelected)
                              ) : (
                                <>
                                  {/* Option Icon (if available) */}
                                  {option.icon && (
                                    <span className="flex-shrink-0">
                                      {option.icon}
                                    </span>
                                  )}

                                  <div className="min-w-0">
                                    <div
                                      className={`truncate ${
                                        isOptionSelected
                                          ? "font-medium"
                                          : "font-normal"
                                      }`}
                                    >
                                      {getOptionText(option)}
                                    </div>
                                    {option.description && (
                                      <div className="text-xs text-gray-500 truncate">
                                        {option.description}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>

                            {isOptionSelected && (
                              <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// SaaS Example Usage
// const SaaSDropdownExample = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Mock data with SaaS-relevant structure
//   const users = [
//     {
//       id: 1,
//       value: 'john_doe',
//       label: 'John Doe',
//       email: 'john@company.com',
//       role: 'Admin',
//       avatar: '👤',
//       department: 'Engineering'
//     },
//     {
//       id: 2,
//       value: 'jane_smith',
//       label: 'Jane Smith',
//       email: 'jane@company.com',
//       role: 'Manager',
//       avatar: '👩‍💼',
//       department: 'Marketing'
//     },
//     {
//       id: 3,
//       value: 'mike_wilson',
//       label: 'Mike Wilson',
//       email: 'mike@company.com',
//       role: 'Developer',
//       avatar: '👨‍💻',
//       department: 'Engineering'
//     }
//   ];

//

//   const plans = [
//     {
//       id: 1,
//       value: 'starter',
//       label: 'Starter Plan',
//       description: 'Perfect for small teams',
//       price: '$29/month',
//       category: 'Basic'
//     },
//     {
//       id: 2,
//       value: 'pro',
//       label: 'Professional Plan',
//       description: 'Advanced features for growing teams',
//       price: '$99/month',
//       category: 'Popular'
//     },
//     {
//       id: 3,
//       value: 'enterprise',
//       label: 'Enterprise Plan',
//       description: 'Full-featured solution for large organizations',
//       price: 'Custom pricing',
//       category: 'Premium'
//     }
//   ];

//   const renderUserOption = (user, isSelected) => (
//     <div className="flex items-center gap-3">
//       <div className="text-lg">{user.avatar}</div>
//       <div className="flex-1 min-w-0">
//         <div className={`text-sm ${isSelected ? 'font-medium' : 'font-normal'}`}>
//           {user.label}
//         </div>
//         <div className="text-xs text-gray-500 truncate">
//           {user.email} • {user.role}
//         </div>
//       </div>
//     </div>
//   );

//   const renderPlanValue = (plan) => (
//     <div className="flex items-center justify-between w-full">
//       <span>{plan.label}</span>
//       <span className="text-sm text-gray-500">{plan.price}</span>
//     </div>
//   );

//   return (
//     <div className="max-w-2xl mx-auto p-8 space-y-8 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">SaaS Dropdown Components</h1>
//         <p className="text-gray-600 mb-8">Professional dropdown components designed for SaaS applications</p>

//         <div className="space-y-6">
//           {/* User Selection with Custom Rendering */}
//           <Dropdown
//             label="Assign to User"
//             options={users}
//             value={selectedUser}
//             onChange={setSelectedUser}
//             placeholder="Select a team member..."
//             searchable
//             clearable
//             groupBy="department"
//             renderOption={renderUserOption}
//             helperText="Search by name or email address"
//             size="lg"
//             variant="outline"
//           />

//           {/* Multiple Team Selection */}
//           <Dropdown
//             label="Select Teams"
//             options={teams}
//             value={selectedTeams}
//             onChange={setSelectedTeams}
//             placeholder="Choose teams..."
//             multiple
//             searchable
//             clearable
//             required
//             helperText="You can select multiple teams"
//             variant="filled"
//           />

//           {/* Plan Selection with Custom Value Rendering */}
//           <Dropdown
//             label="Subscription Plan"
//             options={plans}
//             value={selectedPlan}
//             onChange={setSelectedPlan}
//             placeholder="Choose your plan..."
//             groupBy="category"
//             renderValue={renderPlanValue}
//             helperText="Select the plan that best fits your needs"
//             variant="default"
//           />

//           {/* Loading State Example */}
//           <div className="flex gap-4">
//             <button
//               onClick={() => {
//                 setLoading(true);
//                 setTimeout(() => setLoading(false), 2000);
//               }}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Simulate Loading
//             </button>

//             <Dropdown
//               label="API Data"
//               options={loading ? [] : users}
//               value={null}
//               onChange={() => {}}
//               placeholder="Loading data..."
//               loading={loading}
//               loadingMessage="Fetching users..."
//               disabled={loading}
//               variant="minimal"
//             />
//           </div>

//           {/* Error State Example */}
//           <Dropdown
//             label="Required Field"
//             options={teams}
//             value={null}
//             onChange={() => {}}
//             placeholder="This field has an error..."
//             required
//             error="Please select at least one team"
//             size="sm"
//           />
//         </div>

//         {/* Selection Summary */}
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//           <h3 className="font-medium text-gray-900 mb-2">Current Selections:</h3>
//           <div className="text-sm text-gray-600 space-y-1">
//             <div>User: {selectedUser ? `${selectedUser.label} (${selectedUser.email})` : 'None'}</div>
//             <div>Teams: {selectedTeams.length > 0 ? selectedTeams.map(t => t.label).join(', ') : 'None'}</div>
//             <div>Plan: {selectedPlan ? `${selectedPlan.label} - ${selectedPlan.price}` : 'None'}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaaSDropdownExample;
