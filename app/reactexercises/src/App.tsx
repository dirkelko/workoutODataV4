import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableGrowing.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents-icons/dist/video.js"
import "./App.css";
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
import {useState, useEffect} from "react";

import axios from 'axios';

setTheme('sap_horizon_dark');

function App() {

  const [exercises, setExercises] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:4004/browse/Exercises?$top=50').then((res: any) => {
      setExercises(res.data.value);
    })
  }, []);

  function handleLoadMore(event: CustomEvent) {
    //console.log(`Load More ${event.type}`);
      axios.get(`http://localhost:4004/browse/Exercises?$skip=${exercises.length}&$top=50`).then((res: any) => {
        console.log(`loaded from ${exercises.length+1} to ${exercises.length + res.data.value.length}`);
        setExercises(exercises.concat(res.data.value));
      })
  }

  return(

    <div>
      <ui5-table id="table1" overflowMode="None"> 
      <ui5-table-growing type="Scroll" growing-text="More" slot="features" onloadMore={handleLoadMore}></ui5-table-growing>
        <ui5-table-header-row slot="headerRow">
        <ui5-table-header-cell id="idCol" importance="3" width="50px"><span>Id</span></ui5-table-header-cell>
        <ui5-table-header-cell id="nameCol" importance="1" width="500px"><span>Name</span></ui5-table-header-cell>
        <ui5-table-header-cell id="linkCol" width="300px" importance="-1">Video</ui5-table-header-cell>
        </ui5-table-header-row>
          {exercises?.map((ex: any) => (
            <ui5-table-row row-key={ex.ID} key={ex.ID}>
              <ui5-table-cell><ui5-text><b>{ex.ID}</b></ui5-text></ui5-table-cell>
              <ui5-table-cell><ui5-text><b>{ex.name}</b></ui5-text></ui5-table-cell>
              <ui5-table-cell><ui5-link href={ex.link} target="_blank" wrapping-type="Normal" end-icon="video"></ui5-link></ui5-table-cell>
            </ui5-table-row>
          ))} 
      </ui5-table>
    </div>
  );
}

export default App;