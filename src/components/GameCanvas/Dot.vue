<template>
    <div :style="css" @mousedown="click"></div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "Dot",
        props: ['size', 'id'],
        data() {
            return {
                offsetX: 0,
                clicked: false
            }
        },
        mounted() {
            // start dot positioned at top of the window, adjusted by the header offset doing negative subtraction from
            // CSS "bottom" (to simulate pulling down) so dots always start at the same time regardless of size
            // this would also allow the top bar to responsively resize for mobile
            const headerHeight = document.getElementById('header').clientHeight
            this.offsetX = (-window.innerHeight) + headerHeight
            this.move()
        },
        computed: {
            diameter() {
                // get a random diameter to define the dot size
                let max = this.$store.state.maxDotDiameter;
                let min = this.$store.state.minDotDiameter;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            color() {
                // generate a color for the dot based on its size (no particular scheme, just fun)
                let hue = Math.floor((this.diameter * 8) / 3);
                return `hsl(${hue},80%,50%)`
            },
            css() {
                // apply non-static CSS properties
                return {
                    'height': this.diameter + 'px',
                    'width' : this.diameter + 'px',
                    'bottom': -this.offsetX + 'px', //start from the negative and move towards 0 to slide down
                    'backgroundColor' : this.color,
                    'left': this.offsetY + 'px'
                }
            },
            offsetMax() {
                //get the highest offset that the dot will ever need to reach to complete its animation
                return window.innerHeight + parseInt(this.diameter)
            },
            offsetY() {
                // start dot positioned at a random position, relative to the left of the window
                // but not outside of the right side window boundary (so dots don't get cut off)
                return Math.floor(Math.random() * ((window.innerWidth - parseInt(this.diameter)) + 1));
            },
            canMove(){
                return !this.clicked && this.$store.state.dots.includes(this.$props.id) && !this.$store.state.paused
            },
            ...mapState(['paused'])
        },
        methods: {
            click() {
                this.clicked = true
                // update the score: the below formula gets us scores inverse to dot sizes
                let value = Math.round(11 - (this.diameter * .1))
                this.$store.commit('hit', value)

                // remove the dot and add a new one in 1 second
                this.$store.commit('removeDot', this.$props.id)
                setTimeout(() => {
                    this.$store.commit('addDot')
                }, 1000)
            },
            timer() {
                // setInterval can't easily be adjusted after it's set, and CSS timing adjustment causes jumping in Chrome
                // so we use a timeout loop (also remove old dots as they move off the screen to save memory)
                if(this.canMove){
                    if (this.offsetX > parseInt(this.diameter)){
                        this.$store.commit('miss');
                        this.$store.commit('removeDot', this.$props.id)
                    } else if (this.offsetX < this.offsetMax) {
                        this.offsetX += 1;
                        this.move()
                    }
                }
            },
            move() {
                setTimeout(this.timer, (this.offsetMax / this.$store.state.speed))
            }
        },
        watch: {
            paused(isPaused) {
                if(!isPaused){
                    this.move()
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    div {
        position: absolute;
        border-radius: 100%;
        z-index: 1;
        pointer-events: stroke;
        border: 2px solid black;
    }
</style>