from flask import jsonify, request, redirect
from app import create_app, db
from funcs.change_phrase_tags import change_phrase_tags
from models import Cards, card_schema, Answers
import csv
from dotenv import load_dotenv

load_dotenv()

# Create an application instance
app = create_app()


@app.before_first_request
def before_request_func():
    # Create databases
    db.create_all()

    # Read from CSV file and add to the database table if not added yet
    rows_count = db.session.query(Cards).count()
    if rows_count == 0:
        # Read card csv
        with open('content.csv', 'r', encoding="utf8") as file:
            reader = csv.reader(file)
            # Save CSV content to database
            for row in reader:
                if row[0].isnumeric():
                    card = Cards(priority=int(row[0]),
                                 word=row[1],
                                 phrase_tag=row[2],
                                 context=row[3],
                                 form_translation=row[4],
                                 context_translation=row[5]
                                 )
                    db.session.add(card)
                    db.session.commit()
                db.session.close()


@app.route("/api/guess", methods=["POST", "GET"], strict_slashes=False)
def add_card():
    priority = 1
    answer = ''
    word = ''

    # Get data from client
    try:
        priority = request.json['priority_no']
        answer = request.json['answer']
        word = request.json['word']
    except Exception as e:
        print(f'Get data from client error: {e}')

    if answer:
        # Save answers
        answers = Answers(word=word, answer=answer)

        if word:
            db.session.add(answers)
            db.session.commit()

    if priority:
        # Get cards from database
        card = Cards.query.filter_by(priority=priority).first().__dict__
        card = card_schema.dump(card)

        # Change phrase tags
        card = change_phrase_tags(card)

        return jsonify(card)
    return ''


if __name__ == "__main__":
    app.run(debug=True)
