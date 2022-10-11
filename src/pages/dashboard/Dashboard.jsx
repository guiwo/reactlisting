import React from "react";
import Button from "@mui/material/Button";
import Copyright from "../../components/pure/copyright";
import { useHistory } from "react-router-dom";
const Dashboardpage = () => {

const history = useHistory();


const logout = () =>{
    history.push('/login')
}

  return (
    <div>
      <Button variant="contained" onClick={logout}>logout</Button>
      <Copyright></Copyright>
    </div>
  );
};

export default Dashboardpage;
