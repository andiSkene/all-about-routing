import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage() {
    const data = useRouteLoaderData('event');

    return <EventForm event={data.event} method='patch' />
}

export default EditEventPage;