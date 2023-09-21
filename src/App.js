import React from 'react';
import { Button } from 'reactstrap';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
const MyButton = function ({ navigate,background, route, state,title }) {
  return (
    <Button className='btn-b'
      style={{ background }}
      onClick={() => navigate(`/${route}`, {
        state: `${state}`
      })}>{title}
    </Button>
  )
}

export default function () {
  const navigate = useNavigate()
  return (

    <div className="App d-flex justify-content-center align-items-center">
      <div className='d-flex align-items-center w-100 justify-content-center'>
        <MyButton title={'Button A'} navigate={navigate} background={'#46139f'} route={'modalA'} state={'Modal A'} />
      </div>
      <div className='d-flex align-items-center justify-content-center w-100'>
        <MyButton title={'Button B'} navigate={navigate} background={'#ff7f50'} route={'modalB'} state={'Modal B'} />

      </div>
    </div >
  );
}

