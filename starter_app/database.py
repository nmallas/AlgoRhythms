from dotenv import load_dotenv
from app import app, db
from app.models import User, Quiz, Question, AnswerChoice, AnswerJoin
from passlib.hash import sha256_crypt

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    demo = User(email="demo@user.io",
                username="Demolition",
                hashedPassword=sha256_crypt.hash("password"))

    jsTrivia = Quiz(userId=1,
                    category="jstrivia",
                    name="JavaScipt Trivia 1")

    question1 = Question(quizId=1,
                         questionType="mc",
                         content="Is JavaScript single threaded or multi threaded?")

    q1a1 = AnswerChoice(content="Multi threaded",
                        order=1,
                        questionId=1)

    q1a2 = AnswerChoice(content="Single Threaded",
                        order=2,
                        questionId=1)

    answerJoin1 = AnswerJoin(questionId=1, answerChoiceId=2)

    question2 = Question(quizId=1,
                         questionType="mc",
                         content="What is one difference between let and var?")

    q2a1 = AnswerChoice(content="Let cannot be reassigned while var can",
                        order=1,
                        questionId=2)

    q2a2 = AnswerChoice(content="They behave exactly the same",
                        order=2,
                        questionId=2)

    q2a3 = AnswerChoice(content="Let is block scoped while var is function scoped",
                        order=3,
                        questionId=2)

    answerJoin2 = AnswerJoin(questionId=2, answerChoiceId=5)

    question3 = Question(quizId=1,
                         questionType="mc",
                         content="What is the best possible time complexity of an algorithm in general?")

    q3a1 = AnswerChoice(content="Constant",
                        order=1,
                        questionId=3)

    q3a2 = AnswerChoice(content="Exponential",
                        order=2,
                        questionId=3)

    q3a3 = AnswerChoice(content="Linear",
                        order=3,
                        questionId=3)

    q3a4 = AnswerChoice(content="Polynomial",
                        order=4,
                        questionId=3)

    answerJoin3 = AnswerJoin(questionId=3, answerChoiceId=6)



    db.session.add(demo)
    db.session.add(jsTrivia)
    db.session.add(question1)
    db.session.add(q1a1)
    db.session.add(q1a2)
    db.session.add(answerJoin1)
    db.session.add(question2)
    db.session.add(q2a1)
    db.session.add(q2a2)
    db.session.add(q2a3)
    db.session.add(answerJoin2)
    db.session.add(question3)
    db.session.add(q3a1)
    db.session.add(q3a2)
    db.session.add(q3a3)
    db.session.add(q3a4)
    db.session.add(answerJoin3)





    db.session.commit()
