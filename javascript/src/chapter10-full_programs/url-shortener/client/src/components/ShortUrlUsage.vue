<template>
  <div class="short-url-usage" v-if="chartData.length > 0">
    <h3>shorten url usage</h3>
    <div class="usage-graph">
      <GChart type="LineChart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
// https://google-developers.appspot.com/chart/interactive/docs/gallery/linechart
// https://github.com/devstark-com/vue-google-charts?ref=madewithvuejs.com
import axios from 'axios';
import { GChart } from 'vue-google-charts';

export default {
  name: 'ShortUrlUsage',
  props: ['sourceUrl'],
  components: {
    GChart
  },
  data() {
    return {
      chartData: [
      ],
      chartOptions: {
        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 1 }
        },
        vAxis: {
          0: { title: 'Creation' },
          1: { title: 'Visit' }
        }
      }
    };
  },
  watch: {
    sourceUrl(newVal, oldVal) {
      axios
        .get(`http://localhost:8888/usage?url=${encodeURIComponent(newVal)}`)
        .then(res => {
          this.makeChartData(res.data);
        });
    }
  },
  methods: {
    makeChartData(usages) {
      const result = [['Date', 'Creation', 'Visit']];

      for (let i = 7; i >= 0; i--) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        let date = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
        let stat = usages.find(each => each.date === date);
        let usage = { make: 0, visit: 0 };

        if (stat) {
          usage = stat.usage;
        }

        result.push([date, usage.make, usage.visit]);
      }
      this.chartData = result;
    }
  }
};
</script>

<style scoped></style>
