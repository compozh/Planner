<template>
    <div>
        <b-card no-body>
            <b-tabs card>
                <!-- Render Tabs -->
                <b-tab :title="`Вкладка ${i}`" v-for="i in tabs" :key="i">

                    <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">
                        Close tab
                    </b-btn>
                </b-tab>

                <!-- New Tab Button (Using tabs slot) -->
                <b-nav-item slot="tabs" @click.prevent="newTab" href="#">
                    +
                </b-nav-item>

                <!-- Render this if no tabs -->
                <div slot="empty" class="text-center text-muted">
                    There are no open tabs
                    <br> Open a new tab using + button.
                </div>
            </b-tabs>
        </b-card>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                tabs: [],
                tabCounter: 0
            }
        },
        methods: {
            closeTab (x) {
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i] === x) {
                        this.tabs.splice(i, 1)
                    }
                }
            },
            newTab () {
                this.tabs.push(this.tabCounter++)
            }
        }
    }
</script>