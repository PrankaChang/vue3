//vue 的具名匯入，html 的 script 要加 type='module'
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
//vue 起始式 data(),methods,mounted()
const app = {
  data() {
    return {
      //因為api文件要求 username password
      //跟html的input連動
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //form送出資料的fn()
    login() {
      // console.log(this.user);
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin"; //api 登入及驗證 位置
      //api文件說 登入及驗證 用 post
      //用axios post(api 登入及驗證 位置, api文件要求 username password)
      //成功用then,失敗用catch
      axios
        .post(api, this.user)
        .then((res) => {
          //success=>取出key&有效日期
          const { token, expired } = res.data;
          //將 token 與他的到期時間存到瀏覽器 cookie 裡
          //document.cookie = `自訂義名稱=取回的TOKEN; expires=${new Date(取回的到期時間)}; path=/`
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          //頁面跳轉到商品頁
          window.location = "products.html";
        })
        .catch((err) => {
          //失敗=> alert 失敗資訊
          alert(err.response.data.message);
        });
    },
  },
};

createApp(app).mount("#app");
