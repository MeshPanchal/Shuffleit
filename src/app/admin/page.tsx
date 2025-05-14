"use client";
import SubjectHydrator from "../components/SubjectHydrator";
import { store } from "../store/store";
import AdminHome from "./AdminHome";
import { Provider } from "react-redux";


function Admin() {
    return(
        <Provider store={store}>
          <SubjectHydrator />
          <AdminHome/>
        </Provider>
    )
}

export default Admin;