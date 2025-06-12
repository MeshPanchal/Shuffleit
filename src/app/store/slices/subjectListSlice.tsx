
import { ListItem } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";



interface Subjects {
    subjectList: ListItem[];
}

const initialState: Subjects = {
    subjectList:[]
}

export const subjectListSlice = createSlice({
    name: "subjectList",
    initialState,
    reducers : {
        setSubjectList: (state, action) => {
            state.subjectList.splice(0, state.subjectList.length);
            state.subjectList.push(...action.payload);
        },
        clearSubjectList: (state) => {
            state.subjectList.splice(0, state.subjectList.length);
            state.subjectList.push(...initialState.subjectList);
        }
    }
})

export const { setSubjectList, clearSubjectList } = subjectListSlice.actions;
export default subjectListSlice.reducer;