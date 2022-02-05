<template>
  <div id="app">
    <Header id="header"></Header>
    <div id="navi">
      <Navi v-show="ifshow00"></Navi>
      <NaviB v-show="ifshow01"></NaviB>
      <NaviC v-show="ifshow02"></NaviC>
    </div>
    
    <div id="view">
      <TownSorting v-show="ifshow1" ref="body1" id="townSorting"></TownSorting>
      <!-- <QuestionTables
        v-show="ifshow2"
        ref="body2"
        id="questionTables"
      ></QuestionTables> -->
      <DataAnalyis v-show="ifshow3" id="dataAnalyis"></DataAnalyis>
      <ExcelData v-show="ifshow4"></ExcelData>
      <DataHasChecked v-show="ifshow5"></DataHasChecked>
      <Login v-show="ifshow_login"></Login>
      <AccountManage v-show="ifshow6"></AccountManage>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Navi from "./components/Navi.vue";
import NaviB from "./components/NaviB.vue";
import NaviC from "./components/NaviC.vue";
import TownSorting from "./components/TownSorting.vue";
import QuestionTables from "./components/QuestionTables.vue";
import Footer from "./components/Footer.vue";
import DataAnalyis from "./components/DataAnalyis.vue";
import ExcelData from "./components/ExcelData.vue";
import DataHasChecked from "./components/DataHasChecked.vue";
import Login from "./components/Login.vue";
import AccountManage from "./components/AccountManage.vue";
import bus from "./components/eventBus";

export default {
  name: "App",
  data() {
    return {
      ifshow00: Boolean,
      ifshow01: Boolean,
      ifshow02: Boolean,
      ifshow1: Boolean,
      ifshow2: Boolean,
      ifshow3: Boolean,
      ifshow4: Boolean,
      ifshow5: Boolean,
      ifshow6: Boolean,
      ifshow_login: Boolean,
    };
  },
  created() {
    this.ifshow00 = false; /////////////////////////
    this.ifshow01 = false;
    this.ifshow02 = false;
    this.ifshow1 = false;
    this.ifshow2 = false;
    this.ifshow3 = false;
    this.ifshow4 = false;
    this.ifshow5 = false;
    this.ifshow6 = false;
    this.ifshow_login = true; //////////////////////
  },
  mounted() {
    bus.$on("navi",(val)=>{
      this.ifshow1 = false;
      this.ifshow3 = false;
      this.ifshow4 = false;
      this.ifshow5 = false;
      this.ifshow6 = false;
      this.ifshow_login = false;
      if(val=="A"){
        this.ifshow00 = true;
      }else if(val=="B"){
        this.ifshow01 = true;
      }else if(val=="C"){
        this.ifshow02=true;
      }
    });
    bus.$on("tabItem-click", (val) => {
      this.ifshow1 = false;
      this.ifshow2 = false;
      this.ifshow3 = false;
      this.ifshow4 = false;
      this.ifshow5 = false;
      this.ifshow6 = false;

      this.ifshow_login = false;

      //乡镇分拣
      if (val == 1) {
        console.log("总线on接受到信号，是乡镇分拣");
        this.ifshow1 = true;
        // this.$router.push("/social-defense-department");
      }
      //导出问题表格
      else if (val == 2) {
        console.log("总线on接受到信号，是导出问题表格");
        this.ifshow2 = true;
        // this.$router.replace("/social-defense-department");
      } else if (val == 6) {
        console.log("总线on接受到信号，是登录");
        this.ifshow_login = true;
        this.ifshow1 = false;
        this.ifshow2 = false;
        this.ifshow3 = false;
        this.ifshow4 = false;
        this.ifshow5 = false;
        this.ifshow6 = false;
        this.ifshow00 = false;
        this.ifshow01 = false;
        this.ifshow02 = false;
      } else if (val == 7) {
        console.log("总线on接受到信号，是账号管理");
        bus.$emit("data-accounts", 1);
        this.ifshow6 = true;
      }
      //数据分析
      else if (val == 3) {
        console.log("总线on接受到信号，是数据分析");
        this.ifshow3 = true;
        // this.$router.replace("/social-defense-department");
      }
      //数据分析
      else if (val == 4) {
        console.log("总线on接受到信号，是待核查人员");
        bus.$emit("data-unchecked",1);
        this.ifshow4 = true;
        // this.$router.replace("/social-defense-department");
      } else if (val == 5) {
        console.log("总线on接受到信号，是已核查人员");
        bus.$emit("data-checked", 1);
        this.ifshow5 = true;
      }
    });
  },
  components: {
    Header,
    Navi,
    TownSorting,
    QuestionTables,
    Footer,
    DataAnalyis,
    ExcelData,
    DataHasChecked,
    AccountManage,
    Login,
    NaviB,
    NaviC
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
/* #navi {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
} */
#footer{
  width: 100%;
}
</style>