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
      <Year year={2022}/>
    )
  }
}


function Year(p) {

  

  return(
    <div id='year'>
      <p id='y_name'>Rok {p.year}</p>
      <div id='y_container'>

      
      {Array(12).fill(1).map((el, i) =>
        <Month year={p.year} month={i}/>
      )}
      </div>
    </div>
    
  )
}

function Month(p) {

  return(
    <div className='month'>
      <div className='m_name' >{months[p.month]}</div>
      <MonthContent year={p.year} month={p.month}/>
      
    </div>
  )
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function MonthContent(p) {
  let first_day = new Date(p.year, p.month, 1).getDay();
  let enpty_space = (first_day==0) ? 6 : first_day-1;
  return(
    <div className='m_content'>
      {Array(enpty_space).fill(1).map((el, i) =>
        <div/>
      )}
      {Array(daysInMonth(p.month+1, p.year)).fill(1).map((el, i) =>
        <Day id={i}/>
      )}
    </div>
  )
}

function Day(p) {
  return(<div className='day'>
    {p.id+1}
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