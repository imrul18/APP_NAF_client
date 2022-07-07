import {createSlice} from '@reduxjs/toolkit';
import React from 'react';

const requisitionSlice = createSlice({
  name: 'requisition',

  initialState: {
    requisitionData: {
      company_id: '',
      engineer_id: '',
      machine_id: [],
      priority: '',
      type: '',
      payment_mode: '',
      expected_delivery: '',
      payment_term: '',
      payment_partial_mode: '',
      partial_time: '',
      next_payment: '',
      ref_number: '',
      machine_problems: '',
      solutions: '',
      reason_of_trouble: '',
      remarks: '',
      part_items: [],
      total: '',
    },
  },

  reducers: {
    loadData: (state, action) => {
      state.requisitionData = {...state.requisitionData,...action.payload};
    },
  },
});

export const {loadData} = requisitionSlice.actions;

export default requisitionSlice.reducer;
