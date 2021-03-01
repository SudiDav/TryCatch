import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uui} from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response =>{
      console.log(response)
      setActivities(response.data)
    })
  }, [])

  function handleSelectActivity (id: string){
    setSelectedActivity(activities.find(a => a.id === id));
  };

  function handleCancelSelectAcitivity (){
    setSelectedActivity(undefined);
  };

  function handlFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectAcitivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function  handleCreateOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
                : setActivities([...activities, {...activity, id: uui()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string) {
      setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
        <NavBar openForm={handlFormOpen}/>       
        
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard 
              activities={activities}
              selectedActivity = {selectedActivity}
              selectActivity ={handleSelectActivity}
              cancelSelectActivity = {handleCancelSelectAcitivity}
              editMode ={editMode}
              openForm ={handlFormOpen}
              closeForm ={handleFormClose}
              createOrEdit = {handleCreateOrEditActivity}
              deleteActivity= {handleDeleteActivity}
            />
        </Container>
     
    </Fragment>
  );
}

export default App;
