import React, {Component} from "react";
import {connect} from "dva";
import {Col, Form, Input, InputNumber, Modal, Row, Select, TreeSelect} from "antd";

@connect(({SysDepartmentModel, loading}) => ({
  SysDepartmentModel,
  submitting: loading.effects['SysDepartmentModel/eAddSysDepartment'],
}))
class SysDepartmentAdd extends Component {
  state = {};

  handlerSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        const parentId = values.parentId === '0' ? '' : values.parentId;
        dispatch({type: `SysDepartmentModel/eAddSysDepartment`, payload: {...values, parentId}}).then(status => {
          if (status) {
            this.props.handlerVisibleAddModal(true)
          }
        });
      }
    });
  };

  render() {
    const {SysDepartmentModel: {select = []}, submitting, form} = this.props;
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
                <Form.Item label="部门名">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门名！',
                      },
                    ],
                  })(<Input placeholder="请输入部门名"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="部门排序">
                  {getFieldDecorator('sort', {
                    rules: [
                      {
                        required: true,
                        message: '请输入部门排序！',
                      },
                    ],
                  })(<InputNumber style={{width: '100%'}} placeholder="请输入部门排序"/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="状态">
                  {getFieldDecorator('state', {
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
                <Form.Item label="父级部门">
                  {getFieldDecorator('parentId', {
                    rules: [
                      {
                        required: true,
                        message: '请选择父级部门！',
                      },
                    ],
                  })(<TreeSelect showSearch allowClear treeData={select}/>)}
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

export default Form.create({name: 'sys_department_add'})(SysDepartmentAdd);
