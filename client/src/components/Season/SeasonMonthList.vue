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
                        Season Months
                    </h5>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-list>
                        <template v-for="(item, index) in seasonMonthStore.list">
                            <v-list-tile
                                    avatar=""
                                    :key="'seasonMonth-' + item.id"
                                    v-on:click="seasonMonthClick(item.id)"
                            >
                                <v-list-tile-avatar>
                                    <img :src="require('../../assets/nbaLogo.png')">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{item.display}} => {{item.teamSeasonMonth.reg_record}}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider
                                    :inset="true"
                                    :key="'seasonMonth-divider-' + index"
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
    name: "SeasonMonthList",
    computed: {
      ...mapState({
        seasonMonthStore: state => state.seasonMonth
      })
    },
    methods: {
      seasonMonthClick: function(seasonMonthId) {
        alert(seasonMonthId);
      },
      goBack: function() {
        this.$emit('navigator-changed', "seasons");
      }
    }
  };
</script>

<style scoped>

</style>