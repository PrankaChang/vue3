import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "pranka",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    //確認  api user check fn()
    checkAdmin() {
      // api user check url
      const url = `${this.apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          //success=>4. 取出資料
          this.getData();
          //console.log("getData");
        })
        .catch((err) => {
          //alert "請重新登入"
          alert(err.response.data.message);
          //頁面跳轉到登入頁
          window.location = "login.html";
        });
    },
    getData() {
      // api products url
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios
        .get(url)
        .then((response) => {
          //success=>5.將取得的產品資料放入products的陣列
          this.products = response.data.products;
          //console.log("get data success", this.products);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //click查看細節btn時，啟動fn(選取的項目)
    openProduct(item) {
      //console.log(item);
      //將 選取的項目 放入 tempProduct{}
      this.tempProduct = item;
    },
  },
  mounted() {
    //生命週期
    //1.取出cookie
    //const 自訂義變數 = document.cookie.replace(/(?:(?:^|.*;\s*)原先存入的名稱\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //2.取出cookie後,將預設為每次帶入Authorization
    //axios.defaults.headers.common.Authorization = 自訂義變數;
    axios.defaults.headers.common.Authorization = token;
    //３．確認  api user check fn()
    this.checkAdmin();
  },
};

createApp(app).mount("#app");
