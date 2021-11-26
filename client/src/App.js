import React from 'react';
import './App.css';


function App() {
  const [word, setWord] = React.useState('Look up any food item');
  const [associations, setAssociations] = React.useState(null);
  const getAssociations = () => {
    fetch('/api/recipes/' + word)
    .then(result => result.json())
    .then(result  => {
      for (let i = 0; i < result.body.results.length; i++) {
        console.log(result.body.results[i]);
      }
    })
    .then(body => setAssociations(body.results))
    .catch(error => console.log(error))
  };

  return (
    <div className="app">
      <h1>Recipe App!</h1>
      <input value={word} onChange={e => setWord(e.target.value)} />
      <button onClick={getAssociations}>Search</button>
      <p>Check console for now</p>
    </div>
  );
}

export default App;