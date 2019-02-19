export const entityQueryCtor = (isAndQuery = true, enablePaging = false, startRowIndex = 0, maximumRows = 0, sortExpression = '') => {
  return {
    isAndQuery,
    enablePaging,
    startRowIndex,
    maximumRows,
    sortExpression,
    searchFilters: []
  };
};

export const searchFilterCtor = (isAndFilter = true, isFilterGroup = false, propertyName = "", condition = SearchFilterCondition.None, valueInt = null, valueString = null, valueBoolean = null) => {
  return {
    isAndFilter,
    isFilterGroup,
    propertyName,
    condition,
    valueInt,
    valueString,
    valueBoolean,
    searchFilters: []
  };
};

export const SearchFilterCondition = {
  None: 0,
  Contains: 1,
  StartsWith: 2,
  EndsWith: 3,
  Is: 4,
  In: 5,
  IsDBNull: 6,
  IsNotDBNull: 7,
  Between: 8,
  IsNot: 9,
  IsTrue: 10,
  IsFalse: 11,
  InFlag: 12,
  IsLessThanOrEqual: 13,
  IsLessThan: 14,
  NotIn: 15,
  Before: 16,
  After: 17,
  IsGreaterThanOrEqual: 18,
  IsGreaterThan: 19
};