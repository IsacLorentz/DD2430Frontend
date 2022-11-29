<template>
  <scatter :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script>
import { Scatter } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  name: "ScatterPlot",
  components: { Scatter },
  props: ["chartData"],
  setup() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return {
      chartOptions,
    };
  },
};
</script>
