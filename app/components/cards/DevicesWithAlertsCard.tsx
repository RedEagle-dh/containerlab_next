import React from 'react'
import devices from '@/lib/types/devices'
import { GoAlertFill } from "react-icons/go";
import { Badge } from '@/components/ui/badge';

const DevicesCard = () => {

    const devicesWithAlertsCount = devices.filter(device => device.issues && device.issues?.length !== 0).length;
    const devicesWithAlerts = devices.filter(device => device.issues && device.issues?.length !== 0);

    const devicesWithHighestSeverityProp = devicesWithAlerts.map(device => {
        const highestSeverity = device.issues?.reduce((acc, val) => {
            if (val.severity === 'High') {
                return 'High';
            }
            if (val.severity === 'Medium') {
                return 'Medium';
            }
            return acc;
        }, 'Low');
        return { ...device, highestSeverity };
    });
    console.log(devicesWithHighestSeverityProp)

    const AlertSeverities = (): React.ReactNode => {
        const highSeverityAlertCount = devices.filter(device => device.issues && device.issues?.some(issue => issue.severity === 'High')).length;
        const mediumSeverityAlertCount = devices.filter(device => device.issues && device.issues?.some(issue => issue.severity === 'Medium')).length;
        const lowSeverityAlertCount = devices.filter(device => device.issues && device.issues?.some(issue => issue.severity === 'Low')).length;

        return (
            <span className="text-sm text-gray-600 flex gap-2">
                <Badge variant="outline">
                    {highSeverityAlertCount}
                    <GoAlertFill className='text-red-600 ml-1' />
                </Badge>
                <Badge variant="outline">

                    {mediumSeverityAlertCount}
                    <GoAlertFill className='text-orange-500 ml-1' />
                </Badge>
                <Badge variant="outline">
                    {lowSeverityAlertCount}
                    <GoAlertFill className='text-yellow-500 ml-1' />
                </Badge>




            </span>
        )
    }

    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-6 max-w-sm w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Devices with alerts</h3>
                    <AlertSeverities />
                </div>
                <div className="overflow-auto">
                    <ul className="space-y-3">
                        {devicesWithAlerts && devicesWithHighestSeverityProp.sort((a, b) => {
                            if (a.highestSeverity === 'High') {
                                return -1;
                            }
                            if (a.highestSeverity === 'Medium' && b.highestSeverity !== 'High') {
                                return -1;
                            }
                            return 1;
                        }).slice(0, 5).map((device) => (
                            <li key={device.id} className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">{device.id}</span>
                                <span className={`text-xs font-semibold ${device.status === "Online" ? "text-green-500" : "text-blue-600"}`}>{device.status}</span>
                                <span className={`text-lg font-semibold ${device.highestSeverity === "High" ? "text-red-600" : device.highestSeverity === "Medium" ? "text-orange-500" : "text-yellow-500"}`}>{device.highestSeverity === "High" ? <GoAlertFill /> : device.highestSeverity === "Medium" ? <GoAlertFill /> : <GoAlertFill />}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {devicesWithAlertsCount > 5 && (
                <div className="pt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}

export default DevicesCard