<template>
  <div>
    <prime-tab-view lazy>
      <prime-tab-panel header="Scatter">
        <scatter-plot />
      </prime-tab-panel>
      <prime-tab-panel header="Sentiment">
        <sentiment-plot />
      </prime-tab-panel>
      <prime-tab-panel header="Cluster Configuration">
        <cluster-configuration />
      </prime-tab-panel>
    </prime-tab-view>
  </div>
</template>

<script>
import ScatterPlot from "@/components/ScatterPlot.vue";
import SentimentPlot from "@/components/SentimentPlot.vue";
import ClusterConfiguration from "@/components/ClusterConfiguration.vue";

export default {
  name: "HomeView",
  components: {
    ScatterPlot,
    SentimentPlot,
    ClusterConfiguration,
  },
  setup() {},
};
</script>

<style></style>
