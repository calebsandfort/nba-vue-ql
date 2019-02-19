<template>
    <Chart
      type="line"
      title="Results by Season"
      :series="series"
      :xaxis="xaxis"
      :yaxis="yaxis"></Chart>
</template>

<script>
  import { mapState } from "vuex";
  import Chart from '../shared/Chart';
  import _ from 'lodash';

  export default {
    name: "TeamSeasonsContent",
    components: {
      Chart
    },
    computed: {
      ...mapState({
        seasonStore: state => state.season
      }),
      series: function() {
        return [
          {
            name: "Wins",
            data: _.map(this.seasonStore.list, function(s) {
              return s.teamSeason.reg_wins;
            })
          },
          {
            name: "Losses",
            data: _.map(this.seasonStore.list, function(s) {
              return s.teamSeason.reg_losses;
            })
          }
        ];
      },
      chartOptions: function(){
        return {
          xaxis: {
            categories: _.map(this.seasonStore.list, function(s) {
              return s.display;
            }),
            title: {
              text: 'Season'
            }
          },
        };
      },
      xaxis: function(){
        return {
          categories: _.map(this.seasonStore.list, function(s) {
            return s.display;
          }),
          title: {
            text: 'Season'
          }
        };
      },
      yaxis: function(){
        return { 
          title: 'Results'
        };
      }
    },
    data: function() {
      return {
        yaxis_offset: 2
      }
    }
  };
</script>

<style scoped>

</style>