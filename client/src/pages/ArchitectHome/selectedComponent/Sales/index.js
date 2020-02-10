import React from "react";
import axios from "axios";
import { Table } from "antd";
import Spinner from "../../../../components/Spinner";
import Message from "../../../../components/Message";

import "./style.css";

const { Column } = Table;

class Sales extends React.Component {
  state = {
    isLoading: true,
    tableError: false,
    tableErrorMsg: "",
    user_id: 1, // should be replaced with id of user who logged in
  };

  componentDidMount() {
    const { user_id } = this.state;
    axios
      .get(`/v1/users/${user_id}/projects`)
      .then(response => {
        console.log(444444, response);

        const soldProjects = response.data.response.data.filter(project => project.sold === true);
        this.setState({
          projects: soldProjects,
          isLoading: false,
          tableError: false,
          tableErrorMsg: "",
        });
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          tableError: true,
          tableErrorMsg: error.response.data.error.msg,
        })
      );
  }

  onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  render() {
    const { projects, isLoading, tableError, tableErrorMsg } = this.state;
    let body = null;
    if (isLoading) body = <Spinner type="spin" width={150} height={150} color="#ffc000" />;
    if (tableError)
      body = <Message message={tableErrorMsg} type="error" className="login__errorMsg" />;
    else
      body = (
        <Table dataSource={projects} onChange={this.onChange} className="sales-table">
          <Column title="إسم الخطة\التصميم" dataIndex="name" key="name" />
          <Column title="المبلغ الكلي" dataIndex="total_price" key="total_price" />
          <Column title="المبلغ المستحق" dataIndex="engineer_price" key="engineer_price" />
          <Column title="تاريخ البيع" dataIndex="date" key="date" />
          <Column title="المشتري" dataIndex="buyer_name" key="buyer_name" />
        </Table>
      );
    return (
      <div className="sales-page">
        <p>المبيعات</p>
        {body}
      </div>
    );
  }
}

export default Sales;
