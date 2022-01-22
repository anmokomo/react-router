import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, 
  Routes, Route, Navigate, useNavigate,
  Link, Outlet, useParams, NavLink, useLocation } from 'react-router-dom'

/*
<Router> = wraps around everything
<Routes> = wraps around the individual routes
<Route> = can wrap or be solo; the path and element (component) to load at that path
<Navigate to="/path"> within Route = redirect url to the 'to' path
<Route> within <Route> = child components mounts into parent
<Outlet> = in the parent component, marks where the child component(s) above should mount
:courseId = grab param from url; handled by an element
<NavLink> vs Link = gives extra props, like highlighting which link is active
useParams = get params from url
useNavigate = another way of routing to someplace; can pass data through too, access via useLocation
*/
ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/myapps' element={<Navigate to="/learn"/>} />
      <Route path='/learn' element={<Learn />} >
        <Route path = "courses" element={<Courses />} >
          <Route path=':courseId' element={<CourseId />} />
        </Route>
        <Route path = "bundles" element={<Bundles />} />
      </Route>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Home() {
  return(
    <div>
      <h1>Home Route</h1>
    </div>
  )
}

function Learn() {
  return(
    <div>
      <h1>Learn</h1>
      <h4>Classes available</h4>
      <Link className="btn btn-success" to="/learn/courses">
        courses
      </Link> | 
      <NavLink  className="btn btn-primary" to="/learn/bundles">
        bundles
      </NavLink>
      <Outlet />
    </div>
  )
}

function Courses() {
  //don't forget Outlet! Look @ Route configuration...
  //the :courseId route is a child of this, needs <Outlet /> to be able to render
  const courseList=['Front-End','Object-Oriented','Machine-Learning','Micro-Processors']
  const randomCourse=courseList[Math.floor(Math.random()*courseList.length)]
  
  return(
    <div>
      <h1>Course List</h1>
      <h4>Course card</h4>

      <NavLink 
      style={({isActive}) => {
        return {
          backgroundColor: isActive ? "pink" : "yellow"
        }
      }}
      to={`/learn/courses/${randomCourse}`}>
        {randomCourse}
        </NavLink>
      <NavLink to={`/learn/courses/tests`}>tests</NavLink>

      <Outlet />
    </div>
  )
}

function Bundles() {
  return(
    <div>
      <h1>Bundle List</h1>
      <h4>bundle card</h4>
    </div>
  )
}

//Component is passed in routing configuration as element={} to handle :courseId param
function CourseId() {
  //useParams hook
  const {courseId} = useParams()
  //using navigate hook instead of a NavLink/Link component
  const navigate = useNavigate()
  return(
    <div>
      <h1>URL Param is: {courseId}</h1>
      <button 
      onClick={()=> navigate("/dashboard", {state: courseId})}
      className="btn btn-warning">
        Info
      </button>
      <Link to='/dashboard' state={courseId}>Link w. state</Link>
    </div>
  )
}

function Dashboard() {
  const location = useLocation()
  return(
    <div>
      <h1>Info: {location.state}</h1>
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
