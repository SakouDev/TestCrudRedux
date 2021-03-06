import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id:string) => void
    cancelSelectActivity: () => void
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submit: boolean;
}

export default function ActivityDashboard({activities, selectActivity, selectedActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submit}: Props) {
    return(
        <Grid fluid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity} 
                    deleteActivity={deleteActivity}
                    submit = {submit}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} submit={submit}/>}
            </Grid.Column>
        </Grid>
    )
}

/*
<List>
    {activities.map(activity => (
        <List.Item key={activity.id}>
            {activity.title}
        </List.Item>
    ))}
</List>
*/