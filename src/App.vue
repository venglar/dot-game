<template>
    <div id="app">
        <Header />
        <GameCanvas />
    </div>
</template>

<script>
    import Header from './components/Header'
    import GameCanvas from './components/GameCanvas'

    export default {
        components: { Header, GameCanvas },
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
    body, html {
        height: 100%;
        font-family: Roboto, sans-serif;
        text-transform: uppercase;
        letter-spacing: 2px;
        background: #9daec0;
        overflow: hidden;
    }
    .small {
        color: #888;
    }
</style>