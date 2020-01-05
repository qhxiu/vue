<template>
  <div>
    <div class="logo">
      <img src="https://img.kaikeba.com/logo-new.png" alt="">
    </div>

    <cube-form
            :model="model"
            :schema="schema"
            @validate="handleValidate"
            @submit="handleLogin">
    </cube-form>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                model: {
                    username: "",
                    passwd: ""
                },
                //表单的结构定义
                schema: {
                    fields: [ //字段数组
                        {
                            type: "input",
                            modelKey: "username",
                            label: "用户名",
                            props: {
                                placeholder: "请输入用户名"
                            },
                            rules: {
                                required: true
                            },
                            trigger: "blur"
                        },
                        {
                            type: "input",
                            modelKey: "passwd",
                            label: "密码",
                            props: {
                                type: 'password',
                                placeholder: "请输入密码",
                                eye: {
                                    open: true
                                }
                            },
                            rules: {
                                required: true
                            },
                            trigger: "blur"
                        },
                        {
                            type: "submit",
                            label: "登录"
                        }
                    ]
                }
            }
        },
        methods: {
            handleLogin(e) {
                //阻止表单的默认提交行为
                e.preventDefault();
                //登录请求
                this.$store.dispatch('login', this.model)
                    .then(code => {
                        if (code) {
                            //登录成功
                            const path = this.$route.query.redirect || '/';
                            this.$router.push(path);
                        }
                    })
                    .catch(error => {
                        //有错误发生或者登录失败
                        const toast = this.$createToast({
                            time: 2000,
                            txt: error.response.data.message || error.message || '登录失败',
                            type: 'error'
                        });
                        toast.show();
                    })
            },
            handleValidate(ret) {
                console.log(ret)
            }
        }
    }
</script>

<style scoped>

</style>