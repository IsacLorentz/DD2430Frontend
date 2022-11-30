<template>
  <scatter :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script>
import { getData, getClusterCount } from "@/services/bigquery";
import { onBeforeMount, ref } from "vue";
import { useToast } from "primevue/usetoast";
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
  setup() {
    const chartOptions = {
      responsive: true,
      //maintainAspectRatio: false,
    };

    const toast = useToast();
    const chartData = ref({});
    const clusterCount = ref(null);

    const formatToDataToDictionary = (data) => {
      var rowsGivenCentroid = {};

      data.map((row) => {
        if (
          !Object.prototype.hasOwnProperty.call(
            rowsGivenCentroid,
            row.CENTROID_ID
          )
        )
          rowsGivenCentroid[row.CENTROID_ID] = [];

        rowsGivenCentroid[row.CENTROID_ID].push({
          x: row.principal_component_1,
          y: row.principal_component_2,
        });
      });

      return rowsGivenCentroid;
    };

    const loadData = async () => {
      try {
        const data = await getData();
        clusterCount.value = await getClusterCount();

        const rowsGivenCentroid = formatToDataToDictionary(data);

        const coloringConstant = 255.0 / clusterCount.value;

        chartData.value = {
          datasets: Object.entries(rowsGivenCentroid).map(([key, data]) => ({
            label: key.toString(),
            backgroundColor: [
              "rgba(" +
                (coloringConstant * key).toString() +
                ", " +
                (coloringConstant * (clusterCount.value - key)).toString() +
                ", 208, 1)",
            ],
            data: data,
          })),
        };
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Could not get data",
          life: 3000,
        });
      }
    };

    onBeforeMount(async () => {
      await loadData();
    });

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>
