import React, { Children, PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import SearchInput, { createFilter } from 'react-search-input';
import { Table } from 'react-bootstrap';
import s from './InvoicesList.css';
import Header from '../../Header';
import Subheader from '../../Subheader';
import Footer from '../../Footer';
import Invoice from '../Invoice/Invoice';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import { getInvoices } from '../../../actions/properties/getInvoices';
import history from '../../../core/history';

// TODO: Pass new subtitle based on current route

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getInvoices,
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

class InvoicesList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm: '',
      invoices: [],
      invoiceDetails: props.invoiceDetails,
      selectedInvoiceId: null,
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.getInvoice = this.getInvoice.bind(this);
    console.log(this);
  }

  componentDidMount() {
    this.props.actions.getInvoices(this.props.propertyId).then(() => {
      this.setState({
        invoices: this.props.invoices.data,
      })
    });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  getInvoice = (invoiceId) => {
    console.log(history);
    history.push(`${history.location.pathname}/${invoiceId}`);
    console.log(invoiceId);
    this.setState({
      selectedInvoiceId: invoiceId,
      invoiceDetails: true
    })
  }

  render() {
    console.log(this.state);
    const keysToFilters = ['id', 'customer_name', 'room_name'];
    const filteredProperties = this.state.invoices.filter(
      createFilter(this.state.searchTerm, keysToFilters)
    );

    console.log(this.state.invoiceDetails)

    return (
      <div>
        <Header
          user={this.props.user}
          subheader="simple"
          subheaderTitle="Invoices"
        />

      {this.state.invoiceDetails ? <InvoiceDetails invoice={this.props.invoiceId} /> : null}

        <div className={`${s.applicationContainer} clearfix`}>
          <div className={`${s.rightColumn} col-xs-12 primary-main`}>
          <div className={s.proertiesSearchbar}>
            <SearchInput className={s.searchInput} onChange={this.searchUpdated} placeholder="Search by Name, Email or Company" />
          </div>

          <div className={`${s.propertyList} customer-list`}>
            <h3 className={s.totalCustomers}>{this.state.invoices.length} Total</h3>
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
                  filteredProperties.map(item => <Invoice key={item.id} item={item} viewInvoiceDetails={this.getInvoice} />) :
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

InvoicesList.propTypes = {
  invoices: PropTypes.array,
};

export default withStyles(s)(InvoicesList);
