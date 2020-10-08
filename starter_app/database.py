from dotenv import load_dotenv
from app import app, db
from app.models import User, Quiz, Question, AnswerChoice
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
                         answer=2,
                         content="Is JavaScript single threaded or multi-threaded?")

    q1a1 = AnswerChoice(content="Multi-threaded",
                        order=1,
                        questionId=1)

    q1a2 = AnswerChoice(content="Single Threaded",
                        order=2,
                        questionId=1)

    question2 = Question(quizId=1,
                         questionType="mc",
                         answer=3,
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

    question3 = Question(quizId=1,
                         questionType="mc",
                         answer=1,
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



    db.session.add(demo)
    db.session.add(jsTrivia)
    db.session.add(question1)
    db.session.add(q1a1)
    db.session.add(q1a2)
    db.session.add(question2)
    db.session.add(q2a1)
    db.session.add(q2a2)
    db.session.add(q2a3)
    db.session.add(question3)
    db.session.add(q3a1)
    db.session.add(q3a2)
    db.session.add(q3a3)
    db.session.add(q3a4)





    db.session.commit()
