import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useState } from "react";
import { Flex, FloatButton, Menu, Tooltip } from "antd";
import { ProductOutlined, HomeOutlined } from "@ant-design/icons";
import styles from "./Home.module.scss";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Plus from "../../../assets/plus.svg";
import Install from "../../../assets/install.svg";

import { getCode, Value, Window } from "../../../globals";
import ProjectList from "./ProjectList";

const handleInstallClick = () => {
  Window.createWindow(
    "install",
    "https://www.ccw.site",
    getCode("install"),
    "导入作品"
  );
};

interface CustomEventPayload {
  payload: string;
}

const homeProjectsList: Array<any> = [
  {
    name: "坦克大乱斗",
    url: "https://www.ccw.site/player/62aec500ff3a554991573456",
    cover:
      "https://m.ccw.site/works-covers/d82155a7-033c-4538-a6a4-4ae150e9454d.png",
    tags: ["动作游戏\n", "游戏\n"],
    description:
      '<div class="header-1RNsU titleInfo-1IwS1 isPlus-1HAS1"><div class="left-1W1LK"><div class="typeTag-1VaV9 origin-r75H8 tg-19cnE">原创</div><span class="title-1M2qA">坦克大乱斗</span><div class="desc-22pte"><span class="updatedAt-2uyYV">更新于：1 个月前</span></div><div class="tagsPanel-3Oc8E"><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">动作游戏</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">游戏</span></button></div></div><div class="operate-1-WZx"></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>创作团队</span><div class="view-1V_Av">查看成员</div></div><div class="memberPanel-1DE6J"><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/b7c5b73b-eb3d-4ab1-b312-ed6fd8460c67.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/b515d5e7-4750-40c6-b2bb-fad9eccdb9de.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>作品介绍</span></div><div class="cardBody-1z0i_"><div class="worksIntroduction-2yUCI "><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"></div></div></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>操作说明</span></div><div class="cardBody-1z0i_"><div class="operatingInstruction-212rA"><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>进入房间后按p聊天<br>\nad或方向键移动，点击屏幕调整力度和发射角度，</p>\n</div></div></div></div></div></div></div>',
    authorImg:
      "https://m.ccw.site/user_projects_assets/b7c5b73b-eb3d-4ab1-b312-ed6fd8460c67.png",
  },
  {
    name: "坦克动荡融合版",
    url: "https://www.ccw.site/player/65ab919d5b60de5365e1208e",
    cover:
      "https://m.ccw.site/works-covers/cc5dda75-6b41-4b8b-adcd-d892a5b5307e.png",
    tags: ["游戏\n", "动作游戏\n"],
    description:
      '<div class="header-1RNsU titleInfo-1IwS1 isPlus-1HAS1"><div class="left-1W1LK"><div class="typeTag-1VaV9 origin-r75H8 tg-19cnE">原创</div><span class="title-1M2qA">坦克动荡融合版</span><div class="desc-22pte"><span class="updatedAt-2uyYV">更新于：15 小时前</span></div><div class="tagsPanel-3Oc8E"><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">游戏</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">动作游戏</span></button></div></div><div class="operate-1-WZx"></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>创作团队</span><div class="view-1V_Av">查看成员</div></div><div class="memberPanel-1DE6J"><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/b7c5b73b-eb3d-4ab1-b312-ed6fd8460c67.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/61f134294449842875d906e2/53c3b6dd-d1e8-441c-b2f7-26b36094e278.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>作品介绍</span></div><div class="cardBody-1z0i_"><div class="worksIntroduction-2yUCI "><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>道具可以组合使用，比如激光+机枪就是连射激光</p>\n</div></div></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>操作说明</span></div><div class="cardBody-1z0i_"><div class="operatingInstruction-212rA"><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>wasd移动，鼠标射击，右键使用道具，空格使用加速道具（坦克下面有箭头的时候能用），房主点击玩家名字踢人。</p>\n</div></div></div></div></div></div></div>',
    authorImg:
      "https://m.ccw.site/user_projects_assets/b7c5b73b-eb3d-4ab1-b312-ed6fd8460c67.png",
  },
  {
    name: "核心共振[联机][适配手机]",
    url: "https://www.ccw.site/player/65c2e0b226e91810b6112576",
    cover:
      "https://m.ccw.site/works-covers/642b41c4-51a4-449c-82fa-b64d57af2061.png",
    tags: ["2024 WGJ 个人赛\n", "游戏\n", "动作游戏\n"],
    description:
      '<div class="header-1RNsU titleInfo-1IwS1 isPlus-1HAS1"><div class="left-1W1LK"><div class="typeTag-1VaV9 origin-r75H8 tg-19cnE">原创</div><span class="title-1M2qA">核心共振[联机][适配手机]</span><div class="desc-22pte"><span class="updatedAt-2uyYV">更新于：13 小时前</span></div><div class="tagsPanel-3Oc8E"><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">2024 WGJ 个人赛</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">游戏</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">动作游戏</span></button></div></div><div class="operate-1-WZx"></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>创作团队</span><div class="view-1V_Av">查看成员</div></div><div class="memberPanel-1DE6J"><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/62fdd7337c888254d55c765d/bfdcab7f-4e9e-43b0-b117-ba670c627dd4.jpg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/5a791aa3eb0a1902daeea97f/8205f103-a014-475b-8556-3fef839be817.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/628979aa804a3a2bc801b097/ab8ff080-d2d7-4a9f-9211-1a8974c4f0d8.jpg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>作品介绍</span></div><div class="cardBody-1z0i_"><div class="worksIntroduction-2yUCI "><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>感谢大家的试玩<br>\n如有bug、建议可以发到评论区<br>\n核心共振讨论区：993746347😘<br>\n个人主页还没做完，目前发出来测试下头像大小有没有问题√</p>\n</div></div></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>操作说明</span></div><div class="cardBody-1z0i_"><div class="operatingInstruction-212rA"><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>wsad移动；鼠标普攻；1、2、3键技能；Enter发消息</p>\n</div></div></div></div></div></div></div>',
    authorImg:
      "https://m.ccw.site/avatar/62fdd7337c888254d55c765d/bfdcab7f-4e9e-43b0-b117-ba670c627dd4.jpg",
  },
  {
    name: "鸭里奥制造",
    url: "https://www.ccw.site/player/61fe6f745419ec36de158069",
    cover:
      "https://zhishi.oss-cn-beijing.aliyuncs.com/works-covers/f80ca5f8-bb42-4d8a-9c0d-f9c32a181065.png",
    tags: [
      "平台跳跃\n",
      "跑酷\n",
      "超级马里奥\n",
      "平台游戏征集令\n",
      "艺术字\n",
      "游戏\n",
      "动作游戏\n",
      "动作-平台跳跃游戏\n",
    ],
    description:
      '<div class="header-1RNsU titleInfo-1IwS1 isPlus-1HAS1"><div class="left-1W1LK"><div class="typeTag-1VaV9 origin-r75H8 tg-19cnE">原创</div><div class="versionTag-2_SBO tg-19cnE"><div data-state="closed" class="" aria-expanded="false" aria-haspopup="dialog" style="cursor: auto; background: none; font-size: inherit; color: inherit; font-weight: inherit;">RC</div></div><span class="title-1M2qA">鸭里奥制造</span><div class="desc-22pte"><span class="updatedAt-2uyYV">更新于：4 天前</span></div><div class="tagsPanel-3Oc8E"><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">平台跳跃</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">跑酷</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">超级马里奥</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">平台游戏征集令</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">艺术字</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">游戏</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">动作游戏</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">动作-平台跳跃游戏</span></button></div></div><div class="operate-1-WZx"></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>创作团队</span><div class="view-1V_Av">查看成员</div></div><div class="memberPanel-1DE6J"><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/616ad3088c4483116292b369/1ab97345-e1d5-45a0-8674-95f1d6b3bdcc.jpg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/5a791aa3eb0a1902daeea97f/8205f103-a014-475b-8556-3fef839be817.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.xiguacity.cn/avatar/6107c5323e593a0c25f850f8/5952b150-6683-4f63-bd41-0f6791cb068d.jpeg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>作品介绍</span></div><div class="cardBody-1z0i_"><div class="worksIntroduction-2yUCI "><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><h1>这里是鸭里奥制造</h1>\n<h4>特别鸣谢:</h4>\n<p>此作品用的是 <strong>griffpatch</strong> 的马里奥引擎<br>\n雨改编自 <strong>Hobbs Home</strong><br>\n部分角色造型来源于 <strong>沃玛</strong> 的视频<br>\n非常感谢griffpatch的教程和四块七酱的翻译、<br>\n感谢 <strong>软萌软萌d皮卡丘</strong> 的联机功能<br>\n感谢 <strong>Arkos</strong> 帮忙做的一系列内容<br>\n移动平台等由<del>财源滚滚</del> <strong>Gold</strong> 赞助播出<br>\n感谢 <strong>Grass_1234</strong> 提供的部分代码</p>\n<h6>尽情去创作吧!https://ccw.site/s/8EM4NMY5</h6>\n</div></div></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>操作说明</span></div><div class="cardBody-1z0i_"><div class="operatingInstruction-212rA"><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p><em><strong>w，a，s，d</strong></em>移动，<em><strong>k</strong></em>键攻击，<em><strong>r</strong></em>键死亡</p>\n<hr>\n<p>编辑器操作：<em><strong>e</strong></em>键吸取方块，<em><strong>p</strong></em>键回起点，<em><strong>t</strong></em>键打开或输入关卡存档码，<em><strong>q</strong></em>关闭自动排列<br>\n其余操作在侧边栏中 QAQ</p>\n</div></div></div></div></div></div></div>',
    authorImg:
      "https://m.ccw.site/avatar/616ad3088c4483116292b369/1ab97345-e1d5-45a0-8674-95f1d6b3bdcc.jpg",
  },
  {
    name: "逃离物理卷(Escape from Ptp)1.5.0",
    url: "https://www.ccw.site/player/61e7c6745ab02516028afa82",
    cover:
      "https://zhishi.oss-cn-beijing.aliyuncs.com/works-covers/92fd74c4-fa63-4c36-9655-2ed8b5c4a4c5.jpg",
    tags: ["Team AMF\n", "动作游戏\n", "游戏\n"],
    description:
      '<div class="header-1RNsU titleInfo-1IwS1 isPlus-1HAS1"><div class="left-1W1LK"><div class="typeTag-1VaV9 origin-r75H8 tg-19cnE">原创</div><span class="title-1M2qA">逃离物理卷(Escape from Ptp)1.5.0</span><div class="desc-22pte"><span class="updatedAt-2uyYV">更新于：2 年前</span></div><div class="tagsPanel-3Oc8E"><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">Team AMF</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">动作游戏</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><span class="text-I3-NE">游戏</span></button></div></div><div class="operate-1-WZx"></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>创作团队</span><div class="view-1V_Av">查看成员</div></div><div class="memberPanel-1DE6J"><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.xiguacity.cn/avatar/6107c5323e593a0c25f850f8/5952b150-6683-4f63-bd41-0f6791cb068d.jpeg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.xiguacity.cn/avatar/607a336375142d084e61ca29/388df2b4-9688-41de-a971-4c4d8728ffdd.jpg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>作品介绍</span></div><div class="cardBody-1z0i_"><div class="worksIntroduction-2yUCI "><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>作者:Arkos, MBZZW漫步者之王,滑稽_𝓯𝓾𝓷𝓷𝔂</p>\n<p>游戏中的主角李华在期末考试中睡着，意外地进入了试卷的世界，发现竟然能以战斗的方式答题。玩家需要扮演李华，在试卷的世界中探索，击败敌人，最终逃离试卷的世界。</p>\n<p>联名活动:新增成就系统，完成成就可获得勋章，欢迎来挑战~<br>\n<a href="https://www.ccw.site/page/EFP%20Activity?c=EFP">戳我打开活动页面</a></p>\n</div></div></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>操作说明</span></div><div class="cardBody-1z0i_"><div class="operatingInstruction-212rA"><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>WASD  移动<br>\n鼠标左键  攻击<br>\n鼠标滑轮  切换武器<br>\nE键   拾起物品/开门/使用/交谈<br>\nR键   换弹/排障<br>\nT键  手枪击锤 /榴弹枪拉栓<br>\n1/2键  切换霰弹枪＆榴弹枪的子弹<br>\nP  进入暂停菜单</p>\n<p>作弊键(开启作弊后):<br>\nL清屏<br>\nM知识点+4000<br>\nN主角锁血<br>\nB跳关</p>\n</div></div></div></div></div></div></div>',
    authorImg:
      "https://m.xiguacity.cn/avatar/6107c5323e593a0c25f850f8/5952b150-6683-4f63-bd41-0f6791cb068d.jpeg",
  },
  {
    name: "mmo联机枪战v1.71",
    url: "https://www.ccw.site/player/6295fa855831fa49f7fa592a",
    cover:
      "https://m.ccw.site/works-covers/b9bf16b5-6dca-40d3-bc4e-e81945a36350.png",
    tags: ["online\n", "数据助手扩展\n", "CCW 枪迷协会\n"],
    description:
      '<div class="header-1RNsU titleInfo-1IwS1 isPlus-1HAS1"><div class="left-1W1LK"><div class="typeTag-1VaV9 origin-r75H8 tg-19cnE">原创</div><div class="versionTag-2_SBO tg-19cnE"><div data-state="closed" class="" aria-expanded="false" aria-haspopup="dialog" style="cursor: auto; background: none; font-size: inherit; color: inherit; font-weight: inherit;">RC</div></div><span class="title-1M2qA">mmo联机枪战v1.71</span><div class="desc-22pte"><span class="updatedAt-2uyYV">更新于：2 天前</span></div><div class="tagsPanel-3Oc8E"><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">online</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">数据助手扩展</span></button><button type="button" class="tag-JR_s0 btn-iEdNA btn-small-312qh btn-default-2IxTg ghost-2DGBD"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#star-icon_svg__clip0)"><path d="M5.3 12.594a5.44 5.44 0 01-1.893-1.073 5.491 5.491 0 01-1.865-3.678 5.436 5.436 0 01.254-2.162 5.44 5.44 0 011.073-1.893 5.491 5.491 0 013.678-1.865 5.436 5.436 0 012.162.254c.703.23 1.34.59 1.893 1.072a5.492 5.492 0 011.865 3.679 5.436 5.436 0 01-.254 2.161 5.44 5.44 0 01-1.072 1.894 5.491 5.491 0 01-5.84 1.61z" fill="#a1a1a5"></path><path d="M1.17 10.488c-.454-.148-.746-.393-.87-.73-.13-.353-.05-.751.232-1.182.23-.351.6-.724 1.097-1.111a.366.366 0 11.45.578C1.147 8.77.91 9.284.99 9.505c.07.192.448.365 1.148.407l.458.743c1.292-.083 3.535-.526 5.195-1.135 3.442-1.352 4.682-2.481 4.682-2.481l-.128-.864c.514-.49.694-.87.623-1.063-.074-.202-.532-.431-1.58-.416-.085.001-.174.004-.264.008a.368.368 0 01-.037-.734c.098-.005.197-.007.29-.01.57-.007 1.044.049 1.41.169l.006.002c.45.148.741.393.865.728.135.371.043.79-.276 1.246-.208.298-.513.611-.91.934-1.24 1.13-2.958 1.848-4.68 2.481-1.725.633-2.443.849-4.558 1.124-.142.009-.505.009-.638.011-.503.009-.933-.033-1.28-.124a2.133 2.133 0 01-.147-.043z" fill="#a1a1a5"></path><path d="M3.648 5.827s.727-1.89 2.26-2.06" stroke="#000" stroke-linecap="round"></path><circle cx="3.216" cy="6.865" transform="rotate(-27.713 3.216 6.865)" fill="#000" r="0.438"></circle></g><defs><clipPath id="star-icon_svg__clip0"><path fill="#a1a1a5" d="M0 0h14v14H0z"></path></clipPath></defs></svg><span class="text-I3-NE">CCW 枪迷协会</span></button></div></div><div class="operate-1-WZx"></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>创作团队</span><div class="view-1V_Av">查看成员</div></div><div class="memberPanel-1DE6J"><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.xiguacity.cn/avatar/601fe86a70043c2a9fdea337/c25a4251-6e37-42af-84b4-9f4255a2ef64.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.xiguacity.cn/avatar/6107c5323e593a0c25f850f8/5952b150-6683-4f63-bd41-0f6791cb068d.jpeg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/60df003576415b2f27dfafb9/053f2166-944e-4270-8054-3acf98183055.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/2c7a04aa-2a87-46af-81a4-ae965f815442.jpg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/3a674c91-336d-4104-b3fa-b3d77be87c54.jpg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.xiguacity.cn/avatar/603603493766f43be93a5a78/71d510d1-acc9-425a-bcc2-610f6db3ded3.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/e5b3c6e3-40fc-4c28-bed9-909fc3984595.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/056b0cae-e579-4f7d-95fe-82ea94ea4104.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/avatar/8ab737c9-26e9-436b-9d80-6e2f8b92bebc.png?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div><div data-state="closed" class="c-trigger" aria-expanded="false" aria-haspopup="dialog" style="background: none; cursor: pointer;"><div class="c-avatar-wrapper c-avatar-wrapper-S avatar-3zhgd"><a class="c-avatar-a" target="_blank" rel="noreferrer"><img class="c-avatar-img" src="https://m.ccw.site/user_projects_assets/780405d1-f4d1-42c4-9485-e24fbd4491a3.jpeg?x-oss-process=image%2Fresize%2Cs_150" alt="avatar"></a></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>作品介绍</span></div><div class="cardBody-1z0i_"><div class="worksIntroduction-2yUCI "><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><h1>QQ交流群号182142609</h1>\n<h1>“游戏内所有素材未经同意禁止盗用，一经发现一律追究到底”</h1>\n<h2><a href="https://www.ccw.site/detail/63e22a044151cb30f9794570?accessKey=dea337&amp;inviteCode=J3BMwq48gyWg3MD7">部分素材开源区</a></h2>\n<p>由Arkos,bob(我),mbzzw,氵大师兄,掠夺者队长、我是猫、暴风赤红、斩云、DustWalker、xm1121、Inf<br>\n合作的联机游戏</p>\n<p>Arkos：大部分程序<br>\nbob：大部分美术，UI程序<br>\n氵大师兄：部分美术<br>\nmbzzw：部分音效<br>\n掠夺者队长：小部分程序，部分美术，部分音效</p>\n<p>部分地图来自游戏《心灵终结》（红色警戒的一个MOD）<br>\n部分音效来自游戏《红色警戒》、《使命召唤》、《我的世界》<br>\n主界面BGM来自《使命召唤6》：Opening Credits - Hans Zimmer / Lorne Balfe<br>\n部分音效素材来自网络<br>\n<strong>几乎所有矢量图片素材为工作室成员辛苦绘制，未经同意请勿盗用</strong></p>\n</div></div></div></div></div></div></div><div class="card-1Up6x"><div class="plusHeader-2Hshi"><div class="title-ijwqa"><span>操作说明</span></div><div class="cardBody-1z0i_"><div class="operatingInstruction-212rA"><div class="pureViewer-eX8YN"><div><div class="tui-editor-contents"><p>#基本<br>\n-[WASD]移动，[左键]射击，[F]或[鼠标右键]瞄准<br>\n-[鼠标滚轮]或者[1-2]切换武器<br>\n-[R]换弹,[空格]按住疾跑,[B]切换快慢机,[V]切换射击模式<br>\n-[shift]蹲下(增大精准度，略增开镜视野)</p>\n<p>#道具<br>\n-[G]投掷进攻投掷物，[4]投掷战术投掷物，[H]使用药品</p>\n<p>#交流<br>\n-[C]发送信息，长按[C]发送表情包<br>\n-[X]截图<br>\n-[Enter]查看在线玩家列表</p>\n</div></div></div></div></div></div></div>',
    authorImg:
      "https://m.xiguacity.cn/avatar/601fe86a70043c2a9fdea337/c25a4251-6e37-42af-84b4-9f4255a2ef64.png",
  },
];

