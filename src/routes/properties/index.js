import React from 'react';
import Properties from './Properties';
import ListView from '../../components/Properties/ListView/ListView';
import AddNewRoom from '../../components/EditProperty/AddNewRoom/AddNewRoom';
import Onboarding from '../../components/EditProperty/Onboarding/Onboarding';
import RoomContainer from '../../components/Rooms/RoomContainer/RoomContainer';
import CalendarContainer from '../../components/Calendar/Container/CalendarContainer';
import CustomersList from '../../components/Customers/CustomersList/CustomersList';
import InvoicesList from '../../components/Invoices/InvoicesList/InvoicesList';

const title = 'Properties';

export default {

  path: '/properties',

  children: [
    {
      path: '/new',
      action: () => {
        return {
          title: 'Add new property',
          component: <ListView newPropertyForm={true} key="add-new" title={title} />,
        };
      },
    },
    {
      path: '/:propertyId/rooms/:roomId/edit',
      action: ({ params }) => {
        return {
          title: 'Add new room',
          component:
            <RoomContainer
              propertyId={`${params.propertyId}`}
              roomId={`${params.roomId}`}
              title={title}
            />
        };
      },
    },
    {
      path: '/:propertyId/rooms/new',
      action: ({ params }) => {
        return {
          title: 'Add new room',
          component:
            <Onboarding key="new-room" propertyId={`${params.propertyId}`} title={title} newRoomForm />
        };
      },
    },
    {
      path: '/:propertyId/edit',
      action: ({ params }) => {
        console.log(`prop edit-${params.propertyId}`);
        return {
          title: 'Edit',
          component: <Onboarding
                key={`edit-${params.propertyId}`}
                propertyId={`${params.propertyId}`}
              />,
        };
      },
    },
    {
      path: '/:propertyId/calendar',
      action: ({ params }) => {
        console.log('prop cal');
        return {
          title: 'Calendar',
          component: <CalendarContainer
                key={`calendar-${params.propertyId}`}
                propertyId={`${params.propertyId}`}
              />,
        };
      },
    },
    {
      path: '/:propertyId/customers/:customerId',
      action: ({ params }) => {
        return {
          title: 'Customer Details',
          component: <CustomersList
            key={`customers-${params.propertyId}`}
            propertyId={`${params.propertyId}`}
            customerId={params.customerId}
            customerDetails
          />,
        };
      },
    },
    {
      path: '/:propertyId/customers',
      action: ({ params }) => {
        return {
          title: 'Customers',
          component: <CustomersList
                key={`customers-${params.propertyId}`}
                propertyId={`${params.propertyId}`}
              />,
        };
      },
    },

    {
      path: '/:propertyId/invoices',
      action: ({ params }) => {
        return {
          title: 'Invoices',
          component: <InvoicesList
                key={`invoices-${params.propertyId}`}
                propertyId={`${params.propertyId}`}
              />,
        };
      },
    },

    {
      path: '/',
      action: () => {
        return {
          title,
          component: <ListView title={title} />,
        };
      },
    },
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Properties  Page'} - bizly.com`;
    route.description = route.description || '';
    route.bodyClass = 'properties appLayout';
    return route;
  },

};
