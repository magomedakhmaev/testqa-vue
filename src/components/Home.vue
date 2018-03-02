<template>
    <div class="text-left">
        <h3 class="text-center">Questions/Answers List</h3>
        <add-question :addQuestion="addQuestion"></add-question>
        <div id="accordion" v-if="questions.length">
            <div class="card" v-for="question in questions">
                <div class="card-header" :id="`heading`+question.id">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" :data-target="`#collapse` + question.id"
                                aria-expanded="false" :aria-controls="`collapse` + question.id">
                            {{ question.question }}
                        </button>
                        <router-link class="float-right" :to="`/question/` + question.uuid"> Open question </router-link>
                    </h5>
                </div>
                <div v-if="question.Answers" :id="`collapse` + question.id" class="collapse" :aria-labelledby="`heading` + question.id" data-parent="#accordion">
                    <div class="card-body">
                        <ul class="answers">
                            <li v-for="answer in question.Answers" :key="answer.id" >{{ answer.answer }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from './../services/api';
    import AddQuestion from './modals/AddQuestion.vue';

    export default {
        components: {
            'add-question': AddQuestion
        },
        name: 'Home',
        data() {
            return {
                questions: []
            }
        },
        created() {
            this.loadQuestions();
        },
        methods: {
            loadQuestions: function() {
                Api.get('/questions').then((data) => {
                    if (data && data.questions) {
                        this.questions = data.questions;
                    }
                }).catch((err) => alert(err));
            },
            addQuestion: function (question) {
                this.questions.push(question);
            }
        }
    }
</script>


