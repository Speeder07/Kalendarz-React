import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, { useState } from 'react';

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
  const [fullscrean, setFullscrean] = useState(false);


  return(
    <div className={(fullscrean)?'month fullscrean':'month'} onClick={()=>{setFullscrean(!fullscrean)}}>
        <MonthContent year={p.year} month={p.month} fullscrean={fullscrean}/>
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
      <div className='m_name' >{months[p.month]}</div>
      <div className='m_center'>
        {Array(enpty_space).fill(1).map((el, i) =>
          <div/>
        )}
        {Array(daysInMonth(p.month+1, p.year)).fill(1).map((el, i) =>
          <Day id={i} fullscrean={p.fullscrean}/>
        )}
      </div>
      </div> 
  )
}

function Day(p) {

  const [targeted, setTarget] = useState(false);
  let [text, setText] = useState('');

  function OnClick(e, id) {
    e.stopPropagation();
    console.log(id);
  }

  function TargetedClick(params) {
    setTarget(!targeted);
  }

  function TestChange(e) {
    setText(e.target.value);
  }

  return(<div className={(targeted)?'day targeted':'day'} onClick={(event)=>OnClick(event, p.id)}>
    {(p.fullscrean)?<DayForm id={p.id} targeted={targeted} setTarget={TargetedClick} text={text} textChange={TestChange}/> :p.id+1}
    
    
  </div>)
}

function DayForm(p) {
  
  

  
  return(
    <div className='day_form'>
      {(p.targeted)?
      (
        <div className='flex_grow'>
          <div className='flexC'>
            {p.id+1}
            <button onClick={p.setTarget}>-</button>
            <button>S</button>
          </div>
          <textarea value={p.text} onChange={p.textChange} >
            
          </textarea>
        </div>
      ):
      (
        <div>
          <div>{p.id+1}</div>
          <button onClick={p.setTarget}>+</button>
        </div>
      )
      
      }
      
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