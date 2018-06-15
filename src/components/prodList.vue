<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-link v-b-toggle.collapse @click="showFilters"><i class="ion-connection-bars pl-1 pr-1"></i>{{ collapse ? 'Скрыть' : 'Отобразить' }} фильтры</b-link>
        <b-collapse id="collapse">
            <b-card>
                <b-row>
                    <b-col cols="3">
                        <b-form-group label="Поиск по содержимому:"
                                      label-size="sm"
                                      class="m-0">
                            <b-input-group>
                                <b-form-input size="sm" v-model="filter" placeholder="Введите текст для поиска"/>
                                <b-input-group-append>
                                    <b-btn size="sm" :disabled="!filter" @click="filter = ''">Очистить</b-btn>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group label="Сортировка по полю:"
                                      label-size="sm"
                                      class="m-0">
                            <b-input-group>
                                <b-form-select size="sm" v-model="sortBy" :options="sortOptions">
                                    <option slot="first" :value="null">-- none --</option>
                                </b-form-select>
                                <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                    <option :value="false">Asc</option>
                                    <option :value="true">Desc</option>
                                </b-form-select>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="2">
                        <b-form-group label="Записей на странице"
                                      label-size="sm"
                                      class="m-0">
                            <b-form-select size="sm" :options="pageOptions" v-model="perPage"/>
                        </b-form-group>
                    </b-col>
                    <b-col cols="2">
                        <b-form-group label="Переключение страниц:"
                                      label-size="sm"
                                      class="m-0">
                        <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage" v-model="currentPage"/>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </b-collapse>
        <!-- Main table element -->
        <b-table small
                 striped
                 hover
                 bordered
                 caption
                 show-empty
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 :filter="filter"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 @filtered="onFiltered"
                 @row-dblclicked="info"
        >
            <!--<template slot="name" slot-scope="row">{{ row.value.first }} {{ row.value.last }}</template>-->
            <!--<template slot="isActive" slot-scope="row">{{ row.value ? 'Yes :)' : 'No :(' }}</template>-->
            <template slot="actions" slot-scope="row" >
                <span @click="row.toggleDetails">{{ row.detailsShowing ? '&#9660' : '&#9776' }}</span>
                <span class="ion-edit" @click=""></span>
                <span class="ion-android-folder" @click=""></span>
                <span class="ion-android-mail" @click=""></span>
                <span class="ion-close-circled" @click="delItem(row.item)"></span>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                </b-card>
            </template>
            <template slot="table-caption">
                <b-row>
                    <b-col cols="3">
                        <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                    </b-col>
                    <b-col>
                        <b-alert size="sm" show variant="light" class="text-right p-1">Всего записей: {{ items.length }}</b-alert>
                    </b-col>
                </b-row>
            </template>
        </b-table>

        <!-- Info modal -->
        <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
        </b-modal>

    </b-container>
</template>

<script>
    const items = [];

    export default {
        data () {
            return {
                items: [],
                fields: [
                    { key: 'article', label: 'Артикул', sortable: true, 'class': 'text-center' },
                    { key: 'article1s', label: 'Артикул 1С', sortable: true, 'class': 'text-center' },
                    { key: 'name', label: 'Наименование продукции', sortable: true },
                    { key: 'unit', label: 'Ед. изм.', 'class': 'text-center' },
                    { key: 'barcode', label: 'Штрих-код', 'class': 'text-center' },
                    { key: 'actions', label: 'Действие' }
                ],
                currentPage: 1,
                perPage: 10,
                totalRows: items.length,
                pageOptions: [ 10, 15, 25, 50 ],
                sortBy: null,
                sortDesc: false,
                filter: null,
                modalInfo: { title: '', content: '' },
                collapse: false
            }
        },
        created () {
            this.readData ();
        },
        computed: {
            sortOptions () {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => { return { text: f.label, value: f.key } })
            }
        },
        methods: {
            info (item, index, button) {
                this.modalInfo.title = item.name;
                this.modalInfo.content = JSON.stringify(item, null, 2);
                this.$root.$emit('bv::show::modal', 'modalInfo', button);
            },
            resetModal () {
                this.modalInfo.title = '';
                this.modalInfo.content = '';
            },
            onFiltered (filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1;
            },
            showFilters () {
                this.collapse = !this.collapse;
            },
            readData () {
                this.$socket.emit('readData');
            },
            addItem () {
                this.$socket.emit('addItem');
            },
            delItem (item) {
                if (confirm(`Удалить позицию из базы данных?: \n - ${item.name}`))
                this.$socket.emit('delItem', item._id);
            }
        },
        sockets: {
            readData(data) {
                this.items = data
            },
            updData() {
                this.readData ();
            },
            addItem(data) {
                console.log('socket addItem from server');
                this.items.unshift(data);
            },
            delItem() {
                console.log('socket delItem from server');
                this.items.pop();
            }
        },
    }
</script>

<style scoped>
    span {
        font-size: 16px;
        color: #4b4b4b;
        cursor: pointer;
        margin-left: 5px;
    }
    span:hover {
        color: #1b6d85;
    }
    .details:hover {
        color: #009c1f;
    }
    .ion-close-circled:hover {
        color: #c5232a;
        height: 10px;
    }
</style>