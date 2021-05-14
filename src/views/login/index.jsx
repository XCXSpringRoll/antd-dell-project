import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"用户登录"}>
      <div className="login-container">
        <div className="big-title">麦酷学生管理系统</div>
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>欢迎登录麦酷教育</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名",
                  },
                ],
                // initialValue: "admin", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="输入账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入密码",
                  },
                ],
                // initialValue: "123456", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              验证码：<Input className="code"/>
              <Button
                type="primary"
                className="get-code"
              >
                获取验证码
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item className="forget">
              <span>忘记密码 ｜ 帮助</span>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
