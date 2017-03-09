import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import AdminLayout from '../../components/AdminLayout';
import s from './Properties.css';
import ListingItem from '../../components/Properties/ListingItem/Item';
import { userPropertiesRequest } from '../../actions/user/properties';
import history from '../../core/history';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      userPropertiesRequest,
    }, dispatch),
  };
}

function mapStateToProps({ userProperties }) {
  return {
    userProperties,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class AdminProperties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  componentDidMount() {
    this.props.actions.userPropertiesRequest();
  }

  componentWillUnmount() {
    this.searchUpdated.unlisten(this);
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term,
    });
  }

  render() {
    const { properties } = this.props.userProperties;
    const KEYS_TO_FILTERS = ['id', 'attributes.display_name'];
    const filteredProperties = properties.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <AdminLayout>
        <div className={s.root}>
          <div className={s.container}>

            <div className={s.proertiesToolbar}>
              <SearchInput className={s.searchInput} onChange={this.searchUpdated} />
            </div>

            <div className={s.propertyList}>
              <Table responsive hover className={s.propertiesTable}>
                <thead>
                  <tr>
                    <th>Property Name</th>
                    <th>Location</th>
                    <th>Property ID</th>
                    <th>Rate</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredProperties.length > 0 ?
                    filteredProperties.map(item => <ListingItem key={item.id} item={item} />) :
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
      </AdminLayout>
    );
  }
}

AdminProperties.propTypes = {
  title: PropTypes.string.isRequired,
  properties: PropTypes.array,
};

export default withStyles(s)(AdminProperties);
