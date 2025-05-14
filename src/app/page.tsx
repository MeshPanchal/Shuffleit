"use client";

import User from "./user/User";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import SubjectHydrator from "./components/SubjectHydrator";

export default function App() {
  return (
    <Provider store={store}>
      <SubjectHydrator />
      <User />
    </Provider>
  );
}
