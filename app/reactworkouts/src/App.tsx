import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableGrowing.js";
//import exercises from "./exercises";
import "./App.css";
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
//import "../../../dirkelko/ui5-timer/dist/Ui5Timer.js";
import "ui5-timer/dist/Ui5Timer.js";
import {useState, useRef, useEffect} from "react";

import axios from 'axios';

//let exercises: any = [];

setTheme('sap_horizon_dark');

//test  
//const exercises = async () => Workouts;

function App() {

  const [exercise, setExercise] = useState({});
  const [exercises, setExercises] = useState([]);
  const [tableIsInteractive, setTableIsInteractive] = useState(true);
  const timerRef: any = useRef(null);

  useEffect( () => {
    axios.get('http://localhost:4004/browse/Workouts(10)?$expand=exercises($expand=exercise$top=10)').then((res: any) => {
      setExercises(res.data.exercises);
      setExercise(res.data.exercises[0]);
    })
  }, []);

  let textColor: string;

  function handleRowClick(event: CustomEvent ) {
    console.log(`Row clicked: ${event.detail.row.childNodes[0].innerText} ${event.detail.row.childNodes[1].innerText}`);
    let ex: any = exercises.find((ex: any) => ex.ID === parseInt(event.detail.row.getAttribute("row-key")));
    setExercise(ex!);
    timerRef.current.resetTimer();
  };

  function handleTimerFinished(event: CustomEvent) {
    console.log(`Timer finished ${event.type}`);
    let ex: any = exercises.find((ex: any ) => ex.id === exercise.id+1);
    console.log(ex);
    if (ex) {
      setExercise(ex!);
      timerRef.current.resetTimer();
      timerRef.current?.startTimer();
    }
  }

  function handleTimerStart(event: CustomEvent) {
    console.log(`Timer started ${event.type}`);
    setTableIsInteractive(false);
  }

  function handleTimerStop(event: CustomEvent) {
    console.log(`Timer stopped ${event.type}`);
    setTableIsInteractive(true);  
  }

  function handleLoadMore(event: CustomEvent) {
    console.log(`Load More ${event.type}`);
      axios.get(`http://localhost:4004/browse/Workouts(10)?$expand=exercises($expand=exercise$skip=${exercises.length}$top=${10})`).then((res: any) => {
        setExercises(exercises.concat(res.data.exercises));
      })
  }

  return (exercises.length>0)?(

    <div>
      <ui5-timer 
        id="myTimer"
        ref={timerRef}
        title={exercise.exercise.name}
        sub-title={"Exercise " + exercise.exRound + "/" + exercises[exercises.length-1].exRound}
        sub-sub-title={"Round "+ exercise.round + "/" + exercises[exercises.length-1].round}
        duration={(exercise.duration).toString()}
        vbox="0 0 1200 1200"
        ontimerFinished={handleTimerFinished}
        ontimerStart={handleTimerStart}
        ontimerStop={handleTimerStop}
      />

      <ui5-table id="table1" overflow-mode="Popin" onrow-click={handleRowClick}> 
      <ui5-table-growing type="Scroll" growing-text="More" slot="features" onload-more={handleLoadMore}></ui5-table-growing>
        <ui5-table-header-row slot="headerRow">
        <ui5-table-header-cell id="idCol" importance="3" width="50px"><span>Id</span></ui5-table-header-cell>
        <ui5-table-header-cell id="nameCol" importance="1" width="300px"><span>Name</span></ui5-table-header-cell>
        <ui5-table-header-cell id="roundCol" width="60px" importance="-1">Round</ui5-table-header-cell>
        <ui5-table-header-cell id="durationCol" min-width="40px" importance="2">Duration</ui5-table-header-cell>
        </ui5-table-header-row>
          {exercises.map((ex: any) => (
            <ui5-table-row row-key={ex.ID} key={ex.ID} interactive={tableIsInteractive}>
               {textColor = (exercise.ID === ex.ID)? "var(--sapCriticalElementColor)" : "var(--sapTextColor)"}
              <ui5-table-cell><ui5-text><b style={{color: textColor}}>{ex.ID}</b></ui5-text></ui5-table-cell>
              <ui5-table-cell><ui5-text><b style={{color: textColor}}>{ex.exercise.name}</b></ui5-text></ui5-table-cell>
              <ui5-table-cell><ui5-text style={{color: textColor}}>{ex.round}</ui5-text></ui5-table-cell>
              <ui5-table-cell><ui5-text><b style={{color: textColor}}>{ex.duration}</b></ui5-text></ui5-table-cell>
            </ui5-table-row>
          ))} 
      </ui5-table>
    </div>
  ):(<div>No exercises loaded yet {exercises.length} </div>);
}

export default App;