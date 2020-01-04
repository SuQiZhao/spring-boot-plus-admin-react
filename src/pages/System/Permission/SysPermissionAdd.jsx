import React, {Component} from "react";
import {connect} from "dva";
import {Col, Form, Input, InputNumber, Modal, Row, Select, TreeSelect} from "antd";

@connect(({SysPermissionModel, loading}) => ({
  SysPermissionModel,
  submitting: loading.effects['SysPermissionModel/eAddSysPermission'],
}))
class SysPermissionAdd extends Component {
  state = {};

  handlerSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        const parentId = values.parentId === '0' ? '' : values.parentId;
        dispatch({type: `SysPermissionModel/eAddSysPermission`, payload: {...values, parentId}}).then(status => {
          if (status) {
            this.props.handlerVisibleAddModal(true)
          }
        });
      }
    });
  };

  render() {
    const {SysPermissionModel: {select = []}, submitting, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div>
        <Modal
          width={416 * 2}
          title="添加系统角色"
          destroyOnClose
          okText="添加"
          onOk={this.handlerSubmit}
          onCancel={() => this.props.handlerVisibleAddModal()}
          confirmLoading={submitting}
          visible={this.props.visible}
        >
          <Form onSubmit={this.handlerSubmit} layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="权限名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入权限名称！',
                      },
                    ],
                  })(<Input placeholder="请输入权限名称"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="唯一编码">
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入唯一编码！',
                      },
                    ],
                  })(<Input placeholder="请输入唯一编码"/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="权限排序">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '请输入权限排序！',
                      },
                    ],
                  })(<InputNumber style={{width: '100%'}} placeholder="请输入权限排序"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="图标">
                  {getFieldDecorator('icon', {
                    rules: [
                      {
                        required: false,
                        message: '请输入图标！',
                      },
                    ],
                  })(<Input placeholder="请输入图标"/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="类型">
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: '请选择类型！',
                      },
                    ],
                  })(<Select placeholder="请选择类型">
                    <Select.Option value="1">菜单</Select.Option>
                    <Select.Option value="2">按钮</Select.Option>
                  </Select> )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="层级">
                  {getFieldDecorator('level', {
                    rules: [
                      {
                        required: true,
                        message: '请选择层级！',
                      },
                    ],
                  })(<Select placeholder="请选择层级">
                    <Select.Option value="1">第一级</Select.Option>
                    <Select.Option value="2">第二级</Select.Option>
                    <Select.Option value="3">第三级</Select.Option>
                  </Select> )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="状态">
                  {getFieldDecorator('state', {
                    initialValue: '1',
                    rules: [
                      {
                        required: true,
                        message: '请选择状态！',
                      },
                    ],
                  })(<Select>
                    <Select.Option value="1">启用</Select.Option>
                    <Select.Option value="0">禁用</Select.Option>
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="父级权限">
                  {getFieldDecorator('parentId', {
                    rules: [
                      {
                        required: true,
                        message: '请选择父级权限！',
                      },
                    ],
                  })(<TreeSelect showSearch allowClear treeData={select}/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="路径">
                  {getFieldDecorator('url', {
                    rules: [
                      {
                        required: false,
                        message: '请输入路径！',
                      },
                    ],
                  })(<Input placeholder="请输入路径" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="备注">
                  {getFieldDecorator('remark', {
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

export default Form.create({name: 'sys_department_add'})(SysPermissionAdd);