const Home: React.FC = (show) => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedImpotant, setCollapsedImpotant] = useState(false);
  const [projects, setProjects] = useState<Array<any> | undefined>([]);
  const [tags, setTags] = useState<Array<any>>([]);
  const [tag, setTag] = useState("all");
  const [Home, setHome] = useState(true);

  useEffect(() => {
    Value.getValue("tags").then((e) => {
      let tags: React.SetStateAction<any[]> = [
        {
          key: "home",
          label: "主页",
          icon: <HomeOutlined />,
        },
        {
          key: "tags",
          label: "作品分类",
          icon: <ProductOutlined />,
          children: [
            {
              key: "all",
              label: "全部",
            },
          ],
        },
      ];
      if (e)
        e.forEach((element: string) => {
          let tag = {
            key: element,
            label: element,
          };
          tags[1].children.push(tag);
        });
      console.log(tags);
      setTags(tags);
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setCollapsedImpotant(true);
    } else {
      setCollapsedImpotant(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) {
        setCollapsedImpotant(true);
      } else {
        setCollapsedImpotant(false);
      }
    });
  }, []);

  const loadProjects = async () => {
    try {
      Value.getValue("ProjectList").then((projects) => {
        console.log(projects);
        if (projects) {
          setProjects(projects);
        } else {
          setProjects(undefined);
        }
      });
    } catch (error) {
      setProjects(undefined);
    }
  };

  useEffect(() => {
    loadProjects();
    console.log("App is mounted");
    listen("ProjectList", (event: CustomEventPayload) => {
      console.log(event, event.payload, event.payload);
      if (event.payload === "reload") {
        setTimeout(() => {
          loadProjects();
        }, 1000);
      }
    });
  }, []);

  const handleTagClick = (item: any) => {
    if (item.key === "home") {
      setHome(true);
      return;
    }
    setHome(false);
    setTag(item.key);
  };

  if (show) {
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
            defaultSelectedKeys={["home"]}
            mode="inline"
            items={tags}
            className={styles.menu}
            onClick={handleTagClick}
          />
        </Sider>
        <Flex
          wrap
          justify="space-evenly"
          align="flex-start"
          gap="middle"
          className={styles.div}
        >
          <ProjectList
            projects={Home ? homeProjectsList : projects}
            tag={tag}
            home={Home}
          />
        </Flex>
        {!Home && (
          <FloatButton.Group
            trigger="click"
            type="primary"
            style={{ insetInlineEnd: 24 }}
            icon={<img src={Plus} alt="" style={{ width: "18px" }} />}
          >
            <Tooltip placement="left" title="导入游戏">
              <FloatButton
                icon={
                  <img
                    src={Install}
                    alt=""
                    style={{ width: "18px" }}
                    onClick={handleInstallClick}
                  />
                }
              />
            </Tooltip>
          </FloatButton.Group>
        )}
      </Content>
    );
  } else {
    return null;
  }
};

export default Home;
