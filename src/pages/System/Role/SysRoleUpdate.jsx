import React, {Component} from "react";
import {connect} from "dva";
import {Col, Form, Input, Modal, Row, Select, TreeSelect} from "antd";

@connect(({SysRoleModel, loading}) => ({
  SysRoleModel,
  submitting: loading.effects['SysRoleModel/eUpdateSysRole'],
}))
class SysRoleUpdate extends Component {
  state = {};

  handlerSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch({type: `SysRoleModel/eUpdateSysRole`, payload: values}).then(status => {
          if (status) {
            this.props.handlerVisibleAddModal(true)
          }
        });
      }
    });
  };

  render() {
    const {SysRoleModel: {role = {}, permissions = []}, submitting, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div>
        <Modal
          width={416*2}
          title="修改系统角色"
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
                initialValue: role.id,
                rules: [
                  {
                    required: true,
                    message: '请输入角色编号！',
                  },
                ],
              })(<Input placeholder="请输入角色编号"/>)}
            </Form.Item>

            <Row gutter={24}>

              <Col span={12}>
                <Form.Item label="角色名">
                  {getFieldDecorator('name', {
                    initialValue: role.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入角色名！',
                      },
                    ],
                  })(<Input placeholder="请输入角色名"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="角色编码">
                  {getFieldDecorator('code', {
                    initialValue: role.code,
                    rules: [
                      {
                        required: true,
                        message: '请输入角色编码！',
                      },
                    ],
                  })(<Input placeholder="请输入角色编码"/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="状态">
                  {getFieldDecorator('state', {
                    initialValue: `${role.state}`,
                    rules: [
                      {
                        required: true,
                        message: '请选择状态！',
                      },
                    ],
                  })(<Select>
                    <Select.Option value="0">禁用</Select.Option>
                    <Select.Option value="1">启用</Select.Option>
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="角色类型">
                  {getFieldDecorator('type', {
                    initialValue: role.type,
                    rules: [
                      {
                        required: false,
                        message: '请选择角色类型！',
                      },
                    ],
                  })(<Select>
                    <Select.Option value="0">带定义1</Select.Option>
                    <Select.Option value="1">带定义2</Select.Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="权限列表">
                  {getFieldDecorator('permissionIds', {
                    initialValue: role.permissions,
                    rules: [
                      {
                        required: true,
                        message: '请选择权限列表！',
                      },
                    ],
                  })(<TreeSelect placeholder="请选择权限列表" multiple showSearch allowClear treeData={permissions} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="备注">
                  {getFieldDecorator('remark', {
                    initialValue: role.remark,
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


export default Form.create({ name: 'sys_role_update' })(SysRoleUpdate);
