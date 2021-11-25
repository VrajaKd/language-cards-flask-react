from app import db
from marshmallow import Schema, fields


class Cards(db.Model):
    __tablename__ = 'cards'

    priority = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(200), nullable=False)
    phrase_tag = db.Column(db.String(200), nullable=False)
    context = db.Column(db.String(200), nullable=False)
    form_translation = db.Column(db.String(200), nullable=False)
    context_translation = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return "<Cards %r>" % self.word

class CardsSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ("priority", "word", "phrase_tag", "context", "form_translation", "context_translation")

card_schema = CardsSchema()
cards_schema = CardsSchema(many=True)


class Answers(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(200), nullable=False)
