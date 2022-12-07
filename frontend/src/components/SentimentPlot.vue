<template>
  <div>
    <prime-dropdown
      v-model="timeUnit"
      :options="timeUnits"
      optionLabel="name"
      optionValue="unit"
      placeholder="Select a time unit"
      @change="loadData"
    />
    <prime-dropdown
      v-model="selectedTopic"
      :options="topics"
      optionLabel="name"
      optionValue="key"
      placeholder="Select a topic"
      @change="loadData"
    />
    <Line :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import { getTrendsOverTime, getClusterCount } from "@/services/bigquery";
import { onBeforeMount, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { Line } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement
);

export default {
  name: "SentimentPlot",
  components: { Line },
  setup() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const timeUnitEpochs = {
      day: 86400,
      week: 604800,
      month: 2628000,
    };

    const toast = useToast();
    const chartData = ref({});
    const fromDate = ref(new Date(0));
    const toDate = ref(new Date());
    const timeUnit = ref("day");
    const timeUnits = ref([
      { name: "Month", unit: "month" },
      { name: "Week", unit: "week" },
      { name: "Day", unit: "day" },
    ]);
    const topics = ref([]);
    const selectedTopic = ref(null);

    const loadTopics = async () => {
      try {
        const clusterCount = await getClusterCount();
        topics.value = Array.from(Array(clusterCount).keys()).map((value) => ({
          name: value + 1,
          key: value + 1,
        }));
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Could not load topics, " + error,
          life: 3000,
        });
      }
    };

    const loadData = async () => {
      if (topics.value == []) return;
      try {
        const fromDateEpoch = Math.floor(fromDate.value.getTime() / 1000);
        const toDateEpoch = Math.floor(toDate.value.getTime() / 1000);

        const data = await getTrendsOverTime(
          fromDateEpoch,
          toDateEpoch,
          timeUnit.value,
          selectedTopic.value
        );

        chartData.value = {
          labels: data.map(
            (row) =>
              new Date(
                parseInt(row.bucket) * timeUnitEpochs[timeUnit.value] * 1000
              )
                .toISOString()
                .split("T")[0]
          ),
          datasets: [
            {
              label: "Sentiment",
              backgroundColor: "#f87979",
              data: data.map((row) => row.sentiment),
            },
            {
              label: "Trend",
              backgroundColor: "#337979",
              data: data.map((row) => row.occurences),
            },
          ],
        };
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Could not get data, " + error,
          life: 3000,
        });
      }
    };

    onBeforeMount(async () => {
      await loadTopics();
      await loadData();
    });

    return {
      chartData,
      chartOptions,
      timeUnits,
      timeUnit,
      loadData,
      topics,
      selectedTopic,
    };
  },
};
</script>
