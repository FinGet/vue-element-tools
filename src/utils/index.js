/*
 * @Author: Finget
 * @Date: 2020-05-23 17:20:55
 * @LastEditors: Finget
 * @LastEditTime: 2020-09-04 16:10:33
 * @FilePath: /vue-element-tools/src/utils/index.js
 */
import XLSX from 'xlsx';
import { export_json_to_excel } from '../vendor/Export2Excel';
/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject (url) {
	url = url === null ? window.location.href : url;
	const search = url.substring(url.lastIndexOf('?') + 1);
	const obj = {};
	const reg = /([^?&=]+)=([^?&=]*)/g;

	search.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1);
		let val = decodeURIComponent($2);

		val = String(val);
		obj[name] = val;
		return rs;
	});
	return obj;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @return {Object}
 */
export function objectMerge (target, source) {
	if (typeof target !== 'object') {
		target = {};
	}
	if (Array.isArray(source)) {
		return source.slice();
	}
	Object.keys(source).forEach(property => {
		const sourceProperty = source[property];

		if (typeof sourceProperty === 'object') {
			target[property] = objectMerge(target[property], sourceProperty);
		} else {
			target[property] = sourceProperty;
		}
	});
	return target;
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
	let timeout,
		args,
		context,
		timestamp,
		result;

	const later = function () {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp;

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last);
		} else {
			timeout = null;
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args);
				if (!timeout) { context = args = null; }
			}
		}
	};

	return function (...args) {
		context = this;
		timestamp = +new Date();
		const callNow = immediate && !timeout;

		// 如果延时不存在，重新设定延时
		if (!timeout) { timeout = setTimeout(later, wait); }
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}

		return result;
	};
}

/**
 * 获取当日，本周，本月，本年
 * @param {timestamp，date} date
 */
export function getDateRange (date = new Date()) {
	// 当前日期
	let now = new Date(date);
	// 今天本周的第几天
	let nowDayOfWeek = now.getDay();
	// 当前日
	let nowDay = now.getDate();
	// 当前月
	let nowMonth = now.getMonth();
	// 当前年
	let nowYear = now.getFullYear();
	// 获取当前月的最大天数
	let maxDay = new Date(nowYear, nowMonth + 1, 0).getDate();

	return {
		today: {
			startTime: +new Date(nowYear, nowMonth, nowDay),
			endTime: +new Date(nowYear, nowMonth, nowDay, 23, 59, 59)
		},
		week: {
			startTime: +new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1),
			endTime: +new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek), 23, 59, 59)
		},
		month: {
			startTime: +new Date(nowYear, nowMonth, 1),
			endTime: +new Date(nowYear, nowMonth, maxDay, 23, 59, 59)
		},
		year: {
			startTime: +new Date(nowYear, 0, 1),
			endTime: +new Date(nowYear, 11, 31, 23, 59, 59)
		}
	};
}

/**
 * 导出excel
 * @param {Array} tHeader 表头
 * @param {Array} filterVal 表头对应字段
 * @param {Array} data 表数据
 * @param {String} name 表名
 */
export function exportExcel (tHeader, filterVal, data, name) {
	// 导出表格的表头设置
	require.ensure([], () => {
		const table = formatJson(filterVal, data);
		export_json_to_excel(tHeader, table, name);
	});
}

function formatJson (filterVal, jsonData) {
	return jsonData.map(v => filterVal.map(j => v[j]));
}

/**
 * @description 判断是否IE
 * @returns {Boolean}
 */
export function isIE () {
	const bw = window.navigator.userAgent;
	const compare = (s) => bw.indexOf(s) >= 0;
	const ie11 = (() => 'ActiveXObject' in window)();
	return compare('MSIE') || ie11;
}

/**
 * @description 反转义html
 * @param {String} html
 * @return {Boolean}
 */
export function escape2Html (html) {
	var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
	return html.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
		return arrEntities[t];
	});
}
/**
 * @description 转义html
 * @param {String} sHtml
 * @return {String}
 */
export function html2Escape (sHtml) {
	return sHtml.replace(/[<>&"]/g, function (c) {
		return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
	});
}

/**
 * @description 下载文件
 * @param {String} url
 */
export function downloadFile (url) {
	var iframe = document.createElement('iframe');
	iframe.name = 'iframe-' + (+new Date());
	iframe.style.display = 'none';
	iframe.src = url;
	document.body.appendChild(iframe);
}

/**
 * 金额三位一划分
 * @param  {[string/number]} money [金额]
 * @param  {[string/number]} round [小数位]
 * @param  {[any]}           flag  [是否四舍五入]
 * @return {[type]}       [description]
 */
export function formatMoney (money, round = 2, flag) {
	money = Number(money);
	round = Number(round);
	let isDecimal = money.toString().indexOf('.') >= 0;
	let formatReg = /(\d)(?=(\d{3})+\.)/g;
	let sliceReg = new RegExp(`([0-9]+.[0-9]{${round}})[0-9]*`);
	let zero = '.00';
	if (round > 2) {
		for (let i = 2; i < round; i++) {
			zero += '0';
		}
	}
	if (!isNaN(money) && Object.prototype.toString.call(money).slice(8, -1) === 'Number') {
		if (!isNaN(round) && flag) {
			return String(money.toFixed(round)).replace(formatReg, '$1,');
		} else if (!isNaN(round)) {
			money = isDecimal ? String(money) : String(money) + zero;
			return money.replace(sliceReg, '$1').replace(formatReg, '$1,');
		} else if (round === 'undefined') {
			money = isDecimal ? String(money) : String(money) + zero;
			return String(money).replace(formatReg, '$1,');
		} else {
			throw new Error('请输入小数位!');
		}
	} else {
		throw new Error('请输入数字!');
	}
}

/**
 * [dateFormat 格式化时间戳]
 * @param  {[number]} timestamp [时间戳]
 * @return {[Object]}
 */
export function dateFormat (timestamp) {
	if (String(timestamp).length == 10) {
		timestamp = timestamp * 1000;
	}
	const date = new Date(timestamp);
	const year = date.getFullYear();
	let month = formatNumber(date.getMonth() + 1);
	let day = formatNumber(date.getDate());
	let hours = formatNumber(date.getHours());
	let minutes = formatNumber(date.getMinutes());
	let seconds = formatNumber(date.getSeconds());
	let time = formatNumber(date.getTime());
	const obj = {
		year: year,
		month: month,
		day: day,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		time: time,
		ymd: year + '-' + month + '-' + day,
		ymdhm: year + '-' + month + '-' + day + ' ' + hours + ':' + minutes,
		ymdhms: year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds,
		ms: minutes + ':' + seconds
	};
	return obj;
}

function formatNumber (n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
};

export function file2Xce (file) {
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const data = e.target.result;
			const workbook = XLSX.read(data, {
				type: 'binary'
			});
			let result = [];
			workbook.SheetNames.forEach(item => {
				result.push({
					sheetName: item,
					data: XLSX.utils.sheet_to_json(workbook.Sheets[item])
				});
			});
			resolve(result);
		};
		reader.readAsBinaryString(file);
	});
}
