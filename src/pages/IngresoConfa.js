import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
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
} from "@mui/material";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";

export default function Validacion() {
  const [foto, setFoto] = useState();
  const webcamRef = React.useRef(null);
  const [imgTake, setimgTake] = React.useState(null);
  const [imgTakeAvatar, setImgTakeAvatar] = React.useState(null);
  const [data, setData] = useState("");
  const [cc, setCc] = useState("");
  const [selectedOptionTipo, setSelectedOptionTipo] = useState("Ingreso");
  
  const [resRegistar, setResRegistar] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [senti, setSentimiento] = useState("");
  const [datos, setDatos] = useState({
    tipo: "",
  });
  const [valueSeleItemSede, setValueSeleItemSede] = useState("");


  /*CAPTURAR*************************** */

  const capture = React.useCallback(() => {
    setResRegistar('');
    setValueSeleItemSede('');
    
    const imageSrc = webcamRef.current.getScreenshot();
    var strImage = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
    setimgTake(strImage);
    setImgTakeAvatar(imageSrc);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "xeEL1271YK2pW0W8vgMAAmV7ML7AAmwaQZ9FTW00",
      },
      body: JSON.stringify({
        imageBase64: strImage,
        atributos: "si",
      }),
    };
    fetch(
      "https://4uw28yccb8.execute-api.us-east-1.amazonaws.com/PD/identificarb64ccsenti",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log("----" + JSON.stringify(data));
        if (data.cc != null) {
          setShowContent(true);
          setCc(data.cc);
          setSentimiento(data.sentimiento);
          setFoto(
            <label className="labelCC">
              |Documento: {data.cc} | Estado: {data.sentimiento}
            </label>
            //|Estado:{data.sentimiento}|Tiempo:{seg}
          );
        } else {
          setShowContent(false);
          setFoto(
            <label className="labelCC">
              **No se pudo reconer el rostro: {data.respuesta}
            </label>
          );
        }
      })
      .catch((error) => console.log("error", error));
  });
  /*END CAPTURAR*************************** */
  const handleOptionChangeTipo = (event) => {
    setSelectedOptionTipo(event.target.value);
  };

  const handleOptionChangeSede = (event) => {
    setValueSeleItemSede(event.target.value);
  };

  const registrarIngreso = (event) => {
    console.log("selectedOptionTipo :>> ", selectedOptionTipo);
    console.log("valueSeleItemSede :>> ", valueSeleItemSede);
   if(selectedOptionTipo=='' || valueSeleItemSede==''){
    setResRegistar("Seleccione Sede y Tipo");
   }else{
    console.log("cc :>> ", cc);
    
    //setimgTake//guardar
    var milliseconds1 = new Date().getTime();
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "x-api-key": "xeEL1271YK2pW0W8vgMAAmV7ML7AAmwaQZ9FTW00",
      },
      body: JSON.stringify({
        cc: cc,
        evento: "ingreso confa",
        tipo: selectedOptionTipo,
        sentimiento: senti,
        ubicacion: valueSeleItemSede,
        sistema: "Ingreso confa web",
        guardarfotos3: "si",
        tipoimg: "b64",
        imagenb64Ourl: imgTake,
        rutas3guardar: "ingresoconfa/PD_Registrar_Validacion_B64oUrl",// 890806490-adjuntos-aplicaciones/ingresoconfa/identificacionFacial_PD_Registrar_Validacion_B64oUrl
      }),
    };
    fetch(
      "https://4uw28yccb8.execute-api.us-east-1.amazonaws.com/PD/registrar_validacion_b64ourl",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("-data---" + JSON.stringify(data));
        if (data.message === "OK") {
          setShowContent(false);
          setResRegistar(data.respuesta);
          var milliseconds2 = new Date().getTime();
          var seg = (milliseconds2 - milliseconds1) / 1000;
          console.log("-seg---" + seg);
          setResRegistar("Ok, Registro insertado con exito");
        } else {
          setResRegistar("No se pudo registrar");
        }
      })
      .catch((error) => console.log("error", error));
    }   
  };
  function limpiar() {
    setFoto(null);
    setimgTake(null);
    setImgTakeAvatar(null);
    setCc(null);
    setShowContent(false);
    setResRegistar(null);
    setValueSeleItemSede('');
    setSelectedOptionTipo('Ingreso');
  }

  return (
    <div className="validacion">
      <Card>
        <CardContent>
          <h4>Registro Ingreso-Validación Facial</h4>
          <Webcam
            className="cam"
            audio={false}
            height={280}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={430}
          />
          <CardActions className="centerActions">
            <Button onClick={capture} variant="contained" color="primary">
              Capturar
            </Button>
            <Button onClick={limpiar} variant="contained" color="secondary">
              Nuevo
            </Button>
          </CardActions>
        </CardContent>
        {showContent && (
          <div>
            <CardContent className="centerActions">
              <Avatar alt="Usuario" src={imgTakeAvatar} />
              {foto}
            </CardContent>

            <Grid container spacing={2}>
              <CardContent>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Tipo:</FormLabel>
                  <RadioGroup
                    row
                    aria-label="option"
                    name="option"
                    value={selectedOptionTipo}
                    onChange={handleOptionChangeTipo}
                  >
                    <FormControlLabel
                      value="Ingreso"
                      control={<Radio />}
                      label="Ingreso"
                    />
                    <FormControlLabel
                      value="Salida"
                      control={<Radio />}
                      label="Salida"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardContent>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sede Ingreso:</FormLabel>
                  <Select value={valueSeleItemSede} onChange={handleOptionChangeSede}>
                    <MenuItem value="Versalles">Versalles</MenuItem>
                    <MenuItem value="San Marcel">San Marcel</MenuItem>
                    <MenuItem value="GYM Versalles">GYM Versalles</MenuItem>
                    <MenuItem value="Colmenares">Colmenares</MenuItem>
                    <MenuItem value="Gym Versalles">Gym Versalles</MenuItem>
                    <MenuItem value="Santagueda">Santagueda</MenuItem>
                    <MenuItem value="Rochela">Rochela</MenuItem>
                    <MenuItem value="Capitalia">Capitalia</MenuItem>
                    <MenuItem value="Casa Centro">Casa Centro</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Grid>
            <CardActions className="centerActions">
              <Button
                variant="contained"
                onClick={registrarIngreso}
                color="primary"
                className="btnFoto"
              >
                Registrar
              </Button>
            </CardActions>
           
          </div>
        )}
         <CardContent>{resRegistar}</CardContent>
      </Card>
    </div>
  );
}
