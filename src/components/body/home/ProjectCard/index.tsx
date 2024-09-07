import React from "react";
import {
  CloudDownloadOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Drawer, Dropdown, MenuProps, message, Popconfirm, PopconfirmProps } from "antd";
import styles from "./ProjectCard.module.scss";
import { getCode, Value, Window } from "../../../../globals";

const { Meta } = Card;

interface ProjectCardProps {
  coverURL: string;
  title: string;
  description: string;
  projectID: string;
  authorImg: string;
  local: boolean;
}

function truncateString(str: string): string {
  if (str.length > 20) {
    return str.slice(0, 20) + '...';
  }
  return str;
}


const ProjectCard: React.FC<ProjectCardProps> = ({
  coverURL,
  title,
  description,
  projectID,
  authorImg,
  local,
}) => {
  const [open, setOpen] = React.useState(false);

  const openProject = () => {
    Window.createWindow(
      "player",
      `https://www.ccw.site/player/${projectID}`,
      getCode('game'),
      title
    );
  }
  const openDescription = (e: any) => {
    if (e.nativeEvent.target.className.toLowerCase() === "ant-card-meta-description") {
      e.preventDefault();
      showDrawer();
    }
  }
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const parser = new DOMParser();
  const doc = parser.parseFromString(description, 'text/html');
  const plainText = doc.body.textContent || "";

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    Value.getValue('ProjectList')
      .then((value: Array<any>) => {
        let json = value;
        json = json.filter((ev: any) => ev.url !== `https://www.ccw.site/player/${projectID}`)
        Value.setValue('ProjectList', json);
      })
    message.success('删除成功');
    Window.postMessage('main', 'ProjectList', 'reload');
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('用户取消');
  };

  const onTabChange = (e: string) => {
    switch (e) {
      case 'EllipsisOutlined':

        break;

      default:
        break;
    }
  }

  const update = () => {
    Window.createWindow('update', `https://www.ccw.site/detail/${projectID}`, getCode('update'), '更新作品信息');
  }

  const items: MenuProps['items'] = [
    {
      label: <a href={`https://www.ccw.site/detail/${projectID}`}>打开作品详情页</a>,
      key: '0',
    },
    {
      label: <a href={`https://www.ccw.site/player/${projectID}`}>从浏览器打开</a>,
      key: '1',
    },
  ];


  return (
    <Card
      onClick={openDescription}
      className={styles.card}
      cover={<img alt="cover" src={coverURL}
        onClick={openProject} />}
      actions={local ? [] : [

        <Popconfirm
          title="删除作品"
          description="确认删除此作品？"
          onConfirm={confirm}
          onCancel={cancel}
          okText="确认"
          cancelText="再想想"
        >< DeleteOutlined key="delete" onClick={() => { onTabChange('DeleteOutlined') }} />
        </Popconfirm>,
        <Popconfirm
          title="更新作品信息"
          description="确认更新作品详情？"
          onConfirm={update}
          onCancel={cancel}
          okText="确认"
          cancelText="再想想"
        >
          < CloudDownloadOutlined key="edit" />
        </Popconfirm>,
        <Dropdown menu={{ items }} trigger={['click']}>
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>
      ]}
    >
      <Meta
        avatar={<Avatar src={authorImg} />}
        title={title}
        description={truncateString(plainText)}
      />

      <Drawer title={title} onClose={onClose} open={open}>
        <p className="description-text" dangerouslySetInnerHTML={{ __html: description }} style={{ margin: '0px' }} />
      </Drawer>
      {/* <Ttag tagname={["hello", "word"]} /> */}
    </Card >
  );
};

export default ProjectCard;
