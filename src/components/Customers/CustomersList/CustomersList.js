import React, { Children, PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import SearchInput, { createFilter } from 'react-search-input';
import { Table } from 'react-bootstrap';
import s from './CustomersList.css';
import Header from '../../Header';
import Subheader from '../../Subheader';
import Footer from '../../Footer';
import Customer from '../Customer/Customer';
import CustomerDetails from '../CustomerDetails/CustomerDetails';
import { getCustomers } from '../../../actions/properties/getCustomers';
import history from '../../../core/history';

// TODO: Pass new subtitle based on current route

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getCustomers,
    }, dispatch),
  };
}

function mapStateToProps({ user, customers }) {
  return {
    user,
    customers,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class CustomersList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm: '',
      customers: [],
      customerDetails: props.customerDetails,
      selectedCustomerId: null,
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    console.log(this);
  }

  componentDidMount() {
    this.props.actions.getCustomers(this.props.propertyId).then(() => {
      this.setState({
        customers: this.props.customers.data,
      })
    });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  getCustomer = (customerId) => {
    console.log(history);
    history.push(`${history.location.pathname}/${customerId}`);
    console.log(customerId);
    this.setState({
      selectedCustomerId: customerId,
      customerDetails: true
    })
  }

  render() {
    console.log(this.state);
    const keysToFilters = ['email', 'name', 'company'];
    const filteredProperties = this.state.customers.filter(
      createFilter(this.state.searchTerm, keysToFilters)
    );

    console.log(this.state.customerDetails)

    return (
      <div>
        <Header
          user={this.props.user}
          subheader="simple"
          subheaderTitle="Customers"
        />

      {this.state.customerDetails ? <CustomerDetails customer={this.props.customerId} /> : null}

        <div className={`${s.applicationContainer} clearfix`}>
          <div className={`${s.rightColumn} col-xs-12 primary-main`}>
          <div className={s.proertiesSearchbar}>
            <SearchInput className={s.searchInput} onChange={this.searchUpdated} placeholder="Search by Name, Email or Company" />
          </div>

          <div className={`${s.propertyList} customer-list`}>
            <h3 className={s.totalCustomers}>{this.state.customers.length} Total</h3>
            <Table hover className={s.propertiesTable}>
              <thead>
                <tr>
                  <th className={`${s.tableTitle} ${s.propTitleHead} col-md-2`}></th>
                  <th className={`${s.tableTitle} ${s.propTitleHead} col-md-3`}>Name</th>
                  <th className={`${s.tableTitle} ${s.propLocationHead} col-md-2`}>Company</th>
                  <th className={`${s.tableTitle} ${s.propIdHead} col-md-4`}>Email</th>
                  <th className={`${s.tableTitle} ${s.propRateHead} col-md-1`}>Info</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredProperties.length > 0 ?
                  filteredProperties.map(item => <Customer key={item.id} item={item} viewCustomerDetails={this.getCustomer} />) :
                    <tr>
                      <td className="text-center">
                        <img src="https://cl.ly/2g3Z3t0d1e1r/rolling.gif" alt="spinner" />
                      </td>
                      <td className="text-center">
                        <img src="https://cl.ly/2g3Z3t0d1e1r/rolling.gif" alt="spinner" />
                      </td>
                      <td className="text-center">
                        <img src="https://cl.ly/2g3Z3t0d1e1r/rolling.gif" alt="spinner" />
                      </td>
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

CustomersList.propTypes = {
  customers: PropTypes.array,
};

export default withStyles(s)(CustomersList);
