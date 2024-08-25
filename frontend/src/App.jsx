import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      console.log('Input value:', inputValue);
      const parsedData = JSON.parse(inputValue);

      if (!Array.isArray(parsedData.data)) {
        throw new Error('Invalid data format. Expected an array.');
      }

      const result = await axios.post('https://bajaj-submit-server.vercel.app/bfhl', { data: parsedData.data });
      console.log('API response:', result.data);
      setResponse(result.data);
      setError('');
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Invalid JSON format or API request failed');
      setResponse(null);
    }
  };

  const handleSelectChange = (event) => {
    const { options } = event.target;
    const selected = Array.from(options).filter(option => option.selected).map(option => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { alphabets, numbers, highest_lowercase_alphabet } = response;

    // Build formatted response string
    let formattedResponse = '';

    if (selectedOptions.includes('Alphabets')) {
      formattedResponse += `Alphabets: ${alphabets.length > 0 ? alphabets.join(', ') : 'None'}\n`;
    }
    if (selectedOptions.includes('Numbers')) {
      formattedResponse += `Numbers: ${numbers.length > 0 ? numbers.join(', ') : 'None'}\n`;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      formattedResponse += `Highest lowercase alphabet: ${highest_lowercase_alphabet.length > 0 ? highest_lowercase_alphabet.join(', ') : 'None'}\n`;
    }

    return (
      <div>
        <h3>Response:</h3>
        <pre>{formattedResponse}</pre>
      </div>
    );
  };

  React.useEffect(() => {
    document.title = '21BCI0280'; // Your roll number
  }, []);

  return (
    <div className="App">
      <h1>JSON Input and Response Display</h1>
      <textarea
        rows="10"
        cols="50"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Enter JSON here'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      {response && (
        <div>
          <label>
            Select fields to display:
            <select multiple={true} onChange={handleSelectChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
  );
};

export default App;
