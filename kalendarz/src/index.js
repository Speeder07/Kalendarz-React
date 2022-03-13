import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, { useState, useEffect } from 'react';
import { db, colRef } from './firebase';
import {getFirestore, collection, getDocs, doc, deleteDoc, addDoc} from 'firebase/firestore';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlus, faMinus, faCircleArrowLeft, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';

const months = new Array('Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień');


class MainMenager extends React.Component
{

  constructor(props) 
  {
    super(props);
    this.state = {events: new Array(), year: 2022};  
    this.setYear = this.setYear.bind(this);
  }
  
  setYear(value)
  {
    this.setState({year: this.state.year+value});
  }

  componentDidMount()
  {
    let data = new Date();
    this.setState({year: data.getFullYear()});
    this.getEvents();
  }
  

  async getEvents()
  {
    getDocs(colRef)
    .then((snapshot)=> {
        let events = []
        snapshot.docs.forEach((doc)=>{
            events.push({...doc.data(), id: doc.id})
        })
        this.setState({events: events,});
        events = events;
        console.log(events);
    })
    .catch(err => {
        console.log(err.message);
    })
  }

  render()
  {
    let thisYeraEvents = new Array();
    for (let index = 0; index < this.state.events.length; index++) {
      if (this.state.events[index].Year==this.state.year) {
        thisYeraEvents.push(this.state.events[index]);
      }
    }
    return(
      <Year events={thisYeraEvents} year={this.state.year} setYear={this.setYear}/>
    )
  }
}


function Year(p) {

  return(
    <div id='year'>
      <div className='y_row'>
        <p id='y_name'>Rok {p.year}</p>
        <button onClick={()=>p.setYear(-1)}><FontAwesomeIcon icon={faCircleArrowLeft} /></button>
        <button onClick={()=>p.setYear(1)}><FontAwesomeIcon icon={faCircleArrowRight} /></button>
      </div>
      
      <div id='y_container'>

      
      {Array(12).fill(1).map((el, i) =>
        {
          let temp = new Array();
          p.events.map((even, eId)=>{
            if (even.Month-1==i) {
              temp.push(even);
            }
          })
          return(<Month year={p.year} month={i} events={temp}/>);
        }
        
      )}
      </div>
    </div>
    
  )
}

function Month(p) {
  const [fullscrean, setFullscrean] = useState(false);

  
  return(
    <div className={(fullscrean)?'month fullscrean':'month'} onClick={()=>{setFullscrean(!fullscrean)}}>
        <MonthContent events={p.events} year={p.year} month={p.month} fullscrean={fullscrean}/>
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
          {
            var temp = '';
            p.events.map((event, id)=>{
              if (event.Day-1 == i) {
                temp = event;
              }
            })
            if (temp!='') {
              return <Day event={temp} month={p.month} year={p.year} text={temp.Text} active={true} id={i} fullscrean={p.fullscrean}/>
            }
            else{
              return <Day event={temp} month={p.month} year={p.year} text={""} active={false} id={i} fullscrean={p.fullscrean}/>
            }
            
          } 
          
        )}
      </div>
      </div> 
  )
}

function Day(p) {

  const [targeted, setTarget] = useState(false);
  let [text, setText] = useState('');

  useEffect(() => {
    setTarget(p.active);
    setText(p.text);
  }, [p.active, p.text]);


  function SaveData() {
    if (p.event!='') {
      const docRef = doc(db, 'events', p.event.id);
      deleteDoc(docRef);
    }
    addDoc(colRef, {Year: p.year, Month: p.month+1, Day: p.id+1, Text: text,})
    .then(()=>{window.location.reload(true)})
  }

  function DeleteData() {
    if (p.event!='') {
      const docRef = doc(db, 'events', p.event.id);
      deleteDoc(docRef)
      .then(()=>{window.location.reload(true)})
    }
  }

  function OnClick(e, id) {
    e.stopPropagation();
  }

  function TargetedClick(params) {
    setTarget(!targeted);
  }

  function TestChange(e) {
    setText(e.target.value);
  }

  function DayOfWeak(year, month, day) {
    return new Date(year, month, day).getDay();
  }


  return(<div style={{color : (DayOfWeak(p.year, p.month, p.id)==6)?"#ffbe76":""}} className={((targeted)?'day targeted':'day')+' '+ ((p.fullscrean)?'full':'')} onClick={(event)=>OnClick(event, p.id)}>
    {(p.fullscrean)?<DayForm DeleteData={DeleteData} SaveData={SaveData} id={p.id} month={p.month} year={p.year} targeted={targeted} setTarget={TargetedClick} text={text} textChange={TestChange}/> :p.id+1}
    
    
  </div>)
}

function DayForm(p) {
  
  
  
  return(
    <div className='day_form'>
      {(p.targeted)?
      (
        <div className='flex_grow'>
          <div className='flexC'>
            <span className='number_day'>{p.id+1}</span>
            <button onClick={p.setTarget}><FontAwesomeIcon icon={faMinus} /></button>
            <button onClick={p.SaveData}><FontAwesomeIcon icon={faSave} /></button>
          </div>
          <textarea value={p.text} onChange={p.textChange} >
            
          </textarea>
        </div>
      ):
      (
        <div className='row'>
          <div className='number_day'>{p.id+1}</div><span></span>
          <button onClick={p.setTarget}><FontAwesomeIcon icon={faPlus} /></button>
          <button onClick={p.DeleteData}><FontAwesomeIcon icon={faSave} /></button>
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