<template>
<div>
  <v-tabs
    color="cyan"
    dark
    slider-color="yellow"
  >
    <v-tab key="scoreFlowTab">Flow</v-tab>
    <v-tab key="candlestickTab">Differential</v-tab>
    <v-tab-item key="scoreFlowTabItem">
      <Chart
        type="line"
        :series="scoreFlowSeries"
        :data-labels="scoreFlowDataLabels"
        :markers="scoreFlowMarkers"
        :xaxis="scoreFlowXaxis"
        :yaxis="scoreFlowYaxis"></Chart>
    </v-tab-item>
    <v-tab-item key="candlestickTabItem">
      <apexchart type=candlestick height=649 :options="chartOptions" :series="candlestickSeries" />
      <!-- <Chart
        type="candlestick"
        :series="candlestickSeries"
        :xaxis="candlestickXaxis"
        :yaxis="candlestickYaxis"></Chart> -->
    </v-tab-item>
  </v-tabs>

  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Chart from '../shared/Chart';
  import _ from 'lodash';
  import moment from 'moment';
  import VueApexCharts from 'vue-apexcharts';

  export default {
    name: "TeamGameContent",
    components: {
      Chart,
      apexchart: VueApexCharts,
    },
    computed: {
      teamId () {
        return this.$route.params.teamId;
      },
      ...mapState({
        gameStore: state => state.game
      }),
      scoreFlowSeries: function() {
        const that = this;

        return [
          {
            name: "Team",
            data: _.map(this.gameStore.game.plays, function(p) {
              return that.gameStore.game.team_home ? p.home_score : p.away_score;
            })
          },
          {
            name: "Opponent",
            data: _.map(this.gameStore.game.plays, function(p) {
              return that.gameStore.game.team_home ? p.away_score : p.home_score;
            })
          }
        ];
      },
      scoreFlowDataLabels: function(){
        return {
          enabled: false
        }
      },
      scoreFlowMarkers: function(){
        return {
          size: [0, 0]
        }
      },
      scoreFlowXaxis: function (){
        return {
          categories: _.map(this.gameStore.game.plays, function(p, i) {
            return i;
          }),
          title: {
            text: 'Play'
          },
          labels: {
            show: false
          },
          axisTicks: {
            show: false
          }
        }
      },
      scoreFlowYaxis: function(){
        return {
          title: 'Score'
        }
      },
      candlestickSeries: function (){
        const that = this;
        const loc = that.gameStore.game.team_home ? "home" : "away";

        return [
          {
            name: "Bars",
            data: _.map(this.gameStore.game.scoreBars, function(sb) {
              const bar = {
                x: moment(that.gameStore.date).add(sb.bar_number, 'm').toDate(),
                y: [
                  sb[`${loc}_open`],
                  sb[`${loc}_high`],
                  sb[`${loc}_low`],
                  sb[`${loc}_close`]
                ]
              }
              return bar;
            })
          }
        ];
      },
      candlestickXaxis: function (){
        return {
            type: 'datetime'
          }
      },
      candlestickYaxis: function(){
        return {
          tooltip: {
            enabled: true
          }
        }
      }
    },
    data: function() {
      return {
        chartOptions: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          xaxis: {
            title: {
              text: 'Time'
            },
            type: 'datetime',
            labels: {
              show: false,
              formatter: function(value, timestamp) {
                return moment(new Date(timestamp)).format("h:mm A")
              }
            }
          },
          yaxis: {
            title: {
              text: 'Differential'
            },
            tooltip: {
              enabled: true
            }
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>