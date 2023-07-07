import React from "react";


import { IoSettingsOutline,IoCheckboxOutline } from 'react-icons/io5'
import { IoIosPersonAdd } from "react-icons/io";



export const SidebarData = [
  {
    title: "Login",
    path: "/",
    icon: <IoIosPersonAdd/>,
    cName: "nav-text"
  },
  {
    title: "Signup",
    path: "/signup",
    icon: <IoIosPersonAdd/>,
    cName: "nav-text"
  },
  
  {
    title: "Ingreso Confa",
    path: "/IngresoConfa",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "CargarArchivo",
    path: "/CargarArchivo",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "Login Google",
    path: "/LoginG",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  }
  ,
  {
    title: "Listar",
    path: "/ListarRegistros",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  } ,
  {
    title: "IngresoConfaObj",
    path: "/IngresoConfaObj",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  }
  
];
