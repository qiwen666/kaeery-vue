<template>
<div>111
</div>
</template>

<script>
export default {
    name: 'routeView',
    created() {
        console.log(this.$route.path);
    },
    watch: {
        $route(val) {
            console.log(val);
        }
    }
}
</script>
