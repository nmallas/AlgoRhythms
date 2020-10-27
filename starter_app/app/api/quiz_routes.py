from flask import Blueprint, jsonify, session, request
from app.models import Quiz, Question, AnswerChoice, User, AnswerJoin, Submission, IncorrectAnswers
from app import db

quiz_routes = Blueprint("quizzes", __name__)


@quiz_routes.route("/")
def get_all():
    quizzes = Quiz.query.all()
    quizinfo = []
    for quiz in quizzes:
        username = User.query.filter(User.id == quiz.userId).first().username
        quizinfo.append({"category": quiz.category, "name": quiz.name, "username": username, "id": quiz.id})
    return {"quizzes": quizinfo}



@quiz_routes.route("/", methods=["POST"])
def create_new():
    data = request.json
    previousQuiz = Quiz.query.filter(Quiz.name == data["quizName"]).first()
    if previousQuiz:
        return {"error": "A Quiz with that name already exists"}
    newQuiz = Quiz(userId=data["userId"], category=data["category"], name=data["quizName"])
    db.session.add(newQuiz)
    db.session.commit()
    quizId = Quiz.query.filter(Quiz.name == data["quizName"]).order_by(Quiz.id.desc()).first().id
    for i in range(len(data["questions"])):
        newQuestion = Question(quizId=quizId, questionType="mc", content=data["questions"][i])
        db.session.add(newQuestion)
        db.session.commit()
        questionId = Question.query.filter(Question.content == data["questions"][i]).order_by(Question.id.desc()).first().id
        allAnswerChoices = data["answerChoices"][i]
        for j in range(len(allAnswerChoices)):
            newAnswerChoice = AnswerChoice(content=allAnswerChoices[j], order=j, questionId=questionId)
            db.session.add(newAnswerChoice)
            db.session.commit()
            if(int(data["answers"][i]) == j):
                answerId = AnswerChoice.query.filter(AnswerChoice.content ==
                             allAnswerChoices[j]).order_by(AnswerChoice.id.desc()).first().id
                answer = AnswerJoin(questionId=questionId, answerChoiceId=answerId)
                db.session.add(answer)
                db.session.commit()
    return {"success": True}

@quiz_routes.route("/users/<int:id>")
def user_quizzes(id):
    quizzes = Quiz.query.filter(Quiz.userId == 1).all()
    quizinfo = []
    for quiz in quizzes:
        quizinfo.append({"category": quiz.category, "name": quiz.name, "id": quiz.id})
    return {"quizzes": quizinfo}


@quiz_routes.route("/<int:id>")
def get_one(id):
    quiz = Quiz.query.filter(Quiz.id == int(id)).first()
    quizId = quiz.id
    questions = Question.query.filter(Question.quizId == quizId).all()
    all_questions = []
    for question in questions:
        question_info = {"type": question.questionType, "content": question.content, "id": question.id}
        answers = AnswerChoice.query.filter(AnswerChoice.questionId == question.id).all()
        question_and_answers = {"question": question_info, "answers": [{"order": answer.order, "id": answer.id, "content": answer.content} for answer in answers]}
        all_questions.append(question_and_answers)
    return {quiz.name: all_questions}

@quiz_routes.route("/<int:id>", methods=["DELETE"])
def delete_one(id):
    # Find the given quiz
    quiz = Quiz.query.filter(Quiz.id == id).first()

    # Don't let users delete preseeded quizzes
    if quiz.userId == 2:
        return {"error": "You can't delete quizzes for this user"}

    # Find all submissions with submissionId
    submissions = Submission.query.filter(Submission.quizId == quiz.id).all()
    for submission in submissions:
        #Find all incorrectAnswers
        incorrectAnswers = IncorrectAnswers.query.filter(IncorrectAnswers.submissionId == submission.id).all()
        # Delete all incorrect Answers
        for incorrect in incorrectAnswers:
            db.session.delete(incorrect)
        # Delete submission
        db.session.delete(submission)

    # Find all questions with quizId
    questions = Question.query.filter(Question.quizId == quiz.id).all()
    for question in questions:
        # Find all answers and correct answer for given question
        answers = AnswerChoice.query.filter(AnswerChoice.questionId == question.id).all()
        answerJoin = AnswerJoin.query.filter(AnswerJoin.questionId == question.id).first()
        # Delete all answers
        for answer in answers:
            db.session.delete(answer)
        # Delete correct answer and question
        db.session.delete(answerJoin)
        db.session.delete(question)

    db.session.delete(quiz)
    db.session.commit()
    return {"success": True}


@quiz_routes.route("/submit", methods=["POST"])
def submit():
    data = request.json
    answers = [(k, v) for k, v in data["answers"].items()]
    incorrect = []
    correctAnswers = []
    correctChoices = []
    for answer in answers:
        correctAnswer = AnswerJoin.query.filter(AnswerJoin.questionId == int(answer[0])).first().answerChoiceId
        correctAnswers.append(correctAnswer)
        if int(answer[1]) != correctAnswer:
            incorrect.append(answer[1])
        else:
            correctChoices.append(answer[1])
    newSubmission = Submission(userId=data["userId"],
                                quizId=data["quizId"],
                                score=int(((len(answers) - len(incorrect))/len(answers)) * 100))
    db.session.add(newSubmission)
    db.session.commit()
    submission = Submission.query.filter(Submission.userId == data["userId"]).order_by(Submission.id.desc()).first()
    for answerChoice in incorrect:
        wrongAnswer = IncorrectAnswers(submissionId=submission.id, answerChoiceId=answerChoice)
        db.session.add(wrongAnswer)
    db.session.commit()
    return  {"quizId": int(data["quizId"]), "current":
            {"score": submission.score, "incorrectChoices": incorrect, "correctChoices": correctChoices, "correctAnswers": correctAnswers}}
