<template>
    <nav class="level">
        <div class="level-left">
            <nuxt-link class="title is-4" to="/">WriteKit</nuxt-link>
        </div>

        <div class="level-right">
            <nuxt-link to="/dashboard">My Dashboard</nuxt-link>
            <nuxt-link to="/build">Build a Block</nuxt-link>
        </div>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style scoped>
nav {
    margin-bottom: 0 !Important;
    padding: 1rem;
}

a:not(.title) {
    margin: 0 1rem;
}
</style>