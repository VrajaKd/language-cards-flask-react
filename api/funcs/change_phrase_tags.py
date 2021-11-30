def change_phrase_tags(card):
    phrase_tags = {'DT': 'Bestimmer', 'NN': 'Substantiv', 'PP': 'Personalpronomen', 'VV': 'Verb',
                   'VVZ': 'Verb, Präsens 3. S.singen.'}

    card['phrase_tag'] = phrase_tags.get(card['phrase_tag'])

    return card
