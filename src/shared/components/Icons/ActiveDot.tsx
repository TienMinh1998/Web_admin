import React from 'react';
import { ToolTip } from '../Tooltip';

export default function ActiveDot() {
  return (
    <ToolTip title="Active">
      <div className="m-2 w-2 h-2 bg-green-500 rounded-full cursor-pointer"></div>
    </ToolTip>
  );
}
