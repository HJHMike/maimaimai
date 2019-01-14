<template>
    
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level3}}</el-breadcrumb-item>
    </el-breadcrumb>

</template>
<script>
    export default {
        props:['level2','level3']
    }
</script>
<style>
    .el-breadcrumb{
        font-size: 20px;
        color: white;
        height: 40px;
        line-height: 40px;
    }
</style>