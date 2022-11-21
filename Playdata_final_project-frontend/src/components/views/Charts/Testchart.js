import React, { useState, useEffect, useRef } from 'react';
import { Line } from '@ant-design/charts';

function DemoLine(){
    const data = [
    {
      요일: '2020-01-01',
      차량수: 3,
    },
    {
      요일: '2020-01-02',
      차량수: 4,
    },
    {
        요일: '2020-01-03',
        차량수: 2,
    },
    {
      요일: '2020-01-04',
      차량수: 5,
    },
    {
      요일: '2020-01-05',
      차량수: 4.9,
    },
    {
        요일: '2020-01-06',
        차량수: 6,
    },
    {
        요일: '2020-01-07',
        차량수: 7,
    },
    {
        요일: '2020-01-08',
        차량수: 9,
    },
    {
        요일: '2020-01-09',
        차량수: 13,
    },
  ];

  const config = {
    data,
    yField: '차량수',
    xField: '요일',
    tooltip: {
      customContent: (title, items) => {
        return (
          <>
            <h5 style={{ marginTop: 16 }}>{title}</h5>
            <ul style={{ paddingLeft: 0 }}>
              {items?.map((item, index) => {
                const { name, value, color } = item;
                return (
                  <li
                    key={item.요일}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                  >
                    <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
                    <span
                      style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
                    >
                      <span style={{ marginRight: 16 }}>{name}:</span>
                      <span className="g2-tooltip-list-item-value">{value}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };

  return <Line {...config} />;
}

export default DemoLine;