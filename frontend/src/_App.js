// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage -----------check!
//    - EventsPage -----------check!
//    - EventDetailPage -----------check!
//    - NewEventPage -----------check!
//    - EditEventPage -----------check!
// 2. Add routing & route definitions for these five pages
//    - / => HomePage -----------check!
//    - /events => EventsPage -----------check!
//    - /events/<some-id> => EventDetailPage -----------check!
//    - /events/new => NewEventPage -----------check!
//    - /events/<some-id>/edit => EditEventPage -----------check!
// 3. Add a root layout that adds the <MainNavigation> component above all page components -----------check!
// 4. Add properly working links to the MainNavigation -----------check!
// 5. Ensure that the links in MainNavigation receive an "active" class when active -----------check!
// 6. Output a list of dummy events to the EventsPage -----------check!
//    Every list item should include a link to the respective EventDetailPage -----------check!
// 7. Output the ID of the selected event on the EventDetailPage -----------check!
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import Events, { loader as eventsLoader } from './pages/Events';
import EventDetail, { loader as eventDetailLoader, action as deleteEventAction } from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import { action as manipulateEventAction } from './components/EventForm';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events', element: <EventsRootLayout />, children: [
          { index: true, element: <Events />, loader: eventsLoader },
          {
            path: ':eventId',
            loader: eventDetailLoader,
            id: 'event',
            children: [
              { index: true, element: <EventDetail />, action: deleteEventAction },
              { path: 'edit', element: <EditEvent />, action: manipulateEventAction },
            ]
          },
          { path: 'new', element: <NewEventPage />, action: manipulateEventAction },
        ]
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
