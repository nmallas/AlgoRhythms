from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(), nullable=False)

    def to_dict(self):
        return {
          "id": self.id,
          "email": self.email,
          "username": self.username
        }


class Quiz(db.Model):
    __tablename__ = "quizzes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    category = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=True)

    user = db.relationship("User")


class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    quizId = db.Column(db.Integer, db.ForeignKey("quizzes.id"))
    questionType = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(2500))

    quiz = db.relationship("Quiz")


class AnswerChoice(db.Model):
    __tablename__ = "answerChoices"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2500), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    questionId = db.Column(db.Integer, db.ForeignKey("questions.id"))

    question = db.relationship("Question")


class Submission(db.Model):
    __tablename__ = "submissions"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    quizId = db.Column(db.Integer, db.ForeignKey("quizzes.id"))
    score = db.Column(db.Integer, nullable=False)

    user = db.relationship("User")
    quiz = db.relationship("Quiz")


class IncorrectAnswers(db.Model):
    __tablename__ = "incorrectAnswers"

    id = db.Column(db.Integer, primary_key=True)
    submissionId = db.Column(db.Integer, db.ForeignKey("submissions.id"))
    answerChoiceId = db.Column(db.Integer, db.ForeignKey("answerChoices.id"))

    submission = db.relationship("Submission")
    answerChoice = db.relationship("AnswerChoice")
