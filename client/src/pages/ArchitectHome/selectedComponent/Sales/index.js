import React from "react";
import axios from "axios";
import { Table } from "antd";

import "./style.css";

const { Column } = Table;

class Sales extends React.Component {
  state = {
    isLoading: true,
    tableError: false,
    tableErrorMsg: "",
    user_id: 1, // should be replaced with id of user who logged in
  };

  onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  componentDidMount() {
    const { user_id } = this.state;
    axios
      .get(`/v1/users/${user_id}`)
      .then(response =>
        this.setState({
          projects: response.data.response.data,
          isLoading: false,
          tableError: false,
          tableErrorMsg: "",
        })
      )
      .catch(error =>
        this.setState({
          isLoading: false,
          tableError: true,
          tableErrorMsg: error.response.data.error.msg,
        })
      );
  }

  render() {
    const { projects } = this.state;
    return (
      <div className="sales-page">
        <p>المبيعات</p>
        <Table dataSource={projects} onChange={this.onChange} className="sales-table">
          <Column title="إسم الخطة\التصميم" dataIndex="title" key="title" />
          <Column title="المبلغ الكلي" dataIndex="totalPrice" key="totalPrice" />
          <Column title="المبلغ المستحق" dataIndex="price" key="price" />
          <Column title="تاريخ البيع" dataIndex="date" key="date" />
          <Column title="المشتري" dataIndex="buyer" key="buyer" />
        </Table>
      </div>
    );
  }
}

export default Sales;
