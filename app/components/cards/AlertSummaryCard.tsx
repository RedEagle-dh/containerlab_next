'use client';
import React from 'react'
import { Line } from 'react-chartjs-2'
import devices from '@/lib/types/devices'
import { CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, LineElement, LineOptions, PointElement, Title, Tooltip } from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const AlertSummaryCard = () => {

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

    const lineChartData = {
        labels: [ "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ],
        datasets: [
            {
                label: "Alerts",
                data: [ 4, 7, 2, 3, 5, 8, 7 ],
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)", // Semi-transparente Hintergrundfarbe
                tension: 0.4, // Weichere Linien
                pointBackgroundColor: "#EF4444",
                pointBorderColor: "#fff",
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true, // Fülle die Fläche unter der Linie
            },
        ],
    };


    const chartOptions: ChartOptions<"line"> = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: "Day",
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                },
                grid: {
                    display: false,
                }
            },
            y: {
                title: {
                    display: false,
                    text: "Alerts",
                },
                ticks: {
                    maxTicksLimit: 4,
                }
            },
        },
    };

    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-6 max-w-sm w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Alert Summary</h3>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-4xl font-extralight'>50</p>
                        <span>Total issues</span>
                    </div>
                    <div>
                        <p className='text-4xl font-extralight'>4</p>
                        <span>New</span>
                    </div>
                </div>
            </div>
            <Line options={chartOptions} data={lineChartData} />
        </div>
    )
}

export default AlertSummaryCard