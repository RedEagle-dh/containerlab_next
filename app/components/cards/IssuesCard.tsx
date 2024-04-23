import React from 'react'
import devices from '@/lib/types/devices'

const IssuesCard = () => {

    const issues = devices.map(device => device.issues || []);

    // issues = [[], [], ...]
    // count total issues, go over array of array

    const totalIssueCount = issues.reduce((acc, val) => acc + val.length, 0);

    // flat and group issues by name
    const groupedIssues = issues.flat().reduce((acc: { [ key: string ]: number }, val) => {
        acc[ val.title ] = (acc[ val.title ] || 0) + 1;
        return acc;
    }, {});


    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-6 max-w-sm w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Issues</h3>
                    <span className="text-sm text-gray-600">{totalIssueCount}</span>
                </div>
                <div className="overflow-auto">
                    <ul className="space-y-3">
                        {groupedIssues && Object.entries(groupedIssues).slice(0, 5).map(([ issue, count ]) => (
                            <li key={issue} className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">{issue}</span>
                                <span className="text-xs font-semibold text-blue-600">{count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {Object.keys(groupedIssues).length > 5 && (
                <div className="pt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Show More
                    </button>
                </div>
            )}
        </div>
    );

}

export default IssuesCard