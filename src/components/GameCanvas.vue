<template>
    <div class="wrap">
        <div class="pause-layer" v-if="paused">
            <span>Paused</span>
        </div>
        <template v-for="dotId in dots">
            <Dot :id="dotId" :key="dotId" ref="dot" />
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Dot from './GameCanvas/Dot'

    export default {
        name: "GameCanvas",
        components: { Dot },
        data() {
            return {
                interval: null
            }
        },
        created() {
            // make sure all state is zeroed out, start adding a dot every second
            this.$store.commit('reset')
            this.addDots()
        },
        methods: {
            addDots() {
                this.interval = setInterval(() => {
                    this.$store.commit('addDot')
                }, 1000)
            }
        },
        computed: mapState(['dots', 'paused']),
        watch: {
            // make sure we don't keep adding dots when the game is paused
            paused(isPaused) {
                if(isPaused) {
                    clearInterval(this.interval)
                    this.interval = null
                } else {
                    this.addDots()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pause-layer {
        display: flex;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        align-items: center;
        justify-items: center;
        background: rgba(0,0,0,.5);
        color: rgba(255,255,255,.5);
        font-size: 36px;
        z-index: 9;
        span {
            margin: auto;
        }
    }
</style>