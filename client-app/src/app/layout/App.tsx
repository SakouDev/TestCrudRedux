import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';
import {selectActivitiesRedux, getActivities, addActivities } from '../redux/activities/activitiesSlice';
// import TestSakou from '../../features/activities/dashboard/TestSakou';

function App() {
  const [activities, setActivities] = useState<any[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const activ = useSelector(selectActivitiesRedux)

  useEffect(() => {   
    dispatch(getActivities())
  }, [dispatch]);

  // useEffect(() => {
    // agent.Activities.list().then(response => {
    //   let activities : Activity[] = []
    //   response.forEach(activity => {
    //     activity.date = activity.date.split('T')[0];
    //     activities.push(activity);
    //   })
    //   setActivities(activities);
    //   setLoading(false);
    // })
  // }, [])

  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmit(true);
    if (activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmit(false);
      })

    }else{
      activity.id = uuid();
      dispatch(addActivities(activity))
      

      // activity.id = uuid();
      // agent.Activities.create(activity).then(() =>{
      //   setActivities([...activities, activity]);
      //   setSelectedActivity(activity);
      //   setEditMode(false);
      //   setSubmit(false);
      // })
    }
  }

  function handleDeleteActivity(id: string){
    setSubmit(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmit(false);
    })
  }

  if(activ.loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>

        <ActivityDashboard 
          activities={activ.value}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submit={submit}
        />

        {/* <TestSakou activities={activities}/> */}
      </Container>
    </>
  );
}

export default App;