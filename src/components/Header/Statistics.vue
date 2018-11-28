<template>
    <div>
        <div class="score">{{ score }}<span class="small">pts</span></div>
        <ul class="data">
            <li><font-awesome-icon icon="check" class="small"/> {{ hits }}</li>
            <li><font-awesome-icon icon="times" class="small"/> {{ misses }}</li>
            <li>{{ hitPercentage }}%</li>
        </ul>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    export default {
        name: "Statistics",
        computed: {
            ...mapGetters(['hitPercentage']),
            ...mapState(['score', 'hits', 'misses'])
        }
    }
</script>

<style lang="scss" scoped>
    .score {
        font-size: 36px;
        margin-bottom: 10px;
        .small {
            font-size: 21px;
        }
    }
    .data {
        font-size: 14px;
        > li {
            display: inline-block;
            &:not(:last-child):after {
                content: '/';
                padding: 0 0 0 10px;
            }
        }
        .small {
            font-size: 11px;
        }
    }
</style>