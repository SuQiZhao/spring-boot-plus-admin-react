import React, {Component} from 'react';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Popconfirm, Row, Table, Tag} from "antd";
import {connect} from 'dva';
import style from '@/less/table.less'
import SysRoleUpdate from "./SysRoleUpdate";
import SysRoleAdd from "./SysRoleAdd";

@connect(({SysRoleModel, loading}) => ({
  SysRoleModel,
  submitting: loading.effects['SysRoleModel/eSysRolePage'],
}))
@Form.create()
export default class SysRoles extends Component {
  state = {
    current: 1,
    size: 20,
    ids: [],
    visibleAddModal: false,
    visibleUpdateModal: false,
  };

  /**
   * 组件即将挂载
   */
  componentWillMount() {
    this.fetchSysRoleList();
    this.action('eGetSysPermissionList');
  }

  /**
   * 操作当前 model action
   * @param effect
   * @param payload
   */
  action = (effect, payload) => {
    const {dispatch} = this.props;
    return dispatch({type: `SysRoleModel/${effect}`, payload});
  };

  /**
   * 表单提交
   * @param e
   */
  onSubmit = e => {
    e.preventDefault();
    this.fetchSysRoleList();
  };

  /**
   * 查询列表
   * @param data
   */
  fetchSysRoleList = (data = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {current, size} = this.state;
        this.action('eSysRolePage', {...values, ...data, current, size});
      }
    });
  };

  /**
   * 分页
   * @param page
   */
  changePage = page => {
    this.setState({
      current: page,
    }, () => {
      this.fetchSysRoleList();
    })
  };

  /**
   * 删除系统角色
   */
  deleteRoles = () => {
    const {ids} = this.state;
    if (!ids || ids.length < 1) {
      message.error("当前未选中角色!");
      return;
    }
    message.error("暂不支持多选!")
    // this.action('eDeleteSysRoleByIds', {ids});
  };

  /**
   * 创建角色弹窗
   */
  handlerVisibleAddModal = reload => {
    const {visibleAddModal} = this.state;
    this.setState({
      visibleAddModal: !visibleAddModal,
    }, () => {
      if (reload) {
        this.fetchSysRoleList();
      }
    })
  };

  /**
   * 修改角色弹窗
   */
  handlerVisibleUpdateModal = reload => {
    const {visibleUpdateModal} = this.state;
    this.setState({
      visibleUpdateModal: !visibleUpdateModal,
    }, () => {
      if (reload) {
        this.fetchSysRoleList();
      }
    })
  };

  /**
   * 获取角色信息
   */
  handlerGetById = id => {
    this.action("eGetSysRole", {id}).then(() => {
      this.handlerVisibleUpdateModal();
    });
  };

  /**
   * 删除角色
   */
  handlerDeleteById = id => {
    this.action("eDeleteSysRoleById", {id}).then(result => {
      if (result) {
        this.fetchSysRoleList();
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
    const {SysRoleModel: {records, total}, form, submitting} = this.props;
    const {getFieldDecorator} = form;
    const columns = [
      {title: '角色名称', dataIndex: 'name'},
      {title: '角色编码 ', dataIndex: 'code'},
      {
        title: '角色状态', dataIndex: 'state',
        render: (text, record) => this.renderStateTag(record.state),
      },
      {title: '备注', dataIndex: 'remark'},
      {title: '创建时间', dataIndex: 'createTime'},
      {
        title: '操作', dataIndex: 'action',
        render: (text, record) => (<Button.Group size="small">
          <Button type="link" size="small" onClick={() => this.handlerGetById(record.id)}>修改</Button>
          <Popconfirm
            title={`你确定要删除角色 ${record.name} 吗?`}
            onConfirm={() => this.handlerDeleteById(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type='link' size="small">删除</Button>
          </Popconfirm>
        </Button.Group>)
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ids: selectedRows.map(row => row.id),
        });
      },
    };
    return (
      <PageHeaderWrapper>
        <Card>
          <Form layout="inline" onSubmit={this.onSubmit}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="角色名">
                  {getFieldDecorator('Rolename', {})(
                    <Input placeholder="请输入角色名"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <div style={{float: 'right'}}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    查询
                  </Button>
                  <Button loading={submitting} style={{marginLeft: 8}} onClick={() => {
                    this.props.form.resetFields();
                    this.fetchSysRoleList();
                  }}>
                    重置
                  </Button>
                </div>
              </Col>

            </Row>
          </Form>
          <Button icon="user-add" type="primary" className={style.tool}
                  onClick={() => this.handlerVisibleAddModal()}>添加</Button>
          <Button icon="delete" type="danger" className={style.tool}
                  onClick={() => this.deleteRoles()}>删除</Button>
          <Table
            className={style.table}
            columns={columns}
            rowKey={record => record.id}
            loading={submitting}
            dataSource={records}
            rowSelection={rowSelection}
            pagination={{
              total: Number(total),
              showTotal: t => `一共有角色: ${t} 名`,
              current: this.state.current,
              size: this.state.size,
              onChange: this.changePage,
            }}
          />

          <SysRoleAdd
            visible={this.state.visibleAddModal}
            handlerVisibleAddModal={this.handlerVisibleAddModal}
          />

          <SysRoleUpdate
            visible={this.state.visibleUpdateModal}
            handlerVisibleAddModal={this.handlerVisibleUpdateModal}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
