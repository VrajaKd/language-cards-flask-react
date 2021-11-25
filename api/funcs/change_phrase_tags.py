def change_phrase_tags(card):
    phrase_tags = {'DT': 'Bestimmer', 'NN': 'Substantiv', 'PP': 'Personalpronomen', 'VV': 'Verb',
                   'VVZ': 'Verb, Präsens 3. S.singen.'}

    for tag in phrase_tags:
        if card['phrase_tag'] == tag:
            card['phrase_tag'] = phrase_tags[tag]

    return card
