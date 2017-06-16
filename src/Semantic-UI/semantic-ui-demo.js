import React, {Component} from 'react';
import { Button, List, Icon, Table, Label } from 'semantic-ui-react';

const SemanticList = () => (
    <div style={{margin: 'auto', border: '1px solid gray', width: '90%'}}>
        <List divided selection>
            <List.Item >
                <List.Icon name='users' verticalAlign='bottom'/>
                Apples
                <Label color='teal' horizontal>22</Label>
                {/*<List.Icon floated='right' name='angle down' />*/}
            </List.Item>
            <List.Item icon='mail' content='Pears'/>
            <List.Item >
                <List.Icon name='marker' />
                <List.Content>Orange</List.Content>
            </List.Item>
        </List>
    </div>
)

export const SemanticTable = () => {
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

export class SemanticListIcon extends Component {
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

export default SemanticList;
