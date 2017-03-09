import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import MenuLink from './MenuLink';
import ProfileStatus from '../ProfileStatus';
import Tags from './Tags';
import RoomListingsMenu from './RoomListingsMenu';
import history from '../../core/history';
import s from './PrimaryLeftNavigation.css';

class PrimaryLeftNavigation extends Component {

  constructor() {
    super();

    this.state = {
      isPropertyExpanded: true,
      isRoomListingExpanded: true,
    }
  }

  onToggle = (index) => {
    const propertyMenuStatus = this.state.isPropertyExpanded;
    const roomMenuStatus = this.state.isRoomListingExpanded;

    switch (index) {
      case 0:
        this.setState({ isPropertyExpanded: !propertyMenuStatus})
        break;
      case 1:
        this.setState({ isRoomListingExpanded: !roomMenuStatus})
        break;
      default:
        break;
    }
  }

  render() {
    const { isPropertyExpanded, isRoomListingExpanded } = this.state;
    const tag = [{number: this.props.property.data.id}];
    return (
      <div className={s.content}>

        <ul className={s.container}>
          <MenuLink text={'Property Information'} className={s.propertyLink} toggle={(index) => this.onToggle(index)} index={0}>
            { isPropertyExpanded && <Tags tags={tag}/> }
          </MenuLink>

          <MenuLink text={'Room Listings'} className={s.roomLink} toggle={this.onToggle} index={1}>
          </MenuLink>
          { isRoomListingExpanded &&
            <RoomListingsMenu property={this.props.property} isAddingNew={this.props.isAddingNew} roomId={this.props.roomId}/>
          }
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(PrimaryLeftNavigation);
