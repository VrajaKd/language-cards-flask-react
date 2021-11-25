import React, {useState, useRef, useEffect} from 'react';
import Container from 'react-bootstrap/Container';

import './Guess.css';


function Guess() {

  // Set deifferent status variables
  const [input, setInput] = useState('');
  const [Correct, setCorrect] = useState('');
  const [loadedPriority, setLoadedPriority] = useState([]);
  const [loadedProgressWidth, setProgressWidth] = useState([]);
  const [loadedWord, setloadedWord] = useState([]);
  const [loadedPhraseTag, setPhraseTag] = useState([]);
  const [loadedContextBefore, setLoadedContextBefore] = useState([]);
  const [loadedContextAfter, setLoadedContextAfter] = useState([]);
  const [loadedFormTranslation, setFormTranslation] = useState([]);
  const [loadedContextTranslation, setContextTranslation] = useState([]);
  const [msgColor, setMsgColor] = useState([]);

  // Handle cards subfunction
  function runFetch(cardNo, answer) {
    // Get data from server
    fetch(
      'http://localhost:5000/api/guess',
      {
        method: 'POST',
        body: JSON.stringify({priority_no: cardNo, answer: answer, word: loadedWord}),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Set progress bar width
        setProgressWidth({width: cardNo * 2 + "%"});

        const word = data.word;
        setloadedWord(word);

        setPhraseTag(data.phrase_tag);

        // Handle context text
        let cleanContext = data.context.replace("?", "");
        cleanContext.replace("!", "");
        cleanContext.replace(".", "");

        const context = cleanContext.split(' ');
        const lowerCased = context.map(name => name.toLowerCase());
        const wordToLowerCase = word.toLowerCase()
        const index = lowerCased.indexOf(wordToLowerCase);

        if (index === -1) {
          const context_before = context.slice(0, index);
          setLoadedContextBefore(context_before.join(' '));

          const context_after = '';
          setLoadedContextAfter(context_after);
        } else if (index === 0) {
          const context_before = '';
          setLoadedContextBefore(context_before);

          const context_after = context.slice(index + 1);
          setLoadedContextAfter(context_after.join(' '));
        } else {
          const context_before = context.slice(0, index);
          setLoadedContextBefore(context_before.join(' '));

          const context_after = context.slice(index + 1);
          setLoadedContextAfter(context_after.join(' '));
        }

        setFormTranslation(data.form_translation);

        const context_translation = data.context_translation;
        setContextTranslation(context_translation);

      });
  }

  // Handle cards main function
  function submitHandler(event) {
    let cardNo = loadedPriority;
    if (event !== 'firstLoad') {
      event.preventDefault();
    }

    if (event === 'firstLoad') {
      cardNo = 1;
    }

    if (loadedPriority.length === 0) {
      cardNo = loadedPriority + 1;
    }

    // Check that card number is less than or equal to 50
    if (loadedPriority <= 50) {
      runFetch(cardNo);

      // Handle correct answers
      if (input === String(loadedWord) && String(loadedWord)) {
        setMsgColor({color: "#5c9f46"});
        setCorrect('Correct!');
        if (loadedPriority.length === 0) {

          setLoadedPriority(Number(loadedPriority) + 2);
          cardNo = loadedPriority + 2;
        } else {
          setLoadedPriority(Number(loadedPriority) + 1);
          cardNo = loadedPriority + 1;
        }

        if (cardNo > 50) {
          return
        }

        setTimeout(
          function () {
            setCorrect('');
            setInput('');

            runFetch(cardNo, input);

          }, 2000);

      //  Handle wrong answers
      } else if ((input !== String(loadedWord) && String(loadedWord)) || (event !== 'firstLoad' && !input)) {
        setMsgColor({color: "#cc5858"});
        setCorrect('Try again!');

        // Send answers to the database
        fetch(
          'http://localhost:5000/api/guess',
          {
            method: 'POST',
            body: JSON.stringify({priority_no: cardNo, word:loadedWord, answer: input}),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        setTimeout(
          function () {
            setCorrect('');
            setInput('');
          }, 2000);
      }
    }
  }

  // Run card on first page load
  useEffect(() => {
    submitHandler('firstLoad')
  }, []);

  // Set the stretch input
  const [content, setContent] = useState('');
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);

  const changeHandler = evt => {
    setContent(evt.target.value);
  };

  return (
    <Container>
      <div className="p-4 pb-0 bg-white shadow-sm header-card" style={msgColor}>
        {Correct}
      </div>

      <form onSubmit={submitHandler}>
        <div className="p-4 bg-white shadow-sm main-card">
          <div className="learn-content">
            {loadedContextBefore}
            <span id="hide" ref={span}>{content}</span>
            <input id="textbox" type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off"
                   spellCheck="false" data-word="afraid" data-lpignore="true" className="answer-input"
                   style={{width}} autoFocus onChange={changeHandler} value={input}
                   onInput={e => setInput(e.target.value)}/>
            {loadedContextAfter}
          </div>
          <div className="row pt-4">
            <div>
            <span className="card-grammar">
              {loadedPhraseTag}
            </span>
            </div>
          </div>
        </div>

        <div className="p-4 shadow-sm footer-card">
          <h3>{loadedFormTranslation}</h3>
          {loadedContextTranslation}
        </div>

        <Container className="p-3 mb-5 bg-white shadow-sm guess-footer position-absolute bottom-0">
          <div className="row">
            <div className="col-1 pt-1 text-end">
              <span>0</span>
            </div>
            <div className="col-6 pt-2">
              <div className="progress" style={{height: "10px"}}>

                <div className="progress-bar bg-success" role="progressbar" style={loadedProgressWidth}
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
              </div>
            </div>
            <div className="col-1 pt-1 text-start">
              <span>50</span>
            </div>
            <div className="col-4 text-end">
              <button className="p-1 btn btn-secondary btn-sm">Zeigen</button>
            </div>
          </div>
        </Container>
      </form>
    </Container>
  );
}

export default Guess;