<template>
  <div id="app">
      <url-shortener v-on:shortUrlGenerated="onShortUrlGenerated"></url-shortener>
      <short-url-usage v-bind:sourceUrl="sourceUrl"></short-url-usage>
  </div>
</template>

<script>

import UrlShortener from "./components/UrlShortener";
import ShortUrlUsage from "./components/ShortUrlUsage";

export default {
  name: 'app',
  components: {
    ShortUrlUsage,
    UrlShortener
  },
  data() {
    return {
      sourceUrl: '',
      shortUrl: ''
    }
  },
  methods: {
    onShortUrlGenerated(result) {
      this.shortUrl = result.shortUrl;
      this.sourceUrl = result.sourceUrl;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
