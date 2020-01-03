import React, {Component} from 'react';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, message, Popconfirm, Row, Table} from "antd";
import {connect} from 'dva';
import style from '@/less/table.less'
import SysUserUpdate from "@/pages/System/User/SysUserUpdate";
import SysUserAdd from "@/pages/System/User/SysUserAdd";

@connect(({SysUserModel, loading}) => ({
  SysUserModel,
  submitting: loading.effects['SysUserModel/eSysUserPage'],
}))
@Form.create()
export default class SysUsers extends Component {
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
    this.fetchSysUserList();
    this.action('eGetRoleList');
    this.action('eGetAllDepartmentTree');
  }

  /**
   * 操作当前 model action
   * @param effect
   * @param payload
   */
  action = (effect, payload) => {
    const {dispatch} = this.props;
    return dispatch({type: `SysUserModel/${effect}`, payload});
  };

  /**
   * 表单提交
   * @param e
   */
  onSubmit = e => {
    e.preventDefault();
    this.fetchSysUserList();
  };

  /**
   * 查询列表
   * @param data
   */
  fetchSysUserList = (data = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {current, size} = this.state;
        this.action('eSysUserPage', {...values, ...data, current, size});
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
      this.fetchSysUserList();
    })
  };

  /**
   * 删除系统用户
   */
  deleteUsers = () => {
    const {ids} = this.state;
    if (!ids || ids.length < 1) {
      message.error("当前未选中用户!");
      return;
    }
    message.error("暂不支持多选!")
    // this.action('eDeleteSysUserByIds', {ids});
  };

  /**
   * 删除系统用户
   */
  resetPassword = () => {
    const {ids} = this.state;
    if (!ids || ids.length < 1) {
      message.error("当前未选中用户!");
      return;
    }
    this.action('eResetPassword', {ids});
  };

  /**
   * 创建用户弹窗
   */
  handlerVisibleAddModal = reload => {
    const {visibleAddModal} = this.state;
    this.setState({
      visibleAddModal: !visibleAddModal,
    }, () => {
      if (reload) {
        this.fetchSysUserList();
      }
    })
  };

  /**
   * 修改用户弹窗
   */
  handlerVisibleUpdateModal = reload => {
    const {visibleUpdateModal} = this.state;
    this.setState({
      visibleUpdateModal: !visibleUpdateModal,
    }, () => {
      if (reload) {
        this.fetchSysUserList();
      }
    })
  };

  /**
   * 获取用户信息
   */
  handlerGetById = id => {
    this.action("eGetSysUser", {id}).then(() => {
      this.handlerVisibleUpdateModal();
    });
  };

  /**
   * 删除用户
   */
  handlerDeleteById = id => {
    this.action("eDeleteSysUserById", {id}).then(result => {
      if (result) {
        this.fetchSysUserList();
      }
    });
  };

  render() {
    const {SysUserModel: {records, total}, form, submitting} = this.props;
    const {getFieldDecorator} = form;
    const columns = [
      {title: '昵称', dataIndex: 'nickname'},
      {title: '用户名', dataIndex: 'username'},
      {title: '手机号', dataIndex: 'phone'},
      {title: '备注', dataIndex: 'remark'},
      {title: '创建时间', dataIndex: 'createTime'},
      {
        title: '操作', dataIndex: 'action',
        render: (text, record) => (<Button.Group size="small">
          <Button type="link" size="small" onClick={() => this.handlerGetById(record.id)}>修改</Button>
          <Popconfirm
            title={`你确定要删除用户 ${record.nickname} 吗?`}
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
                <Form.Item label="用户名">
                  {getFieldDecorator('username', {})(
                    <Input placeholder="请输入用户名"/>,
                  )}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="手机号">
                  {getFieldDecorator('phone', {})(
                    <Input placeholder="请输入手机号"/>,
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
                    this.fetchSysUserList();
                  }}>
                    重置
                  </Button>
                </div>
              </Col>

            </Row>
          </Form>
          <Button icon="user-add" type="primary" className={style.tool}
                  onClick={() => this.handlerVisibleAddModal()}>添加</Button>
          <Button icon="usergroup-delete" type="danger" className={style.tool}
                  onClick={() => this.deleteUsers()}>删除</Button>
          <Table
            className={style.table}
            columns={columns}
            rowKey={record => record.id}
            loading={submitting}
            dataSource={records}
            rowSelection={rowSelection}
            pagination={{
              total: Number(total),
              showTotal: t => `一共有用户: ${t} 名`,
              current: this.state.current,
              size: this.state.size,
              onChange: this.changePage,
            }}
          />

          <SysUserAdd
            visible={this.state.visibleAddModal}
            handlerVisibleAddModal={this.handlerVisibleAddModal}
          />

          <SysUserUpdate
            visible={this.state.visibleUpdateModal}
            handlerVisibleAddModal={this.handlerVisibleUpdateModal}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
