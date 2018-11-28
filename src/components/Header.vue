<template>
    <div class="header" id="header">
        <div class="primary">
            <Statistics />
            <Controls />
        </div>
        <Slider />
    </div>
</template>

<script>
    import Slider from './Header/Slider'
    import Controls from './Header/Controls'
    import Statistics from './Header/Statistics'

    export default {
        name: "Header",
        components: { Slider, Controls, Statistics },
    }
</script>

<style lang="scss" scoped>
    .header {
        position:relative;
        z-index: 10;
        background: #EEE;
        padding: 10px;
        border-bottom: 1px solid #CCC;
        align-items: center;
        .primary {
            display: flex;
            text-align: left;
            margin-bottom: 10px;
            justify-content: space-between;
            align-items: center;
            letter-spacing: 4px;
        }
    }
</style>