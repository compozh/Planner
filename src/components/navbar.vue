<template>

    <b-navbar toggleable="sm" type="dark" variant="info" class="p-1 shadow-sm">

        <b-navbar-brand class="logo" href="/">
            <img src="../assets/logo.png" class="d-inline-block align-top">
            <h2 class="logo d-inline-block">Planner</h2>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
                <b-btn class="m-2 nav-btn shadow-sm align-self-center" size="sm" href="/nomenclature">Номенклатура</b-btn>
                <b-btn class="m-2 nav-btn shadow-sm align-self-center" size="sm" href="/orders">Заказы</b-btn>
                <b-btn class="m-2 nav-btn shadow-sm align-self-center" size="sm" href="/prodCard/new">Карточка продукции</b-btn>
                <b-btn class="m-2 nav-btn shadow-sm align-self-center" size="sm" href="/testing">Тестирование</b-btn>
                <b-btn class="m-2 nav-btn shadow-sm align-self-center" size="sm" href="http://localhost:3000">Сервер</b-btn>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="/auth">Вход</b-dropdown-item>
                    <b-dropdown-item href="#">Профиль</b-dropdown-item>
                    <b-dropdown-item href="#">Регистрация</b-dropdown-item>
                    <b-dropdown-item href="#">Выход</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
    .logo {
        padding: 0;
        margin: 0;
    }
    .nav-btn {
        background: rgba(170, 245, 247, 0.3);
        color: #aaf5f7;
    }
    .nav-btn:hover {
        background: rgba(170, 245, 247, 0.5);
        color: #eeffff;
    }
    .nav-btn:active {
        background: rgba(170, 245, 247, 0.5);
        color: #eeffff;
    }
    img {
        width: 50px;
    }
</style>