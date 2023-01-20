import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

let productModal = null;
let delProductModal = null;
const app = {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "pranka",
      products: [],
      tempProduct: {
        imagesUrl: [],
        tempUrl: "",
      },
      isNew: false,
      delImages: [],
    };
  },
  methods: {
    //確認  api user check fn()
    checkAdmin() {
      //console.log(1);
      // api user check url
      const url = `${this.apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          this.getData();
          //console.log("getData");
        })
        .catch((err) => {
          //alert "請重新登入"
          //console.log(err);
          alert(err.data.message);
          window.location = "login.html";
        });
    },
    getData() {
      // api products url
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(status, product) {
      this.delImages = [];
      if (status === "create") {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      } else if (status === "change") {
        this.isNew = false;
        this.tempProduct = { ...product };
        productModal.show();
      } else if (status === "delete") {
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },
    updatedProduct() {
      let url = "";
      let methods = "";
      if (this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
        methods = "post";
        //console.log(url);
      } else {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        methods = "put";
        //console.log(url);
      }

      axios[methods](url, { data: this.tempProduct })
        .then((res) => {
          productModal.hide();
          this.getData();
          //console.log("success");
        })
        .catch((err) => {
          //console.log(err.data.message);
          alert(err.data.message);
        });
    },
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((res) => {
          delProductModal.hide();
          this.getData();
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addPic() {
      // console.log(this.tempProduct.imagesUrl);
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      this.tempProduct.imagesUrl.push(this.tempProduct.tempUrl);
      this.tempProduct.tempUrl = "";
    },
    //////////////////////////////////////////////////////<===================================這有問題
    deletePic() {
      this.delImages.forEach((item) => {
        // this.tempProduct.imagesUrl.splice(item, 1);
        // console.log(item);
        const index = this.tempProduct.imagesUrl.findIndex((el) => {
          return el === item;
        });

        this.tempProduct.imagesUrl.splice(index, 1);
      });
      this.delImages = [];
    },
    ///////////////////////////////////////////////////////////
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        keyboard: false,
      }
    );
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );
  },
};

createApp(app).mount("#app");
