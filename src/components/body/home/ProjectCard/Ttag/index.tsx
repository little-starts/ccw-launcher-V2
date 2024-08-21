import React, { useEffect, useState } from "react";

import { Flex, Tag, Tooltip } from "antd";

import { Value } from "../../../../../globals.ts";
function hslToRgb(h: any, s: any, l: any) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p: any, q: any, t: any) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function colorRGB2Hex(r: any, g: any, b: any) {
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
function randomHsl() {
  var H = Math.random();
  var S = Math.random();
  var L = Math.random();
  return [H, S, L];
}
function hexToRGBA(hex: string, opacity: number): string {
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be between 0 and 1.");
  }

  // 验证并去除#号
  if (!hex.startsWith("#")) {
    throw new Error('Hex color must start with a "#".');
  }
  const cleanHex = hex.slice(1); // 去除#号

  // 验证hex长度
  if (cleanHex.length !== 3 && cleanHex.length !== 6) {
    throw new Error(
      'Hex color must be a 3 or 6 digit hexadecimal number (excluding the "#").'
    );
  }

  // 将短格式的hex颜色（如#FFF）转换为长格式（如#FFFFFF）
  let expandedHex = cleanHex;
  if (cleanHex.length === 3) {
    expandedHex =
      cleanHex[0] +
      cleanHex[0] +
      cleanHex[1] +
      cleanHex[1] +
      cleanHex[2] +
      cleanHex[2];
  }

  // 解析RGB值
  const r = parseInt(expandedHex.slice(0, 2), 16);
  const g = parseInt(expandedHex.slice(2, 4), 16);
  const b = parseInt(expandedHex.slice(4, 6), 16);

  // 返回rgba字符串
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
function getHsl() {
  var HSL = [];
  var hslLength = 1; // 获取数量
  for (var i = 0; i < hslLength; i++) {
    var ret = randomHsl();

    // 颜色相邻颜色差异须大于 0.25
    if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
      i--;
      continue; // 重新获取随机色
    }
    ret[1] = 0.7 + ret[1] * 0.2; // [0.7 - 0.9] 排除过灰颜色
    ret[2] = 0.4 + ret[2] * 0.2; // [0.4 - 0.8] 排除过亮过暗色

    // 数据转化到小数点后两位
    ret = ret.map(function (item) {
      return parseFloat(item.toFixed(2));
    });

    HSL.push(ret);
  }
  return HSL;
}
function getColor(tagName: string) {
  let color: any = "#000000";

  if (Value.getValue(`tagColor.${tagName}`)) {
    color = Value.getValue(`tagColor.${tagName}`);
  } else {
    color = getHsl()[0];
    let h = color[0];
    let s = color[1];
    let l = color[2];
    color = hslToRgb(h, s, l);
    let r = color[0];
    let g = color[1];
    let b = color[2];
    color = colorRGB2Hex(r, g, b);
    // color = hexToRGBA(color,0.1)
    Value.setValue(`tagColor.${tagName}`, color);
  }

  return color;
}

const App: React.FC<{ tagname: string[] }> = ({ tagname }) => {
  const [tags, setTags] = useState<string[]>(tagname); // 使用传入的tagname初始化tags

  useEffect(() => {
    setTags(tagname);
  }, [])

  return (
    <Flex gap="4px 0" wrap>
      {tags.map<React.ReactNode>((tag) => {
        const isLongTag = tag.length > 12;
        const tagElem = (
          <Tag
            key={tag}
            className="Ttags"
            color={hexToRGBA(getColor(tag), 0.1)}
            bordered={true}
            // 样式需要使用getColor来获取颜色，所以使用元素内样式而不是className
            style={{
              border: "1px solid " + getColor(tag),
              borderRadius: "4px",
              padding: "0 8px",
              height: "24px",
              lineHeight: "24px",
              fontSize: "12px",
              fontWeight: 500,
              color: getColor(tag),
              position: "relative",
              top: "10px",
            }}
          >
            {/* 样式需要使用getColor来获取颜色，所以使用元素内样式而不是className */}
            <span
              style={{
                color: getColor(tag),
                position: "relative",
                top: "-1px",
              }}
            >
              {isLongTag ? `${tag.slice(0, 3)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
    </Flex>
  );
};

export default App;
