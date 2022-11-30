<template>
  <div>
    <div class="field col-12 md:col-3">
      <label for="integeronly">Number of clusters</label>
      <prime-input-number inputId="integeronly" v-model="numberOfClusters" />
    </div>
    <div>
      <prime-button
        v-if="!isLoading"
        label="Create clusters"
        @click="onClick"
      />
      <prime-progress-spinner v-else />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { createNewTopicClusters } from "@/services/bigquery";

export default {
  name: "ClusterConfiguration",
  setup() {
    const toast = useToast();
    const isLoading = ref(false);
    const numberOfClusters = ref(0);

    const onClick = async () => {
      try {
        isLoading.value = true;
        await createNewTopicClusters(numberOfClusters.value);
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Could not create clusters, " + error,
          life: 3000,
        });
      }

      isLoading.value = false;
    };

    return {
      isLoading,
      numberOfClusters,
      onClick,
    };
  },
};
</script>
