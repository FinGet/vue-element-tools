<!--
 * @Author: Finget
 * @Date: 2020-06-15 17:12:18
 * @LastEditors: Finget
 * @LastEditTime: 2020-06-15 17:28:34
 * @FilePath: /framework/src/views/echarts/index.vue
-->
<template>
  <div>
    <ve-line
      :data="chartData"
      :mark-line="markLine"
      :mark-point="markPoint"></ve-line>
    <ve-histogram :colors="colors" :data="chartData"></ve-histogram>
    <ve-radar :data="chartData"></ve-radar>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common';
  import VeHistogram from 'v-charts/lib/histogram.common';
  import VeRadar from 'v-charts/lib/radar.common';

  import 'echarts/lib/component/markLine';
  import 'echarts/lib/component/markPoint';
  export default {
    data () {
      this.colors = ['#c23531', '#2f4554', '#61a0a8',
                     '#d48265', '#91c7ae', '#749f83',
                     '#ca8622', '#bda29a', '#6e7074',
                     '#546570', '#c4ccd3'];
      return {
        markLine: {
          data: [
            {
              name: '平均线',
              type: 'average'
            }
          ]
        },
        markPoint: {
          data: [
            {
              name: '最大值',
              type: 'max'
            }
          ]
        },
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
            { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
            { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
            { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
            { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
            { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
            { 日期: '1/7', 访问用户: 493, 下单用户: 1093, 下单率: 0.38 },
            { 日期: '1/8', 访问用户: 1593, 下单用户: 2293, 下单率: 0.48 },
            { 日期: '1/9', 访问用户: 3593, 下单用户: 3293, 下单率: 0.8 },
            { 日期: '1/10', 访问用户: 4593, 下单用户: 6293, 下单率: 0.28 },
            { 日期: '1/11', 访问用户: 2593, 下单用户: 8203, 下单率: 0.18 },
            { 日期: '1/12', 访问用户: 6593, 下单用户: 5293, 下单率: 0.9 }
          ]
        }
      };
    },
    components: {
      VeLine,
      VeHistogram,
      VeRadar
    }
  };
</script>

<style lang="less" scoped>

</style>
