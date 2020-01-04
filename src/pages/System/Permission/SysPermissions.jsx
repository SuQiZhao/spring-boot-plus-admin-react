import React, {Component} from 'react';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, Popconfirm, Row, Table, Tag} from "antd";
import {connect} from 'dva';
import style from '@/less/table.less'
import SysPermissionUpdate from "./SysPermissionUpdate";
import SysPermissionAdd from "./SysPermissionAdd";

@connect(({SysPermissionModel, loading}) => ({
  SysPermissionModel,
  submitting: loading.effects['SysPermissionModel/eSysPermissionTree'],
}))
@Form.create()
export default class SysPermissions extends Component {
  state = {
    current: 1,
    size: 20,
    visibleAddModal: false,
    visibleUpdateModal: false,
  };

  /**
   * 组件即将挂载
   */
  componentWillMount() {
    this.fetchSysPermissionList();
  }

  /**
   * 操作当前 model action
   * @param effect
   * @param payload
   */
  action = (effect, payload) => {
    const {dispatch} = this.props;
    return dispatch({type: `SysPermissionModel/${effect}`, payload});
  };

  /**
   * 表单提交
   * @param e
   */
  onSubmit = e => {
    e.preventDefault();
    this.fetchSysPermissionList();
  };

  /**
   * 查询列表
   * @param data
   */
  fetchSysPermissionList = (data = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {current, size} = this.state;
        this.action('eSysPermissionTree', {...values, ...data, current, size});
      }
    });
  };

  /**
   * 创建权限弹窗
   */
  handlerVisibleAddModal = reload => {
    const {visibleAddModal} = this.state;
    this.setState({
      visibleAddModal: !visibleAddModal,
    }, () => {
      if (reload) {
        this.fetchSysPermissionList();
      }
    })
  };

  /**
   * 修改权限弹窗
   */
  handlerVisibleUpdateModal = reload => {
    const {visibleUpdateModal} = this.state;
    this.setState({
      visibleUpdateModal: !visibleUpdateModal,
    }, () => {
      if (reload) {
        this.fetchSysPermissionList();
      }
    })
  };

  /**
   * 获取权限信息
   */
  handlerGetById = id => {
    this.action("eGetSysPermission", {id}).then(() => {
      this.handlerVisibleUpdateModal();
    });
  };

  /**
   * 删除权限
   */
  handlerDeleteById = id => {
    this.action("eDeleteSysPermissionById", {id}).then(result => {
      if (result) {
        this.fetchSysPermissionList();
      }
    });
  };

  /**
   * 返回 状态标签
   */
  renderStateTag = state => {
    if (state === 1) {
      return <Tag color="green">正常</Tag>
    }
    if (state === 0) {
      return <Tag color="red">禁用</Tag>
    }
    return <Tag color="blue">未知</Tag>
  };

  render() {
    const {SysPermissionModel: {tree}, form, submitting} = this.props;
    const {getFieldDecorator} = form;
    const columns = [
      {title: '权限名称', dataIndex: 'name'},
      {title: '排序 ', dataIndex: 'sort'},
      {title: '路径 ', dataIndex: 'url'},
      {
        title: '权限状态', dataIndex: 'state',
        render: (text, record) => this.renderStateTag(record.state)
      },
      {title: '备注', dataIndex: 'remark'},
      {title: '创建时间', dataIndex: 'createTime'},
      {
        title: '操作', dataIndex: 'action',
        render: (text, record) => (<Button.Group size="small">
          <Button type="link" size="small" onClick={() => this.handlerGetById(record.id)}>修改</Button>
          <Popconfirm
            title={`你确定要删除权限 ${record.name} 吗?`}
            onConfirm={() => this.handlerDeleteById(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type='link' size="small">删除</Button>
          </Popconfirm>
        </Button.Group>)
      },
    ];
    return (
      <PageHeaderWrapper>
        <Card>
          <Form layout="inline" onSubmit={this.onSubmit}>
            <Row gutter={24}>
              {/*<Col span={6}>*/}
              {/*  <Form.Item label="权限名">*/}
              {/*    {getFieldDecorator('Permissionname', {})(*/}
              {/*      <Input placeholder="请输入权限名"/>,*/}
              {/*    )}*/}
              {/*  </Form.Item>*/}
              {/*</Col>*/}

              <Col span={12}>
                <div style={{float: 'right'}}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    查询
                  </Button>
                  <Button loading={submitting} style={{marginLeft: 8}} onClick={() => {
                    this.props.form.resetFields();
                    this.fetchSysPermissionList();
                  }}>
                    重置
                  </Button>
                </div>
              </Col>

            </Row>
          </Form>
          <Button type="primary" className={style.tool}
                  onClick={() => this.handlerVisibleAddModal()}>添加</Button>
          <Table
            className={style.table}
            columns={columns}
            rowKey={record => record.id}
            loading={submitting}
            dataSource={tree}
            pagination={false}
          />

          <SysPermissionAdd
            visible={this.state.visibleAddModal}
            handlerVisibleAddModal={this.handlerVisibleAddModal}
          />

          <SysPermissionUpdate
            visible={this.state.visibleUpdateModal}
            handlerVisibleAddModal={this.handlerVisibleUpdateModal}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
