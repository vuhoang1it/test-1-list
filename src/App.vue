<template>
  <div>
    <!-- Html -->
    <SearchBar hidden-button :itemSource="itemSource" v-model="keyword" @add="add" @delete="deleteItem"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from 'components/SearchBar.vue'
import { SearchDTO } from 'SearchDTO';
export default defineComponent({
  name: 'App',
  components: {SearchBar},
  setup() {
    // Setup
  },
  data() {
    return {
      keyword: '',
      itemSource: [] as SearchDTO[]
    }
  },
  methods: {
    add(val: SearchDTO) {
      this.itemSource.push(val);
      localStorage.setItem('itemSource', JSON.stringify(this.itemSource));
    },
    deleteItem(val: SearchDTO) {
      const index = this.itemSource.indexOf(val);
      if(index > -1) 
        this.itemSource.splice(index, 1);
      localStorage.setItem('itemSource', JSON.stringify(this.itemSource));
    }
  },
  created() {
    this.itemSource = JSON.parse(localStorage.getItem('itemSource') ?? '[]');
    console.log(this.itemSource)
  }
});
</script>

<style lang="scss" module>
// Style
</style>
