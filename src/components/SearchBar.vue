<template>
  <div style="margin: 20px">
    <input 
      :class="$style.search"
      type="search"
      :value="modelValue"
      @input="updateValue"
      @keydown.enter="onAdd"
      @keydown.esc="() => {keydown = '';}"
    />

    <a
      v-if="modelValue && hiddenButton"
      href="javascript:;"
      @click="onAdd"
    >
      Add
    </a>

    <a
      href="javascript:;"
      @click="() => {itemsToDisplay = sortByValue}"
    >
      Sort by Value
    </a>

    <a
      href="javascript:;"
      @click="() => {itemsToDisplay = sortByDate}"
    >
      Sort by Added Date
    </a>
    <div>
      <div v-for="(item, index) in itemsToDisplay" :key="index">
        <ListItem :modelValue="item" @delete="deleteItem"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SearchDTO } from 'SearchDTO';
import ListItem from './ListItem.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: {ListItem},
  props: {
    modelValue: { type: String, default: '' },
    hiddenButton: { type: Boolean },
    itemSource: { type: Array, default: [] as SearchDTO[] }
  },
  emits: ['update:modelValue', 'add', 'delete'],
  setup() {
    // Setup
  },
  data() {
    return {
      keyword: this.modelValue,
      itemsToDisplay: [] as SearchDTO[]
    }
  },
  methods: {
    updateValue(e: any) {
      this.keyword = e.target.value;
      this.itemsToDisplay = (this.itemSource as SearchDTO[])?.filter((x) => x.title.toLowerCase().includes(this.keyword.toLowerCase()));
      this.$emit('update:modelValue', this.keyword)
    },
    onAdd() {
      let item = this.createSearchObj();
      this.itemsToDisplay.push(item);
      this.$emit('add', item);
    },
    createSearchObj(): SearchDTO {
      
      let maxValue = this.itemSource.length > 0 ? Math.max.apply(Math, ((this.itemSource as SearchDTO[]).map(o => o.value))) : 0;
      return new SearchDTO(this.keyword, maxValue + 1, new Date().getTime());
    },
    deleteItem(val: SearchDTO) {
      this.$emit('delete', val);
    },
  },
  created() {
    this.itemsToDisplay = this.itemSource as SearchDTO[];
  },
  computed: {
    sortByValue() {
      return (this.itemsToDisplay as SearchDTO[]).sort((a, b) => a.value.toString().localeCompare(b.value.toString()));
    },
    sortByDate() {
      return (this.itemsToDisplay as SearchDTO[]).sort((a, b) => b.time.toString().localeCompare(a.time.toString()));
    },
  }
});
</script>

<style lang="scss" module>
a {
  padding: 5px 10px;
  border: solid 1px;
  border-radius: 3px;
  text-decoration: none;
  margin-left: 20px;
}

.search {
  top: 100px;
  left: 560px;
  width: 800px;
  height: 60px;
  /* UI Properties */
  background: #F1F3F5 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
}

</style>
