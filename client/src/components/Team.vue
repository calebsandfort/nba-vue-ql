<template>
    <v-container>
        <v-layout text-xs-center wrap>
            <v-flex xs12>
                Team ID: {{teamId}}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: "Team",
    computed: {
      teamId () {
        return this.$route.params.teamId;
      }
    }
  };
</script>

<style scoped>

</style>