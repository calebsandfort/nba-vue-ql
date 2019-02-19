<template>
    <v-layout row>
        <v-flex xs12>
            <v-layout row>
                <v-flex shrink>
                    <v-btn v-on:click.stop="goBack" icon class="my-0">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex grow>
                    <h5 class="headline font-weight-light">
                        Games
                    </h5>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-list two-line subheader>
                        <template v-for="(item, index) in gameStore.list">
                            <v-list-tile
                                    v-bind:class="{cyan: item.id === activeGameId, 'lighten-4': item.id === activeGameId}"
                                    avatar=""
                                    :key="'game-' + item.id"
                                    v-on:click="gameClick(item.id)"
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.opponent.bbref_logo_url">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                      <v-layout row>
                                        <v-flex grow>
                                          {{locationText(item.team_home)}} {{item.opponent.name}}
                                        </v-flex>
                                        <v-flex shrink v-bind:class="{win: item.team_win, loss: !item.team_win}">
                                          {{resultText(item.team_win)}}
                                        </v-flex>
                                      </v-layout>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                      <v-layout row>
                                        <v-flex grow>
                                          {{dateText(item.date)}}
                                        </v-flex>
                                        <v-flex shrink>
                                          {{item.result_score}}
                                        </v-flex>
                                      </v-layout>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider
                                    :inset="true"
                                    :key="'game-divider-' + index"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import { mapState } from "vuex";
  import moment from 'moment';

  export default {
    name: "TeamGameList",
    computed: {
      ...mapState({
        gameStore: state => state.game
      })
    },
    methods: {
      gameClick: function(gameId) {
        this.$emit('game-clicked', gameId);
        this.activeGameId = gameId;
      },
      goBack: function() {
        this.$emit('navigator-changed', "seasonMonths");
      },
      locationText: function(isHome){
        return isHome ? "vs" : "@";
      },
      resultText: function(won){
        return won ? "W" : "L";
      },
      dateText: function(date){
        return moment(date).format("MMM Do YYYY, h:mm A");
      }
    },
    data: function (){
      return {
        activeGameId: 0
      };
    }
  };
</script>

<style scoped>
  .win{
    color: #1B5E20;
  }
  .loss{
    color: #B71C1C;
  }
</style>