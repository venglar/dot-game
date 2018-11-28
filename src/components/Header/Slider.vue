<template>
    <label>
        <span>{{ speed }}<span class="small">px/s</span></span>
        <input type="range"
               :min="min"
               :max="max"
               step="1"
               v-model="speed"
        />
    </label>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "Slider",
        computed: {
            speed: {
                get() {
                    return this.$store.state.speed
                },
                set(value) {
                    this.$store.commit('setSpeed', value)
                }
            },
            ...mapState({
                min : 'speedSliderMin',
                max : 'speedSliderMax'
            })
        }
    }
</script>

<style lang="scss" scoped>
    label {
        display: flex;
        span {
            padding-right: 10px;
            margin-top: 2px;
            &.small {
                font-size: 11px;
            }
        }
        input[type="range"] {
            width: 100%;
        }
    }
</style>