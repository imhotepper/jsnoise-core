<template>

    <div class="container">
        <div id="flow">
            <span class="flow-1"></span>
            <span class="flow-2"></span>
            <span class="flow-3"></span>
        </div>
        <div class="section">


            <div >
                <span class="flow-1"></span>
                <span class="flow-2"></span>
                <span class="flow-3"></span>
            </div>
            <div class="section card">
                <h3>Producers list</h3>
                <div >
                    <form @submit.prevent="add" class="pv4 bt bb b--black-10 ph3 ph0-l">
                        <input type="text" v-model="producer.name" required placeholder="producer name">
                        <input type="url" v-model="producer.url" required placeholder="producer url">
                        <input type="url" v-model="producer.feedUrl" required placeholder="feeds url">
                        <button>add</button>
                    </form>

                </div>
                <div class="card-content">
                    <div v-for="p in producers" :key="p.feedUrl"> {{p.name}} ({{p.count}} shows)</div>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {...mapGetters(['producers'])},
        data: function () {
            return {
                producer: {name: '', website: '', feedUrl: ''}
            }
        },
        methods: {
            ...mapActions(['loadProducers', 'saveProducer']),
            add: function () {
                this.saveProducer(this.producer);
                this.producer = {name: '', website: '', feedUrl: ''};
            },
            getEmptyPriducer: function () {
                return {name: '', url: '', feedUrl: ''};
            },
            saveProducers: function () {
                localStorage.setItem("producers", JSON.stringify(this.producers));
            },
            load: function () {
                this.loadProducers();
            }
        },
        created: function () {
            this.load();
        }
    }
</script>

