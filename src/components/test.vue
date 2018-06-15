<template>
    <div>
        <p v-if="isConnected">We're connected to the server!</p>
        <p><a href="http://localhost:3000">http://localhost:3000</a></p>
        <p>Message from server: "{{socketMessage}}"</p>
        <button @click="pingServer">Ping Server</button>
        <button @click="showData">Просмотр данных</button>
        <button @click="reqTest">Запрос страницы с сервера через сокет</button>

        <table>
            <tr>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isConnected: false,
                socketMessage: '',
                getData: '',
            }
        },
        sockets: {
            connect() {
                // Fired when the socket connects.
                this.isConnected = true;
            },
            disconnect() {
                this.isConnected = false;
            },
            // Fired when the server sends something on the "messageChannel" channel.
            messageChannel(data) {
                this.socketMessage = data
            },
            // Fired when the server sends something on the "messageChannel" channel.
            server(data) {
                this.socketMessage = data
            },
            // Fired when the server sends something on the "messageChannel" channel.
            getData(data) {
                this.getData = data
            }
        },
        methods: {
            pingServer () {
                // Send the "pingServer" event to the server.
                this.$socket.emit('pingServer', 'PING!')
            },
            showData () {
                this.$socket.emit('showData', 'PING!')
            },
            reqTest () {
                this.$socket.emit('reqTest', 'http://localhost:3000')
            }
        }
    }
</script>