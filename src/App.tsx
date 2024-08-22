import React, { useEffect } from "react";
import { Layout } from "antd";
import Navbar from "./components/header/header";
import styles from "./App.module.scss";
import Home from "./components/body/home";
import Setting from "./components/body/settings";
import { listen } from "@tauri-apps/api/event";

interface CustomEventPayload {
  payload: string;
}
const settingList = [
  {
    type: "input",
    label: "输入框",
    name: "username",
  },

  {
    type: "switch",
    label: "开关",
    name: "enabled",
  },
  {
    type: "cascader",
    label: "联级选择框",
    name: "region",
    options: [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "checkbox",

    label: "多选框",
    name: "hobbies",
    options: [
      { label: "游泳", value: "swimming" },
      { label: "跑步", value: "running" },
      // ... 其他选项
    ],
    // 注意：对于Checkbox.Group，我们通常不会在settingItem中直接处理options，
    // 而是会在renderSettingItems函数中根据options动态渲染Checkbox组件
  },
  {
    type: "colorPicker",

    label: "颜色选择器",
    name: "color",
    // ColorPicker组件通常不需要options属性，但你可以根据需要在settingItem中添加其他属性
  },
  {
    type: "select",

    label: "下拉选择框（单选）",
    name: "gender",
    options: [
      { label: "男", value: "male" },
      { label: "女", value: "female" },
      // ... 其他选项
    ],
    // 注意：对于Radio.Group，处理方式与Checkbox.Group类似
  },
];
let settingList2: any = [];
let settingOption: any = "";
listen("settingOptionUpdate", (e) => {
  console.log(e.payload);
  settingOption = e.payload;
  //设置settingOption的值为settingItem中key的值与e.payload的下标对应的值的索引
  //例如settingOption的值为"aaa"，则settingOption设为settingItem中key为"aaa"的选项的索引
  settingOption =
    settingList[
      settingOption.findIndex((item: any) => item.key === settingOption)
    ];
  console.log(settingOption);
  // 设置settingOption的值为 数组中包含settingOption的每一项
  settingOption = settingList2.filter(
    (item: any) => item.key === settingOption.key
  )[0];
  console.log(settingOption);
});
const App: React.FC = () => {
  useEffect(() => {
    console.log("App is mounted");
    listen("ccw", (event: CustomEventPayload) => {
      console.log(event, event.payload, event.payload);
      if (event.payload === "reload") {
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  }, []);

  const settingItems = [
    { key: "1", label: "Option 1" },
    { key: "2", label: "Option 2" },
    { key: "3", label: "Option 3" },
    {
      key: "sub1",
      label: "Navigation One",

      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",

      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
    {
      key: "sub3",
      label: "Navigation Three",

      children: [
        { key: "13", label: "Option 13" },
        { key: "14", label: "Option 14" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "15", label: "Option 15" },
            { key: "16", label: "Option 16" },
          ],
        },
      ],
    },
  ];
  return (
    <Layout>
      <Navbar />
      <Layout className={styles.content}>
        <Home></Home>
        <Setting settingList={settingList} items2={settingItems}></Setting>
      </Layout>
    </Layout>
  );
};

export default App;
