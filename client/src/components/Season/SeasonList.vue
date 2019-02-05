<template>
    <v-layout row>
        <v-flex xs12>
            <v-layout row>
                <v-flex xs12>
                    <h5 class="headline font-weight-light">
                        Seasons
                    </h5>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-list>
                        <template v-for="(item, index) in seasonStore.list">
                            <v-list-tile
                                    avatar=""
                                    :key="'season-' + item.id"
                                    v-on:click="seasonClick(item.id)"
                            >
                                <v-list-tile-avatar>
                                    <img :src="require('../../assets/nbaLogo.png')">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{item.display}} => {{item.teamSeason.reg_record}}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider
                                    :inset="true"
                                    :key="'season-divider-' + index"
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

  export default {
    name: "SeasonList",
    props: {
      teamId: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapState({
        seasonStore: state => state.season
      })
    },
    methods: {
      seasonClick: function(seasonId) {
        this.$emit('season-clicked', seasonId);
      }
    }
  };
</script>

<style scoped>

</style>