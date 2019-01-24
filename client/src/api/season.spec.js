import { getClient } from "./apollo-client-factory";
import { expect } from "chai";
import * as seasonApi from "./season";

let client = null;
let seasonID = '1';

describe("seasons", () => {
  before("before seasons", function(done) {
    client = getClient();
    done();
  });

  beforeEach(function() {
    this.timeout(2000);
  });

  it("creates a season", async () => {

    const result = await seasonApi.create(client, {
      input: {
        year: 2000
      }
    });

    seasonID = result.data.createSeason.id;

    const expectedResult = {
      createSeason: {
        "__typename": "Season",
        id: seasonID,
        year: 2000,
        previous_year: 1999,
        bbref_url: "https://www.basketball-reference.com/leagues/NBA_2000.html",
        display: "1999-00"
      }
    };

    expect(result.data).to.eql(expectedResult);
  });

  it("returns a season when season can be found", async () => {
    const expectedResult = {
      season: {
        "__typename": "Season",
        id: seasonID,
        year: 2000,
        previous_year: 1999,
        bbref_url: "https://www.basketball-reference.com/leagues/NBA_2000.html",
        display: "1999-00"
      }
    };

    const result = await seasonApi.get(client, { id: seasonID });

    expect(result.data).to.eql(expectedResult);
  });

  it("returns null when season cannot be found", async () => {
    const expectedResult = {
      season: null
    };

    const result = await seasonApi.get(client, { id: "42" });

    expect(result.data).to.eql(expectedResult);
  });

  it("updates a season", async () => {
    const expectedResult = {
      updateSeason: {
        "__typename": "Season",
        id: seasonID,
        year: 2001,
        previous_year: 2000,
        bbref_url: "https://www.basketball-reference.com/leagues/NBA_2001.html",
        display: "2000-01"
      }
    };

    const result = await seasonApi.update(client, {
      id: seasonID,
      input: {
        year: 2001
      }
    });

    expect(result.data).to.eql(expectedResult);
  });

  it("deletes a season", async () => {
    const expectedResult = {
      deleteSeason: true
    };

    const result = await seasonApi.deleteSeason(client, {
      id: seasonID
    });

    expect(result.data).to.eql(expectedResult);
  });

  it("returns a list of seasons", async () => {
    const expectedResult = 5;

    const result = await seasonApi.getAll(client);

    expect(result.data.seasons.length).to.eql(expectedResult);
  });
});