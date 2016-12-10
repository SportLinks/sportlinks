import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/av/play-arrow';
import Subheader from 'material-ui/Subheader';
import dateFormat from 'dateformat';

export default function ListShows(props) {
  return (
    <List>
      <Subheader>Sport Shows ({props.source}) {props.date!==undefined ? 'at ' + props.date : ''} {props.loading ? 'Loading...' : ''}</Subheader>
      {(props.shows.length===0 && !props.loading) ? (<ListItem primaryText={'Sorry, no results found'}/>) : ''}
      {props.shows.map(function(listValue, index){
        return (
          <ListItem
            key={index}
            primaryText={listValue.description}
            secondaryText={
              <p>
                <span style={{color: 'black'}}>{dateFormat(listValue.startDate + '+01:00', "dd/mm HH:MM")}</span> -- {listValue.category}
              </p>
            }
            secondaryTextLines={1}
            primaryTogglesNestedList={true}
            nestedItems={listValue.streamings.map(function(listValue, index) {
              return (
                <ListItem
                  key={index}
                  primaryText={listValue.name}
                  leftIcon={<ActionGrade />}
                  href={(listValue.urlAcestream !== undefined && listValue.urlAcestream !== '') ? listValue.urlAcestream : listValue.url}
                  secondaryText={
                    <p>
                      <span style={{color: 'black'}}>{listValue.type}</span> -- {listValue.kbps} kbps
                    </p>
                  }
                />
              )
            })}
          />
        )
      })}
    </List>
  );
}
