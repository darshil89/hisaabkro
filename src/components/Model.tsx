import React from 'react'

interface ModelProps {
    showModal: () => void
    handleOk: (e: React.FormEvent) => void
}

const Model = ({ handleOk, showModal }: ModelProps) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold mb-4">Add New Split</h3>
                <form onSubmit={handleOk}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            required
                            className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            required
                            className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                            <option value="">Select a method</option>
                            <option value="exact">Exact</option>
                            <option value="percentage">Percentage</option>
                            <option value="equal">Equal</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            OK
                        </button>
                        <button
                            onClick={showModal}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Model