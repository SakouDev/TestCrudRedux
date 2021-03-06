import { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Activity} from "../../models/activity";
import { RootState } from "../store";
import {v4 as uuid} from 'uuid';
import agent from "../../API/agent";


type Status = "idle" | "loading" | "failed" | "success";
const ArrayRedux : Activity[] = []

export interface activitiesState {
  value: Activity[];

  status: Status;

  createStatus: Status;
  deleteStatus: Status;
  updateStatus: Status;
  loading: boolean;
}

const initialState : activitiesState = {
  value : ArrayRedux,
  status: "idle",

  createStatus: "idle",
  deleteStatus: "idle",
  updateStatus: "idle",
  loading: true
};

  const [activities, setActivities] = useState<any[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submit, setSubmit] = useState(false);

export const getActivities = createAsyncThunk("activities/fetchactivities", async () => {
      const response = agent.Activities.list()
      return response;
});

export const addActivities = createAsyncThunk("activities/addactivities", async (activity: Activity) => {
  const response =  (activity: Activity) => {
    activity.id = uuid();
    agent.Activities.create(activity).then(() =>{
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmit(false);
  })
}
return response;
})

export const deleteActivities = createAsyncThunk("activities/deleteactivities", async (activitiesId: number) => {
  // const response = await removeActivities(activitiesId);
  // return response;
});

export const updateActivities = createAsyncThunk("activities/updateactivities", async (activities: Activity) => {
  // const response = await patchActivities(activities);
  // return response;
});

export const activitieSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    resetEditStatus: (state) => {
      state.updateStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      /* -------------------------------------------------------------------------- */
      /*                                  GET activities                            */
      /* -------------------------------------------------------------------------- */

      .addCase(getActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getActivities.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.value = action.payload;
        state.loading = false;
        // console.log("oui: ",action.payload)
      })
      .addCase(getActivities.rejected, (state) => {
        state.status = "failed";
      })

      /* -------------------------------------------------------------------------- */
      /*                                  ADD activities                            */
      /* -------------------------------------------------------------------------- */

      // .addCase(addActivities.pending, (state) => {
      //   state.createStatus = "loading";
      // })
      // .addCase(addActivities.fulfilled, (state, action: any) => {
      //   state.createStatus = "success";
      //   state.value = [action.payload, ...state.value];
      // })
      // .addCase(addActivities.rejected, (state) => {
      //   state.createStatus = "failed";
      // })

      /* -------------------------------------------------------------------------- */
      /*                                DELETE activities                           */
      /* -------------------------------------------------------------------------- */

      // .addCase(deleteActivities.pending, (state) => {
      //   state.deleteStatus = "loading";
      // })
      // .addCase(deleteActivities.fulfilled, (state, action: any) => {
      //   state.deleteStatus = "success";
      //   state.value = state.value.filter((u) => u.id !== action.payload);
      // })
      // .addCase(deleteActivities.rejected, (state) => {
      //   state.deleteStatus = "failed";
      // })

      /* -------------------------------------------------------------------------- */
      /*                                  EDIT activities                           */
      /* -------------------------------------------------------------------------- */

      // .addCase(updateActivities.pending, (state) => {
      //   state.updateStatus = "loading";
      // })
      // .addCase(updateActivities.fulfilled, (state, action: any) => {
      //   state.updateStatus = "success";

      //   state.value.forEach((u) => {
      //     if (u.id === action.payload.id) {
      //       const { title, date, description, category, city, venue } = action.payload;

      //       u.title = title;
      //       u.date = date;
      //       u.description = description;
      //       u.category = category;
      //       u.city = city;
      //       u.venue = venue;
      //     }
      //   });
      // })
      // .addCase(updateActivities.rejected, (state) => {
      //   state.updateStatus = "failed";
      // });
  },
});

export const { resetEditStatus } = activitieSlice.actions;

export const selectActivitiesRedux = (state: RootState) => state.activities;

export default activitieSlice.reducer;
