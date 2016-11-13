import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';
import dateFormat from 'dateformat';

export default class ListShows extends React.Component {

  constructor(props) {
    super(props);
    this.state = {list: []};
  }

  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get("https://sopred.herokuapp.com/shows/acestream")
        .then(function(result) {
          _this.setState({list: result.data});
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <List>
        <Subheader>Sport Shows</Subheader>
        {this.state.list.map(function(listValue, index){
          return <ListItem key={index} primaryText={dateFormat(listValue.startDate, "dd/mm HH:MM") + ': ' + listValue.category_es + ' - ' + listValue.description} leftIcon={<ContentSend />} nestedItems={
            listValue.streamings.map(function(listValue, index){
              return <ListItem
                key={index}
                primaryText={listValue.name}
                leftIcon={<ActionGrade />}
                href={listValue.urlAcestream}
              />
            })}
          />;
        })}
        </List>
    );
  }
}
