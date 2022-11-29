<template>
  <div>
    <prime-tab-view>
      <prime-tab-panel header="Scatter">
        <scatter :chartData="dataCollection"></scatter>
      </prime-tab-panel>
      <prime-tab-panel header="Sentiment"> second </prime-tab-panel>
    </prime-tab-view>
  </div>
</template>

<script>
import { getData } from "@/services/bigquery";
import { onBeforeMount, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Scatter from "@/components/ScatterPlot.vue";

export default {
  name: "HomeView",
  components: {
    Scatter,
  },
  setup() {
    const toast = useToast();
    const dataCollection = ref({});

    const loadData = async () => {
      try {
        var rowsGivenCentroid = {};
        const data = await getData();

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

        dataCollection.value = {
          datasets: Object.entries(rowsGivenCentroid).map(([key, data]) => ({
            label: key.toString(),
            backgroundColor: [
              "rgba(" +
                (42 * key).toString() +
                ", " +
                (42 * key).toString() +
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
      dataCollection,
    };
  },
};
</script>

<style></style>
