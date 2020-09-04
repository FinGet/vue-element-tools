/*
 * @Author: Finget
 * @Date: 2020-06-28 14:45:15
 * @LastEditors: Finget
 * @LastEditTime: 2020-06-28 15:47:25
 * @FilePath: /framework/src/utils/filter.js
 */
import Vue from 'vue';
import { formatMoney, dateFormat } from './index';

Vue.filter('dateFormat', function (date, type = 'ymdhms') {
  if (date > 0) { return dateFormat(date)[type]; } else { return '-'; };
});

Vue.filter('moneyFormat', function (money, round = 2, flag = false) {
  if (money) { return formatMoney(money, round, flag); } else { return '-'; };
});
