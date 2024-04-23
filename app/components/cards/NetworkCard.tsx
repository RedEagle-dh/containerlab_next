import React from 'react'
import { Separator } from "@/components/ui/separator"
import { networks } from "@/lib/types/networks"
import { Wifi, WifiOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const NetworkCard = () => {

    const network = networks[ 0 ];

    const onlineDevices = network.devices.filter(device => device.status === "Online");
    const onlineDevicePercentage = Math.floor((onlineDevices.length / network.devices.length) * 100);

    const issues = network.devices.map(device => device.issues || []);

    // issues = [[], [], ...]
    // count total issues, go over array of array

    const totalIssueCount = issues.reduce((acc, val) => acc + val.length, 0);

    const totalDevicesWithAlerts = network.devices.filter(device => device.issues && device.issues?.length !== 0).length;

    const devicesWithAlertsPercentage = Math.floor((totalDevicesWithAlerts / network.devices.length) * 100);

    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-6 max-w-sm w-full">
            <div>
                <div className="flex items-center mb-4">
                    {network.status === "Online" ? <Wifi /> : <WifiOff />}
                    <div className='ml-2 flex flex-col'>
                        <h3 className="text-lg font-bold text-gray-900">{network.name}</h3>
                        <span className="text-sm text-gray-600">{network.id}</span>
                    </div>

                </div>

                <div className='grid grid-cols-5'>
                    <div className='col-span-3'>
                        <p>{network.devices.length} client devices</p>
                        <p className='text-xs text-gray-500'>{onlineDevicePercentage}% Online</p>
                        <div className='mt-2'>
                            <p className='text-4xl font-extralight'>{totalDevicesWithAlerts}</p>
                            <p className='text-sm'>Devices with alerts</p>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <p>{totalIssueCount} Alerts</p>
                    </div>
                </div>
                <Progress value={devicesWithAlertsPercentage} className="w-full h-2 mt-4" />
            </div>
            <div key={"footer"}>

            </div>
        </div>
    );

}

export default NetworkCard