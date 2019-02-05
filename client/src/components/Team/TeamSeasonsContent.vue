<template>
    <apexcharts height="649" type="line" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
  import { mapState } from "vuex";
  import VueApexCharts from 'vue-apexcharts';
  import colors from 'vuetify/es5/util/colors';
  import _ from 'lodash';

  export default {
    name: "TeamSeasonsContent",
    components: {
      apexcharts: VueApexCharts,
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
          colors: [colors.green.darken4, colors.red.darken4],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Results by Season',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {

            size: 6
          },
          xaxis: {
            categories: _.map(this.seasonStore.list, function(s) {
              return s.display;
            }),
            title: {
              text: 'Season'
            }
          },
          yaxis: {
            title: {
              text: 'Results'
            },
            min: 5,
            max: 82
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        };
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