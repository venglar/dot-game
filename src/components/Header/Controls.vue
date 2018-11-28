<template>
    <div>
        <button @click="reset"><font-awesome-icon icon="sync" /></button>
        <button @click="pause"><font-awesome-icon :icon="paused ? 'play' : 'pause'" /></button>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'

    export default {
        name: "Controls",
        methods: mapMutations(['reset', 'pause']),
        computed: mapState(['paused'])
    }
</script>

<style lang="scss" scoped>
    button {
        border: 3px solid rgba(157, 174, 192, 1);
        border-radius: 4px;
        background: none;
        color: rgba(137, 152, 168, 1);
        text-transform: uppercase;
        font-family: Roboto, sans-serif;
        padding: 5px 10px;
        font-weight: 700;
        font-size: 14px;
        &:hover {
            background: rgba(157, 174, 192, 0.25);
        }
        &:active {
            outline: none;
        }
        &:focus {
            outline: none;
        }
    }
</style>