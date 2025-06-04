import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [fromValue, setfromValue] = useState<string>('');
  const [toValue, settoValue] = useState<number>();
  const [isvisible, setisvisible] = useState<string>('notvisible');

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then(response => response.json())
      .then(data => {
        setCurrency(data)
      })

  }, [])


  const getexchangerate = () => {

    console.log(fromValue.trim());
    console.log(parseFloat(fromValue.trim()));

    if (fromValue.trim() === '') {
      alert("Please enter an amount.");
      return;
    } else if (fromCurrency === '') {
      alert("Please select a source currency.");
      return;
    } else if (toCurrency === '') {
      alert("Please select a target currency.");
      return;
    }


    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`)
      .then(response => response.json())
      .then(data => {

        console.log(data[fromCurrency][toCurrency]);
        settoValue(parseFloat(fromValue) * data[fromCurrency][toCurrency]);
        setisvisible('visible');
      })
      .catch(error => {
        console.error('Error:', error);
      });


  }
  return (
    <>
      <div className='main'>
        <div className='parent'>
          <h1 style={{ textAlign: 'center' }}>Currency Converter</h1>
          <div className='child'>

            <div className='amountField'>
              <label style={{ fontSize: '20px', paddingLeft: '5px' }}>Enter Amount</label>
              <input type='text' className='required' id='inp' value={fromValue} onChange={(event) => {
                const value: string = event.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setfromValue(value);
                }

                setisvisible('notvisible')
              }
              }></input>
            </div>

            <div className='dropdown'>
              <div className='selectContainer' >
                <p style={{ fontSize: '20px', paddingLeft: '5px'}}>From</p>
                
                  <select className='required' style={{ height: '45px', backgroundColor: '#fffcf1', border: '2px solid lightgray', borderRadius: '10px', fontSize: '15px' }} onChange={(event) => { 
                    setFromCurrency(event.target.value) 
                    setisvisible('notvisible')
                  }}
                  >
                    <option value=''>-Select-</option>
                    {Object.entries(currency).map(([key, value]) =>
                      <option key={key} value={key}>
                        {value}
                      </option>
                    )}
                  </select>

              </div>
              <div className='iconContainer' >
                <FontAwesomeIcon icon={faArrowDown} size='2x'/>
              </div>
              <div className='selectContainer' >
                <p style={{ fontSize: '20px' , paddingLeft: '5px'}}>To</p>

                    <select className='required' style={{ height: '45px', backgroundColor: '#fffcf1', border: '2px solid lightgray', borderRadius: '10px', fontSize: '15px' }}
                      onChange={(event) => { 
                        setToCurrency(event.target.value) 
                        setisvisible('notvisible')
                      }}
                    >
                      <option value=''>-Select-</option>
                      {Object.entries(currency).map(([key, value]) =>
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )}
                    </select>
 
              </div>

            </div>

            <div className='btn'>
              <button style={{ width: '200px', minHeight: '40px', fontSize: '18px', backgroundColor: '#d0e1e8', padding: '5px', border: '0.5px solid black', borderRadius: '10px', cursor: 'pointer' }} onClick={getexchangerate}>Get Exchange Rate</button>

            </div>

          </div>

          <div className={isvisible}>
              <h2>{fromValue} {fromCurrency.toUpperCase()} = {toValue} {toCurrency.toUpperCase()}</h2>
          </div>
        </div>


      </div>
    </>
  )
}

export default App;