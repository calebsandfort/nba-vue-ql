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
                                <transition name="slide-fade" mode="out-in">
                                    <SeasonList v-if="navigatorState === 'seasons'" key="seasonList" :team-id="teamId" v-on:season-clicked="seasonClicked"></SeasonList>
                                    <SeasonMonthList v-if="navigatorState === 'seasonMonths'"
                                                     key="seasonMonthList"
                                                     v-on:season-month-clicked="seasonMonthClicked"
                                                    v-on:navigator-changed="navigatorChanged"></SeasonMonthList>
                                </transition>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs8 pl-3>
                        <v-card>
                            <v-card-title>
                                <v-layout row>
                                    <v-flex xs12>
                                        <transition name="slide-fade" mode="out-in">
                                            <TeamSeasonsContent v-if="navigatorState === 'seasons'" key="teamSeasonsContent"></TeamSeasonsContent>
                                            <TeamSeasonMonthsContent v-if="navigatorState === 'seasonMonths'" key="teamSeasonMonthsContent"></TeamSeasonMonthsContent>
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
  import Toolbar from "../Toolbar";
  import SeasonList from "../Season/SeasonList";
  import SeasonMonthList from "../Season/SeasonMonthList";
  import TeamSeasonsContent from './TeamSeasonsContent';
  import TeamSeasonMonthsContent from './TeamSeasonMonthsContent';

  export default {
    name: "Team",
    components: {
      Toolbar,
      SeasonList,
      SeasonMonthList,
      TeamSeasonsContent,
      TeamSeasonMonthsContent
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
        fetchSeasonMonths: 'seasonMonth/fetchList'
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
        alert(seasonMonthId);
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