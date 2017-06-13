import React, {Component} from 'react';
import { List, Icon } from 'semantic-ui-react';


const ListExampleBasic = () => (
    <List>
        <List.Item >
            <List.Content>Apples</List.Content>
        </List.Item>
        <List.Item icon='mail' content='Pears'/>
        <List.Item>Oranges</List.Item>
    </List>
)

export class ListExampleIcon extends Component {
    render () {
        console.log('render');
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
