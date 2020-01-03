import React, {Component} from "react";
import {connect} from "dva";
import {Col, Form, Input, Modal, Row, Select, TreeSelect} from "antd";

@connect(({SysUserModel, loading}) => ({
  SysUserModel,
  submitting: loading.effects['SysUserModel/eUpdateSysUser'],
}))
class SysUserUpdate extends Component {
  state = {};

  handlerSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch({type: `SysUserModel/eUpdateSysUser`, payload: values}).then(status => {
          if (status) {
            this.props.handlerVisibleAddModal(true)
          }
        });
      }
    });
  };

  render() {
    const {SysUserModel: {roles = [], departments = [], user = {},}, submitting, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div>
        <Modal
          width={416*2}
          title="修改系统用户"
          destroyOnClose
          okText="更新"
          onOk={this.handlerSubmit}
          onCancel={() => this.props.handlerVisibleAddModal()}
          confirmLoading={submitting}
          visible={this.props.visible}
        >
          <Form onSubmit={this.handlerSubmit} layout="vertical">

            <Form.Item label="id" style={{display: 'none'}}>
              {getFieldDecorator('id', {
                initialValue: user.id,
                rules: [
                  {
                    required: true,
                    message: '请输入用户名！',
                  },
                ],
              })(<Input placeholder="请输入用户编号"/>)}
            </Form.Item>

            <Row gutter={24}>

              <Col span={12}>
                <Form.Item label="用户名">
                  {getFieldDecorator('username', {
                    initialValue: user.username,
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名！',
                      },
                    ],
                  })(<Input placeholder="请输入用户名"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="昵称">
                  {getFieldDecorator('nickname', {
                    initialValue: user.nickname,
                    rules: [
                      {
                        required: false,
                        message: '请输入昵称！',
                      },
                    ],
                  })(<Input placeholder="请输入昵称"/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="密码">
                  {getFieldDecorator('password', {
                    initialValue: user.password,
                    rules: [
                      {
                        required: true,
                        message: '请输入密码！',
                      },
                    ],
                  })(<Input.Password placeholder="请输入密码"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号">
                  {getFieldDecorator('phone', {
                    initialValue: user.phone,
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号！',
                      },
                    ],
                  })(<Input placeholder="请输入手机号"/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="角色">
                  {getFieldDecorator('roleId', {
                    initialValue: user.roleId,
                    rules: [
                      {
                        required: true,
                        message: '请选择角色！',
                      },
                    ],
                  })(<Select showSearch allowClear>
                    {roles.map(
                      role => <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                    )}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="部门">
                  {getFieldDecorator('departmentId', {
                    initialValue: user.departmentId,
                    rules: [
                      {
                        required: true,
                        message: '请选择状态！',
                      },
                    ],
                  })(<TreeSelect showSearch allowClear treeData={departments}/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="状态">
                  {getFieldDecorator('state', {
                    initialValue: `${user.state}`,
                    rules: [
                      {
                        required: true,
                        message: '请选择状态！',
                      },
                    ],
                  })(<Select>
                    <Select.Option value="0">禁用</Select.Option>
                    <Select.Option value="1">启用</Select.Option>
                    <Select.Option value="2">锁定</Select.Option>
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="性别">
                  {getFieldDecorator('gender', {
                    initialValue: `${user.gender}`,
                    rules: [
                      {
                        required: true,
                        message: '请选择性别！',
                      },
                    ],
                  })(<Select>
                    <Select.Option value="0">女</Select.Option>
                    <Select.Option value="1">男</Select.Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="备注">
                  {getFieldDecorator('remark', {
                    initialValue: user.remark,
                    rules: [
                      {
                        required: false,
                        message: '请输入备注！',
                      },
                    ],
                  })(<Input.TextArea rows={4}/>)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}


export default Form.create({ name: 'sys_user_update' })(SysUserUpdate);
