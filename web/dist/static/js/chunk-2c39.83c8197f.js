(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2c39"],{npD1:function(t,n,a){"use strict";a.d(n,"c",function(){return r}),a.d(n,"b",function(){return c}),a.d(n,"a",function(){return s});var e=a("t3Un");function r(t){return Object(e.a)({url:"/stat/user",method:"get",params:t})}function c(t){return Object(e.a)({url:"/stat/order",method:"get",params:t})}function s(t){return Object(e.a)({url:"/stat/goods",method:"get",params:t})}},sye3:function(t,n,a){"use strict";a.r(n);var e=a("npD1"),r=a("uhpB"),c={components:{VeLine:a.n(r).a},data:function(){return{chartData:{},chartSettings:{},chartExtend:{}}},created:function(){var t=this;Object(e.b)().then(function(n){t.chartData=n.data.data,t.chartSettings={labelMap:{orders:"订单量",customers:"下单用户",amount:"订单总额",pcr:"客单价"}},t.chartExtend={xAxis:{boundaryGap:!0}}})}},s=a("KHd+"),u=Object(s.a)(c,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"app-container"},[n("ve-line",{attrs:{extend:this.chartExtend,data:this.chartData,settings:this.chartSettings}})],1)},[],!1,null,null,null);u.options.__file="order.vue";n.default=u.exports}}]);