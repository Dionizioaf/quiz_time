import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { authProvider } from "./authProvider";
// import { dataProvider } from "./dataProvider";
import { EventCreate } from "./event/EventCreate";
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com/posts');

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="events" create={EventCreate} list={EditGuesser} />
  </Admin>
);
