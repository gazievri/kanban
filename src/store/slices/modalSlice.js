import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  type: 'none'
};

export const modalSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isVisible = true
      state.type = action?.payload ?? 'none';
    },
    closeModal: (state) => {
      state.isVisible = false
      state.type = 'none';
    }
  }
  /* eslint-enable no-param-reassign */
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
