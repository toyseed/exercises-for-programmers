<template>
  <div class="url-shortener">
    <div class="input">
      <label for="source-url">link: </label>
      <input type="text" id="source-url" v-model="sourceUrl" />
      <button type="submit" v-on:click="shortenUrl">generate</button>
    </div>
    <div class="short-url">
      <a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UrlShortener',
  data() {
    return {
      sourceUrl: '',
      shortUrl: ''
    };
  },
  methods: {
    shortenUrl() {
      axios
        .post('http://localhost:8888/url', {
          url: this.sourceUrl
        })
        .then(response => {
          this.shortUrl = response.data.shortUrl;
          this.notify(this.sourceUrl, this.shortUrl);
        })
        .catch(error => {
          console.error(error);
        });
    },
    notify(sourceUrl, shortUrl) {
      this.$emit('shortUrlGenerated', {sourceUrl, shortUrl});
    }
  }
};
</script>

<style scoped></style>
