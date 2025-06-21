import { createSlice, nanoid } from '@reduxjs/toolkit';
import { addDreams, deleteDreams, editDreams, fetchDreams } from './dreamThunks';

const initialState = {
  allDreams: [],
  loading: {
    fetch: false,
    add: false,
    edit: false,
    delete: false,
  },
  error: {
    fetch: null,
    add: null,
    edit: null,
    delete: null,
  }
};

const dreamSlice = createSlice({
  name: "dreams",
  initialState,
  reducers: {
    addDream: {
      reducer(state, action) {
        state.allDreams.push(action.payload);
      },
      prepare({ title, description, mood, tags }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            mood,
            tags,
            date: new Date().toISOString()
          }
        };
      }
    },
    deleteDream(state, action) {
      state.allDreams = state.allDreams.filter(dream => dream.id !== action.payload);
    },
    editDream(state, action) {
      const index = state.allDreams.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.allDreams[index] = { ...state.allDreams[index], ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchDreams
      .addCase(fetchDreams.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchDreams.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.allDreams = action.payload;
      })
      .addCase(fetchDreams.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.error.message;
      })

      // addDreams
      .addCase(addDreams.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addDreams.fulfilled, (state, action) => {
        state.loading.add = false;
        state.allDreams.push(action.payload);
      })
      .addCase(addDreams.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.error.message;
      })

      // editDreams
      .addCase(editDreams.pending, (state) => {
        state.loading.edit = true;
        state.error.edit = null;
      })
      .addCase(editDreams.fulfilled, (state, action) => {
        state.loading.edit = false;
        const index = state.allDreams.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.allDreams[index] = action.payload;
        }
      })
      .addCase(editDreams.rejected, (state, action) => {
        state.loading.edit = false;
        state.error.edit = action.error.message;
      })

      // deleteDreams
      .addCase(deleteDreams.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteDreams.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.allDreams = state.allDreams.filter((d) => d.id !== action.payload);
      })
      .addCase(deleteDreams.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message;
      });
  }
});

export const { addDream, deleteDream, editDream } = dreamSlice.actions;
export default dreamSlice.reducer;
