<template>
  <apexcharts :height="height" :type="type" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts';
  import colors from 'vuetify/es5/util/colors';
  import _ from 'lodash';

  export default {
    name: "Chart",
    components: {
      apexcharts: VueApexCharts,
    },
    props: {
      type: { type: String, default: 'line' },
      height: { type: Number, default: 649 },
      title: { type: String, default: '' },
      series: {
        type: Array,
        default: function(){ return []}
      },
      colors: {
        type: Array,
        default: function(){ return [colors.green.darken4, colors.red.darken4]}
      },
      dataLabels: {
        type: Object,
        default: function () {
          return {
            enabled: true
          };
        }
      },
      markers: {
        type: Object,
        default: function () {
          return {
            size: [6, 6]
          };
        }
      },
      xaxis: {
        type: Object,
        default: function () {
          return {
            title: 'xaxis',
            categories: []
          };
        }
      },
      yaxis: {
        type: Object,
        default: function () {
          return {
            title: 'xaxis',
            offset: 5
          };
        }
      },
      yaxisOffset: { type: Number, default: 5 },
    },
    computed: {
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
          colors: this.colors,
          dataLabels: this.dataLabels,
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: this.title,
            align: 'left',
            offsetY: 7
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: this.markers,
          xaxis: this.xaxis,
          yaxis: {
            title: {
              text: this.yaxis.title
            },

            min: Math.max(0, _.min(_.map(this.series, function(s){
              return _.min(s.data);
            })) - this.yaxisOffset),
            max: _.max(_.map(this.series, function(s){
              return _.max(s.data);
            })) + this.yaxisOffset
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
    }
  }
</script>