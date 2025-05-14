// components/SubjectHydrator.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubjectList } from "../store/slices/subjectListSlice";
import { RootState } from "../store/store";

export default function SubjectHydrator() {
  const dispatch = useDispatch();

  const subjectList = useSelector((state:RootState) => state.subjectListStore.subjectList);

  useEffect(() => {
    const stored = localStorage.getItem("nestedList");
    try {
      const list = JSON.parse(stored ?? "");
      if (list) {
        console.log("Hydrator", list);
        dispatch(setSubjectList(list));
      }
    } catch (e) {
      console.error("Failed to load localStorage list:", e);
    }
  }, [dispatch]);

  // Save the subjectList to localStorage whenever it changes
  useEffect(() => {
    console.log("Hydrator Saving to localStorage", subjectList);
    localStorage.setItem("nestedList", JSON.stringify(subjectList));
  }, [subjectList]);

  return null; // just used for side effect
}
