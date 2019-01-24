<template>
    <v-layout row>
        <v-flex xs12 sm8 offset-sm2>
            <v-list two-line>
                <template v-for="(item, index) in teamStore.list">
                    <v-list-tile
                            :key="item.id"
                            avatar
                            v-on:click="teamClick(item.id)"
                    >
                        <v-list-tile-avatar>
                            <img :src="item.bbref_logo_url">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.name"></v-list-tile-title>
                            <v-list-tile-sub-title>
                                <a v-on:click.stop :href="item.bbref_url" target="_blank">{{item.bbref_url}}</a>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider
                            :inset="true"
                            :key="'divider-' + index"
                    ></v-divider>
                </template>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    name: "TeamList",
    computed: {
      ...mapState({
        teamStore: state => state.team
      })
    },
    beforeCreate() {
      this.$store.dispatch("team/fetchList");
    },
    mounted() {
      this.$store.commit("ui/setShowBackButton", true);
    },
    methods: {
      teamClick: function(teamId) {
        this.setTeam(teamId);
        this.$router.push({ path: `team/${teamId}` })
      },
      ...mapMutations({
        setTeam: 'team/setTeam'
      })
    }
  };
</script>

<style scoped>

</style>