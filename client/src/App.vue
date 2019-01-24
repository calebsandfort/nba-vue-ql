<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn v-if="uiStore.showBackButton" v-on:click="goBack" icon class="hidden-xs-only">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <span>NBA</span>
        <span class="font-weight-light">VUE</span>
        <span>QL</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      uiStore: state => state.ui
    })
  },
  methods: {
    goBack () {
      window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push('/')
    }
  }
}
</script>
