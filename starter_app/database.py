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

    nick = User(email="nick@aol.com",
                username="NickM",
                hashedPassword=sha256_crypt.hash("password"))

    jsTrivia = Quiz(userId=1,
                    category="jsTrivia",
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


    jsTrivia2 = Quiz(userId=1,
                    category="jsTrivia",
                    name="JavaScipt Trivia 2")


    quiz2_question1 = Question(quizId=2,
                         questionType="mc",
                         content="What is context in JavaScript")

    quiz2_q1a1 = AnswerChoice(content="The value of 'this'",
                        order=1,
                        questionId=4)

    quiz2_q1a2 = AnswerChoice(content="The file that is currently running",
                        order=2,
                        questionId=4)

    quiz2_q1a3 = AnswerChoice(content="The identifier used to declare a variable (let/var/const)",
                        order=3,
                        questionId=4)

    quiz2_answerJoin1 = AnswerJoin(questionId=4, answerChoiceId=10)


    quiz2_question2 = Question(quizId=2,
                         questionType="mc",
                         content="Which HTTP method is typically used to submit form data?")

    quiz2_q2a1 = AnswerChoice(content="GET",
                        order=1,
                        questionId=5)

    quiz2_q2a2 = AnswerChoice(content="DELETE",
                        order=2,
                        questionId=5)

    quiz2_q2a3 = AnswerChoice(content="POST",
                        order=3,
                        questionId=5)

    quiz2_q2a4 = AnswerChoice(content="HEAD",
                        order=4,
                        questionId=5)

    quiz2_answerJoin2 = AnswerJoin(questionId=5, answerChoiceId=15)

    quiz2_question3 = Question(quizId=2,
                         questionType="mc",
                         content="Which method CANNOT be used in JavaScript to handle asyncronous code?")

    quiz2_q3a1 = AnswerChoice(content="async/await",
                        order=1,
                        questionId=6)

    quiz2_q3a2 = AnswerChoice(content="sleep()",
                        order=2,
                        questionId=6)

    quiz2_q3a3 = AnswerChoice(content="then()",
                        order=3,
                        questionId=6)

    quiz2_answerJoin3 = AnswerJoin(questionId=6, answerChoiceId=18)


    quiz2_question4 = Question(quizId=2,
                         questionType="mc",
                         content="Which of the following values is truthy in JavaScript")

    quiz2_q4a1 = AnswerChoice(content='""',
                        order=1,
                        questionId=7)

    quiz2_q4a2 = AnswerChoice(content="null",
                        order=2,
                        questionId=7)

    quiz2_q4a3 = AnswerChoice(content="undefined",
                        order=3,
                        questionId=7)

    quiz2_q4a4 = AnswerChoice(content="'false'",
                        order=4,
                        questionId=7)

    quiz2_q4a5 = AnswerChoice(content="NAN",
                        order=5,
                        questionId=7)

    quiz2_answerJoin4 = AnswerJoin(questionId=7, answerChoiceId=23)



    pyTrivia1 = Quiz(userId=2,
                    category="py_trivia",
                    name="Python Trivia 1")


    quiz3_question1 = Question(quizId=3,
                         questionType="mc",
                         content="What is the difference between lists and tuples?")

    quiz3_q1a1 = AnswerChoice(content="Lists can be iterated over while tuples can't be",
                        order=1,
                        questionId=8)

    quiz3_q1a2 = AnswerChoice(content="Lists are mutable, tuples are immutable",
                        order=2,
                        questionId=8)

    quiz3_q1a3 = AnswerChoice(content="There is no difference between the two",
                        order=3,
                        questionId=8)

    quiz3_answerJoin1 = AnswerJoin(questionId=8, answerChoiceId=26)


    quiz3_question2 = Question(quizId=3,
                         questionType="mc",
                         content="How can ternary operators be used in python?")

    quiz3_q2a1 = AnswerChoice(content="[on_true] if [expression] else [on_false]",
                        order=1,
                        questionId=9)

    quiz3_q2a2 = AnswerChoice(content="[on_true] ? [expression] : [on_false]",
                        order=2,
                        questionId=9)

    quiz3_q2a3 = AnswerChoice(content="[on_true] && [expression] || [on_false]",
                        order=3,
                        questionId=9)


    quiz3_answerJoin2 = AnswerJoin(questionId=9, answerChoiceId=28)

    quiz3_question3 = Question(quizId=3,
                         questionType="mc",
                         content="Which method CANNOT be used to retrieve the last character in a string?")

    quiz3_q3a1 = AnswerChoice(content="string[-1]",
                        order=1,
                        questionId=10)

    quiz3_q3a2 = AnswerChoice(content="string[len(string)-1]",
                        order=2,
                        questionId=10)

    quiz3_q3a3 = AnswerChoice(content="string[-1:]",
                        order=3,
                        questionId=10)

    quiz3_q3a4 = AnswerChoice(content="string.last()",
                        order=4,
                        questionId=10)

    quiz3_answerJoin3 = AnswerJoin(questionId=10, answerChoiceId=34)





    db.session.add(demo)
    db.session.add(nick)
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

    db.session.add(jsTrivia2)
    db.session.add(quiz2_question1)
    db.session.add(quiz2_q1a1)
    db.session.add(quiz2_q1a2)
    db.session.add(quiz2_q1a3)
    db.session.add(quiz2_answerJoin1)
    db.session.add(quiz2_question2)
    db.session.add(quiz2_q2a1)
    db.session.add(quiz2_q2a2)
    db.session.add(quiz2_q2a3)
    db.session.add(quiz2_q2a4)
    db.session.add(quiz2_answerJoin2)
    db.session.add(quiz2_question3)
    db.session.add(quiz2_q3a1)
    db.session.add(quiz2_q3a2)
    db.session.add(quiz2_q3a3)
    db.session.add(quiz2_answerJoin3)
    db.session.add(quiz2_question4)
    db.session.add(quiz2_q4a1)
    db.session.add(quiz2_q4a2)
    db.session.add(quiz2_q4a3)
    db.session.add(quiz2_q4a4)
    db.session.add(quiz2_q4a5)
    db.session.add(quiz2_answerJoin4)

    db.session.add(pyTrivia1)
    db.session.add(quiz3_question1)
    db.session.add(quiz3_q1a1)
    db.session.add(quiz3_q1a2)
    db.session.add(quiz3_q1a3)
    db.session.add(quiz3_answerJoin1)
    db.session.add(quiz3_question2)
    db.session.add(quiz3_q2a1)
    db.session.add(quiz3_q2a2)
    db.session.add(quiz3_q2a3)
    db.session.add(quiz3_answerJoin2)
    db.session.add(quiz3_question3)
    db.session.add(quiz3_q3a1)
    db.session.add(quiz3_q3a2)
    db.session.add(quiz3_q3a3)
    db.session.add(quiz3_q3a4)
    db.session.add(quiz3_answerJoin3)

    db.session.commit()
