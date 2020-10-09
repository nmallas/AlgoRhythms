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
    print(quizinfo)
    return {"quizzes": quizinfo}

@quiz_routes.route("/<int:id>")
def get_one(id):
    quiz = Quiz.query.filter(Quiz.id == int(id)).first()
    quizId = quiz.id
    questions = Question.query.filter(Question.quizId == quizId).all()
    print(questions)
    all_questions = []
    for question in questions:
        question_info = {"type": question.questionType, "content": question.content, "id": question.id}
        answers = AnswerChoice.query.filter(AnswerChoice.questionId == question.id).all()
        question_and_answers = {"question": question_info, "answers": [{"order": answer.order, "id": answer.id, "content": answer.content} for answer in answers]}
        print(question_and_answers)
        all_questions.append(question_and_answers)
    return {quiz.name: all_questions}


@quiz_routes.route("/submit", methods=["POST"])
def submit():
    data = request.json
    answers = [(k, v) for k, v in data["answers"].items()]
    incorrect = []
    correctAnswers = []
    print(data, answers)
    for answer in answers:
        correctAnswer = AnswerJoin.query.filter(AnswerJoin.questionId == int(answer[0])).first().answerChoiceId
        correctAnswers.append(correctAnswer)
        print(correctAnswer, answer[1])
        if int(answer[1]) != correctAnswer:
            incorrect.append(answer[1])
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
    return {"quizId": int(data["quizId"]), "latest": {"score": submission.score, "incorrectChoices": incorrect, "correctAnswers": correctAnswers}}
