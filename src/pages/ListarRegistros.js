import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

import {
  Slider,
  Input,
  useRadioGroup,
  Avatar,
  CardActions,
  Alert,
  Item,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography ,
  DatePicker ,Dialog, DialogContent, DialogTitle,
} from "@mui/material";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


export default function ListarRegistros() {
  const [registros, setRegistros] = useState([]);
  const [cantidadRegistros, setCantidadRegistros] = useState('');
  const [fecha, setFecha] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = (avatar) => {
    setSelectedAvatar(`data:image/jpeg;base64,${avatar.registro.img}`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  

  const columnas = [
    { id: 'cc', label: 'Cédula' },
    { id: 'tipo', label: 'Tipo' },
    { id: 'sistema', label: 'Sistema' },
    { id: 'fecharegistro', label: 'Fecha de Registro' },
    { id: 'evento', label: 'Evento' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'sentimiento', label: 'Sentimiento' },
    { id: 'foto', label: 'Foto' },
  ];

  const handleCantidadRegistrosChange = (event) => {
    setCantidadRegistros(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
    console.log('event.target.value :>> ', event.target.value);
  };

  function handleSubmit(event){
    event.preventDefault();
    console.log('fecha:>> ', fecha);
    var raw = JSON.stringify({
      "fecha": fecha
    });


    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "xeEL1271YK2pW0W8vgMAAmV7ML7AAmwaQZ9FTW00");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://4uw28yccb8.execute-api.us-east-1.amazonaws.com/PD/identificacionfacial_listar_validacionesp", requestOptions)
    .then(response => response.json())
    .then(data => setRegistros(data))
      .catch(error => console.log('error', error));
      console.log('registro :>> ', registros);
  }


  
  return (
    <div className="validacion">
       <Card>
        <CardContent>
        <form onSubmit={handleSubmit}>
         <Grid container spacing={6} >
          <Grid item>
          <Typography id="cantidad-registros-slider" gutterBottom># de registros</Typography>
            <Slider
              aria-labelledby="cantidad-registros-slider"
              value={cantidadRegistros}
              onChange={handleCantidadRegistrosChange}
              min={1}
              max={100}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
          <TextField label="Fecha" type="date" value={fecha} onChange={handleFechaChange} InputLabelProps={{ shrink: true }} InputProps={{
            inputProps: {
              min: '2023-04-01',
              max: '2025-04-01'
            }
          }} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">Buscar</Button>
          </Grid>
        </Grid>
      </form>
        </CardContent>
        <CardContent>
        <Table>
  <TableHead>
    <TableRow>
      {columnas.map((columna) => (
        <TableCell key={columna.id}>{columna.label}</TableCell>
      ))}
    </TableRow>
  </TableHead>
  <TableBody>
    {registros.map((registro) => (
      <TableRow key={registro.id}>
        <TableCell>{registro.cc}</TableCell>
        <TableCell>{registro.tipo}</TableCell>
        <TableCell>{registro.sistema}</TableCell>
        <TableCell>{registro.fecharegistro}</TableCell>
        <TableCell>{registro.evento}</TableCell>
        <TableCell>{registro.ubicacion}</TableCell>
        <TableCell>{registro.sentimiento}</TableCell>
        <TableCell> <Avatar
                    src={`data:image/jpeg;base64,${registro.img}`}
                      sx={{ mr: 2 }}  onClick={() => handleClick({registro}) } 
                    >
                      
                    </Avatar>
                    <Dialog open={open} onClose={handleClose} maxWidth="sm">
                      <DialogTitle>Img</DialogTitle>
                      <DialogContent style={{ width: '240px' }}>
                      <img src={selectedAvatar} alt={selectedAvatar} style={{ width: '100%', height:'50%' }} />
                      </DialogContent>
                    </Dialog>
                    </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        </CardContent>
        </Card>
      <Card>
       
      
        <CardActions className="centerActions">
            
            </CardActions>
        
      </Card>
    </div>
  );
}

