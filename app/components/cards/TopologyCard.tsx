import React from 'react'

const TopologyCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-6 max-w-xl w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Network Topology</h3>
                </div>
                <iframe id="containerlab-frame" src="https://clab.redeagle-dave.com/" width={"100%"} height={"800px"}></iframe>
            </div>
        </div>
    )
}

export default TopologyCard