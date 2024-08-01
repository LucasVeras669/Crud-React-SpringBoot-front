import { Box, Button, Icon } from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Calendario = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
    console.log('Open do calendario', open)
  }
  
  return <>
  <Box>
  <Button size='large' fullWidth onClick={handleOpen}><Icon>calendar_month</Icon></Button>
  {open ? <Calendar /> : undefined }
  </Box>
  </>;
};
