import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

// Lazy Loaded Pages
const Home = lazy(() => import('../pages/Home.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Courses = lazy(() => import('../pages/Courses.jsx'));
const CourseDetails = lazy(() => import('../pages/CourseDetails.jsx'));
const Blog = lazy(() => import('../pages/Blog.jsx'));
const BlogDetails = lazy(() => import('../pages/BlogDetails.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.jsx'));
const Profile = lazy(() => import('../pages/Profile.jsx'));
const MyCourses = lazy(() => import('../pages/MyCourses.jsx'));
const SearchResult = lazy(() => import('../pages/SearchResult.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:id',
        element: <CourseDetails />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:id',
        element: <BlogDetails />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'search',
        element: <SearchResult />,
      },
      // Protected Routes
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-courses',
        element: (
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      // 404 handler
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
