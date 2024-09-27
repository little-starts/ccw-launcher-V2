import React, { useState } from "react";
// import ccw from "../../../assets/ccw.svg";
// import cocrea from "../../../assets/cocrea.svg";
import { Content } from "antd/es/layout/layout";
import {
  Form,
  Input,
  Button,
  Switch,
  Cascader,
  Checkbox,
  ColorPicker,
  Radio,
  Card,
  Menu,
  Flex,
  Select,
} from "antd";
import Sider from "antd/es/layout/Sider";
// import { FormInstance } from "antd/es/form";
// import { listen } from "@tauri-apps/api/event";
import styles from "./setting.module.scss";
import { Window } from "../../../globals";
interface SettingItem {
  type: string; // 组件类型，如'input'
  label: string; // 设置项的标签
  name: string; // 表单项的name
  // 可以根据需求添加其他属性，如value, onChange等（但通常这些由Form.Item和Form管理）
  options?: any; // Cascader组件的选项
  //width默认值为100%
  width?: string;
}
const items2: Array<any> = [
  { key: "1", label: "软件" },
  // { key: "2", label: "Option 2" },
  // { key: "3", label: "Option 3" },
  // {
  //   key: "sub1",
  //   label: "Navigation One",

  //   children: [
  //     { key: "5", label: "Option 5" },
  //     { key: "6", label: "Option 6" },
  //     { key: "7", label: "Option 7" },
  //     { key: "8", label: "Option 8" },
  //   ],
  // },
  // {
  //   key: "sub2",
  //   label: "Navigation Two",

  //   children: [
  //     { key: "9", label: "Option 9" },
  //     { key: "10", label: "Option 10" },
  //     {
  //       key: "sub3",
  //       label: "Submenu",
  //       children: [
  //         { key: "11", label: "Option 11" },
  //         { key: "12", label: "Option 12" },
  //       ],
  //     },
  //   ],
  // },
];

const Setting: React.FC<{ settingList: SettingItem[] }> = ({ settingList }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedImpotant] = useState(false);
  const [form] = Form.useForm(); // 创建表单实例

  // 假设这里有一些事件监听逻辑或其他状态管理逻辑

  // 渲染设置项的函数
  const renderSettingItems = () => {
    return settingList.map((item) => {
      switch (item.type) {
        case "input":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <Input style={{ width: item.width || "100%" }} />
            </Form.Item>
          );
        case "switch":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <Switch />
            </Form.Item>
          );
        case "cascader":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <Cascader
                options={item.options}
                style={{ width: item.width || "20%" }}
              />
            </Form.Item>
          );
        case "checkbox":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <Checkbox.Group options={item.options} />
            </Form.Item>
          );
        case "colorPicker":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <ColorPicker />
            </Form.Item>
          );
        case "radio":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <Radio.Group options={item.options} />
            </Form.Item>
          );
        case "select":
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              // 示例校验规则
            >
              <Select options={item.options} />
            </Form.Item>
          );
        case "button":
          return (
            <Button
              key={item.name}
              type="primary"
              // style={{ width: item.width || "5%" }}
              onClick={() => {
                Window.postMessage("main", "Setting", item.name);
              }}
            >
              <p>{item.name}</p>
            </Button>
          );

        default:
          return null; // 如果类型不匹配，则返回null
      }
    });
  };

  // 优化布局
  // const layout = {
  //   labelCol: { span: 6 },
  //   wrapperCol: { span: 18 },
  // };
  return (
    <Content className={styles.content}>
      <Sider
        collapsible
        collapsed={collapsedImpotant ? true : collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme={"light"}
        className={styles.sider}
      >
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items2}
          className={styles.menu}
        />
      </Sider>
      <Flex
        wrap
        justify="start"
        align="flex-start"
        gap="middle"
        className={styles.div}
      >
        <Card className={styles.card}>
          <Form form={form} layout="vertical">
            {renderSettingItems()}
            <br />
            <br />
          </Form>
        </Card>
      </Flex>
    </Content>
  );
};

export default Setting;
