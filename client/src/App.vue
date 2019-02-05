<template>
  <v-app>
    <router-view/>
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
    },
    goHome (){
      this.$router.push('/')
    }
  }
}
</script>
