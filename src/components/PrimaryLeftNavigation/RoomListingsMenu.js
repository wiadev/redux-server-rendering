import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './RoomListingsMenu.css';

function mapStateToProps({ form }) {
  return {
    form,
  };
}

@connect(mapStateToProps)
class RoomListingsMenu extends Component {
  static defaultProps = {
    isAddingNew: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
      roomId: this.props.roomId,
    };
  }

  onSelected = (index, id) => {
    this.setState({
      selectedIndex: index,
      roomId: id,
    });
  }

  render() {
    const { property, isAddingNew, form } = this.props;
    const { selectedIndex, roomId } = this.state;
    const editRoomGeneralInfo = form.editRoomGeneral || {};
    const values = editRoomGeneralInfo.values || {};

    return (
      <div className={s.container}>
        <ul className={s.roomList}>
          { property.rooms &&
            property.rooms.map((room, index) => {
              const menuStyle = selectedIndex === index || roomId === room.id ? `${s.roomLink} ${s.active}` : s.roomLink;
              return (<li className={s.roomContainer} key={index}>
                <Link to={`/properties/${property.data.id}/rooms/${room.id}/edit`} className={menuStyle} onClick={() => this.onSelected(index, room.id)}>
                  <span className={s.roomName}>{room.name}</span>
                </Link>
              </li>);
            })
          }
          { isAddingNew && roomId === 'new' &&
            <li className={`${s.roomContainer} ${s.select}`}>
              <span className={s.roomName}>{values.name || 'Untitled Room'}</span>
            </li>
          }
        </ul>

        <Link
          to={`/properties/${property.data.id}/rooms/new`}
          className={s.addNewRoom}
        >
          + <span className={s.bottomBorder}>Add New Room</span>
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(RoomListingsMenu);
