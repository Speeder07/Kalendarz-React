import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const months = new Array('Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień');

class MainMenager extends React.Component
{

  render()
  {
    return(
      <Year/>
    )
  }
}


function Year(params) {

  

  return(
    <div id='year'>
      <p id='y_name'>Rok 2020</p>
      <div id='y_container'>

      
      {Array(12).fill(1).map((el, i) =>
        <Month id={i}/>
      )}
      </div>
    </div>
    
  )
}

function Month(p) {

  return(
    <div className='month'>
      <div className='m_name' >{months[p.id]}</div>
      <MonthContent/>
      
    </div>
  )
}

function MonthContent(p) {
  return(
    <div className='m_content'>
      {Array(31).fill(1).map((el, i) =>
        <Day id={i}/>
      )}
    </div>
  )
}

function Day(p) {
  return(<div>
    {p.id}
    <DayForm/>
  </div>)
}

function DayForm(p) {
  
  return(
    <div className='day_form'>
      
      
    </div>
  )
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


ReactDOM.render(
  <MainMenager/>,
  document.getElementById('root')
);