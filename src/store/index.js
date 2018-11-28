import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    dots: [],
    score: 0,
    speed: 10,
    hits: 0,
    misses: 0,
    speedSliderMin: 10,
    speedSliderMax: 100,
    minDotDiameter: 10,
    maxDotDiameter: 100,
    paused: false
};

const mutations = {
    setSpeed(state, speed) {
        state.speed = speed;
    },
    addDot(state){
        //generate a random ID for the dot for keying, since we'll use the index for removals
        const dotId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
        state.dots.push(dotId)
    },
    removeDot(state, dotId){
        //remove the dot by its index
        let index = state.dots.findIndex(dot => dot === dotId);
        if(index !== -1) state.dots.splice(index, 1)
    },
    hit(state, score) {
        state.score += score
        state.hits++;
    },
    miss(state) {
        state.misses++;
    },
    pause(state) {
        state.paused = !state.paused;
    },
    reset(state){
        state.score = state.hits = state.misses = 0;
        state.paused = false;
        state.dots = [];
    }
};

const getters = {
    hitPercentage(state){
        if(state.hits === 0 && state.misses === 0){
            return '--';
        }
        return Math.round((state.misses === 0 ? 1 : (state.hits / state.misses)) * 100);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
})