<template>
  <div @mouseover="upHere = true"  @mouseleave="upHere = false" :class="$style.item">
    <div style="display: flex">
      <div :class="$style.title">{{modelValue.title}}</div>
      <div :class="[$style.subTitle, $style.textRight]">{{dateDifferent()}}</div>
      <div :class="[$style.closeBtn]" v-show="upHere" @click="deleteData">X</div>
    </div>
    <div :class="$style.subTitle">#{{modelValue.value}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {differenceInMinutes} from 'date-fns'
import {SearchDTO} from 'SearchDTO'
export default defineComponent({
  props: {
    modelValue: {type: SearchDTO, default: {}}
  },
  setup() {
    // Setup
  },
  data() {
    return {
      upHere: false
    }
  },
  methods: {
    deleteData() {
      this.$emit('delete', this.modelValue)
    },
    dateDifferent() :string {
      let diff = differenceInMinutes(new Date(), new Date(this.modelValue.time));
      return `${diff} ${diff > 1 ? 'minutes ago' : 'minute ago'}`;
    }
  }
});
</script>

<style lang="scss" module>
.item {
  padding: 15px;
  width: 800px;
  top: 0px;
  left: 0px;
  height: 60px;
  /* UI Properties */
  background: transparent linear-gradient(180deg, #FFFFFF 0%, #DEE2E6 100%) 0% 0% no-repeat padding-box;
  opacity: 1;
}

.title {
  font-size: 14px;
  text-align: left;
  font: normal normal normal 14px/19px Open Sans;
  letter-spacing: 0px;
  color: #212529;
  opacity: 1;
  width: 70%;
}

.subTitle {
  font-size: 12px;
  text-align: left;
  font: normal normal normal 12px/17px Open Sans;
  letter-spacing: 0px;
  color: #868E96;
  opacity: 1;
  width: 20%;
}

.textRight {
  text-align: end;
}

.closeBtn {
  float: right;
  color: red;
  margin: auto;
  text-align: right;
}

</style>
