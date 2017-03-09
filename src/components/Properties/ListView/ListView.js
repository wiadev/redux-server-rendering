import React, { Children, PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import SearchInput, { createFilter } from 'react-search-input';
import { Table } from 'react-bootstrap';
import s from './ListView.css';
import Header from '../../Header';
import Subheader from '../../Subheader';
import AddNewProperty from '../AddNew/AddNewProperty';
import Footer from '../../Footer';
import { getUserRequest } from '../../../actions/user';
import { createProperty } from '../../../actions/properties/createProperty';
import ListingItem from '../ListingItem/Item';
import { userPropertiesRequest } from '../../../actions/user/properties';
import history from '../../../core/history';

// TODO: Pass new subtitle based on current route

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserRequest,
      createProperty,
      userPropertiesRequest,
    }, dispatch),
  };
}

function mapStateToProps({ user, newProperty, form, userProperties }) {
  return {
    user,
    newProperty,
    form,
    userProperties,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class ListView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: props.newPropertyForm,
      searchTerm: '',
    };
    this.createNewProperty = this.createNewProperty.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.rooms = this.props.userProperties.rooms;
  }

  componentDidMount() {
    if(!this.props.user.auth) {
      history.push('/login', { state: 'login' });
    }
    this.props.actions.userPropertiesRequest();
  }

  getUser() {
    const auth_token = typeof(window) != 'undefined' ? window.localStorage.getItem('auth_token') : null
    return this.props.user.auth ? this.props.user.profile : this.props.actions.getUserRequest()
  }

  getRooms(item) {
    let rooms = [];
    item.rooms.map((room) => {
      this.rooms.filter((item) => item.id === room.id ? rooms.push(item.name) : null);
    })
    return rooms;
  }

  launchModal() {
    this.setState({ showModal: true });
    history.push('/properties/new', { state: 'newProperty' });
  }

  hideModal() {
    this.setState({ showModal: false });
    history.push('/properties', { state: 'properties' });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  componentWillUnmount() {
    //this.searchUpdated.unlisten(this);
  }

  createNewProperty(event) {
    event.preventDefault();
    this.props.actions.createProperty(this.props.form.newProperty.values);
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { properties } = this.props.userProperties;
    const keysToFilters = ['id', 'attributes.display_name'];
    const filteredProperties = properties.filter(
      createFilter(this.state.searchTerm, keysToFilters)
    );

    return (
      <div>
        <Header
          user={this.props.user}
          subheader="listview"
        />
        <AddNewProperty
          show={this.state.showModal}
          close={this.hideModal.bind(this)}
          submitForm={this.createNewProperty}
        />

        <div className={`${s.applicationContainer} clearfix`}>
          <div className={`${s.rightColumn} col-xs-12 primary-main`}>
          <div className={s.proertiesSearchbar}>
            <SearchInput className={s.searchInput} onChange={this.searchUpdated} placeholder="Search by ID, Name or Room" />
          </div>

          <div className={s.propertyList}>
            <Table responsive hover className={s.propertiesTable}>
              <thead>
                <tr>
                  <th className={`${s.tableTitle} ${s.propTitleHead}`}>Property Name</th>
                  <th className={`${s.tableTitle} ${s.propLocationHead}`}>Location</th>
                  <th className={`${s.tableTitle} ${s.propIdHead}`}>Property ID</th>
                  <th className={`${s.tableTitle} ${s.propRateHead}`}>Rate</th>
                  <th className={`${s.tableTitle} ${s.propDateHead}`}>Last Updated</th>
                  <th className={`${s.tableTitle} ${s.propStatusHead}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredProperties.length > 0 ?
                  filteredProperties.map(item => <ListingItem key={item.id} item={item} rooms={this.getRooms(item)} />) :
                    <tr>
                      <td className="text-center">
                        <img src="https://cl.ly/2g3Z3t0d1e1r/rolling.gif" alt="spinner" />
                      </td>
                    </tr>
                }
              </tbody>
            </Table>
          </div>
          </div>
        </div>

        {/* TODO: refactor this out */}
        <div className="clearfix"></div>

        {/* <Footer /> */}
      </div>
    );
  }
}

ListView.propTypes = {
  properties: PropTypes.array,
};

export default withStyles(s)(ListView);
