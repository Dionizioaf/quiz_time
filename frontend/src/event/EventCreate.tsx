import React from 'react';
import { Create, SimpleForm, TextInput, CreateProps } from 'react-admin';

export const EventCreate: React.FC<CreateProps> = (props) => (
    <Create {...props} title="Criar um novo evento">
        <SimpleForm>
            <TextInput source="event_name" label="Nome do evento" />
        </SimpleForm>
    </Create>
);
