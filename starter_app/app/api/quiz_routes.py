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
    print(data)
    previousQuiz = Quiz.query.filter(Quiz.name == data["quizName"]).first()
    if previousQuiz:
        return {"error": "A Quiz with that name already exists"}
    newQuiz = Quiz(userId=data["userId"], category=data["category"], name=data["quizName"])
    db.session.add(newQuiz)
    db.session.commit()
    quizId = Quiz.query.filter(Quiz.name == data["quizName"]).order_by(Quiz.id.desc()).first().id
    print(quizId)
    for i in range(len(data["questions"])):
        newQuestion = Question(quizId=quizId, questionType="mc", content=data["questions"][i])
        db.session.add(newQuestion)
        db.session.commit()
        questionId = Question.query.filter(Question.content == data["questions"][i]).order_by(Question.id.desc()).first().id
        print(questionId)
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
    correctChoices = []
    print(data, answers)
    for answer in answers:
        correctAnswer = AnswerJoin.query.filter(AnswerJoin.questionId == int(answer[0])).first().answerChoiceId
        correctAnswers.append(correctAnswer)
        print(correctAnswer, answer[1])
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
