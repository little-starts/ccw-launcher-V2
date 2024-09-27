import React, { useEffect, useState } from "react";
import { Button, Empty, Layout, Typography } from "antd";
import Navbar from "./components/header/header";
import styles from "./App.module.scss";
import Home from "./components/body/home";
import Setting from "./components/body/set";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";
import WelcomeModal from "./components/first";
import Popup from "./components/popup";
import { Modal, notification } from "antd";
import {
  checkUpdate,
  installUpdate,
  // onUpdaterEvent,
} from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
interface CustomEventPayload {
  payload: string;
}

const App: React.FC = () => {
  const [page, setPage] = useState("home");

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
      type: "button",
      label: "输入框",
      name: "检查更新",
    },
  ];

  useEffect(() => {
    setInterval(() => {
      document.querySelectorAll("a").forEach((anchor) => {
        if (anchor.getAttribute("hack") !== "true") {
          anchor.addEventListener("click", (event) => {
            event.preventDefault(); // 阻止默认跳转行为
            const url = anchor.href;
            // 调用 Tauri 命令来打开链接
            if (url) invoke("open_in_browser", { url });
          });
          anchor.setAttribute("hack", "true");
        }
      });
    }, 1000);
  }, []);

  const Sponsor: React.FC = () => {
    return (
      <Empty
        image="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB0PSIxNzI0ODM1MjkxMzA4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQzMjEiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTEyIDk3Ny40NTQ1NDVDMjU0LjkyOTQ1NSA5NzcuNDU0NTQ1IDQ2LjU0NTQ1NSA3NjkuMDcwNTQ1IDQ2LjU0NTQ1NSA1MTJTMjU0LjkyOTQ1NSA0Ni41NDU0NTUgNTEyIDQ2LjU0NTQ1NXM0NjUuNDU0NTQ1IDIwOC4zODQgNDY1LjQ1NDU0NSA0NjUuNDU0NTQ1YTQ2NS40NTQ1NDUgNDY1LjQ1NDU0NSAwIDAgMS00NjUuNDU0NTQ1IDQ2NS40NTQ1NDV6TTM2Ny45NDE4MTggMjQ2LjAzOTI3M2EzMy4yMzM0NTUgMzMuMjMzNDU1IDAgMCAwIDAgNjYuNDY2OTA5aDI4OC4xMTYzNjRhMzMuMjMzNDU1IDMzLjIzMzQ1NSAwIDAgMCAwLTY2LjQ2NjkwOWgtMjg4LjExNjM2NHogbTE3Ny4zMzgxODIgMTIzLjIwNTgxOFYzMTIuNTA2MTgyaC02Ni41NnY1Ni43ODU0NTRBMjEwLjEwNjE4MiAyMTAuMTA2MTgyIDAgMCAwIDI3OS4yNzI3MjcgNTc4LjQ2NjkwOXY0NC4zMTEyNzNhMzMuMjMzNDU1IDMzLjIzMzQ1NSAwIDAgMCA2Ni41MTM0NTUgMHYtNDQuMzExMjczYTE0My42MzkyNzMgMTQzLjYzOTI3MyAwIDAgMSAxMzIuOTgwMzYzLTE0Mi43NTQ5MDl2MzEwLjMxODU0NWEzMy4yMzM0NTUgMzMuMjMzNDU1IDAgMSAwIDY2LjQ2NjkxIDBWNDM1Ljc1ODU0NWExNDMuNjM5MjczIDE0My42MzkyNzMgMCAwIDEgMTMyLjk4MDM2MyAxNDIuNzU0OTF2NDQuMzExMjcyYTMzLjIzMzQ1NSAzMy4yMzM0NTUgMCAwIDAgNjYuNTEzNDU1IDB2LTQ0LjMxMTI3MmEyMTAuMTA2MTgyIDIxMC4xMDYxODIgMCAwIDAtMTk5LjQ5MzgxOC0yMDkuMjY4MzY0eiIgZmlsbD0iI0ZCNzI5OSIgcC1pZD0iNDMyMiI+PC9wYXRoPjwvc3ZnPg=="
        imageStyle={{ height: 100 }}
        description={<Typography.Text>感谢您的大力支持</Typography.Text>}
        style={{ marginTop: "3vh" }}
      >
        <Button
          type="primary"
          onClick={() => {
            invoke("open_in_browser", {
              url: "https://ifdian.net/a/sgml55370",
            });
          }}
        >
          发电
        </Button>
      </Empty>
    );
  };

  const About: React.FC = () => {
    return (
      <div className={styles.container}>
        <iframe
          src="https://ccwl.rsai.site/"
          className={styles.fullFrame}
        ></iframe>
      </div>
    );
  };

  const MyComponent: React.FC<{ page: string }> = ({ page }) => {
    let content;

    switch (page) {
      case "home":
        content = <Home />;
        break;
      case "about":
        content = <About />;
        break;
      case "sitting":
        content = <Setting settingList={settingList} />;
        break;
      case "sponsor":
        content = <Sponsor />;
        break;
      case "userHome":
      default:
        content = <div>关于我们</div>;
    }

    return <Layout className={styles.content}>{content}</Layout>;
  };
  checkUpdate().then((res) => {
    const { shouldUpdate, manifest } = res;
    if (shouldUpdate) {
      Modal.confirm({
        title: `发现新版本：${manifest?.version}`,
        content: `是否升级？`,
        okText: "升级",
        cancelText: "取消",
        onOk: async () => {
          try {
            notification.info({
              message: "正在下载更新...",
              duration: 3000,
            });
            await installUpdate();
            notification.info({
              message: "更新安装完成，等待重启",
              duration: 3000,
            });
            await relaunch();
          } catch (e) {
            notification.error({
              message: "下载更新失败",
              description: e?.toString() || "",
            });
          }
        },
      });
    }
  });
  return (
    <Layout>
      <WelcomeModal />

      <Popup />
      <Navbar change={setPage} />
      <Layout className={styles.content}>{MyComponent({ page })}</Layout>
    </Layout>
  );
};

export default App;
