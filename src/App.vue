<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-music-note-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="addTrack">
              Add Track
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Music.js</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
        <Track
          v-for="n in tracks"
          :key="`track-${n}`"
        />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Track from '@/components/Track.vue';

export default {
  name: 'App',

  components: {
    Track,
  },

  data: () => ({
    drawer: false,
    tracks: 0,
  }),

  created () {
    this.$vuetify.theme.dark = true;
  },

  methods: {
    addTrack: function() {
      this.tracks += 1;
    },
  },
};
</script>
