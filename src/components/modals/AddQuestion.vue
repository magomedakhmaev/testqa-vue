<template>
    <div id="add-question">
        <button type="button" class="btn btn-sm btn-primary mb-2" data-toggle="modal" data-target="#add-question-modal">
            Add Question
        </button>
        <div class="modal fade" id="add-question-modal" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="add-question-modal-title">Add Question</h5>
                        <button type="button" class="close" id="close-question-modal" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit="saveQuestion">
                            <div class="form-group">
                                <input type="text" class="form-control" id="questionInput" name="question" v-model="question" required />
                                <div v-if="errors.question" class="alert-danger">Question cannot be empty</div>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="Add"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from './../../services/api';

    export default {
        name: 'AddQuestion',
        data() {
            return {
                question: '',
                errors: {}
            }
        },
        props: ['addQuestion'],
        methods: {
            saveQuestion: function(e) {
                e.preventDefault();
                if (!this.question) {
                    return this.errors.question = 'Question cannot be empty';
                }

                Api.post('/questions', {question: this.question}).then((data) => {
                    document.getElementById('close-question-modal').click();
                    this.$props.addQuestion(data.question);
                });
            }
        }
    }
</script>