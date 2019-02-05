import { getClient } from "./apollo-client-factory";
import { expect } from "chai";
import * as teamApi from "./team";

let client = null;
let teamID = '1';

describe("teams", () => {
  before("before teams", function(done) {
    client = getClient();
    done();
  });

  beforeEach(function() {
    this.timeout(2000);
  });

  // it("creates a team", async () => {
  //
  //   const result = await teamApi.create(client, {
  //     input: {
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "CAN"
  //     }
  //   });
  //
  //   teamID = result.data.createTeam.id;
  //
  //   const expectedResult = {
  //     createTeam: {
  //       "__typename": "Team",
  //       id: teamID,
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "CAN",
  //       bbref_logo_url: "https://d2p3bygnnzw9w3.cloudfront.net/req/201901091/tlogo/bbr/CAN.png",
  //       bbref_url: "https://www.basketball-reference.com/teams/CAN/"
  //     }
  //   };
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("returns a team when team can be found", async () => {
  //   const expectedResult = {
  //     team: {
  //       "__typename": "Team",
  //       id: teamID,
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "CAN",
  //       bbref_logo_url: "https://d2p3bygnnzw9w3.cloudfront.net/req/201901091/tlogo/bbr/CAN.png",
  //       bbref_url: "https://www.basketball-reference.com/teams/CAN/"
  //     }
  //   };
  //
  //   const result = await teamApi.get(client, { id: teamID });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("returns null when team cannot be found", async () => {
  //   const expectedResult = {
  //     team: null
  //   };
  //
  //   const result = await teamApi.get(client, { id: "42" });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("updates a team", async () => {
  //   const expectedResult = {
  //     updateTeam: {
  //       "__typename": "Team",
  //       id: teamID,
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "VAN",
  //       bbref_logo_url: "https://d2p3bygnnzw9w3.cloudfront.net/req/201901091/tlogo/bbr/VAN.png",
  //       bbref_url: "https://www.basketball-reference.com/teams/VAN/"
  //     }
  //   };
  //
  //   const result = await teamApi.update(client, {
  //     id: teamID,
  //     input: {
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "VAN"
  //     }
  //   });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("deletes a team", async () => {
  //   const expectedResult = {
  //     deleteTeam: true
  //   };
  //
  //   const result = await teamApi.deleteTeam(client, {
  //     id: teamID
  //   });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("returns a list of teams", async () => {
  //   const expectedResult = 30;
  //
  //   const result = await teamApi.getAll(client);
  //
  //   expect(result.data.teams.length).to.eql(expectedResult);
  // });
});