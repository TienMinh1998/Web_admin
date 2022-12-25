import { Avatar } from 'antd';
import R from 'assets';
import moment from 'moment';
import React, { useState } from 'react';
import { WhiteBoxWrapper } from 'shared/components/common';

export const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<any>>([
    {
      avatar: '',
      notification: 'Bạn có đơn hàng cần xử lý',
      createdAt: '17:30 17/12/2022',
      readStatus: false
    },
    {
      avatar: '',
      notification: 'Đơn hàng 873245-34346 đã được thanh toán',
      createdAt: '16:00 17/12/2022',
      readStatus: false
    },
    {
      avatar: '',
      notification: 'Đơn hàng 873245-39946 đã được thanh toán',
      createdAt: '08:00 18/12/2022',
      readStatus: true
    }
  ]);

  return (
    <WhiteBoxWrapper className="mt-3">
      <div className="font-bold text-2xl border-b pb-2 mb-2">Notification</div>
      {notifications.map((item: any) => {
        return (
          <div key={item} className="p-1 hover:bg-gray-100 rounded flex cursor-pointer">
            <div className="p-1">
              <Avatar style={{ width: 50, height: 50 }} src={R.images.avatar_default} />
            </div>
            <div className="flex-1 p-1 px-2">
              <div>{item.notification}</div>
              <div className="text-blue-600 font-bold">
                {moment(item.createdAt, 'HH:mm DD/MM/YYYY').fromNow()}
              </div>
            </div>

            <div className="p-3 flex items-center">
              {!item.readStatus && (
                <span className="flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  </span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </WhiteBoxWrapper>
  );
};
