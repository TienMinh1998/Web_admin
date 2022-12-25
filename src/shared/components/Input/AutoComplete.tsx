import React, { Fragment, useState } from 'react';
import { IAutoComplete } from 'shared/types/interface';

export const AutoComplete: React.FC<IAutoComplete> = ({
  placeholder,
  value = '',
  disabled,
  options = [],
  defaultOpen = false,
  onChange,
  onSelect,
  onSearch
}) => {
  const [showSuggestions, setShowSuggestion] = useState<boolean>(defaultOpen);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<any>>([]);
  const [searchKey, setSearchKey] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredSuggestions = options.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1
    );

    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestion(true);
    setActiveSuggestion(0);
    setSearchKey(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e?.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestion(false);
      setSearchKey(filteredSuggestions[activeSuggestion].label);
      onSelect &&
        onSelect(
          filteredSuggestions[activeSuggestion].label,
          filteredSuggestions[activeSuggestion]
        );
    } else if (e.keyCode === 38) {
      if (activeSuggestion - 1 < 0) {
        setActiveSuggestion(filteredSuggestions.length - 1);
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion + 2 > filteredSuggestions.length) {
        setActiveSuggestion(0);
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const onClick = (e: any) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestion(false);
    setSearchKey(e.currentTarget.innerText);
  };

  const renderDropdown = () => {
    let render = (
      <div className="px-2 py-6 flex justify-center items-center text-gray-400 font-semibold">
        NO DATA
      </div>
    );
    if (filteredSuggestions.length) {
      render = (
        <div>
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }
            return (
              <div
                className={`option ${className} cursor-pointer`}
                key={suggestion.value}
                onClick={(e) => {
                  onSelect && onSelect(e.currentTarget.innerText, suggestion);
                  onClick(e);
                }}>
                {suggestion.label}
              </div>
            );
          })}
        </div>
      );
    }

    return <div className="select-autocomplete">{render}</div>;
  };
  return (
    <Fragment>
      <div className="td-auto-complete">
        <input
          type="text"
          className="td-input"
          placeholder={placeholder}
          value={searchKey}
          disabled={disabled}
          onChange={(e) => {
            onChange && onChange(e.target.value);
            onSearch && onSearch(e.target.value);
            handleChange(e);
          }}
          onKeyDown={onKeyDown}
          onFocus={(e) => {
            handleChange(e);
          }}
        />
      </div>
      {showSuggestions && searchKey && renderDropdown()}
    </Fragment>
  );
};
