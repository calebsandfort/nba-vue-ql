<template>
    <v-container fluid class="px-0 pt-0">
        <Toolbar back-path="/teams"></Toolbar>
        <v-content>
            <v-container fluid>
                <v-layout v-if="loading" text-xs-center wrap>
                    <v-flex xs12>
                        <v-progress-circular
                                :width="7"
                                :size="70"
                                color="green"
                                indeterminate
                        ></v-progress-circular>
                    </v-flex>
                </v-layout>
                <v-layout v-if="!loading" row>
                    <v-flex xs4>
                        <v-card>
                            <v-card-title>
                                <v-layout row>
                                    <v-flex shrink pa-1>
                                        <img :src="team.bbref_logo_url" style="max-height: 50px;">
                                    </v-flex>
                                    <v-flex grow pa-1>
                                        <h4 class="display-1 font-weight-light">
                                            {{team.name}}
                                        </h4>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                            <v-divider light></v-divider>
                            <v-card-title>
                                <transition name="fade" mode="out-in">
                                    <SeasonList v-if="navigatorState === 'seasons'" key="seasonList" :team-id="teamId" v-on:season-clicked="seasonClicked"></SeasonList>
                                    <SeasonMonthList v-if="navigatorState === 'seasonMonths'"
                                                     key="seasonMonthList"
                                                     v-on:season-month-clicked="seasonMonthClicked"
                                                     v-on:navigator-changed="navigatorChanged"></SeasonMonthList>
                                    <TeamGameList v-if="navigatorState.startsWith('game')"
                                                     key="gamesList"
                                                     v-on:game-clicked="gameClicked"
                                                     v-on:navigator-changed="navigatorChanged"></TeamGameList>
                                </transition>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs8 pl-3>
                        <v-card>
                            <v-card-title class="pa-1">
                                <v-layout row>
                                    <v-flex xs12>
                                        <transition name="fade" mode="out-in">
                                            <TeamSeasonsContent v-if="navigatorState === 'seasons'" key="teamSeasonsContent"></TeamSeasonsContent>
                                            <TeamSeasonMonthsContent v-if="navigatorState === 'seasonMonths'" key="teamSeasonMonthsContent"></TeamSeasonMonthsContent>
                                            <TeamGamesContent v-if="navigatorState === 'games'" key="teamGamesContent"></TeamGamesContent>
                                            <TeamGameContent v-if="navigatorState === 'game'" key="teamGameContent"></TeamGameContent>
                                        </transition>
                                    </v-flex>
                                </v-layout>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-container>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import {getRequestVariables as seasonRequest} from "../../api/season";
  import {getRequestVariables as seasonMonthRequest} from "../../api/seasonMonth";
  import {getRequestVariables as gameRequest} from "../../api/game";
  import Toolbar from "../Toolbar";
  import SeasonList from "../Season/SeasonList";
  import SeasonMonthList from "../Season/SeasonMonthList";
  import TeamGameList from "../Team/TeamGameList";
  import TeamSeasonsContent from './TeamSeasonsContent';
  import TeamSeasonMonthsContent from './TeamSeasonMonthsContent';
  import TeamGamesContent from './TeamGamesContent';
  import TeamGameContent from './TeamGameContent';
  import * as entityQuery from "../../utilities/entityQuery"; 

  export default {
    name: "Team",
    components: {
      Toolbar,
      SeasonList,
      SeasonMonthList,
      TeamGameList,
      TeamSeasonsContent,
      TeamSeasonMonthsContent,
      TeamGamesContent,
      TeamGameContent
    },
    computed: {
      teamId () {
        return parseInt(this.$route.params.teamId);
      },
      loading (){
        return this.team == null;
      },
      ...mapState({
        team: state => state.team.team
      })
    },
    data: function() {
      return {
        navigatorState: 'seasons'
      }
    },
    mounted() {
      this.fetchTeam(this.teamId);

      const variables = seasonRequest();
      variables.includeTeamSeasons = true;
      variables.teamId = this.teamId;

      this.fetchSeasons(variables);
    },
    methods: {
      ...mapActions({
        fetchTeam: 'team/fetchItem',
        fetchSeasons: 'season/fetchList',
        fetchSeasonMonths: 'seasonMonth/fetchList',
        fetchGames: 'game/fetchList',
        fetchGame: 'game/fetchItem'
      }),
      seasonClicked: function(seasonId) {
        const variables = seasonMonthRequest();
        variables.includeTeamSeasonMonths = true;
        variables.teamId = this.teamId;
        variables.seasonId = parseInt(seasonId);

        this.fetchSeasonMonths(variables);
        this.navigatorState = 'seasonMonths';
      },
      seasonMonthClicked: function(seasonMonthId) {
        const query = entityQuery.entityQueryCtor(true, false, 0, 0, 'Date ASC');
        query.searchFilters.push(entityQuery.searchFilterCtor(false, false, 'seasonMonthId', entityQuery.SearchFilterCondition.Is, parseInt(seasonMonthId), null, null));

        const teamSfg = entityQuery.searchFilterCtor(false, true, '', entityQuery.SearchFilterCondition.None, null, null, null);
        teamSfg.searchFilters.push(entityQuery.searchFilterCtor(false, false, 'awayTeamId', entityQuery.SearchFilterCondition.Is, this.teamId, null, null));
        teamSfg.searchFilters.push(entityQuery.searchFilterCtor(false, false, 'homeTeamId', entityQuery.SearchFilterCondition.Is, this.teamId, null, null));
        query.searchFilters.push(teamSfg);
        
        const variables = gameRequest();
        variables.teamId = this.teamId;
        variables.query = query;
        variables.includeTeamFields = true;

        this.fetchGames(variables);

        this.navigatorState = 'games';
      },
      gameClicked: function(gameId) {
        const variables = gameRequest();
        variables.id = gameId;
        variables.teamId = this.teamId;
        variables.includeTeamFields = true;
        variables.includePlays = true;
        variables.includeScoreBars = true;

        this.fetchGame(variables);
        this.navigatorState = 'game';
      },
      navigatorChanged: function(navigatorState) {
        this.navigatorState = navigatorState;
      }
    }
  };
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(100px);
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>