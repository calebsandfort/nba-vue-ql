<template>
    <Chart
      type="line"
      title="Results by Month"
      :series="series"
      :xaxis="xaxis"
      :yaxis="yaxis"
      :yaxis-offset="yaxis_offset"></Chart>
</template>

<script>
  import { mapState } from "vuex";
  import Chart from '../shared/Chart';
  import _ from 'lodash';

  export default {
    name: "TeamSeasonMonthsContent",
    components: {
      Chart
    },
    computed: {
      ...mapState({
        seasonMonthStore: state => state.seasonMonth
      }),
      series: function() {
        return [
          {
            name: "Wins",
            data: _.map(this.seasonMonthStore.list, function(s) {
              return s.teamSeasonMonth.reg_wins;
            })
          },
          {
            name: "Losses",
            data: _.map(this.seasonMonthStore.list, function(s) {
              return s.teamSeasonMonth.reg_losses;
            })
          }
        ];
      },
      xaxis: function(){
        return {
          categories: _.map(this.seasonMonthStore.list, function(s) {
            return s.display;
          }),
          title: {
            text: 'Month'
          }
        }
      },
      yaxis: function(){
        return {
          title: 'Results'
        }
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