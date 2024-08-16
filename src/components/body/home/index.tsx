import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { Flex } from 'antd'
import styles from './Home.module.scss';

const Home: React.FC = () => {

    return (
        <div className={styles.home}>
            <Flex wrap justify="space-evenly" align="flex-start" gap="middle">
                {Array.from({ length: 24 }, (_, i) => (
                    <ProjectCard
                        coverURL='https://m.ccw.site/works-covers/54034737-8e76-4816-8ac4-36d99267a8b0.png'
                        title='[先锋测试]MMO联机枪战'
                        description=''
                    ></ProjectCard>
                ))}
            </Flex>

        </div>
    );
};

export default Home;
