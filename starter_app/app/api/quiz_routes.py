from flask import Blueprint, jsonify, session, request
from app.models import Quiz, Question, AnswerChoice, User
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
        question_info = {"type": question.questionType, "answer": question.answer, "content": question.content}
        answers = AnswerChoice.query.filter(AnswerChoice.questionId == question.id).all()
        question_and_answers = {"question": question_info, "answers": [{"order": answer.order, "content": answer.content} for answer in answers]}
        print(question_and_answers)
        all_questions.append(question_and_answers)
    return {quiz.name: all_questions}
