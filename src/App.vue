<template>
    <div>
        <router-view />
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created() {
            let phone = this.getItem('phone');
            if(!phone){
                this.push('/login');
                return
            }
            if(this.$route.path==='/login')return
            let url = '/find.do';
            this.fetch({url,data:{phone},method:'get'},6)
        },
    }
</script>

<style lang="less" scoped>
</style>
