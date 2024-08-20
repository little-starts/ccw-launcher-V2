import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import styles from './ProjectCard.module.scss';

import Ttag from './Ttag'

import { Window } from '../../../../globals';


const { Meta } = Card;

interface ProjectCardProps {
    coverURL: string;
    title: string;
    description: string;
    projectID: string;
    authorImg: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ coverURL, title, description, projectID, authorImg }) => {
    const openProject = () => {
        Window.createWindow('player', `https://www.ccw.site/player/${projectID}`, "../src/null.js", title);
    }

    return (
        <Card className={styles.card}
            cover={
                <img
                    alt="cover"
                    src={coverURL}
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            onClick={openProject}
        >
            <Meta
                avatar={<Avatar src={authorImg} />}
                title={title}
                description={description}
            />

        <Ttag tagname={["hello","word"]}/>
    </Card>
);

export default ProjectCard;