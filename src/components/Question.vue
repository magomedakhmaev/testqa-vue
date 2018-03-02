<template>
    <div class="container text-left">
        <router-link :to="'/'">
            <i class="fa fa-home fa-2x"></i>
        </router-link>
        <div class="jumbotron" v-if="question">
            <h2 class="text-center">{{ question.question }}</h2>
            <h4>Your answer</h4>
            <div id="answer-form">
                <form @submit="saveAnswer">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="answer" required />
                        <div v-if="errors.answer" class="alert-danger">{{ errors.answer }}</div>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary btn-md" value="Send answer" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from './../services/api';
    export default {
        name: 'Question',
        data() {
            return {
                errors: {},
                question: {},
                answer: ''
            }
        },
        created() {
            this.loadQuestion();
        },
        methods: {
            loadQuestion: function() {
                Api.get('/questions/' + this.$route.params.uuid).then((question) => {
                    if (question) {
                        this.question = question;
                    }
                });
            },
            saveAnswer: function(e) {
                e.preventDefault();
                if (!this.answer) {
                    return this.errors.answer = 'Answer cannot be empty'
                }

                const data = {
                    uuid: this.$route.params.uuid,
                    answer: this.answer
                };
                Api.post('/answers', data).then((results) => {
                    if (results) {
                        this.$router.push('/');
                    }
                });
            }
        }
    }
</script>