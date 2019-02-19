<template>
    <Chart
      type="line"
      title="Points by Game"
      :series="series"
      :xaxis="xaxis"
      :yaxis="yaxis"></Chart>
</template>

<script>
  import { mapState } from "vuex";
  import Chart from '../shared/Chart';
  import _ from 'lodash';
  import moment from 'moment';

  export default {
    name: "TeamGamesContent",
    components: {
      Chart
    },
    computed: {
      ...mapState({
        gameStore: state => state.game
      }),
      series: function() {
        return [
          {
            name: "Team",
            data: _.map(this.gameStore.list, function(g) {
              return g.team_score;
            })
          },
          {
            name: "Opponent",
            data: _.map(this.gameStore.list, function(g) {
              return g.opponent_score;
            })
          }
        ];
      },
      xaxis: function (){
        return {
          categories: _.map(this.gameStore.list, function(g) {
            return moment(g.date).format("M/D");
          }),
          title: {
            text: 'Date',
            offsetY: 15
          },
          labels: {
            rotate: -45
          }
        }
      },
      yaxis: function(){
        return {
          title: 'Score'
        }
      }
    },
    data: function() {
      return {

      }
    }
  };
</script>

<style scoped>

</style>