<template>
    <v-container>
        <v-layout text-xs-center wrap>
            <v-flex xs12>
                <v-img
                    :src="require('../assets/nbaLogo.png')"
                    class="my-3"
                    contain
                    height="200"
                ></v-img>
            </v-flex>
            <v-flex mb-4>
                <h1 class="display-2 font-weight-bold mb-3">
                    Welcome to NBA Finance
                </h1>
                <p class="subheading font-weight-regular">
                    A study of basketball score flow using price action technical analysis with a Vue front-end and a GraphQL back-end
                </p>
            </v-flex>
            <v-flex mb-5 xs12>
                <h2 class="headline font-weight-bold mb-3">Sections</h2>
                <v-layout justify-center>
                    <a class="subheading mx-3" href="teams">
                        Teams
                    </a>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: "LandingPage",
    mounted() {
      this.$store.commit("ui/setShowBackButton", false);
    }
  };
</script>

<style scoped>

</style>