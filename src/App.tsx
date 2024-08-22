import React, { useEffect } from "react";
import { Layout } from "antd";
import Navbar from "./components/header/header";
import styles from "./App.module.scss";
import Home from "./components/body/home";
import Setting from "./components/body/set";
import { listen } from "@tauri-apps/api/event";

interface CustomEventPayload {
  payload: string;
}

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
  return (
    <Layout>
      <Navbar />
      <Layout className={styles.content}>
        <Home></Home>
        <Setting settingList={settingList}></Setting>
      </Layout>
    </Layout>
  );
};

export default App;
