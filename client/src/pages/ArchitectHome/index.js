import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import selectedComponent from "./details";

import "./style.css";

class ArchitectHome extends React.Component {
  state = {
    title: "حسابي",
    key: "3",
    isResponsive: false,
  };

  componentDidMount() {
    if (window.screen.width <= 425) {
      this.setState({
        isResponsive: true,
      });
    }
  }

  handleSubNavClick = e => {
    this.setState({
      key: e.key,
      title: e.item.props.children,
    });
  };

  render() {
    const { title, isResponsive } = this.state;
    return (
      <>
        <Navbar />
        <div className="architectNavbar">
          <div>
            <h1 className="architectNavbar__title">{title}</h1>
            <Menu
              onClick={this.handleSubNavClick}
              mode="horizontal"
              style={{ backgroundColor: "#404041", color: "#909090" }}
              defaultSelectedKeys={["3"]}
            >
              <Menu.Item key="1">حسابي</Menu.Item>
              <Menu.Item key="2">التصاميم والخطط</Menu.Item>
              <Menu.Item key="3">المبيعات</Menu.Item>
            </Menu>
          </div>
          {!isResponsive ? (
            <div className="designs__add">
              <Link to="/add">
                <Button label="اضافة تصميم جديد" />
              </Link>
            </div>
          ) : null}
        </div>
        <div className="selected-component"> {selectedComponent[this.state.key]}</div>
        <Footer />
      </>
    );
  }
}

export default ArchitectHome;
