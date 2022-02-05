<template>
  <div id="app">
    <!-- 图表chart -->
    <div ref="dataVision" id="main"></div>
  </div>
</template>

<script>
import bus from "./eventBus";

var echarts = require("echarts");
export default {
  computed: {
    options() {
      let option = {
        textStyle:{
          fontSize:16
        },
        title: {
          text:
            window.localStorage.getItem("month") +
            "月" +
            window.localStorage.getItem("day") +
            "日乡镇分拣结果",
          x: "center",
          y: "top",
          textStyle: {
            color: "#333333",
            fontSize: 35,
          },
        },
        //图例
        legend: {
          x: "center",
          y: "bottom",
          data: [
            "安良镇",
            "白庙乡",
            "茨芭镇",
            "东城街道",
            "广天乡",
            "黄道镇",
            "李口镇",
            "龙山街道",
            "堂街镇",
            "王集乡",
            "薛店镇",
            "姚庄乡",
            "渣园乡",
            "长桥镇",
            "冢头镇",
          ],
          textStyle:{
            fontSize:14
          }
        },
        //鼠标悬浮展示数据
        tooltip:{
          trigger:"item",
        },
        series: [
          {
            name: "人数",//鼠标悬浮展示的名称
            type: "pie", // 设置图表类型为饼图
            radius: "75%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            emphasis: {
              label: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                },
              },
            },
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              {
                value: parseInt(window.localStorage.getItem("an")),
                name: "安良镇",
              },
              {
                value: parseInt(window.localStorage.getItem("bai")),
                name: "白庙乡",
              },
              {
                value: parseInt(window.localStorage.getItem("ci")),
                name: "茨芭镇",
              },
              {
                value: parseInt(window.localStorage.getItem("dong")),
                name: "东城街道",
              },
              {
                value: parseInt(window.localStorage.getItem("guang")),
                name: "广天乡",
              },
              {
                value: parseInt(window.localStorage.getItem("huang")),
                name: "黄道镇",
              },
              {
                value: parseInt(window.localStorage.getItem("li")),
                name: "李口镇",
              },
              {
                value: parseInt(window.localStorage.getItem("long")),
                name: "龙山街道",
              },
              {
                value: parseInt(window.localStorage.getItem("tang")),
                name: "堂街镇",
              },
              {
                value: parseInt(window.localStorage.getItem("wang")),
                name: "王集乡",
              },
              {
                value: parseInt(window.localStorage.getItem("xue")),
                name: "薛店镇",
              },
              {
                value: parseInt(window.localStorage.getItem("yao")),
                name: "姚庄乡",
              },
              {
                value: parseInt(window.localStorage.getItem("zha")),
                name: "渣园乡",
              },
              {
                value: parseInt(window.localStorage.getItem("chang")),
                name: "长桥镇",
              },
              {
                value: parseInt(window.localStorage.getItem("zhong")),
                name: "冢头镇",
              },
            ],
            
          },
        ],
      };
      return option;
    }
  },
  mounted() {
    bus.$on("tabItem-click", (val) => {
      if (val == 3) {
        echarts.init(this.$refs.dataVision).dispose();
        echarts.init(this.$refs.dataVision).setOption(this.options);
      }
    });
  },
};
</script>

<style scoped>
#app{
  flex:100%;
}
#main {
  margin-top: 10px;
  height: 600px;
  width: 1500px;
}
</style>