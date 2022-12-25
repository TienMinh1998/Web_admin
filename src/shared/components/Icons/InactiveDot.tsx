import React from 'react';
import { ToolTip } from '../Tooltip';

export default function InactiveDot() {
  return (
    <ToolTip title="Inactive">
      <div className="m-2 w-2 h-2 bg-red-500 rounded-full cursor-pointer"></div>
    </ToolTip>
  );
}
