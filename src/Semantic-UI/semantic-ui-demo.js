import React, {Component} from 'react';
import { Button, List, Icon, Table } from 'semantic-ui-react';

const ListExampleBasic = () => (
    <div>
        <Icon name='spinner' size='large'/>
        <List>
            <List.Item >
                <List.Content>Apples</List.Content>
            </List.Item>
            <List.Item icon='mail' content='Pears'/>
            <List.Item>Oranges</List.Item>
        </List>
    </div>
)

export const TableExample = () => {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Jimie</Table.Cell>
                    <Table.Cell>Unknown</Table.Cell>
                    <Table.Cell positive>
                        <Icon name='close'/>
                        Require
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}

export class ListExampleIcon extends Component {
    render () {
        return <div>
            <List>
            <List.Item icon='users' content='Semantic UI'>
            </List.Item>
            <List.Item>
            <List.Icon name='marker' />
            <List.Content>New York, NY</List.Content>
            </List.Item>
            <List.Item>
            <List.Icon name='mail' />
            <List.Content>
                <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
            </List.Content>
            </List.Item>
            <List.Item>
            <List.Icon name='linkify' />
            <List.Content>
                <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
            </List.Content>
            </List.Item>
        </List>
        </div>
    }
}

export default ListExampleBasic;
