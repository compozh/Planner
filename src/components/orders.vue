<template>
    <b-container>
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputFile" accept=".xls, .xlsx">
            <label class="custom-file-label" for="inputFile">Выбирите файл...</label>
        </div>
        <b-button variant="secondary" id="saveBtn">Сохранить</b-button>
    </b-container>
</template>

<script>
    export default {
        data () {
            return {
                file: null,
            }
        }
    }
</script>

<style scoped>
    .custom-file {
        max-width: 500px;
        margin: 20px 0;
    }
    #saveBtn {
        display: inline-block;
position: absolute;
        margin: 20px 10px;
    }
</style>