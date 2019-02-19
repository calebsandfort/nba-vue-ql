import { expect } from "chai";
import Sequelize from 'sequelize';
import * as entityQuery from "./entityQuery";
import { SearchFilterCondition } from "./entityQuery";

describe("entityQuery", () => {

  it("entityQueryCtor", () => {
    const expected = {
      isAndQuery: false,
      enablePaging: true,
      startRowIndex: 3,
      maximumRows: 0,
      sortExpression: 'Name DESC',
      searchFilters: []
    }

    const actual = entityQuery.entityQueryCtor(false, true, 3, 0, 'Name DESC');

    expect(actual).to.deep.equal(expected);
  });

  it("searchFilterCtor", () => {
    const expected = {
      isAndFilter: false,
      isFilterGroup: true,
      propertyName: 'Test',
      condition: entityQuery.SearchFilterCondition.Is,
      valueInt: 1,
      valueString: 'Caleb',
      valueBoolean: false,
      searchFilters: []
    }

    const actual = entityQuery.searchFilterCtor(false, true, 'Test', entityQuery.SearchFilterCondition.Is, 1, 'Caleb', false);

    expect(actual).to.deep.equal(expected);
  });

  it("searchFilterConditionToSequelizeOperator", () => {
    expect(Sequelize.Op.eq).to.equal(entityQuery.searchFilterConditionToSequelizeOperator(SearchFilterCondition.Is));
  });

  it("getSearchFilterValue", () => {
    const intFilter = entityQuery.searchFilterCtor(false, true, 'Test', entityQuery.SearchFilterCondition.Is, 1, null, null);
    expect(1).to.equal(entityQuery.getSearchFilterValue(intFilter));

    const stringFilter = entityQuery.searchFilterCtor(false, true, 'Test', entityQuery.SearchFilterCondition.Is, null, 'Caleb', null);
    expect('Caleb').to.equal(entityQuery.getSearchFilterValue(stringFilter));

    const booleanFilter = entityQuery.searchFilterCtor(false, true, 'Test', entityQuery.SearchFilterCondition.Is, null, null, false);
    expect(false).to.equal(entityQuery.getSearchFilterValue(booleanFilter));
  });

  it("getPropertyAndFilter", () => {
    const expected = {
      Test: 'Caleb'
    };

    const searchFilter = entityQuery.searchFilterCtor(false, true, 'Test', entityQuery.SearchFilterCondition.Is, null, 'Caleb', null);
    const actual = entityQuery.getPropertyAndFilter(searchFilter);

    expect(expected).to.deep.equal(actual);
  });

  it("getOperatorAndFilter", () => {
    const expected = {
      [Sequelize.Op.eq]: 'Caleb'
    };

    const searchFilter = entityQuery.searchFilterCtor(false, true, 'Test', entityQuery.SearchFilterCondition.Is, null, 'Caleb', null);
    const actual = entityQuery.getOperatorAndFilter(searchFilter);

    expect(expected).to.deep.equal(actual);
  });

  it("getLogicOperator", () => {
    expect(Sequelize.Op.and).to.equal(entityQuery.getLogicOperator(true));
    expect(Sequelize.Op.or).to.equal(entityQuery.getLogicOperator(false));
  });

  it("simple query", () => {
    const actual = {
      offset: 3,
      limit: 5,
      order: Sequelize.literal('Name DESC')
    };

    const query = entityQuery.entityQueryCtor(false, true, 3, 5, 'Name DESC');
    const expected = entityQuery.entityQueryToSequelize(query);

    expect(actual).to.deep.equal(expected);
  });

  it("complex query", () => {
    const expected = {
      offset: 3,
      limit: 5,
      order: Sequelize.literal('Name DESC'),
      where: {
        [Sequelize.Op.and]: [
          {
            [Sequelize.Op.eq]: {isPlayoff: true}
          },
          {
            [Sequelize.Op.or]: [
              {
                [Sequelize.Op.eq]: {awayTeamId: 12}
              },
              {
                [Sequelize.Op.eq]: {homeTeamId: 1}
              }
            ]
          }
        ]
      }
    };

    const query = entityQuery.entityQueryCtor(true, true, 3, 5, 'Name DESC');
    query.searchFilters.push(entityQuery.searchFilterCtor(false, false, 'isPlayoff', entityQuery.SearchFilterCondition.Is, null, null, true));

    const teamSfg = entityQuery.searchFilterCtor(false, true, '', entityQuery.SearchFilterCondition.None, null, null, null);
    teamSfg.searchFilters.push(entityQuery.searchFilterCtor(false, false, 'awayTeamId', entityQuery.SearchFilterCondition.Is, 1, null, null));
    teamSfg.searchFilters.push(entityQuery.searchFilterCtor(false, false, 'homeTeamId', entityQuery.SearchFilterCondition.Is, 1, null, null));
    query.searchFilters.push(teamSfg);

    const actual = entityQuery.entityQueryToSequelize(query);

    expect(actual).to.deep.equal(expected);
  });
});