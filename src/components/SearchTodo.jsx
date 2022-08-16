import React from 'react';

const SearchTodo = ({searchInput, setSearchInput}) => {
    const testTap = () => {
        setSearchInput('')
    }

    return (
        <div className="search-task">
            <div className="sb-title">
                Найти заметку:
            </div>
            <input
                type="text"
                placeholder="Начните вводить название..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <div className="clear-input" title="Очистить" onClick={testTap}></div>
        </div>
    );
};

export default SearchTodo;