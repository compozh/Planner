<template>
    <div>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Основные" active>
                    <b-card bg-variant="light">
                        <b-form>
                            <b-row>
                                <b-col cols="2">
                                    <b-form-group label="Артикул:"
                                                  label-size="sm"
                                                  label-for="article"
                                                  description="Артикул ЕКТ, не более 6 цифр">
                                        <b-form-input id="article"
                                                      type="number"
                                                      size="sm"
                                                      v-model="form.article"
                                                      required
                                                      placeholder="Артикул">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="3">
                                    <b-form-group label="Артикул 1C:"
                                                  label-size="sm"
                                                  label-for="article1s"
                                                  description="Артикул 1C, 12 знаков начиная с 'ВГ-' + 9 цыфр">
                                        <b-form-input id="article1s"
                                                      type="text"
                                                      size="sm"
                                                      v-model="form.article1s"
                                                      required
                                                      placeholder="ВГ-000...">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="5">
                                    <b-form-group label="Название:"
                                                  label-size="sm"
                                                  label-for="prodName">
                                        <b-form-input id="prodName"
                                                      type="text"
                                                      size="sm"
                                                      v-model="form.name"
                                                      required
                                                      placeholder="Введите название"></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="4">
                                    <b-form-group label="Штрих-код:"
                                                  label-size="sm"
                                                  label-for="barcode"
                                                  description="Штрих-код EAN - 13 цифр или внутренный - 9 цифр">
                                        <b-form-input id="barcode"
                                                      type="number"
                                                      size="sm"
                                                      v-model="form.barcode"
                                                      required
                                                      placeholder="Штрих-код">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="2">
                                    <b-form-group label="Единици изм."
                                                  label-size="sm"
                                                  label-for="btnradios">
                                        <b-form-radio-group id="btnradios"
                                                            buttons
                                                            button-variant="outline-primary"
                                                            size="sm"
                                                            v-model="form.unit"
                                                            :options="radioOptions">
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-button type="submit"
                                      size="sm"
                                      variant="primary"
                                      @click="onSubmit">
                                      Сохранить
                            </b-button>
                            <b-button type="reset"
                                      size="sm"
                                      variant="secondary">
                                      Очистить
                            </b-button>
                        </b-form>
                    </b-card>
                </b-tab>
                <b-tab title="Логданные">
                    <h6>This tab does not have the no-body prop set</h6>
                </b-tab>
                <b-tab title="Транспортировка">
                    <h6>This tab does not have the no-body prop set</h6>
                </b-tab>
                <b-tab title="Спецификация">
                    <h6>This tab does not have the no-body prop set</h6>
                </b-tab>
                <b-tab title="Другое">
                    <h6>This tab does not have the no-body prop set</h6>
                </b-tab>
            </b-tabs>
        </b-card>
        <b-modal size="sm"
                 ok-only
                 title="Результат:"
                 v-model="alertModal.show">
            <p class="my-4">{{ alertModal.text }}</p>
        </b-modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    article: '',
                    article1s: '',
                    name: '',
                    barcode: '',
                    unit: '',
                    message: ''
                },
                radioOptions: [
                    { text: 'кг', value: 'кг' },
                    { text: 'шт.', value: 'шт.' },
                    { text: 'км', value: 'км' }
                ],
                alertModal: {
                    text: '',
                    show: false
                },
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                this.$socket.emit('prodCreate', this.form);
            },
            onReset (evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.article = '';
                this.form.article1s = '';
                this.form.name = '';
                this.form.barcode = '';
                this.form.unit = '';
            }
        },
        sockets: {
            saveResultMessage (message) {
                this.alertModal = {
                    text: message,
                    show: true
                }
            }
        },
    }
</script>

<style scoped>

</style>